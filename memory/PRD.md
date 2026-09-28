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

## Implemented (2026-09-28) — Services architecture update
- React Router added (react-router-dom 7, already in template) with routes /, /services, /services/dark-fiber, /services/custom-network-infrastructure; ScrollManager (Lenis-aware) handles hash anchors + scroll restoration.
- Navbar: desktop Services dropdown (hover + click, fade/6px motion, numbered items with line icons, descriptions, arrow hover, "View All Services →"); mobile Services accordion; closes on route change.
- Homepage Services section now a preview: CTAs changed to "Learn More →" pointing at detail pages; section untouched otherwise.
- /services: hero (breadcrumb, eyebrow, H1, description) + WHAT WE PROVIDE intro + two editorial service blocks + blue CTA band.
- /services/dark-fiber: hero + Overview + Why Dark Fiber (4 numbered benefits, line icons) + How It Works flow diagram (5 stages, AMIFIBER Dark Fiber highlighted, traveling pulse) + Ideal For (5 photo cards) + Resilience (primary/diverse route diagram with pulses + availability disclaimer) + CTA band + Next Service block.
- /services/custom-network-infrastructure: hero + Purpose-Built + Capabilities (5) + engagement Process (5 steps, animated line) + Use Cases (6) + Topology visualization (POPs, primary/diverse routes, cloud/carrier/intl/enterprise connections, pulses) + CTA band + Explore Service block.
- SEO per page: unique title/description/canonical/OG via Seo component + BreadcrumbList JSON-LD; sitemap.xml updated with all routes; visual breadcrumbs on all page heroes.
- New photography downloaded to /images/services/ (cable reels, street trench, technician, Jakarta aerial/night).
- Verified: dropdown navigation click-through to detail pages, per-page document titles, mobile accordion, no horizontal overflow on new pages, diagrams rendering with animated pulses.

## Implemented (2026-09-28) — Dedicated /network page
- Architecture change: nav "Network" + footer + homepage preview CTA now route to /network; homepage keeps a short network preview (eyebrow OUR NETWORK, simplified map, CTA → /network).
- /network: editorial hero (light bg, copy + static SVG map), interactive MapLibre GL map (maplibre-gl@2.4.0 — v6 incompatible with CRA webpack 4 worker; lazy-loaded chunk), demotiles vector basemap restyled to brand cartography (ocean #F6FAFD, land #E9EEF2, borders #CDD8E0), GeoJSON layers: active (#0067C5 + animated dash flow), planned (#67A9E8 dashed), submarine (#009FE3), hub/DC/PoP/CLS markers; country filter pills (ALL/TH/MY/SG/ID → fitBounds + layer filter + polygon highlight), layer visibility toggles, hover tooltips (route: name/status/type; node: location/infrastructure/status), country click-to-select, zoom/pan controls.
- Regional footprint intro with TH/MY/SG/ID selector chips; four country editorial sections (alternating layouts; Singapore = photo; Indonesia = full-width route map) with all route data as crawlable HTML (routes, services chips, highlights, count-up metrics 500+/800+/300+/2,500+ KM, hubs, planned expansion); documentary photo bands between sections; regional summary ecosystem diagram (4 markets → backbone bus → 6 ecosystem targets); deep-blue final CTA.
- Data files: src/data/networkGeo.js (coords + routes, clearly editable, approximate coords documented) and src/data/networkPage.js (all copy/metrics/routes).
- SEO: title "Southeast Asia Fiber Network | AMIFIBER" + description/canonical/OG/breadcrumb JSON-LD; sitemap.xml includes /network; network info NOT only in tooltips (full HTML duplication).
- Verified: desktop + mobile screenshot passes, country filter interaction, no horizontal overflow, map canvas rendering, count-up metrics, no console errors.

## Backlog / P0-P2
- P0: Set CONTACT_EMAIL in backend/.env to the real company inbox (enables email delivery).
- P1: Replace placeholder LinkedIn URL + public email in src/data/company.js.
- P1: Correct/verify GIS coordinates in src/data/networkGeo.js (currently approximate).
- P1: CRM/WhatsApp/ticketing hook on POST /api/contact (modular — single integration point).
- P2: Privacy Policy & Terms of Use pages (currently anchor placeholders).

## Next Tasks
1. Configure CONTACT_EMAIL destination.
2. Update LinkedIn/email links.
3. Verify GIS coordinates against real route data.
