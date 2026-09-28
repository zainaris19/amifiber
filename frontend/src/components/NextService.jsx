import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export default function NextService({ eyebrow, label, title, to, image, imageAlt }) {
  return (
    <section className="bg-white py-20 lg:py-28" data-testid="next-service">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
            <span className="h-px w-8 bg-brand-blue" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            to={to}
            data-testid="next-service-link"
            className="group mt-8 grid gap-8 border-t border-brand-line pt-10 lg:grid-cols-12 lg:items-center lg:gap-16"
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-faint">{label}</p>
              <p className="mt-4 flex items-center gap-4 font-display text-3xl font-extrabold tracking-tight text-brand-ink transition-colors duration-200 group-hover:text-brand-blue sm:text-4xl lg:text-5xl">
                {title}
                <ArrowRight size={30} className="shrink-0 text-brand-blue transition-transform duration-200 group-hover:translate-x-2" />
              </p>
            </div>
            <div className="overflow-hidden lg:col-span-5">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                width="960"
                height="640"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
