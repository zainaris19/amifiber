import os
import re
import time
import uuid
import ipaddress
import logging
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from datetime import datetime, timezone
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Request, HTTPException
from pydantic import BaseModel, EmailStr, Field, field_validator
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).resolve().parent
load_dotenv(ROOT_DIR / ".env")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# ---------------------------------------------------------------------------
# Managed email integration (Emergent). Sender display name is this app's own
# brand; the destination inbox is configured server-side via CONTACT_EMAIL.
# ---------------------------------------------------------------------------
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO") or None

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("amifiber")

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------------------------------------------------------------------------
# Guardrail gate (structural defense-in-depth for G2 + G3) — copy of playbook
# ---------------------------------------------------------------------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None):
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# ---------------------------------------------------------------------------
# Contact inquiry — validated, honeypot-protected, rate-limited, stored, emailed
# ---------------------------------------------------------------------------
ALLOWED_SERVICES = {
    "Dark Fiber",
    "Data Center Interconnection",
    "International Connectivity",
    "Layer 1 / DWDM",
    "Layer 2 Ethernet",
    "Custom Infrastructure",
    "Other",
}


class ContactInquiry(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    company: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    service: str
    message: str = Field(min_length=10, max_length=5000)
    website: str = ""  # honeypot — must stay empty

    @field_validator("service")
    @classmethod
    def service_allowed(cls, v):
        if v not in ALLOWED_SERVICES:
            raise ValueError("Invalid service selected")
        return v


_rate_bucket: dict = {}
RATE_LIMIT = int(os.environ.get("CONTACT_RATE_LIMIT", "5"))
RATE_WINDOW = 900  # seconds


def _rate_ok(ip: str) -> bool:
    now = time.time()
    recent = [t for t in _rate_bucket.get(ip, []) if now - t < RATE_WINDOW]
    if len(recent) >= RATE_LIMIT:
        _rate_bucket[ip] = recent
        return False
    recent.append(now)
    _rate_bucket[ip] = recent
    return True


def _inquiry_email_html(inq: ContactInquiry, submitted_at: str) -> str:
    rows = [
        ("Full Name", inq.full_name),
        ("Company", inq.company),
        ("Business Email", inq.email),
        ("Phone / WhatsApp", (inq.phone or "—").strip() or "—"),
        ("Service Required", inq.service),
    ]
    trs = "".join(
        f'<tr>'
        f'<td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:12px;color:#52687A;'
        f'border-bottom:1px solid #DCE7EF;white-space:nowrap">{escape(k)}</td>'
        f'<td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:14px;color:#0A1F33;'
        f'border-bottom:1px solid #DCE7EF">{escape(v)}</td>'
        f"</tr>"
        for k, v in rows
    )
    return f"""<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F9FC;padding:32px 0">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #DCE7EF">
      <tr><td style="padding:24px 32px;background:#003B73">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:18px;font-weight:bold;color:#FFFFFF">AMIFIBER</p>
        <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#9CC9EC">New infrastructure inquiry — website contact form</p>
      </td></tr>
      <tr><td style="padding:24px 32px 8px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">{trs}</table>
      </td></tr>
      <tr><td style="padding:8px 32px 24px">
        <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;color:#52687A">Message</p>
        <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0A1F33;white-space:pre-wrap">{escape(inq.message)}</p>
      </td></tr>
      <tr><td style="padding:16px 32px 24px">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#52687A">Submitted {escape(submitted_at)} (UTC)</p>
        <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#8097AA">Sent by {escape(EMAIL_FROM_NAME)}. We never ask for your password or card details by email.</p>
      </td></tr>
    </table>
  </td></tr>
</table>"""

def _visitor_confirmation_html(inq: ContactInquiry, submitted_at: str) -> str:
    rows = "".join(
        f'<tr>'
        f'<td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:12px;color:#52687A;'
        f'border-bottom:1px solid #DCE7EF;white-space:nowrap">{escape(k)}</td>'
        f'<td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:14px;color:#0A1F33;'
        f'border-bottom:1px solid #DCE7EF">{escape(v)}</td>'
        f"</tr>"
        for k, v in [
            ("Name", inq.full_name),
            ("Company", inq.company),
            ("Service Required", inq.service),
            ("Submitted", f"{submitted_at} UTC"),
        ]
    )
    return f"""<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F9FC;padding:32px 0">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border:1px solid #DCE7EF">
      <tr><td style="padding:24px 32px;background:#003B73">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:18px;font-weight:bold;color:#FFFFFF">AMIFIBER</p>
        <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#9CC9EC">Your inquiry has been received</p>
      </td></tr>
      <tr><td style="padding:24px 32px">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0A1F33">Dear {escape(inq.full_name)},</p>
        <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0A1F33">
          Thank you for contacting AMIFIBER. We have received your message and our infrastructure team will
          review and process your inquiry within <strong>1&ndash;2 business days</strong>.
        </p>
      </td></tr>
      <tr><td style="padding:8px 32px 8px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">{rows}</table>
      </td></tr>
      <tr><td style="padding:16px 32px 24px">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#0A1F33">
          If you would like to add any information, simply reply to this email — it will reach our sales team directly.
        </p>
      </td></tr>
      <tr><td style="padding:0 32px 24px">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#8097AA">Sent by {escape(EMAIL_FROM_NAME)}. We never ask for your password or card details by email.</p>
      </td></tr>
    </table>
  </td></tr>
</table>"""


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/contact")
async def submit_contact(inq: ContactInquiry, request: Request):
    if inq.website.strip():
        # Honeypot filled — silently accept without processing.
        return {"status": "success", "email_sent": False}

    forwarded = request.headers.get("x-forwarded-for", "")
    ip = forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else "unknown")
    if not _rate_ok(ip):
        raise HTTPException(status_code=429, detail="Too many inquiries submitted. Please try again later.")

    submitted_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    destination = os.environ.get("CONTACT_EMAIL", "").strip()
    email_id = None
    if destination:
        subject = f"New Infrastructure Inquiry — {inq.service} — {inq.company}"[:200]
        email_id = await send_email(
            to=destination,
            subject=subject,
            html=_inquiry_email_html(inq, submitted_at),
            reply_to=inq.email,
        )

    # Auto-reply confirmation to the visitor. Reply-To points at the sales inbox
    # (owner-controlled config), so replies from the visitor reach the team.
    confirmation_id = None
    try:
        confirmation_id = await send_email(
            to=inq.email,
            subject="We've received your inquiry — AMIFIBER",
            html=_visitor_confirmation_html(inq, submitted_at),
            reply_to=destination or None,
        )
    except Exception as e:
        logger.error(f"Visitor confirmation email failed: {e}")

    doc = {
        "id": str(uuid.uuid4()),
        "full_name": inq.full_name,
        "company": inq.company,
        "email": inq.email,
        "phone": (inq.phone or "").strip() or None,
        "service": inq.service,
        "message": inq.message,
        "submitted_at": submitted_at,
        "emailed": bool(email_id),
    }
    try:
        await db.inquiries.insert_one(doc)
    except Exception as e:
        logger.error(f"Failed to store inquiry: {e}")

    return {"status": "success", "email_sent": bool(email_id), "confirmation_sent": bool(confirmation_id)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
