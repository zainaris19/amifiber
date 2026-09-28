// ---------------------------------------------------------------------------
// GIS DATA — single source of truth for the /network maps.
// Route topology follows AMIFIBER's official regional network map
// (Mae Chan, Hanoi, Da Nang, Ho Chi Minh, Bangkok, Chonburi, TH–MY Border,
// Chering, Kuala Lumpur, Johor Baru, Singapore, Batam, Sumatera, Lampung,
// Jakarta, Aceh) plus the company's CLS corridor data
// (Jakarta – Anyer CLS – Kalianda CLS – Lampung – Dumai – Aceh).
// Coordinates are APPROXIMATE and stored here deliberately so they can be
// corrected at any time without touching page design or logic.
// type: "hub" (major hub) | "pop" (PoP / city node) | "dc" (data center / PoP) | "cls" (cable landing station)
// ---------------------------------------------------------------------------

export const NETWORK_LOCATIONS = {
  "mae-chan": { coords: [99.852, 20.096], label: "Mae Chan", type: "hub", country: "th" },
  hanoi: { coords: [105.834, 21.028], label: "Hanoi", type: "hub", country: "vn" },
  "da-nang": { coords: [108.221, 16.054], label: "Da Nang", type: "pop", country: "vn" },
  "ho-chi-minh": { coords: [106.663, 10.762], label: "Ho Chi Minh", type: "hub", country: "vn" },

  bangkok: { coords: [100.5018, 13.7563], label: "Bangkok", type: "hub", country: "th" },
  chonburi: { coords: [100.9867, 13.3611], label: "Chonburi", type: "pop", country: "th" },
  rayong: { coords: [101.0311, 12.658], label: "Rayong", type: "pop", country: "th" },
  satun: { coords: [99.8742, 6.623], label: "Satun CLS", type: "cls", country: "th" },
  "th-my-border": { coords: [100.95, 6.45], label: "TH–MY Border", type: "pop", country: "th" },

  chering: { coords: [103.156, 3.866], label: "Chering", type: "pop", country: "my" },
  "kuala-lumpur": { coords: [101.6869, 3.139], label: "Kuala Lumpur", type: "hub", country: "my" },
  cyberjaya: { coords: [101.6566, 2.9208], label: "Cyberjaya", type: "pop", country: "my" },
  "johor-bahru": { coords: [103.7569, 1.4927], label: "Johor Baru", type: "pop", country: "my" },

  singapore: { coords: [103.82, 1.352], label: "Singapore", shortLabel: "SG", type: "hub", country: "sg" },
  "equinix-sg1": { coords: [103.786, 1.2956], label: "Equinix SG1", shortLabel: "SG1", type: "dc", country: "sg" },
  "equinix-sg2": { coords: [103.741, 1.333], label: "Equinix SG2", shortLabel: "SG2", type: "dc", country: "sg" },
  "equinix-sg3": { coords: [103.9303, 1.3241], label: "Equinix SG3", shortLabel: "SG3", type: "dc", country: "sg" },
  "1net-east": { coords: [103.9639, 1.3521], label: "1-Net East", shortLabel: "1-NET E", type: "dc", country: "sg" },
  "1net-north": { coords: [103.84, 1.39], label: "1-Net North", shortLabel: "1-NET N", type: "dc", country: "sg" },
  "global-switch": { coords: [103.8906, 1.3397], label: "Global Switch", shortLabel: "GS", type: "dc", country: "sg" },
  "racks-central": { coords: [103.987, 1.3436], label: "Racks Central", shortLabel: "RC", type: "dc", country: "sg" },

  batam: { coords: [104.0308, 1.083], label: "Batam", type: "pop", country: "id" },
  sumatera: { coords: [102.0, -0.6], label: "Sumatera", type: "pop", country: "id" },
  jakarta: { coords: [106.8451, -6.2088], label: "Jakarta", type: "hub", country: "id" },
  lampung: { coords: [105.2668, -5.4515], label: "Lampung", type: "hub", country: "id" },
  anyer: { coords: [105.7168, -6.0792], label: "Anyer CLS", type: "cls", country: "id" },
  kalianda: { coords: [105.766, -5.934], label: "Kalianda CLS", type: "cls", country: "id" },
  dumai: { coords: [101.4949, 1.6685], label: "Dumai", type: "pop", country: "id" },
  aceh: { coords: [95.3192, 5.5483], label: "Aceh", type: "pop", country: "id" },
};

