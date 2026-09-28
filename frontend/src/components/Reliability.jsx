import { Route, Gauge, Activity } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { PRINCIPLES } from "@/data/content";

const ICONS = { route: Route, gauge: Gauge, activity: Activity };

export default function Reliability() {
  return (
    <section id="reliability" className="scroll-mt-20 bg-white py-24 lg:py-32" data-testid="reliability-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Built for Continuity</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]">
              Because connectivity
              <br />
              cannot stop.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 lg:mt-20 lg:gap-16">
          {PRINCIPLES.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <Reveal key={p.id} delay={Math.min(i * 0.08, 0.25)}>
                <div className="border-t border-brand-line pt-8">
                  <Icon size={36} strokeWidth={1.25} className="text-brand-blue" aria-hidden="true" />
                  <h3 className="mt-6 font-display text-lg font-extrabold uppercase tracking-wide text-brand-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-brand-slate">{p.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
