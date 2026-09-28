// ---------------------------------------------------------------------------
// GIS DATA — single source of truth for the /network map.
// Coordinates are APPROXIMATE and stored here deliberately so they can be
// corrected at any time without touching page design or logic.
// Structure: locations { id: { coords: [lon, lat], label, shortLabel?, type, country } }
// type: "hub" (major hub) | "pop" (PoP / city node) | "dc" (data center / PoP) | "cls" (cable landing station)
// routes: { id, countries: [ids], kind: "terrestrial" | "metro" | "submarine", status: "active" | "planned", name, type, points: [location ids] }
// ---------------------------------------------------------------------------

export const NETWORK_LOCATIONS = {
  bangkok: { coords: [100.5018, 13.7563], label: "Bangkok", type: "hub", country: "th" },
  chonburi: { coords: [100.9867, 13.3611], label: "Chonburi", type: "pop", country: "th" },
  rayong: { coords: [101.0311, 12.658], label: "Rayong", type: "pop", country: "th" },
  satun: { coords: [99.8742, 6.623], label: "Satun CLS", type: "cls", country: "th" },

  "northern-my": { coords: [100.7, 6.12], label: "Northern Malaysia", type: "pop", country: "my" },
  "kuala-lumpur": { coords: [101.6869, 3.139], label: "Kuala Lumpur", type: "hub", country: "my" },
  cyberjaya: { coords: [101.6566, 2.9208], label: "Cyberjaya", type: "pop", country: "my" },
  "johor-bahru": { coords: [103.7569, 1.4927], label: "Johor Bahru", type: "pop", country: "my" },

  "equinix-sg1": { coords: [103.786, 1.2956], label: "Equinix SG1", shortLabel: "SG1", type: "dc", country: "sg" },
  "equinix-sg2": { coords: [103.741, 1.333], label: "Equinix SG2", shortLabel: "SG2", type: "dc", country: "sg" },
  "equinix-sg3": { coords: [103.9303, 1.3241], label: "Equinix SG3", shortLabel: "SG3", type: "dc", country: "sg" },
  "1net-east": { coords: [103.9639, 1.3521], label: "1-Net East", shortLabel: "1-NET E", type: "dc", country: "sg" },
  "1net-north": { coords: [103.84, 1.39], label: "1-Net North", shortLabel: "1-NET N", type: "dc", country: "sg" },
  "global-switch": { coords: [103.8906, 1.3397], label: "Global Switch", shortLabel: "GS", type: "dc", country: "sg" },
  "racks-central": { coords: [103.987, 1.3436], label: "Racks Central", shortLabel: "RC", type: "dc", country: "sg" },

  jakarta: { coords: [106.8451, -6.2088], label: "Jakarta", type: "hub", country: "id" },
  anyer: { coords: [105.7168, -6.0792], label: "Anyer CLS", type: "cls", country: "id" },
  kalianda: { coords: [105.766, -5.934], label: "Kalianda CLS", type: "cls", country: "id" },
  lampung: { coords: [105.2668, -5.4515], label: "Lampung", type: "pop", country: "id" },
  dumai: { coords: [101.4949, 1.6685], label: "Dumai", type: "pop", country: "id" },
  aceh: { coords: [95.3192, 5.5483], label: "Aceh", type: "pop", country: "id" },

  "east-java": { coords: [114.3, -8.1], label: "", type: "pop", country: "id" },
};

export const NETWORK_ROUTES = [
  { id: "th-bkk-cbi", countries: ["th"], kind: "terrestrial", status: "active", name: "Bangkok – Chonburi", type: "Terrestrial Backbone", points: ["bangkok", "chonburi"] },
  { id: "th-cbi-ryg", countries: ["th"], kind: "terrestrial", status: "active", name: "Chonburi – Rayong", type: "Terrestrial Backbone", points: ["chonburi", "rayong"] },

  { id: "my-nsc", countries: ["my"], kind: "terrestrial", status: "active", name: "Malaysia North–South Corridor", type: "Terrestrial Dark Fiber Backbone", points: ["northern-my", "kuala-lumpur", "cyberjaya", "johor-bahru"] },

  { id: "sg-sg2-sg1", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG2 ↔ Equinix SG1", type: "Metro Fiber", points: ["equinix-sg2", "equinix-sg1"] },
  { id: "sg-sg1-1nn", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG1 ↔ 1-Net North", type: "Metro Fiber", points: ["equinix-sg1", "1net-north"] },
  { id: "sg-1nn-gs", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — 1-Net North ↔ Global Switch", type: "Metro Fiber", points: ["1net-north", "global-switch"] },
  { id: "sg-gs-sg3", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Global Switch ↔ Equinix SG3", type: "Metro Fiber", points: ["global-switch", "equinix-sg3"] },
  { id: "sg-sg3-rc", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG3 ↔ Racks Central", type: "Metro Fiber", points: ["equinix-sg3", "racks-central"] },
  { id: "sg-sg3-1ne", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — Equinix SG3 ↔ 1-Net East", type: "Metro Fiber", points: ["equinix-sg3", "1net-east"] },
  { id: "sg-1ne-rc", countries: ["sg"], kind: "metro", status: "active", name: "Metro Link — 1-Net East ↔ Racks Central", type: "Metro Fiber", points: ["1net-east", "racks-central"] },

  { id: "id-jkt-anyer", countries: ["id"], kind: "terrestrial", status: "active", name: "Jakarta – Anyer Fiber Backbone", type: "Terrestrial Backbone", points: ["jakarta", "anyer"] },
  { id: "id-subsea", countries: ["id"], kind: "submarine", status: "active", name: "Anyer – Kalianda Subsea Cable", type: "Submarine Cable", points: ["anyer", "kalianda"] },
  { id: "id-sumatra", countries: ["id"], kind: "terrestrial", status: "active", name: "Kalianda – Dumai – Aceh Backbone", type: "Terrestrial Dark Fiber Backbone", points: ["kalianda", "lampung", "dumai", "aceh"] },

  { id: "planned-kl-bkk", countries: ["my", "th"], kind: "terrestrial", status: "planned", name: "Kuala Lumpur – Bangkok Corridor", type: "Planned Terrestrial Corridor", points: ["kuala-lumpur", "bangkok"] },
  { id: "planned-java", countries: ["id"], kind: "terrestrial", status: "planned", name: "Java North Corridor", type: "Planned Terrestrial Corridor", points: ["jakarta", "east-java"] },
];

// fitBounds: [ [west, south], [east, north] ]
export const COUNTRY_BOUNDS = {
  th: [
    [98.9, 5.9],
    [101.9, 14.3],
  ],
  my: [
    [100.2, 1.0],
    [104.2, 6.6],
  ],
  sg: [
    [103.7, 1.25],
    [104.02, 1.43],
  ],
  id: [
    [94.9, -6.8],
    [107.4, 6.3],
  ],
};

export const OVERALL_BOUNDS = [
  [94.9, -7.2],
  [107.6, 14.4],
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
          status: l.type === "cls" || l.type === "dc" ? "Active" : "Active Network",
        },
        geometry: { type: "Point", coordinates: l.coords },
      })),
  };
}
