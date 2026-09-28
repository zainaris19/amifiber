import { Reveal } from "./Reveal";
import { WHY_ITEMS } from "@/data/content";

export default function WhyAmifiber() {
  return (
    <section id="why" className="scroll-mt-20 bg-brand-deep py-24 lg:py-32" data-testid="why-amifiber">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            Infrastructure you
            <br />
            can depend on.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Critical networks require infrastructure engineered for reliability, performance and long-term scalability.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {WHY_ITEMS.map((item, i) => (
            <Reveal key={`why-${i}`} delay={Math.min(i * 0.06, 0.3)}>
              <div className="border-t border-[#164E87] pt-6" data-testid={`why-item-${i + 1}`}>
                <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#8FB8DF]">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
