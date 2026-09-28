import { Reveal, SectionLabel } from "./Reveal";
import { INDUSTRIES } from "@/data/content";

export default function Industries() {
  return (
    <section id="industries" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>Industries</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]">
            Built for the companies
            <br />
            powering the digital economy.
          </h2>
        </Reveal>

        <div className="mt-16 lg:mt-20">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.id} delay={Math.min(i * 0.04, 0.2)}>
              <div
                data-testid={`industry-row-${ind.id}`}
                className="group grid gap-3 border-t border-brand-line py-8 transition-colors duration-200 sm:grid-cols-12 sm:items-baseline sm:gap-6 lg:py-10"
              >
                <span className="font-display text-base font-bold text-brand-net sm:col-span-1">
                  {ind.number}
                </span>
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-ink transition-colors duration-200 group-hover:text-brand-blue sm:col-span-5 lg:text-2xl">
                  {ind.title}
                </h3>
                <p className="text-base leading-relaxed text-brand-slate sm:col-span-6">{ind.description}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-brand-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
