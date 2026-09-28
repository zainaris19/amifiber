import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import EcosystemNetwork from "@/components/EcosystemNetwork";
import CTABand from "@/components/CTABand";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { COUNTRIES } from "@/data/networkPage";
import { NETWORK_COUNTRIES } from "@/data/networkCountries";

const NetworkMapGL = lazy(() => import("@/components/NetworkMapGL"));

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Network", path: "/network" },
];

const PHOTOS = [
  { src: "/images/network/thailand-corridor.jpg", alt: "Fiber corridor along Thailand's Eastern Economic Corridor", caption: "EEC corridor, Thailand" },
  { src: "/images/network/malaysia-longhaul.jpg", alt: "Long-haul transport corridor over Peninsular Malaysia", caption: "North–South corridor, Malaysia" },
  { src: "/images/service-dci.jpg", alt: "Data center interconnection infrastructure, Singapore", caption: "Data center interconnection, Singapore" },
  { src: "/images/network/indonesia-coastline.jpg", alt: "Coastline along the Sunda Strait, Indonesia", caption: "Sunda Strait crossing, Indonesia" },
];

function Metric({ m }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, m.value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, m.value]);
  return (
    <div ref={ref} data-testid={`metric-${m.id}`}>
      <p className="font-display text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">
        {val.toLocaleString("en-US")}
        {m.suffix}
        {m.unit && <span className="ml-2 align-middle text-base font-bold text-brand-net sm:text-lg">{m.unit}</span>}
      </p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-slate sm:text-sm">{m.label}</p>
    </div>
  );
}