export const NETWORK_ROUTES = [
  // diagram: which country's static SVG diagram the route appears in
  // (cross-border trunks may be omitted from small diagrams; all routes
  // always render on the interactive map).

  // Northern Thailand & Indochina corridor
  { id: "r-mae-chan-bangkok", countries: ["th"], diagram: "th", kind: "terrestrial", status: "active", name: "Mae Chan – Bangkok", type: "Terrestrial Backbone", points: ["mae-chan", "bangkok"] },
  { id: "r-bangkok-hanoi", countries: ["th", "vn"], kind: "terrestrial", status: "active", name: "Bangkok – Hanoi", type: "Terrestrial Backbone", points: ["bangkok", "hanoi"] },
  { id: "r-hanoi-danang", countries: ["vn"], kind: "terrestrial", status: "active", name: "Hanoi – Da Nang", type: "Terrestrial Backbone", points: ["hanoi", "da-nang"] },
  { id: "r-danang-hcm", countries: ["vn"], kind: "terrestrial", status: "active", name: "Da Nang – Ho Chi Minh", type: "Terrestrial Backbone", points: ["da-nang", "ho-chi-minh"] },
  { id: "r-hcm-bangkok", countries: ["vn", "th"], kind: "terrestrial", status: "active", name: "Ho Chi Minh – Bangkok", type: "Terrestrial Backbone", points: ["ho-chi-minh", "bangkok"] },

  // Thailand
  { id: "th-bkk-cbi", countries: ["th"], diagram: "th", kind: "terrestrial", status: "active", name: "Bangkok – Chonburi (EEC Gateway)", type: "Terrestrial Backbone", points: ["bangkok", "chonburi"] },
  { id: "th-cbi-ryg", countries: ["th"], diagram: "th", kind: "terrestrial", status: "active", name: "Chonburi – Rayong", type: "Terrestrial Backbone", points: ["chonburi", "rayong"] },
  { id: "r-cbi-border", countries: ["th"], diagram: "th", kind: "terrestrial", status: "active", name: "Chonburi – Thailand–Malaysia Border", type: "Terrestrial Backbone", points: ["chonburi", "th-my-border"] },
  { id: "r-bangkok-chering", countries: ["th", "my"], kind: "terrestrial", status: "active", name: "Bangkok – Chering (East Coast)", type: "Terrestrial Backbone", points: ["bangkok", "chering"] },

  // Malaysia
  { id: "r-border-kl", countries: ["th", "my"], diagram: "my", kind: "terrestrial", status: "active", name: "Thailand–Malaysia Border – Kuala Lumpur", type: "Terrestrial Backbone", points: ["th-my-border", "kuala-lumpur"] },
  { id: "my-nsc", countries: ["my"], diagram: "my", kind: "terrestrial", status: "active", name: "Malaysia North–South Corridor", type: "Terrestrial Dark Fiber Backbone", points: ["kuala-lumpur", "cyberjaya", "johor-bahru"] },
  { id: "r-chering-jb", countries: ["my"], diagram: "my", kind: "terrestrial", status: "active", name: "Chering – Johor Baru", type: "Terrestrial Backbone", points: ["chering", "johor-bahru"] },

  // Singapore & Batam
  { id: "r-jb-singapore", countries: ["my", "sg"], diagram: "my", kind: "terrestrial", status: "active", name: "Johor Baru – Singapore", type: "Terrestrial Backbone", points: ["johor-bahru", "singapore"] },
  { id: "r-singapore-batam", countries: ["sg", "id"], diagram: "sg", kind: "submarine", status: "active", name: "Singapore – Batam", type: "Submarine Cable", points: ["singapore", "batam"] },
  { id: "sg-sg2-sg1", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG2 ↔ Equinix SG1", type: "Metro Fiber", points: ["equinix-sg2", "equinix-sg1"] },
  { id: "sg-sg1-1nn", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG1 ↔ 1-Net North", type: "Metro Fiber", points: ["equinix-sg1", "1net-north"] },
  { id: "sg-1nn-gs", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — 1-Net North ↔ Global Switch", type: "Metro Fiber", points: ["1net-north", "global-switch"] },
  { id: "sg-gs-sg3", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Global Switch ↔ Equinix SG3", type: "Metro Fiber", points: ["global-switch", "equinix-sg3"] },
  { id: "sg-sg3-rc", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG3 ↔ Racks Central", type: "Metro Fiber", points: ["equinix-sg3", "racks-central"] },
  { id: "sg-sg3-1ne", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG3 ↔ 1-Net East", type: "Metro Fiber", points: ["equinix-sg3", "1net-east"] },
  { id: "sg-1ne-rc", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — 1-Net East ↔ Racks Central", type: "Metro Fiber", points: ["1net-east", "racks-central"] },

  // Indonesia — regional backbone & CLS corridor
  { id: "r-batam-sumatera", countries: ["id"], diagram: "id", kind: "submarine", status: "active", name: "Batam – Sumatera", type: "Submarine Cable", points: ["batam", "sumatera"] },
  { id: "r-sumatera-aceh", countries: ["id"], diagram: "id", kind: "terrestrial", status: "active", name: "Sumatera – Aceh", type: "Terrestrial Backbone", points: ["sumatera", "aceh"] },
  { id: "r-sumatera-lampung", countries: ["id"], diagram: "id", kind: "terrestrial", status: "active", name: "Sumatera – Lampung", type: "Terrestrial Backbone", points: ["sumatera", "lampung"] },
  { id: "r-lampung-jakarta", countries: ["id"], diagram: "id", kind: "terrestrial", status: "active", name: "Lampung – Jakarta", type: "Terrestrial Backbone", points: ["lampung", "jakarta"] },
  { id: "id-jkt-anyer", countries: ["id"], diagram: "id", kind: "terrestrial", status: "active", name: "Jakarta – Anyer Fiber Backbone", type: "Terrestrial Backbone", points: ["jakarta", "anyer"] },
  { id: "id-subsea", countries: ["id"], diagram: "id", kind: "submarine", status: "active", name: "Anyer – Kalianda Subsea Cable", type: "Submarine Cable", points: ["anyer", "kalianda"] },
  { id: "id-sumatra", countries: ["id"], diagram: "id", kind: "terrestrial", status: "active", name: "Kalianda – Dumai – Aceh Backbone", type: "Terrestrial Dark Fiber Backbone", points: ["kalianda", "lampung", "dumai", "aceh"] },
];

// fitBounds: [ [west, south], [east, north] ]
export const COUNTRY_BOUNDS = {
  th: [
    [98.9, 5.9],
    [101.9, 20.6],
  ],
  my: [
    [100.2, 1.0],
    [104.2, 6.6],
  ],
  sg: [
    [103.68, 0.95],
    [104.15, 1.45],
  ],
  id: [
    [94.9, -6.8],
    [107.4, 6.3],
  ],
};

export const OVERALL_BOUNDS = [
  [94.6, -7.6],
  [109.4, 21.9],
];

export const COUNTRY_NAME_TO_CODE = { Thailand: "th", Malaysia: "my", Singapore: "sg", Indonesia: "id" };

export function routesAsGeoJSON(selectedCountry = "all") {
  return {
    type: "FeatureCollection",
    features: NETWORK_ROUTES.filter(
      (r) => selectedCountry === "all" || r.countries.includes(selectedCountry)
    ).map((r) => ({
      type: "Feature",
      properties: {
        id: r.id,
        name: r.name,
        type: r.type,
        kind: r.kind,
        status: r.status,
        countriesKey: r.countries.map((c) => `|${c}|`).join(""),
      },
      geometry: {
        type: "LineString",
        coordinates: r.points.map((p) => NETWORK_LOCATIONS[p].coords),
      },
    })),
  };
}

export function markersAsGeoJSON(selectedCountry = "all") {
  return {
    type: "FeatureCollection",
    features: Object.entries(NETWORK_LOCATIONS)
      .filter(([, l]) => l.label)
      .filter(([, l]) => selectedCountry === "all" || l.country === selectedCountry)
      .map(([id, l]) => ({
        type: "Feature",
        properties: {
          id,
          name: l.label,
          type: l.type,
          country: l.country,
          status: "Active Network",
        },
        geometry: { type: "Point", coordinates: l.coords },
      })),
  };
}
