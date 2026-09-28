export const COMPANY = {
  name: "AMIFIBER",
  tagline: "Providing the Backbone of Digital Connectivity.",
  description: "Fiber infrastructure connecting the digital ecosystem across Southeast Asia.",
  trustLine: "Built for mission-critical digital infrastructure.",
  email: "info@amifiber.com", // Update with the company's public inbox
  linkedin: "https://www.linkedin.com/company/amifiber", // Update with the company's LinkedIn URL
  copyright: "© 2026 AMIFIBER. All rights reserved.",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Network", to: "/#network" },
  { label: "Services", to: "/services" }, // rendered as dropdown trigger on desktop
  { label: "Solutions", to: "/#solutions" },
  { label: "Industries", to: "/#industries" },
  { label: "About", to: "/#about" },
];

export const SERVICES_NAV = [
  {
    id: "dark-fiber",
    number: "01",
    name: "Dark Fiber",
    description: "Dedicated fiber infrastructure with full control and scalability.",
    path: "/services/dark-fiber",
    icon: "cable",
  },
  {
    id: "custom-network-infrastructure",
    number: "02",
    name: "Custom Network Infrastructure",
    description: "Purpose-built fiber infrastructure tailored to specific network requirements.",
    path: "/services/custom-network-infrastructure",
    icon: "share",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "Network",
    links: [
      { label: "Network Coverage", to: "/#network" },
      { label: "Data Centers", to: "/#network" },
      { label: "Points of Presence", to: "/#network" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Dark Fiber", to: "/services/dark-fiber" },
      { label: "Data Center Interconnection", to: "/#services" },
      { label: "International Connectivity", to: "/#solutions" },
      { label: "Custom Infrastructure", to: "/services/custom-network-infrastructure" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/#about" },
      { label: "Contact", to: "/#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: COMPANY.linkedin, external: true },
      { label: "Email", href: `mailto:${COMPANY.email}` },
      { label: "Contact", to: "/#contact" },
    ],
  },
];
