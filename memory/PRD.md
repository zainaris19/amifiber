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

## Implemented (2026-09-28) — Real route topology (customer map)
- networkGeo.js rebuilt around AMIFIBER's official regional map: Mae Chan, Hanoi, Da Nang, Ho Chi Minh, Bangkok, Chonburi, Rayong, Satun CLS, TH–MY Border, Chering, Kuala Lumpur, Cyberjaya, Johor Baru, Singapore (+7 DC PoPs), Batam, Sumatera, Lampung, Jakarta, Anyer CLS, Kalianda CLS, Dumai, Aceh.
- Real backbone routes rendered on the /network hero map (new lazy-init compact GL instance) and the main interactive map, incl. the Indochina loop (Bangkok–Hanoi–Da Nang–HCMC), peninsular trunk (Border–KL–JB–SG), Batam–Sumatera subsea and the CLS corridor. Cross-border trunks scoped out of small country SVG diagrams via a `diagram` field to avoid clipping.
- Homepage schematic map: KL–Bangkok corridor updated planned → live to match the official map.
- Verified: hero + main maps render the real topology, country diagrams update automatically from the same data, no overflow, no console errors.

## Implemented (2026-09-28) — Footprint map redesign (v2)
- Main regional map stripped of ALL route lines, pulses, markers and connectivity animations — now a clean interactive country footprint map (accurate MapLibre vector polygons, ocean #F5F8FA, non-market land #F0F3F5, markets #E6EBEF, hover #D5E9F8, selected #0067C5, borders #CBD5DD).
- Country selector: minimal text tabs with blue 2px underline (ALL NETWORKS / THAILAND / MALAYSIA / SINGAPORE / INDONESIA), horizontally scrollable on mobile; click country polygon directly to select; smooth fitBounds fly-to per market (SG auto-zooms close).
- New data structure src/data/networkCountries.js (code/name/flag/status/color/bounds per market) — adding Vietnam/Cambodia/Philippines later needs one new entry; src/data/networkGeo.js and route-diagram components removed with the route-line concept.
- New page structure: hero (short copy) → NETWORK FOOTPRINT (selector + sticky map 60% + dynamic country panel 40% with AnimatePresence fade, incl. metrics count-up, highlights, hubs, planned expansion; ALL state = regional overview with clickable country list) → detailed network information by market (crawlable HTML: routes, services, highlights, hubs, planned) → documentary photo strip → regional ecosystem summary → final CTA.
- Verified: ALL/Indonesia/Singapore states via screenshots (correct fills, zooms, panel swaps), demotiles feature properties probed (NAME key confirmed), no console errors.

## Implemented (2026-09-28) — Regional infrastructure section redesign (v3)
- Section "REGIONAL INFRASTRUCTURE / Infrastructure designed to connect digital ecosystems" rebuilt to match the customer's mockup: two-tone headline (ink + blue), left column of 4 country cards (city photo, code, tagline), center non-interactive MapLibre mini map (markets #B9D6F4, context land #EAE8E4, ocean #FBFDFE, blue dot markers + uppercase country labels), right column of 6 ecosystem cards (photo + lucide line icon + title + description: Data Centers, Carriers, Cloud, International Gateways, Content Networks, Enterprises).
- Thin blue cubic-bezier connector lines drawn between country card dots → map dots → ecosystem card dots, computed from live DOM positions (ResizeObserver-style recompute on resize + minimap-ready event); desktop-only, stacked layout below lg.
- Country card photos (Bangkok/KL/Singapore/Jakarta) + ecosystem photos downloaded to /images/network/; taglines stored in networkPage.js (derived from actual hub names).
- Old EcosystemDiagram.jsx removed. Verified via screenshots (desktop full composition, no broken images, no console errors).

## Implemented (2026-09-28) — Ecosystem photos + country detail contrast (v4)
- Ecosystem card photos updated to match the customer's second mockup: blue-lit DC corridor, antenna tower (real stock), glowing cloud hologram + dark server close-up (generated to mockup style), harbor gateway; enterprises keeps the night skyline.
- Detailed network information section restructured into full-bleed alternating background bands (#F4F8FC / white) — each country's detail block is now visually distinct while reading, with hairline separators.
- Fixed a JSX closing-tag compile error introduced during restructure; verified: no broken images, no console errors, bands render alternately (TH tinted, MY white, etc.).

## Implemented (2026-09-28) — Homepage network preview uses official map (v5)
- Homepage "Connecting Southeast Asia's digital infrastructure." preview now displays the customer-provided official network map ("Southeast Asia Next-Gen Network" — gray cartography, orange fiber routes, glowing blue nodes) instead of the stylized SVG; legend updated to FIBER ROUTE / NETWORK LOCATION to match the image; NetworkMapSvg.jsx removed.
- Verified via homepage screenshot: map renders crisply in the preview card, no overflow, no console errors.

## Implemented (2026-09-28) — Hero overlay removal + headline sizing (v6)
- Removed BOTH full-bleed blue gradient overlays (L→R 85% and T→B 60–75%) from the hero — video/poster now shows neutrally, no more heavy blue cast.
- Headline "Providing the Backbone of Digital Connectivity." reduced ~15%: clamp(2.625rem,7vw,5rem) → clamp(2.5rem,6vw,4.25rem) (max 80px → 68px).
- Text readability kept WITHOUT overlays via inherited neutral text-shadow (0 1px 3px rgba(0,0,0,.5) + 0 10px 30px rgba(0,0,0,.45)) on the content block; eyebrow brightened #9CC9EC→#B4D7F1, paragraph white/80→white/90, bottom tagline white/60→white/75.
- Hero readability final state (after user feedback "too bright"): ONE subtle left-weighted overlay bg-gradient-to-r from-[#002B55]/55 via-[#002B55]/30 to-[#002B55]/10 (vs original 85%+60% double overlay) — video stays visible, text fully legible on desktop 1440 + mobile 390; mobile eyebrow clipping in first capture was a screenshot artifact, recheck capture clean.

## Implemented (2026-09-28) — Bigger navbar logo + real-logo favicon (v7)
- Cropped transparent padding from amifiber-logo.png / amifiber-logo-light.png (2000x667 → 1885x522, content-filling) so the logo renders visibly ~20% larger at the same CSS height; navbar logo height bumped h-7/md:h-8 → h-8/md:h-9 (visible size +~30% total); applies to navbar (light+dark variants) and footer.
- Favicon rebuilt from the REAL logo asset: blue mark extracted by color separation (bright-blue mask B>130 & R<150 — strips navy text in dark variant and white text in light variant; verified no "A" sliver artifacts) → favicon.png (48x48, navy #002B55 rounded tile) + apple-touch-icon.png (180x180 full-bleed); recreated favicon.svg deleted.
- index.html: icon links → favicon.png + apple-touch-icon.png; JSON-LD Organization.logo → real wordmark PNG. Frontend supervisor-restarted (public/index.html is not hot-reloaded).
- Verified: favicon.png/apple-touch-icon.png serve 200 through preview URL, served HTML carries new links, navbar logo visibly larger + crisp on desktop 1440 & mobile 390 screenshots.

## Implemented (2026-09-28) — /network hero image (v8)
- Plain light-gray hero band replaced with the shared PageHero component (same pattern as services pages): full-bleed photo + navy gradient overlay + breadcrumb + eyebrow/H1/description in white.
- New photo /images/network/fiber-hero.jpg — blue LC fiber optic patch cables on panel (Pexels, free license, 2400x1600), chosen for brand-blue palette + "deep fiber photographic realism"; rejected candidates: control-room.jpg (actually a concert control room, pink/wrong theme), infrastructure-band.jpg (orange broadcast rack + already used on 2 pages), jakarta-night.jpg (warm amber tones), unsplash candidates (404 / premium-locked), abstract network mesh (cyberpunk-neon, forbidden by design guidelines).
- Verified: desktop 1440 + mobile 390 screenshots (hero renders with image, text legible, breadcrumb present, footprint map + tabs below intact, no horizontal overflow); first mobile capture clipping was a mid-Lenis-scroll artifact, recheck at scrollY=0 clean.

## Implemented (2026-09-28) — Remove Industries menu item (v9)
- "Industries" removed from desktop nav (NAV_LINKS in company.js) and from the hardcoded mobile menu (Navbar.jsx). Homepage Industries SECTION itself kept per request scope (menu only); id="industries" anchor retained, no nav entry links to it anymore.
- Verified: desktop navbar + opened mobile menu screenshots — menu now Home / Network / Services / Solutions / About; mobile testid list confirms industries link gone.

## Implemented (2026-09-28) — Footer services links cleanup (v10)
- Removed "Data Center Interconnection" and "International Connectivity" from the footer SERVICES column (FOOTER_COLUMNS in company.js) — column now lists only the two real service pages: Dark Fiber + Custom Infrastructure.
- Verified via footer screenshot: both links gone, all other columns (Network / Company / Connect) intact.

## Implemented (2026-09-28) — Contact email flow activated (v11)
- backend/.env: CONTACT_EMAIL=sales@amifiber.com (was empty — root cause of "email not working").
- POST /api/contact now sends TWO managed-Resend emails per submission: (1) internal notification → sales@amifiber.com with all form fields (name/company/email/phone/service/message), Reply-To = visitor's email so sales can reply directly; (2) visitor auto-reply confirmation "received, processed within 1–2 business days" with submission summary, Reply-To = sales@amifiber.com (owner-controlled config, per G4).
- Sender shows display name "AMIFIBER" (EMAIL_FROM_NAME) over the platform-verified sending domain — the literal gmail From address the user asked for is not possible on managed Resend (gmail.com cannot be domain-verified); documented to user.
- Frontend success state updated: "A confirmation email has been sent to your inbox — our infrastructure team will process your inquiry within 1–2 business days."
- Playbook self-check passed: EMAIL_FROM_NAME in .env+code, from_name on every payload, _assert_safe_email gate on the single send path, no forms/links/credential asks in templates, recipients from config or the form author.
- Verified e2e via external preview URL: POST /api/contact → {"email_sent": true, "confirmation_sent": true}; proxy logs show 2x HTTP 202 Accepted; rate-limit 429 still functioning. Could NOT verify inbox receipt inside sales@amifiber.com (no mailbox access) — user should confirm arrival.

## Implemented (2026-09-28) — Full standalone migration for self-hosted VPS (v12)
- AUDIT RESULT: all Emergent connections removed; site is 100% self-hostable.
- index.html: removed platform script emergent-main.js, PostHog analytics (ap.emergent.sh) and its DataCloneError workaround; page structure restored cleanly (transient breakage during edit fixed deterministically; div#root verified back). One stray artifact remains in served HTML only via dev-server overlay injection — NOT in source, NOT in production build (verified by craco build: bundle contains only the inlined REACT_APP_BACKEND_URL preview string, replaced by own domain when rebuilt).
- Email transport swapped from Emergent integration proxy to pure Gmail SMTP (smtplib stdlib, asyncio.to_thread non-blocking wrapper): From "AMIFIBER <noreplayamifiber@gmail.com>", STARTTLS port 587, credentials in backend/.env only (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS); EMERGENT_EMAIL_KEY + httpx usage removed; _assert_safe_email hygiene gate kept; same error contract (HTTPException) for the form UI.
- Verified e2e: POST /api/contact → {"email_sent": true, "confirmation_sent": true} via Gmail SMTP (notification → sales@amifiber.com; visitor confirmation → test inbox). Zero "Email send error"/SMTP auth errors in logs (2x transient KeyError during hot-reload-before-env window only, cleared by supervisor restart).
- Removed unused template leftovers constants/testIds/ (home.js emergentLink constant had zero imports); deleted stale local build/ output.
- Created /app/DEPLOYMENT-VPS.md: Indonesian step-by-step VPS guide (mongod + uvicorn systemd + CRA build with own REACT_APP_BACKEND_URL + nginx SPA/API config + .env checklist + mongodump/mongorestore data migration note).
- Remaining non-Emergent externals (fine for private hosting): Google Fonts, MapLibre demotiles (public free services).

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
