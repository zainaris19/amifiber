import { Globe2, SlidersHorizontal, Waves, Network, ShieldCheck, Building2 } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { SOLUTIONS } from "@/data/content";

const ICONS = {
  globe: Globe2,
  sliders: SlidersHorizontal,
  waves: Waves,
  network: Network,
  shield: ShieldCheck,
  building: Building2,
};

export default function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-20 bg-brand-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Network Solutions</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]">
            Connectivity engineered
            <br />
            around your requirements.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px border border-brand-line bg-brand-line sm:grid-cols-2 lg:grid-cols-3 lg:mt-20">
          {SOLUTIONS.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.id} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <article
                  data-testid={`solution-card-${s.id}`}
                  className="group flex h-full flex-col bg-white p-8 transition-colors duration-200 hover:bg-white lg:p-10"
                >
                  <Icon size={28} strokeWidth={1.5} className="text-brand-blue" aria-hidden="true" />
                  <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-brand-ink sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate sm:text-base">{s.description}</p>
                  <span
                    className="mt-auto block h-0.5 w-8 bg-brand-line transition-colors duration-200 group-hover:bg-brand-blue"
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
