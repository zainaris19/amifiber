# AMIFIBER — Corporate Website PRD

## Original Problem Statement
Build a completely new premium corporate website for AMIFIBER (Southeast Asian B2B fiber infrastructure provider) with a BLUE + WHITE visual identity. NOT a redesign. Position AMIFIBER as "Providing the Backbone of Digital Connectivity" — a professional B2B fiber infrastructure and connectivity provider supporting ISPs, carriers, data centers, international gateway operators, cloud providers, content/CDN providers and enterprises across Southeast Asia (Jakarta, Singapore, Malaysia, Thailand). Never present it as a residential broadband ISP.

## Architecture
- Frontend: React (CRA + craco) + Tailwind CSS + Framer Motion + Lenis smooth scroll, single-page with anchor navigation, `/app/frontend/src/components/*` (16 section components) + `/app/frontend/src/data/*` (company, network, content config objects — all copy/stats/routes editable here).
- Backend: FastAPI on 0.0.0.0:8001 (all routes /api-prefixed), MongoDB via motor.
- Email: Emergent-managed Resend integration (server-side only; EMERGENT_EMAIL_KEY + EMAIL_FROM_NAME in backend/.env; destination = CONTACT_EMAIL env var).
- SEO: full meta/OG/Twitter/canonical/JSON-LD in public/index.html; robots.txt + sitemap.xml; single H1; semantic headings.
- A11y: semantic HTML, ARIA labels, visible focus states, form error association, prefers-reduced-motion across video/marquee/pulses.

## User Personas
- ISP/Carrier & DC procurement teams evaluating wholesale fiber (primary)
- Cloud/content platform infrastructure leads
- Enterprise network managers needing private connectivity

## Core Requirements (static)
Blue+white Swiss-corporate system (#0057B8/#0088E8/#38BDF8/#003B73/#002B55 on white), Manrope headings + Inter body, hero video background with dark-blue overlay + masked line reveal, statistics (4 / 350+ KM / 2,300 KM / 50+ / 100+) with count-up, SEA network map (Jakarta, Singapore, KL, Bangkok) with live/planned routes + data pulses + legend, editorial service rows (Dark Fiber, Custom Network Infrastructure, DCI), cinematic infrastructure band, 6 solution cards, deep-blue Why section, 5 industries rows, connectivity diagram with traveling pulse, reliability principles, regional vision, final CTA, contact form, deep-blue footer.

## Implemented (2026-09-28)
- All 16 sections above, built from scratch; brand SVG logo + favicon recreated from AMIFIBER mark.
- Hero video: user-provided MP4 installed at /videos/amifiber-hero.mp4 (+ 720p -mobile.mp4 transcode, VP9 .webm fallback for codec-poor browsers, poster frame extracted from the actual video). Verified playing (currentTime advancing) on desktop and mobile.
- Real AMIFIBER logo (user-provided, background removed): navy variant on light backgrounds, white-recolor variant over video/footer.
- POST /api/contact: validation, honeypot, per-IP rate limit (5/15 min), Mongo storage, managed-Resend email (verified email_sent:true to test inbox), elegant success/error+retry states. Exact required success message shown.
- Verified: curl protocol (health/valid/honeypot/invalid/rate-limit), desktop 1440 + mobile 390 screenshot passes, form e2e through preview URL, no horizontal overflow, console warnings fixed.

## Backlog / P0-P2
- P0: Set CONTACT_EMAIL in backend/.env to the real company inbox (enables email delivery).
- P1: Replace placeholder LinkedIn URL + public email in src/data/company.js.
- P1: CRM/WhatsApp/ticketing hook on POST /api/contact (modular — single integration point).
- P2: Privacy Policy & Terms of Use pages (currently anchor placeholders).

## Next Tasks
1. Configure CONTACT_EMAIL destination.
2. Update LinkedIn/email links.
