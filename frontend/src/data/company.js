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
  { label: "Home", href: "#home" },
  { label: "Network", href: "#network" },
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Network",
    links: [
      { label: "Network Coverage", href: "#network" },
      { label: "Data Centers", href: "#network" },
      { label: "Points of Presence", href: "#network" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Dark Fiber", href: "#services" },
      { label: "Data Center Interconnection", href: "#services" },
      { label: "International Connectivity", href: "#solutions" },
      { label: "Custom Infrastructure", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: COMPANY.linkedin, external: true },
      { label: "Email", href: `mailto:${COMPANY.email}` },
      { label: "Contact", href: "#contact" },
    ],
  },
];
