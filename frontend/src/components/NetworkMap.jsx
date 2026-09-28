import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

// Homepage — short network preview. Full footprint lives on /network.
// Map visual: AMIFIBER's official regional network map (customer-provided).
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
            <img
              src="/images/network/amifiber-network-map.png"
              alt="AMIFIBER regional fiber network map across Southeast Asia — Mae Chan, Hanoi, Da Nang, Bangkok, Chonburi, Ho Chi Minh, Kuala Lumpur, Singapore, Batam, Sumatera, Lampung and Jakarta"
              loading="lazy"
              width="1536"
              height="1024"
              data-testid="network-preview-map"
              className="h-auto w-full"
            />

            <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-brand-line pt-6">
              <div data-testid="network-legend-route" className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#F09A38]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Fiber Route</span>
              </div>
              <div data-testid="network-legend-node" className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#2F9BFF] shadow-[0_0_0_3px_rgba(47,155,255,0.25)]" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-slate">Network Location</span>
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
