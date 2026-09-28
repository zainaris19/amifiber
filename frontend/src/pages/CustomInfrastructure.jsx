import { Link } from "react-router-dom";
import { ArrowRight, DraftingCompass, Route as RouteIcon, Building2, Gauge, HardHat } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import NextService from "@/components/NextService";
import ProcessFlow from "@/components/ProcessFlow";
import TopologyDiagram from "@/components/TopologyDiagram";
import { Reveal, SectionLabel } from "@/components/Reveal";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Custom Network Infrastructure", path: "/services/custom-network-infrastructure" },
];

const CAPABILITIES = [
  {
    icon: DraftingCompass,
    title: "Network Design",
    description: "Infrastructure planning based on customer locations, topology and connectivity requirements.",
  },
  {
    icon: RouteIcon,
    title: "Route Engineering",
    description: "Physical route planning designed around reach, resilience and infrastructure availability.",
  },
  {
    icon: Building2,
    title: "Data Center Interconnection",
    description: "Dedicated infrastructure connecting strategic data center facilities.",
  },
  {
    icon: Gauge,
    title: "Capacity Planning",
    description: "Infrastructure designed to accommodate current requirements and future network growth.",
  },
  {
    icon: HardHat,
    title: "Infrastructure Deployment",
    description: "Physical fiber infrastructure deployment coordinated around project and operational requirements.",
  },
];

const PROCESS = [
  { number: "01", title: "Discover", description: "Understand locations, network architecture, capacity and operational requirements." },
  { number: "02", title: "Design", description: "Develop topology, physical route and infrastructure architecture." },
  { number: "03", title: "Engineer", description: "Validate infrastructure feasibility and implementation requirements." },
  { number: "04", title: "Deploy", description: "Build and deliver the required fiber infrastructure." },
  { number: "05", title: "Operate & Support", description: "Provide ongoing infrastructure coordination and operational support according to the agreed service scope." },
];

const USE_CASES = [
  {
    title: "Metro & Regional Connectivity",
    description: "Custom fiber routes connecting strategic locations across metropolitan and regional networks.",
  },
  {
    title: "Data Center Interconnection",
    description: "High-capacity infrastructure connecting multiple data center facilities.",
  },
  {
    title: "Private Network Infrastructure",
    description: "Dedicated physical infrastructure supporting enterprise and private network environments.",
  },
  {
    title: "Carrier Infrastructure",
    description: "Physical network infrastructure supporting carrier expansion and backbone requirements.",
  },
  {
    title: "Cloud & Content Infrastructure",
    description: "High-capacity connectivity supporting cloud, CDN and digital platform infrastructure.",
  },
  {
    title: "International Gateway Connectivity",
    description: "Infrastructure connecting strategic network locations to international gateway ecosystems.",
  },
];

export default function CustomInfrastructure() {
  return (
    <main>
      <Seo
        title="Custom Network Infrastructure | AMIFIBER"
        description="Purpose-built fiber network infrastructure designed around topology, capacity, route diversity, data center and connectivity requirements."
        path="/services/custom-network-infrastructure"
        breadcrumbs={CRUMBS}
      />

      <PageHero
        image="/images/services/custom-tech-hero.jpg"
        imageAlt="Network technician working on fiber infrastructure"
        eyebrow="Custom Network Infrastructure"
        title={
          <>
            Infrastructure designed
            <br />
            around your network.
          </>
        }
        description="AMIFIBER designs and builds purpose-built fiber infrastructure aligned with specific topology, capacity, route diversity and connectivity requirements."
        crumbs={CRUMBS}
      >
        <Link
          to="/#contact"
          data-testid="custom-hero-cta"
          className="inline-flex h-12 items-center justify-center bg-brand-blue px-8 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand-net"
        >
          Discuss Your Network
        </Link>
      </PageHero>

      {/* Purpose-built */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel>Purpose-Built Infrastructure</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
                Your network requirements
                <br />
                should define the infrastructure.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-brand-slate sm:text-lg">
                <p>Not every network can be supported effectively by a standard connectivity product.</p>
                <p>
                  Different organizations have different requirements for physical routes, data center locations,
                  redundancy, capacity and network architecture.
                </p>
                <p className="border-l-2 border-brand-blue pl-5 font-display font-semibold text-brand-deep">
                  AMIFIBER works with customers to understand these requirements and develop fiber infrastructure
                  designed around their operational and technical objectives.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="group overflow-hidden">
              <img
                src="/images/service-custom-network.jpg"
                alt="High-density fiber optic patch panel with organized routing"
                loading="lazy"
                width="1200"
                height="800"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-brand-mist py-24 lg:py-32" data-testid="custom-capabilities">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Capabilities</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              From network concept
              <br />
              to physical infrastructure.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <div className="h-full border-t border-brand-line pt-7" data-testid={`custom-capability-${i + 1}`}>
                  <c.icon size={30} strokeWidth={1.5} className="text-brand-blue" aria-hidden="true" />
                  <p className="mt-5 text-xs font-bold tracking-[0.18em] text-brand-net">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-base font-extrabold tracking-tight text-brand-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24 lg:py-32" data-testid="custom-process">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>How We Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              An engineered engagement,
              <br />
              end to end.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-16 lg:mt-20">
              <ProcessFlow steps={PROCESS} testPrefix="custom" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-brand-mist py-24 lg:py-32" data-testid="custom-use-cases">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Built Around Your Network</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              Flexible infrastructure
              <br />
              for complex requirements.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px border border-brand-line bg-brand-line sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.title} delay={Math.min(i * 0.05, 0.3)} className="h-full">
                <div className="flex h-full flex-col bg-white p-8" data-testid={`custom-use-case-${i + 1}`}>
                  <span className="block h-0.5 w-8 bg-brand-blue" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-brand-ink">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-slate">{u.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Topology visualization */}
      <section className="bg-white py-24 lg:py-32" data-testid="custom-topology">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionLabel>Network Topology</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 border border-brand-line bg-white p-4 sm:p-8 lg:p-12">
              <TopologyDiagram />
              <p className="mt-8 border-t border-brand-line pt-5 text-xs leading-relaxed text-brand-faint sm:text-sm">
                Primary and diverse routing through AMIFIBER points of presence, with optional connections to cloud,
                carrier, international gateway and enterprise ecosystems.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title={
          <>
            Build a network designed
            <br />
            for your requirements.
          </>
        }
        copy="Discuss your network topology, capacity, locations and connectivity requirements with our infrastructure team."
        ctaLabel="Talk to Our Infrastructure Team"
        to="/#contact"
        testId="custom-cta"
      />

      <NextService
        eyebrow="Explore Other Services"
        label="Explore Service"
        title="Dark Fiber"
        to="/services/dark-fiber"
        image="/images/services/dark-fiber-hero.jpg"
        imageAlt="Fiber optic cable reels staged for metropolitan deployment"
      />
    </main>
  );
}
