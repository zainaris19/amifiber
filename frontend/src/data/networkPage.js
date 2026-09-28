// ---------------------------------------------------------------------------
// /network page content — editable configuration.
// Only network information provided by the business is included here.
// ---------------------------------------------------------------------------
export const COUNTRIES = [
  {
    id: "thailand",
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    cardPhoto: "/images/network/bangkok.jpg",
    tagline: "Bangkok • EEC • Satun CLS",
    status: "Active Network",
    headline: "Connecting Bangkok to Thailand's eastern digital corridor.",
    description:
      "Strategic fiber infrastructure connecting Bangkok's data center hub through the Eastern Economic Corridor (EEC) to international submarine cable landing infrastructure.",
    routes: [
      {
        name: "Bangkok – Chonburi",
        tag: "EEC Gateway",
        description: "Primary backbone connecting Bangkok metropolitan infrastructure with the Eastern Economic Corridor.",
      },
      {
        name: "Chonburi – Rayong",
        description: "High-capacity route supporting industrial, data center and digital infrastructure zones across the EEC.",
      },
      {
        name: "Satun Cable Landing Station",
        description: "International connectivity infrastructure providing access to submarine cable ecosystems.",
      },
    ],
    highlights: [
      "Bangkok – Chonburi EEC backbone",
      "Chonburi – Rayong high-capacity corridor",
      "Cable Landing Station infrastructure at Satun supporting international connectivity",
    ],
    metrics: [
      { id: "th-km", value: 500, suffix: "+", unit: "KM", label: "Active Fiber" },
      { id: "th-loc", value: 4, suffix: "", unit: "", label: "Key Locations" },
    ],
    hubs: ["Bangkok", "Chonburi Tech Park", "Rayong", "Satun CLS"],
    planned: "Northern Thailand connectivity toward Mae Chan.",
    photo: { src: "/images/network/thailand-corridor.jpg", alt: "Industrial corridor and highway in Thailand's Eastern Economic Corridor" },
  },
  {
    id: "malaysia",
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    cardPhoto: "/images/network/kuala-lumpur.jpg",
    tagline: "Kuala Lumpur • Cyberjaya • Johor",
    status: "Active Network",
    headline: "A digital corridor across Peninsular Malaysia.",
    description:
      "A terrestrial dark fiber backbone following Malaysia's North–South corridor, forming a strategic inland connectivity route between northern aggregation points, the Klang Valley and southern Johor.",
    supporting:
      "The infrastructure is designed to provide high-capacity connectivity between Thailand interconnection points, Klang Valley data centers and southern Johor's data center and submarine cable ecosystems.",
    routes: [
      {
        name: "Malaysia North–South Corridor",
        description:
          "Terrestrial dark fiber backbone extending along the North–South corridor and connecting strategic digital infrastructure locations across Peninsular Malaysia.",
      },
    ],
    dci: ["Cyberjaya", "Kuala Lumpur", "Johor"],
    highlights: [
      "High-capacity North–South fiber backbone",
      "Connectivity into Klang Valley's core data center ecosystem",
      "Connectivity toward southern Johor's data center and submarine cable infrastructure",
    ],
    metrics: [
      { id: "my-km", value: 800, suffix: "+", unit: "KM", label: "Active Fiber" },
      { id: "my-hubs", value: 3, suffix: "", unit: "", label: "Key Hubs" },
    ],
    hubs: ["Kuala Lumpur", "Cyberjaya", "Johor Bahru"],
    planned: "East Malaysia connectivity.",
    photo: { src: "/images/network/malaysia-longhaul.jpg", alt: "Long-haul transport corridor from the air" },
  },
  {
    id: "singapore",
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    cardPhoto: "/images/network/singapore.jpg",
    tagline: "Data Center & Carrier Hub",
    status: "Active Network",
    headline: "Metro fiber built around Singapore's digital core.",
    description:
      "AMIFIBER's Singapore dark fiber corridor provides physically diverse metropolitan connectivity across key data center and carrier facilities.",
    supporting:
      "The infrastructure connects central exchange sites with eastern and western network nodes through a structured topology designed to support data center interconnection, cloud connectivity and carrier backhaul. The network is designed for scalable capacity, predictable performance and resilient metropolitan access.",
    dci: ["Equinix SG3", "Equinix SG1", "1-Net East", "Global Switch", "Racks Central", "1-Net North", "Equinix SG2"],
    highlights: [
      "Connectivity to 7+ strategic data center facilities",
      "Structured metropolitan topology supporting resilient access",
      "Connectivity across central, eastern and western network nodes",
    ],
    metrics: [
      { id: "sg-km", value: 300, suffix: "+", unit: "KM", label: "Metro Fiber" },
      { id: "sg-dc", value: 7, suffix: "+", unit: "", label: "Data Center Locations" },
    ],
    hubs: ["Equinix SG1", "Equinix SG2", "Equinix SG3", "Global Switch"],
    planned: "Additional submarine connectivity and regional capacity.",
    photo: { src: "/images/service-dci.jpg", alt: "Data center interconnection corridor in Singapore" },
  },
  {
    id: "indonesia",
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    cardPhoto: "/images/network/jakarta.jpg",
    tagline: "Jakarta • Anyer • Kalianda • Dumai",
    status: "Active Network",
    headline: "Connecting Java and Sumatra through terrestrial and subsea infrastructure.",
    description:
      "Comprehensive fiber infrastructure extending from Jakarta across western Java, through the Sunda Strait and into Sumatra using a combination of terrestrial and submarine connectivity.",
    supporting:
      "The backbone combines metropolitan, long-haul terrestrial and subsea infrastructure designed to provide scalable connectivity between major digital infrastructure locations across western Indonesia.",
    routes: [
      {
        name: "Jakarta – Anyer Fiber Backbone",
        description:
          "High-capacity terrestrial fiber infrastructure connecting Greater Jakarta with the Anyer Cable Landing Station. The corridor supports connectivity between metropolitan data centers and international submarine cable infrastructure through a strategic western Java route.",
        services: ["Dark Fiber", "Local Loop", "Managed Fiber Network", "Internet Services"],
      },
      {
        name: "Anyer – Kalianda Subsea Cable",
        description:
          "Strategic submarine fiber infrastructure connecting the Anyer Cable Landing Station in Java with the Kalianda Cable Landing Station in Sumatra. This subsea segment forms a critical inter-island corridor supporting high-capacity connectivity between Java and Sumatra.",
        services: ["Dark Fiber", "Submarine Cable Access", "Carrier Backhaul"],
      },
      {
        name: "Sumatra Dark Fiber Backbone — Kalianda – Dumai – Aceh",
        description:
          "High-capacity terrestrial fiber corridor extending from southern Sumatra toward northern Sumatra. The backbone is designed to support Data Center Interconnection, Carrier Backhaul, ISP Infrastructure, Enterprise Connectivity and Regional Digital Infrastructure.",
        services: ["Dark Fiber", "Local Loop", "Managed Fiber Network", "Internet Services"],
      },
    ],
    highlights: [
      "Jakarta – Anyer terrestrial backbone connecting metropolitan infrastructure to CLS Anyer",
      "Anyer – Kalianda submarine cable connecting Java and Sumatra",
      "Kalianda – Dumai – Aceh Sumatra backbone",
    ],
    metrics: [
      { id: "id-km", value: 2500, suffix: "+", unit: "KM", label: "Active Fiber" },
      { id: "id-hubs", value: 5, suffix: "+", unit: "", label: "Strategic Hubs" },
    ],
    hubs: ["Jakarta", "Anyer CLS", "Kalianda CLS", "Lampung", "Dumai"],
    planned: "Continued expansion toward northern Sumatra and Aceh.",
    photo: { src: "/images/network/indonesia-coastline.jpg", alt: "Coastline along the Sunda Strait region" },
  },
];

export const ECOSYSTEM_TARGETS = [
  "Data Centers",
  "Carriers",
  "Cloud",
  "International Gateways",
  "Content Networks",
  "Enterprises",
];
