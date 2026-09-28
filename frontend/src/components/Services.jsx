import { ArrowRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { SERVICES } from "@/data/content";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionLabel>What We Provide</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]">
            Fiber infrastructure.
            <br />
            Built around your network.
          </h2>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id}>
              <article
                data-testid={`service-row-${s.id}`}
                className="grid gap-10 border-t border-brand-line py-14 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20"
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <span className="font-display text-sm font-bold tracking-[0.2em] text-brand-net">{s.number}</span>
                  <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-brand-ink sm:text-3xl lg:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-brand-slate sm:text-lg">{s.description}</p>
                  {s.idealFor && s.idealFor.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">Ideal for</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.idealFor.map((t) => (
                          <li
                            key={t}
                            className="border border-brand-line bg-brand-mist px-3 py-1.5 text-xs font-medium text-brand-deep"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a
                    href="#contact"
                    data-testid={`service-cta-${s.id}`}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-deep"
                  >
                    {s.cta}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="group overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      width="1200"
                      height="800"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
