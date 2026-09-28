import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Server, RadioTower, Cloud, Share2, PlayCircle, Building2 } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { COUNTRIES } from "@/data/networkPage";

const NetworkMiniMap = lazy(() => import("./NetworkMiniMap"));

const ECOSYSTEMS = [
  { id: "data-centers", icon: Server, title: "Data Centers", description: "Interconnecting regional data center ecosystems", photo: "/images/service-dci.jpg" },
  { id: "carriers", icon: RadioTower, title: "Carriers", description: "Supporting carrier and wholesale networks", photo: "/images/network/carriers-antenna.jpg" },
  { id: "cloud", icon: Cloud, title: "Cloud", description: "Enabling cloud connectivity and on-ramps", photo: "/images/infrastructure-band.jpg" },
  { id: "gateways", icon: Share2, title: "International Gateways", description: "Access to global connectivity and submarine cable ecosystems", photo: "/images/network/indonesia-coastline.jpg" },
  { id: "content", icon: PlayCircle, title: "Content Networks", description: "Supporting CDN and digital content platforms", photo: "/images/network/control-room.jpg" },
  { id: "enterprises", icon: Building2, title: "Enterprises", description: "Private and dedicated connectivity for critical operations", photo: "/images/services/jakarta-night.jpg" },
];

const CONNECTIONS = {
  TH: ["data-centers", "carriers", "gateways"],
  MY: ["data-centers", "carriers", "enterprises"],
  SG: ["data-centers", "cloud", "content", "gateways"],
  ID: ["data-centers", "carriers", "gateways"],
};

