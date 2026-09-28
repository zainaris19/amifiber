import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export default function CTABand({ title, copy, ctaLabel, to, testId }) {
  return (
    <section className="relative overflow-hidden bg-brand-deep py-20 lg:py-28" data-testid={testId || "cta-band"}>
      <div className="fiber-pattern absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{copy}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <Link
            to={to}
            data-testid={testId ? `${testId}-button` : "cta-band-button"}
            className="group mt-9 inline-flex h-12 items-center bg-white px-8 text-sm font-semibold text-brand-blue transition-transform duration-200 hover:-translate-y-0.5"
          >
            {ctaLabel}
            <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
