import { ArrowRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

export default function RegionalVision() {
  return (
    <section id="vision" className="scroll-mt-20 bg-brand-mist py-24 lg:py-32" data-testid="regional-vision">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <SectionLabel>Regional Vision</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]">
              Building the infrastructure for Southeast Asia&rsquo;s digital future.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-slate sm:text-lg">
              As digital demand grows across Southeast Asia, AMIFIBER continues expanding infrastructure connecting
              strategic data centers, carriers, cloud platforms and network ecosystems.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="#network"
              data-testid="regional-vision-cta"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-deep"
            >
              Discover Our Network
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="group overflow-hidden">
            <img
              src="/images/regional-vision.jpg"
              alt="Transmission infrastructure supporting regional digital connectivity"
              loading="lazy"
              width="1200"
              height="900"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