// Regional infrastructure section — country cards → SEA map → ecosystem cards,
// connected by thin blue lines (desktop).
export default function EcosystemNetwork() {
  const wrapRef = useRef(null);
  const [paths, setPaths] = useState([]);

  const recompute = () => {
    const wrap = wrapRef.current;
    if (!wrap || window.innerWidth < 1024) {
      setPaths([]);
      return;
    }
    const wrect = wrap.getBoundingClientRect();
    const anchor = (sel, side) => {
      const el = wrap.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: (side === "right" ? r.right : r.left) - wrect.left, y: r.top + r.height / 2 - wrect.top };
    };
    const curve = (a, b, wa = 0.45, wb = 0.4) =>
      `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} C ${(a.x + (b.x - a.x) * wa).toFixed(1)} ${a.y.toFixed(1)}, ${(b.x - (b.x - a.x) * wb).toFixed(1)} ${b.y.toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;

    const lines = [];
    COUNTRIES.forEach((c) => {
      const code = c.code;
      const a = anchor(`[data-country-dot="${code}"]`, "right");
      const m = anchor(`[data-map-dot="${code}"]`, "left");
      if (!a || !m) return;
      lines.push(curve(a, m));
      (CONNECTIONS[code] || []).forEach((id) => {
        const e = anchor(`[data-eco-dot="${id}"]`, "left");
        if (e) lines.push(curve(m, e, 0.5, 0.5));
      });
    });
    setPaths(lines);
  };

  useEffect(() => {
    const onReady = () => setTimeout(recompute, 60);
    const timers = [400, 1300, 2300].map((t) => setTimeout(recompute, t));
    window.addEventListener("amifiber:minimap-ready", onReady);
    window.addEventListener("resize", recompute);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("amifiber:minimap-ready", onReady);
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-mist2 py-24 lg:py-32" data-testid="network-summary">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Regional Infrastructure</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[54px]">
              Infrastructure designed
              <br />
              <span className="text-brand-blue">to connect digital ecosystems.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-brand-slate sm:text-lg">
              Our regional infrastructure connects key digital markets across Southeast Asia with data centers,
              carriers, cloud platforms, international gateways, content networks and enterprise ecosystems.
            </p>
          </Reveal>
        </div>

        {/* Desktop composition: cards — map — ecosystem cards, with connector lines */}
        <div ref={wrapRef} className="relative mt-16 hidden lg:block">
          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true">
            {paths.map((d, i) => (
              <path key={i} d={d} fill="none" stroke="#3E8EDE" strokeWidth="1.3" strokeOpacity="0.65" />
            ))}
          </svg>

          <div className="relative z-20 grid grid-cols-[300px_1fr_330px] items-stretch gap-10">
            {/* Country cards */}
            <div className="flex flex-col justify-center gap-7">
              {COUNTRIES.map((c) => (
                <Reveal key={c.id}>
                  <div className="relative flex items-center gap-4 border border-brand-line bg-white p-3.5 shadow-[0_14px_35px_-18px_rgba(0,43,85,0.35)]" data-testid={`eco-country-card-${c.code.toLowerCase()}`}>
                    <img src={c.cardPhoto} alt={c.name} loading="lazy" width="200" height="150" className="h-[72px] w-24 shrink-0 object-cover" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-brand-net">{c.code}</p>
                      <p className="font-display text-lg font-extrabold leading-tight text-brand-ink">{c.name}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-brand-slate">{c.tagline}</p>
                    </div>
                    <span
                      data-country-dot={c.code}
                      className="absolute -right-[7px] top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-brand-blue ring-4 ring-white/80"
                      aria-hidden="true"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Center map */}
            <div className="h-[620px] self-center">
              <Suspense fallback={<div className="h-full w-full animate-pulse bg-brand-map" />}>
                <NetworkMiniMap />
              </Suspense>
            </div>

            {/* Ecosystem cards */}
            <div className="flex flex-col justify-center gap-4">
              {ECOSYSTEMS.map((e, i) => (
                <Reveal key={e.id} delay={Math.min(i * 0.05, 0.25)}>
                  <div className="relative flex items-center gap-3.5 border border-brand-line bg-white p-3 shadow-[0_14px_35px_-20px_rgba(0,43,85,0.35)]" data-testid={`ecosystem-card-${e.id}`}>
                    <img src={e.photo} alt={e.title} loading="lazy" width="200" height="150" className="h-[64px] w-[84px] shrink-0 object-cover" />
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-line bg-brand-mist text-brand-blue">
                      <e.icon size={19} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-[13px] font-extrabold uppercase tracking-wide text-brand-ink">{e.title}</p>
                      <p className="mt-0.5 text-xs leading-snug text-brand-slate">{e.description}</p>
                    </div>
                    <span
                      data-eco-dot={e.id}
                      className="absolute -left-[7px] top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-brand-blue ring-4 ring-white/80"
                      aria-hidden="true"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: stacked composition */}
        <div className="mt-12 lg:hidden">
          <div className="grid gap-4 sm:grid-cols-2">
            {COUNTRIES.map((c) => (
              <Reveal key={c.id}>
                <div className="flex items-center gap-4 border border-brand-line bg-white p-3.5" data-testid={`eco-country-card-${c.code.toLowerCase()}`}>
                  <img src={c.cardPhoto} alt={c.name} loading="lazy" width="200" height="150" className="h-[64px] w-20 shrink-0 object-cover" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-brand-net">{c.code}</p>
                    <p className="font-display text-base font-extrabold leading-tight text-brand-ink">{c.name}</p>
                    <p className="mt-0.5 truncate text-xs text-brand-slate">{c.tagline}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 h-[420px] border border-brand-line bg-white">
              <Suspense fallback={<div className="h-full w-full animate-pulse bg-brand-map" />}>
                <NetworkMiniMap />
              </Suspense>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ECOSYSTEMS.map((e, i) => (
              <Reveal key={e.id} delay={Math.min(i * 0.05, 0.25)}>
                <div className="flex items-center gap-3.5 border border-brand-line bg-white p-3" data-testid={`ecosystem-card-${e.id}`}>
                  <img src={e.photo} alt={e.title} loading="lazy" width="200" height="150" className="h-[56px] w-[72px] shrink-0 object-cover" />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-line bg-brand-mist text-brand-blue">
                    <e.icon size={17} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[13px] font-extrabold uppercase tracking-wide text-brand-ink">{e.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-brand-slate">{e.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
