import { Link } from "react-router-dom";
import { ArrowRight, Server, ArrowUpCircle, SlidersHorizontal, RefreshCw } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import NextService from "@/components/NextService";
import FlowDiagram from "@/components/FlowDiagram";
import RouteDiversityDiagram from "@/components/RouteDiversityDiagram";
import { Reveal, SectionLabel } from "@/components/Reveal";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Dark Fiber", path: "/services/dark-fiber" },
];

const BENEFITS = [
  {
    icon: Server,
    title: "Dedicated Infrastructure",
    description: "Dedicated physical fiber infrastructure designed for private network use.",
  },
  {
    icon: ArrowUpCircle,
    title: "Scalable Capacity",
    description: "Increase network capacity by upgrading transmission equipment without replacing the underlying fiber infrastructure.",
  },
  {
    icon: SlidersHorizontal,
    title: "Network Control",
    description: "Maintain greater control over transmission technology, capacity planning and network architecture.",
  },
  {
    icon: RefreshCw,
    title: "Long-Term Flexibility",
    description: "Build infrastructure capable of supporting changing bandwidth and technology requirements over time.",
  },
];

const IDEAL_FOR = [
  {
    title: "Data Center Operators",
    description: "Dedicated fiber connectivity between strategic data center facilities and network ecosystems.",
    image: "/images/service-dci.jpg",
    imageAlt: "Data center corridor",
  },
  {
    title: "Carriers & ISPs",
    description: "Physical backbone infrastructure supporting high-capacity carrier and ISP networks.",
    image: "/images/infrastructure-band.jpg",
    imageAlt: "Carrier network hall",
  },
  {
    title: "Cloud & Content Providers",
    description: "Dedicated infrastructure supporting high-capacity connectivity between cloud, edge and content infrastructure.",
    image: "/images/services/jakarta-night.jpg",
    imageAlt: "Southeast Asian metropolitan skyline at night",
  },
  {
    title: "Enterprises",
    description: "Private fiber infrastructure supporting critical applications, data replication and enterprise network requirements.",
    image: "/images/services/jakarta-aerial.jpg",
    imageAlt: "Aerial view of a business district",
  },
  {
    title: "Data Center Interconnection",
    description: "High-capacity physical infrastructure connecting multiple data center locations.",
    image: "/images/service-dark-fiber.jpg",
    imageAlt: "Illuminated fiber optic cables",
  },
];

const FLOW_STAGES = [
  { title: "Customer Location / Data Center A" },
  { title: "Customer Transmission Equipment" },
  { title: "AMIFIBER Dark Fiber" },
  { title: "Customer Transmission Equipment" },
  { title: "Data Center / Location B" },
];

