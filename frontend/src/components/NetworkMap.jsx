import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { MAP_LOCATIONS, MAP_ROUTES } from "@/data/network";

const LANDMASSES = [
  // Malay Peninsula & Indochina
  "M 140 320 C 122 258 112 208 108 158 C 92 116 66 96 46 76 L 46 40 L 340 44 C 342 110 352 176 344 240 C 330 276 308 286 290 290 C 252 262 200 220 170 210 C 184 258 204 310 220 360 C 228 410 233 436 236 454 C 220 438 194 398 180 360 C 166 338 150 330 140 320 Z",
  // Sumatra
  "M 70 370 C 122 412 192 492 256 572 C 268 586 276 596 276 602 L 256 610 C 198 572 116 470 60 388 C 62 380 66 374 70 370 Z",
  // Java
  "M 264 614 C 322 610 392 618 448 638 C 454 642 454 650 446 652 C 382 646 310 636 266 626 C 262 622 262 617 264 614 Z",
  // Borneo
  "M 348 470 C 358 424 408 392 468 400 C 518 406 546 440 532 470 C 512 506 452 522 410 506 C 376 494 344 490 348 470 Z",
  // Sulawesi
  "M 588 378 C 606 366 624 376 620 398 C 616 418 600 430 596 450 C 606 470 626 490 656 510 C 666 524 656 538 640 534 C 610 524 586 504 576 480 C 566 456 572 430 580 410 C 582 398 584 388 588 378 Z",
  // Western New Guinea
  "M 848 478 C 900 458 962 468 1000 498 L 1000 624 C 948 604 888 562 858 522 C 848 506 844 490 848 478 Z",
  // Luzon
  "M 662 118 C 690 98 720 108 730 140 C 740 180 722 230 702 260 C 682 250 666 220 660 180 C 658 158 660 136 662 118 Z",
  // Mindanao
  "M 700 318 C 730 308 760 318 764 344 C 750 368 720 370 704 350 C 698 340 698 328 700 318 Z",
];

const resolvePoint = (p) => MAP_LOCATIONS.find((l) => l.id === p) || p;

function routeGeometry(route) {
  const f = resolvePoint(route.from);
  const t = resolvePoint(route.to);
  const mx = (f.x + t.x) / 2;
  const my = (f.y + t.y) / 2;
  const dx = t.x - f.x;
  const dy = t.y - f.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * route.bend;
  const cy = my + (dx / len) * route.bend;
  return { d: `M ${f.x} ${f.y} Q ${cx} ${cy} ${t.x} ${t.y}` };
}

export default function NetworkMap() {
  const reduce = useReducedMotion();
  const live = MAP_ROUTES.filter((r) => r.status === "live");
  const geo = useMemo(() => Object.fromEntries(MAP_ROUTES.map((r) => [r.id, routeGeometry(r)])), []);

  return (
    <section id="network" className="scroll-mt-20 bg-brand-map py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Regional Network</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]">
              Connecting Southeast Asia&rsquo;s
              <br />
              digital infrastructure.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              Strategic fiber infrastructure connecting key digital hubs, data centers and network ecosystems across
              Southeast Asia.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 border border-brand-line bg-white p-2 sm:p-6 lg:p-10">
            <svg
              viewBox="0 0 1000 720"
              role="img"
              aria-label="AMIFIBER network map of Southeast Asia showing network nodes in Jakarta, Singapore, Kuala Lumpur and Bangkok"
              data-testid="network-map-svg"
              className="h-auto w-full"
            >
              <title>AMIFIBER Southeast Asia network footprint</title>

              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((v) => (
                <g key={`grat-${v}`} stroke="#E2EDF5" strokeWidth="1">
                  <line x1={v} y1="0" x2={v} y2="720" />
                  <line x1="0" y1={v} x2="1000" y2={v} />
                </g>
              ))}

              {LANDMASSES.map((d, i) => (
                <path key={`land-${i}`} d={d} fill="#F7FAFD" stroke="#C9DAE8" strokeWidth="1.5" strokeLinejoin="round" />
              ))}

              {MAP_ROUTES.map((r) =>
                r.status === "live" ? (
                  <path
                    key={r.id}
                    id={`route-${r.id}`}
                    d={geo[r.id].d}
                    fill="none"
                    stroke="#0088E8"
                    strokeWidth="2"
                  />
                ) : (
                  <path
                    key={r.id}
                    id={`route-${r.id}`}
                    d={geo[r.id].d}
                    fill="none"
                    stroke="#8FB3CF"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                  />
                )
              )}

              {!reduce &&
                live.map((r) =>
                  Array.from({ length: r.pulses || 1 }).map((_, i) => (
                    <circle key={`${r.id}-pulse-${i}`} className="map-pulse" fill="#38BDF8">
                      <animateMotion dur={`${5 + i * 1.7}s`} begin={`${i * 2.4}s`} repeatCount="indefinite">
                        <mpath href={`#route-${r.id}`} xlinkHref={`#route-${r.id}`} />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.12;0.75;1"
                        dur={`${5 + i * 1.7}s`}
                        begin={`${i * 2.4}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))
                )}

              {MAP_LOCATIONS.map((loc) => (
                <g key={loc.id} data-testid={`network-node-${loc.id}`}>
                  {loc.hub && (
                    <circle cx={loc.x} cy={loc.y} r="11" fill="none" stroke="#0088E8" strokeOpacity="0.35" strokeWidth="1.5" />
                  )}
                  <circle className="map-node-outer" cx={loc.x} cy={loc.y} r="5.5" fill="#FFFFFF" stroke="#0057B8" strokeWidth="2" />
                  <circle className="map-node-inner" cx={loc.x} cy={loc.y} r="2" fill="#0088E8" />
                  <text
                    className="map-label"
                    x={loc.x + loc.label.dx}
                    y={loc.y + loc.label.dy}
                    textAnchor={loc.label.anchor}
                    fill="#52687A"
                    fontWeight="600"
                  >
                    {loc.name.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>

            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-brand-line pt-6">
              <div data-testid="network-legend-live" className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-brand-net" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Live Network</span>
              </div>
              <div data-testid="network-legend-planned" className="flex items-center gap-3">
                <span className="h-0 w-8 border-t-2 border-dashed border-[#8FB3CF]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Planned Network</span>
              </div>
              <div data-testid="network-legend-pop" className="flex items-center gap-3">
                <span className="flex h-3 w-3 items-center justify-center rounded-full border-2 border-brand-blue" aria-hidden="true">
                  <span className="h-1 w-1 rounded-full bg-brand-net" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Data Center / POP</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <a
              href="#connectivity"
              data-testid="network-coverage-cta"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-deep"
            >
              Explore Network Coverage
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
