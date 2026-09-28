import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { Reveal, SectionLabel } from "@/components/Reveal";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const SERVICES_DETAIL = [
  {
    id: "dark-fiber",
    number: "01",
    name: "Dark Fiber",
    headline: "Your fiber. Your equipment. Your network.",
    description:
      "Dedicated fiber infrastructure that gives organizations direct control over capacity, transmission equipment and network architecture.",
    detail:
      "Dark Fiber provides the physical foundation for organizations that require scalable bandwidth, predictable performance and greater flexibility over their network infrastructure.",
    cta: "Explore Dark Fiber",
    href: "/services/dark-fiber",
    image: "/images/services/dark-fiber-hero.jpg",
    imageAlt: "Fiber optic cable reels deployed along a metropolitan street",
  },
  {
    id: "custom-network-infrastructure",
    number: "02",
    name: "Custom Network Infrastructure",
    headline: "Infrastructure designed around your requirements.",
    description:
      "Purpose-built fiber infrastructure engineered around specific topology, routing, capacity, redundancy and operational requirements.",
    detail:
      "From metropolitan connectivity to data center interconnection and private network infrastructure, AMIFIBER works with customers to develop infrastructure aligned with their network strategy.",
    cta: "Explore Custom Network Infrastructure",
    href: "/services/custom-network-infrastructure",
    image: "/images/services/custom-tech-hero.jpg",
    imageAlt: "Network technician working on fiber distribution infrastructure",
  },
];

export default function ServicesOverview() {
  return (
    <main>
      <Seo
        title="Fiber Infrastructure Services | AMIFIBER"
        description="Explore AMIFIBER fiber infrastructure services including Dark Fiber and Custom Network Infrastructure for critical digital networks across Southeast Asia."
        path="/services"
        breadcrumbs={CRUMBS}
      />

      <PageHero
        image="/images/services/services-hero.jpg"
        imageAlt="Fiber optic infrastructure across a Southeast Asian metropolitan network"
        eyebrow="Our Services"
        title={
          <>
            Infrastructure built for
            <br />
            mission-critical connectivity.
          </>
        }
        description="AMIFIBER delivers high-capacity fiber infrastructure that enables data centers, carriers, cloud platforms, ISPs and enterprises to build, scale and operate their networks with confidence."
        crumbs={CRUMBS}
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>What We Provide</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[52px]">
              Infrastructure designed
              <br />
              around your network.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-brand-slate sm:text-lg">
              Every network has different requirements for capacity, topology, redundancy and growth. AMIFIBER provides
              infrastructure solutions designed to give organizations greater control over how their critical networks
              are built and operated.
            </p>
          </Reveal>

          <div className="mt-16 lg:mt-20">
            {SERVICES_DETAIL.map((s) => (
              <Reveal key={s.id}>
                <article
                  data-testid={`services-page-block-${s.id}`}
                  className="grid gap-10 border-t border-brand-line py-14 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-20"
                >
                  <div className="lg:col-span-6">
                    <span className="font-display text-sm font-bold tracking-[0.2em] text-brand-net">{s.number}</span>
                    <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-brand-ink sm:text-3xl">
                      {s.name}
                    </h3>
                    <p className="mt-5 font-display text-xl font-bold text-brand-deep sm:text-2xl">{s.headline}</p>
                    <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-lg">{s.description}</p>
                    <p className="mt-4 text-base leading-relaxed text-brand-slate sm:text-lg">{s.detail}</p>
                    <Link
                      to={s.href}
                      data-testid={`services-page-cta-${s.id}`}
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-deep"
                    >
                      {s.cta}
                      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div className="group overflow-hidden lg:col-span-6">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      width="1200"
                      height="800"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
            <div className="border-t border-brand-line" aria-hidden="true" />
          </div>
        </div>
      </section>

      <CTABand
        title={
          <>
            Build your next
            <br />
            connection.
          </>
        }
        copy="Talk to our infrastructure team about your network, capacity and connectivity requirements."
        ctaLabel="Talk to Our Team"
        to="/#contact"
        testId="services-overview-cta"
      />
    </main>
  );
}