// Selected-country panel — swaps dynamically beside the map.
function CountryPanel({ country }) {
  if (!country) {
    return (
      <motion.div key="all" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} data-testid="country-panel-all">
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl">
          One regional network.
          <br />
          Four strategic markets.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-lg">
          AMIFIBER&rsquo;s infrastructure footprint connects key digital markets across Southeast Asia, combining
          metropolitan fiber, terrestrial backbone routes, data center interconnection and submarine connectivity.
        </p>
        <ul className="mt-8 divide-y divide-brand-line border-y border-brand-line">
          {COUNTRIES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => document.querySelector(`[data-testid="country-tab-${c.code.toLowerCase()}"]`)?.click()}
                data-testid={`country-panel-select-${c.code.toLowerCase()}`}
                className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-brand-mist"
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">{c.flag}</span>
                  <span>
                    <span className="block font-display text-base font-extrabold text-brand-ink group-hover:text-brand-blue">{c.name}</span>
                    <span className="block text-xs text-brand-slate">{c.metrics[0].value.toLocaleString("en-US")}{c.metrics[0].suffix} {c.metrics[0].unit ? `${c.metrics[0].unit} ` : ""}{c.metrics[0].label}</span>
                  </span>
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
                  View <ArrowRight size={14} />
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-brand-faint">Select a country to view its network information.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={country.code}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      data-testid={`country-panel-${country.code.toLowerCase()}`}
    >
      <p className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">{country.flag}</span>
        <span className="border border-brand-line bg-brand-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue">
          {country.status}
        </span>
      </p>
      <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-ink sm:text-4xl">{country.name}</h3>
      <p className="mt-4 font-display text-lg font-bold text-brand-deep sm:text-xl">{country.headline}</p>
      <p className="mt-4 text-base leading-relaxed text-brand-slate">{country.description}</p>
      {country.supporting && <p className="mt-3 text-base leading-relaxed text-brand-slate">{country.supporting}</p>}

      <div className="mt-8 grid grid-cols-2 gap-8 border-t border-brand-line pt-7">
        {country.metrics.map((m) => (
          <Metric key={m.id} m={m} />
        ))}
      </div>

      <div className="mt-8 border-t border-brand-line pt-6">
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Key Highlights</h4>
        <ul className="mt-3.5 space-y-2.5">
          {country.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-brand-ink">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-brand-sky" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-brand-line pt-6">
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Key Hub Locations</h4>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {country.hubs.map((h) => (
            <li key={h} className="border border-brand-line bg-white px-3 py-1.5 text-xs font-medium text-brand-deep">
              {h}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-brand-slate">
        <span className="font-semibold uppercase tracking-[0.14em] text-brand-faint">Planned expansion — </span>
        {country.planned}
      </p>
      <a href="#network-details" data-testid="country-panel-details-link" className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-deep">
        View full network details
        <ArrowDown size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
      </a>
    </motion.div>
  );
}

export default function Network() {
  const [selected, setSelected] = useState("all");
  const active = NETWORK_COUNTRIES.find((c) => c.code === selected.toUpperCase());
  const activeContent = active ? COUNTRIES.find((c) => c.id === active.contentId) : null;

  return (
    <main>
      <Seo
        title="Southeast Asia Fiber Network | AMIFIBER"
        description="Explore AMIFIBER's fiber infrastructure footprint across Indonesia, Singapore, Malaysia and Thailand, connecting data centers, carriers, cable landing stations and strategic digital infrastructure hubs."
        path="/network"
        breadcrumbs={CRUMBS}
      />

      {/* Hero */}
      <section className="bg-brand-mist2 pt-28 md:pt-32 lg:pt-36" data-testid="network-hero">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Our Network</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
              Infrastructure connecting Southeast Asia.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              AMIFIBER operates fiber infrastructure across strategic Southeast Asian markets, connecting critical
              digital infrastructure ecosystems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Network footprint — selector + GIS map + dynamic country panel */}
      <section id="network-map" className="scroll-mt-20 border-t border-brand-line bg-white py-16 lg:py-24" data-testid="network-footprint">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">Network Footprint</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 flex gap-7 overflow-x-auto whitespace-nowrap border-b border-brand-line sm:gap-10" role="tablist" aria-label="Select network market" data-testid="country-tabs">
              <button
                type="button"
                role="tab"
                aria-selected={selected === "all"}
                onClick={() => setSelected("all")}
                data-testid="country-tab-all"
                className={`-mb-px border-b-2 pb-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-150 ${
                  selected === "all" ? "border-brand-blue text-brand-blue" : "border-transparent text-brand-slate hover:text-brand-blue"
                }`}
              >
                All Networks
              </button>
              {NETWORK_COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  role="tab"
                  aria-selected={selected === c.code.toLowerCase()}
                  onClick={() => setSelected(c.code.toLowerCase())}
                  data-testid={`country-tab-${c.code.toLowerCase()}`}
                  className={`-mb-px border-b-2 pb-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-150 ${
                    selected === c.code.toLowerCase()
                      ? "border-brand-blue text-brand-blue"
                      : "border-transparent text-brand-slate hover:text-brand-blue"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="h-[65vh] min-h-[380px] border border-brand-line bg-brand-map lg:sticky lg:top-24 lg:h-[600px]" data-testid="footprint-map-frame">
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center">
                      <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-line border-t-brand-blue" aria-hidden="true" />
                    </div>
                  }
                >
                  <NetworkMapGL selectedCountry={selected} onCountrySelect={setSelected} />
                </Suspense>
              </div>
            </Reveal>

            <div className="lg:col-span-5" data-testid="country-detail-panel">
              <AnimatePresence mode="wait">
                <CountryPanel key={active ? active.code : "all"} country={activeContent} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Full detailed network information (crawlable) */}
      <section id="network-details" className="scroll-mt-20 bg-white" data-testid="network-details">
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-20 sm:px-6 lg:px-8 lg:pb-6 lg:pt-24">
          <Reveal>
            <SectionLabel>Regional Network Coverage</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              Detailed network
              <br />
              information by market.
            </h2>
          </Reveal>
        </div>

        {COUNTRIES.map((c, i) => (
          <div
            key={c.id}
            id={`country-${c.code.toLowerCase()}`}
            className={`scroll-mt-24 border-t border-brand-line ${i % 2 === 0 ? "bg-[#F4F8FC]" : "bg-white"}`}
            data-testid={`country-section-${c.id}`}
          >
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <p className="flex flex-wrap items-center gap-3">
                  <span className="text-xl" aria-hidden="true">{c.flag}</span>
                  <span className="font-display text-2xl font-extrabold tracking-tight text-brand-ink">{c.name}</span>
                  <span className="border border-brand-line bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue">
                    {c.status}
                  </span>
                </p>
                <p className="mt-4 max-w-3xl font-display text-xl font-bold text-brand-deep sm:text-2xl">{c.headline}</p>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-slate sm:text-lg">{c.description}</p>
                {c.supporting && <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-slate sm:text-lg">{c.supporting}</p>}

                <div className="mt-8 flex flex-wrap gap-10 border-y border-brand-line py-6">
                  {c.metrics.map((m) => (
                    <Metric key={m.id} m={m} />
                  ))}
                </div>

                <div className="mt-8 grid gap-10 lg:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">
                      {c.id === "singapore" ? "Data Center Interconnection" : "Fiber Routes"}
                    </h4>
                    {c.id === "singapore" ? (
                      <ul className="mt-4 flex flex-wrap gap-2" data-testid="sg-dci-list">
                        {c.dci.map((d) => (
                          <li key={d} className="border border-brand-line bg-white px-3 py-1.5 text-xs font-medium text-brand-deep">
                            {d}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-4 divide-y divide-brand-line border-y border-brand-line">
                        {c.routes.map((r) => (
                          <div key={r.name} className="py-4">
                            <p className="font-display text-sm font-extrabold text-brand-ink">
                              {r.name}
                              {r.tag && <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-net">{r.tag}</span>}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-brand-slate">{r.description}</p>
                            {r.services && (
                              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                                {r.services.map((s) => (
                                  <li key={s} className="border border-brand-line bg-brand-mist px-2 py-0.5 text-[11px] font-medium text-brand-deep">
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Key Highlights</h4>
                    <ul className="mt-4 space-y-2.5">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-brand-ink">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-brand-sky" aria-hidden="true" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Key Hub Locations</h4>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {c.hubs.map((h) => (
                        <li key={h} className="border border-brand-line bg-white px-3 py-1.5 text-xs font-medium text-brand-deep">
                          {h}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-7 text-sm leading-relaxed text-brand-slate">
                      <span className="font-semibold uppercase tracking-[0.14em] text-brand-faint">Planned expansion — </span>
                      {c.planned}
                    </p>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </section>

      {/* Documentary photography */}
      <section className="bg-white py-16 lg:py-20" data-testid="network-photography">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {PHOTOS.map((p, i) => (
              <Reveal key={p.src} delay={Math.min(i * 0.06, 0.25)}>
                <figure className="group overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    width="800"
                    height="600"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <figcaption className="mt-2.5 text-xs font-medium uppercase tracking-[0.12em] text-brand-faint">
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Regional summary */}
      <EcosystemNetwork />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-brand-deep py-24 lg:py-28" data-testid="network-final-cta">
        <div className="fiber-pattern absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connect to the
              <br />
              AMIFIBER network.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Talk to our infrastructure team about route availability, data center connectivity, dark fiber and custom
              network requirements across our regional footprint.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/#contact"
                data-testid="network-cta-primary"
                className="group inline-flex h-12 items-center justify-center bg-white px-8 text-sm font-semibold text-brand-blue transition-transform duration-200 hover:-translate-y-0.5"
              >
                Discuss Your Requirements
                <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                data-testid="network-cta-secondary"
                className="inline-flex h-12 items-center justify-center border border-white/60 px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Explore Our Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
