import { Reveal } from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-24 lg:py-32" data-testid="final-cta">
      <div className="fiber-pattern absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let&rsquo;s build your
            <br />
            next connection.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Talk to our infrastructure team about your network, capacity and connectivity requirements.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              data-testid="final-cta-contact-button"
              className="inline-flex h-12 items-center justify-center bg-white px-8 text-sm font-semibold text-brand-blue transition-transform duration-200 hover:-translate-y-0.5"
            >
              Talk to Our Team
            </a>
            <a
              href="#network"
              data-testid="final-cta-network-button"
              className="inline-flex h-12 items-center justify-center border border-white/60 px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Explore Our Network
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
