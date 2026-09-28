import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";

export default function InfrastructureFeature() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} data-testid="infrastructure-feature" className="relative h-[80vh] min-h-[560px] overflow-hidden">
      <motion.img
        src="/images/infrastructure-band.jpg"
        alt="Carrier data hall with optical distribution infrastructure"
        loading="lazy"
        style={reduce ? undefined : { y }}
        className="absolute inset-0 h-[116%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-deep/60" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 sm:px-6 lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel light>Engineered for Scale</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Infrastructure built
              <br />
              beyond today&rsquo;s demand.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
              From metropolitan networks to regional connectivity, AMIFIBER infrastructure is designed to support
              continuously growing digital demand.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
