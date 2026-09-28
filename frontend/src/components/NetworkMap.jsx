import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import NetworkMapSvg from "./NetworkMapSvg";

// Homepage — short network preview. Full footprint lives on /network.
export default function NetworkMap() {
  return (
    <section id="network" className="scroll-mt-20 bg-brand-map py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Our Network</SectionLabel>
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
              Strategic fiber infrastructure connecting key digital hubs, data centers, cable landing stations and
              network ecosystems across Southeast Asia.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 border border-brand-line bg-white p-2 sm:p-6 lg:p-10">
            <NetworkMapSvg />
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
            <Link
              to="/network"
              data-testid="network-coverage-cta"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-deep"
            >
              Explore Our Network
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
