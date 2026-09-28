import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView, animate } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import NetworkMapSvg from "@/components/NetworkMapSvg";
import CountryRouteMap from "@/components/CountryRouteMap";
import EcosystemDiagram from "@/components/EcosystemDiagram";
import CTABand from "@/components/CTABand";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { COUNTRIES } from "@/data/networkPage";

const NetworkMapGL = lazy(() => import("@/components/NetworkMapGL"));
const NetworkHeroMap = lazy(() => import("@/components/NetworkHeroMap"));

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Network", path: "/network" },
];

const COUNTRY_FILTERS = [
  { id: "all", label: "All Networks" },
  { id: "th", label: "Thailand" },
  { id: "my", label: "Malaysia" },
  { id: "sg", label: "Singapore" },
  { id: "id", label: "Indonesia" },
];

const LAYER_TOGGLES = [
  { id: "active", label: "Active" },
  { id: "planned", label: "Planned" },
  { id: "submarine", label: "Submarine" },
  { id: "dcpop", label: "Data Centers / PoPs" },
  { id: "cls", label: "Cable Landing Stations" },
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
  const shown = inView ? val.toLocaleString("en-US") : "0";
  return (
    <div ref={ref} data-testid={`metric-${m.id}`}>
      <p className="font-display text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">
        {shown}
        {m.suffix}
        {m.unit && <span className="ml-2 align-middle text-base font-bold text-brand-net sm:text-lg">{m.unit}</span>}
      </p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-slate sm:text-sm">{m.label}</p>
    </div>
  );
}

function PhotoBand({ src, alt }) {
  return (
    <Reveal>
      <div className="group overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width="2000"
          height="800"
          className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:h-[380px] lg:h-[440px]"
        />
      </div>
    </Reveal>
  );
}