export default function DarkFiber() {
  return (
    <main>
      <Seo
        title="Dark Fiber Infrastructure | AMIFIBER"
        description="Dedicated dark fiber infrastructure for data centers, carriers, ISPs, cloud providers and enterprises requiring scalable, high-capacity network connectivity."
        path="/services/dark-fiber"
        breadcrumbs={CRUMBS}
      />

      <PageHero
        image="/images/services/dark-fiber-hero.jpg"
        imageAlt="Fiber optic cable reels staged for metropolitan deployment"
        eyebrow="AMIFIBER Dark Fiber"
        title="Dark Fiber"
        crumbs={CRUMBS}
      >
        <div className="max-w-2xl">
          <p className="font-display text-xl font-semibold text-white sm:text-2xl">
            Dedicated fiber infrastructure.
            <br />
            Complete control over your network.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            AMIFIBER provides dedicated dark fiber infrastructure for organizations that require greater control,
            scalability and flexibility over their network architecture. With dedicated fiber routes, customers can
            deploy their own transmission equipment and scale network capacity according to their requirements.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/#contact"
              data-testid="dark-fiber-hero-primary-cta"
              className="inline-flex h-12 items-center justify-center bg-brand-blue px-8 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand-net"
            >
              Talk to Our Infrastructure Team
            </Link>
            <Link
              to="/#contact"
              data-testid="dark-fiber-hero-secondary-cta"
              className="group inline-flex h-12 items-center justify-center border border-white/50 px-8 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Discuss Your Network
              <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </PageHero>

      {/* Overview */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Overview</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
                Complete control over
                <br />
                your infrastructure.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-brand-slate sm:text-lg">
                <p>
                  Traditional managed connectivity often limits how much control organizations have over capacity and
                  network architecture.
                </p>
                <p>
                  Dark Fiber provides dedicated physical fiber infrastructure while allowing customers to operate their
                  own optical transmission equipment.
                </p>
                <p>
                  This gives network operators greater flexibility to determine capacity, technology and network
                  architecture according to their requirements.
                </p>
                <p className="border-l-2 border-brand-blue pl-5 font-display font-semibold text-brand-deep">
                  AMIFIBER provides the physical fiber infrastructure while customers maintain control over how the
                  network is utilized.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="group overflow-hidden">
              <img
                src="/images/services/dark-fiber-trench.jpg"
                alt="Underground fiber optic cable installation along a metropolitan street"
                loading="lazy"
                width="1200"
                height="800"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Dark Fiber */}
      <section className="bg-brand-mist py-24 lg:py-32" data-testid="dark-fiber-benefits">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Why Dark Fiber</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              Infrastructure that grows
              <br />
              with your network.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={Math.min(i * 0.07, 0.3)}>
                <div className="border-t border-brand-line pt-7" data-testid={`dark-fiber-benefit-${i + 1}`}>
                  <b.icon size={30} strokeWidth={1.5} className="text-brand-blue" aria-hidden="true" />
                  <p className="mt-5 text-xs font-bold tracking-[0.18em] text-brand-net">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-lg font-extrabold tracking-tight text-brand-ink">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diagram */}
      <section className="bg-white py-24 lg:py-32" data-testid="dark-fiber-diagram-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel>How It Works</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
                Your equipment.
                <br />
                Our fiber infrastructure.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
                AMIFIBER provides the physical fiber path while customers deploy and manage the transmission equipment
                operating across the infrastructure.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mt-16 border border-brand-line bg-white p-8 lg:p-14">
              <FlowDiagram stages={FLOW_STAGES} highlightIndex={2} testPrefix="dark-fiber" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ideal For */}
      <section className="bg-[#F4F8FC] py-24 lg:py-32" data-testid="dark-fiber-ideal-for">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Ideal For</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              Designed for critical
              <br />
              digital infrastructure.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-5">
            {IDEAL_FOR.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <div className="flex h-full flex-col" data-testid={`dark-fiber-ideal-${i + 1}`}>
                  <div className="group overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      width="600"
                      height="450"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-brand-slate sm:text-sm">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resilience */}
      <section className="bg-white py-24 lg:py-32" data-testid="dark-fiber-resilience">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel>Resilience</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
                Designed with network
                <br />
                resilience in mind.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-brand-slate sm:text-lg">
                <p>Critical infrastructure often requires more than a single physical path.</p>
                <p>
                  Where available and required, AMIFIBER can design infrastructure using diverse physical routes to
                  support network resilience and continuity requirements.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mt-14 border border-brand-line bg-brand-mist p-4 sm:p-8 lg:p-12">
              <RouteDiversityDiagram />
              <p className="mt-6 border-t border-brand-line pt-5 text-xs leading-relaxed text-brand-faint sm:text-sm">
                Diverse routing is designed on a per-project basis and is subject to physical route availability.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title={
          <>
            Build your dedicated
            <br />
            fiber infrastructure.
          </>
        }
        copy="Talk to our infrastructure team about your locations, route requirements, capacity strategy and network architecture."
        ctaLabel="Talk to Our Team"
        to="/#contact"
        testId="dark-fiber-cta"
      />

      <NextService
        eyebrow="Explore Other Services"
        label="Next Service"
        title="Custom Network Infrastructure"
        to="/services/custom-network-infrastructure"
        image="/images/services/custom-tech-hero.jpg"
        imageAlt="Network technician working on fiber distribution infrastructure"
      />
    </main>
  );
}
