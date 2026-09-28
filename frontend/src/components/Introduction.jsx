import { Reveal, SectionLabel } from "./Reveal";

export default function Introduction() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-4">
          <SectionLabel>The Infrastructure Behind Connectivity</SectionLabel>
          <div className="mt-8 hidden h-24 w-px bg-brand-blue lg:block" aria-hidden="true" />
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[56px]">
              Built to move
              <br />
              the digital world.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              Digital services depend on physical infrastructure. AMIFIBER builds high-capacity fiber networks designed
              to connect the infrastructure behind today&rsquo;s digital economy — from data centers and carriers to
              cloud platforms, content providers and enterprises.
            </p>
            <p className="mt-8 max-w-2xl border-l-2 border-brand-blue pl-5 font-display text-base font-semibold text-brand-deep sm:text-lg">
              Our infrastructure is engineered for scale, resilience and long-term network growth.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