function CountrySection({ country, index }) {
  const flip = index % 2 === 1; // alternate composition for rhythm
  const sectionId = `country-${country.code.toLowerCase()}`;
  return (
    <section id={sectionId} className="scroll-mt-24 py-20 lg:py-28" data-testid={`country-section-${country.id}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Content */}
          <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
              <span className="h-px w-8 bg-brand-blue" aria-hidden="true" />
              Regional Network Coverage
            </p>
            <p className="mt-6 flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">{country.flag}</span>
              <span className="border border-brand-line bg-brand-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue">
                {country.status}
              </span>
            </p>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-brand-ink sm:text-4xl">
              {country.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-slate sm:text-lg">{country.description}</p>
            {country.supporting && (
              <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-lg">{country.supporting}</p>
            )}

            <div className="mt-9 grid grid-cols-2 gap-8 border-t border-brand-line pt-7">
              {country.metrics.map((m) => (
                <Metric key={m.id} m={m} />
              ))}
            </div>

            <div className="mt-9 border-t border-brand-line pt-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Key Highlights</h3>
              <ul className="mt-4 space-y-2.5">
                {country.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-brand-ink">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-brand-sky" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 border-t border-brand-line pt-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Key Hub Locations</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {country.hubs.map((h) => (
                  <li key={h} className="border border-brand-line bg-white px-3 py-1.5 text-xs font-medium text-brand-deep">
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-7 text-sm leading-relaxed text-brand-slate">
              <span className="font-semibold uppercase tracking-[0.14em] text-brand-faint">Planned expansion — </span>
              {country.planned}
            </p>
          </Reveal>

          {/* Visual — route map or photo */}
          <Reveal delay={0.1} className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
            {country.id === "singapore" ? (
              <div>
                <div className="group overflow-hidden">
                  <img
                    src={country.photo.src}
                    alt={country.photo.alt}
                    loading="lazy"
                    width="1200"
                    height="800"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <p className="mt-3 text-xs text-brand-faint">Data center and carrier interconnection infrastructure, Singapore.</p>
              </div>
            ) : (
              <div className="border border-brand-line bg-white p-3 sm:p-6">
                <CountryRouteMap
                  countryId={country.code.toLowerCase()}
                  width={country.id === "indonesia" ? 760 : 640}
                  height={country.id === "indonesia" ? 700 : 480}
                  showAllLabels={country.id !== "singapore"}
                  testId={`country-route-map-${country.id}`}
                />
              </div>
            )}
          </Reveal>
        </div>

        {/* Route information as crawlable HTML */}
        <div className="mt-12 lg:mt-16">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">
            {country.id === "singapore" ? "Data Center Interconnection" : "Fiber Routes"}
          </h3>
          {country.id === "singapore" ? (
            <ul className="mt-4 flex flex-wrap gap-2" data-testid="sg-dci-list">
              {country.dci.map((d) => (
                <li key={d} className="border border-brand-line bg-brand-mist px-3.5 py-2 text-sm font-medium text-brand-deep">
                  {d}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 divide-y divide-brand-line border-y border-brand-line">
              {country.routes.map((r) => (
                <div key={r.name} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-6" data-testid={`route-${r.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`}>
                  <div className="sm:col-span-4">
                    <p className="font-display text-base font-extrabold text-brand-ink">{r.name}</p>
                    {r.tag && <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-net">{r.tag}</p>}
                  </div>
                  <p className="text-sm leading-relaxed text-brand-slate sm:col-span-5">{r.description}</p>
                  {r.services && (
                    <ul className="flex flex-wrap content-start gap-2 sm:col-span-3">
                      {r.services.map((s) => (
                        <li key={s} className="h-fit border border-brand-line bg-brand-mist px-2.5 py-1 text-xs font-medium text-brand-deep">
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
      </div>
    </section>
  );
}

export default function Network() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [layerVisibility, setLayerVisibility] = useState({
    active: true,
    planned: true,
    submarine: true,
    dcpop: true,
    cls: true,
  });

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
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Our Network</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
                Infrastructure connecting Southeast Asia.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
                AMIFIBER is developing a regional fiber infrastructure platform connecting strategic data centers,
                metropolitan networks, cable landing stations and digital infrastructure hubs across Southeast Asia.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
                Our network combines terrestrial, metropolitan and submarine infrastructure designed to support
                carrier-grade connectivity across key regional markets.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href="#network-map"
                data-testid="network-hero-cta"
                className="group mt-9 inline-flex h-12 items-center gap-2 bg-brand-blue px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                Explore Network Footprint
                <ArrowDown size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="lg:col-span-6">
            <div className="h-[380px] border border-brand-line bg-brand-map sm:h-[460px] lg:h-[560px]">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-line border-t-brand-blue" aria-hidden="true" />
                  </div>
                }
              >
                <NetworkHeroMap />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive GIS map */}
      <section id="network-map" className="scroll-mt-20 border-y border-brand-line bg-white py-20 lg:py-24" data-testid="network-map-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter network by country" data-testid="country-filters">
                {COUNTRY_FILTERS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCountry(c.id)}
                    data-testid={`country-filter-${c.id}`}
                    aria-pressed={selectedCountry === c.id}
                    className={`h-10 px-4 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-150 ${
                      selectedCountry === c.id
                        ? "bg-brand-blue text-white"
                        : "border border-brand-line bg-white text-brand-slate hover:border-brand-blue hover:text-brand-blue"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative mt-6 h-[420px] border border-brand-line bg-brand-map sm:h-[520px] lg:h-[600px]">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-brand-line border-t-brand-blue" aria-hidden="true" />
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Loading interactive map</p>
                    </div>
                  </div>
                }
              >
                <NetworkMapGL selectedCountry={selectedCountry} onCountrySelect={setSelectedCountry} layerVisibility={layerVisibility} />
              </Suspense>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              {LAYER_TOGGLES.map((t) => (
                <label key={t.id} className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-slate" data-testid={`layer-toggle-${t.id}`}>
                  <input
                    type="checkbox"
                    checked={layerVisibility[t.id]}
                    onChange={(e) => setLayerVisibility((v) => ({ ...v, [t.id]: e.target.checked }))}
                    className="h-3.5 w-3.5 accent-[#0057B8]"
                  />
                  {t.label}
                </label>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-brand-line pt-5" data-testid="gis-legend">
              <span className="flex items-center gap-2.5"><span className="h-0.5 w-7 bg-[#0067C5]" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Active Network</span></span>
              <span className="flex items-center gap-2.5"><span className="h-0 w-7 border-t-2 border-dashed border-[#67A9E8]" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Planned Network</span></span>
              <span className="flex items-center gap-2.5"><span className="h-0.5 w-7 bg-[#009FE3]" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Submarine Cable</span></span>
              <span className="flex items-center gap-2.5"><span className="h-2.5 w-2.5 rounded-full bg-[#0067C5]" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Major Hub</span></span>
              <span className="flex items-center gap-2.5"><span className="h-2.5 w-2.5 rounded-full border-2 border-[#0067C5] bg-white" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Cable Landing Station</span></span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Regional footprint intro + country selector */}
      <section className="bg-brand-mist2 py-20 lg:py-24" data-testid="regional-footprint">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Regional Footprint</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              One regional network.
              <br />
              Four strategic markets.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-brand-slate sm:text-lg">
              AMIFIBER&rsquo;s infrastructure footprint connects key digital markets across Southeast Asia, combining
              metropolitan fiber, terrestrial backbone routes, data center interconnection and submarine connectivity.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" data-testid="country-selector">
              {COUNTRIES.map((c) => (
                <a
                  key={c.id}
                  href={`#country-${c.code.toLowerCase()}`}
                  data-testid={`country-selector-${c.code.toLowerCase()}`}
                  className="group flex items-center gap-3 border border-brand-line bg-white px-4 py-3.5 transition-colors duration-150 hover:border-brand-blue"
                >
                  <span className="flex h-9 w-9 items-center justify-center bg-brand-blue font-display text-xs font-extrabold text-white">
                    {c.code}
                  </span>
                  <span className="font-display text-sm font-bold text-brand-ink transition-colors group-hover:text-brand-blue">
                    {c.name}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Country sections */}
      <div className="bg-white">
        {COUNTRIES.map((c, i) => (
          <div key={c.id}>
            <CountrySection country={c} index={i} />
            {c.id === "thailand" && (
              <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                <PhotoBand src={c.photo.src} alt={c.photo.alt} />
              </div>
            )}
            {c.id === "malaysia" && (
              <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                <PhotoBand src={c.photo.src} alt={c.photo.alt} />
              </div>
            )}
            {c.id === "indonesia" && (
              <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
                <PhotoBand src={c.photo.src} alt={c.photo.alt} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Regional summary */}
      <section className="border-t border-brand-line bg-brand-mist py-24 lg:py-32" data-testid="network-summary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Regional Infrastructure</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              Infrastructure designed
              <br />
              to connect digital ecosystems.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-14 border border-brand-line bg-white p-4 sm:p-8 lg:p-12">
              <EcosystemDiagram />
            </div>
          </Reveal>
        </div>
      </section>

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
