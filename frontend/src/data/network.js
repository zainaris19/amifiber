// Network statistics — editable content configuration.
// Do not add values that have not been verified by the business.
export const STATS = [
  { id: "countries", value: 4, suffix: "", unit: "", label: "Countries" },
  { id: "km-service", value: 350, suffix: "+", unit: "KM", label: "On Service" },
  { id: "km-planned", value: 2300, suffix: "", unit: "KM", label: "Planned Build" },
  { id: "data-centers", value: 50, suffix: "+", unit: "", label: "Data Centers" },
  { id: "pops", value: 100, suffix: "+", unit: "", label: "Points of Presence" },
];

// Map geometry: viewBox 0 0 1000 720 — x = (lon − 92) × 20, y = (24 − lat) × 20.
// Add or move nodes here; routes reference location ids.
export const MAP_LOCATIONS = [
  { id: "jakarta", name: "Jakarta", x: 297, y: 604, hub: true, label: { dx: 0, dy: 30, anchor: "middle" } },
  { id: "singapore", name: "Singapore", x: 236, y: 453, hub: true, label: { dx: 15, dy: 4, anchor: "start" } },
  { id: "kuala-lumpur", name: "Kuala Lumpur", x: 194, y: 417, label: { dx: -15, dy: 4, anchor: "end" } },
  { id: "bangkok", name: "Bangkok", x: 170, y: 205, label: { dx: -15, dy: 4, anchor: "end" } },
];

// status: "live" | "planned" — bend offsets the curve perpendicular to the path.
// `to` accepts a location id or a raw { x, y } point (terminal: true renders no node).
export const MAP_ROUTES = [
  { id: "jakarta-singapore", from: "jakarta", to: "singapore", status: "live", bend: 30, pulses: 2 },
  { id: "singapore-kuala-lumpur", from: "singapore", to: "kuala-lumpur", status: "live", bend: -8, pulses: 1 },
  { id: "kuala-lumpur-bangkok", from: "kuala-lumpur", to: "bangkok", status: "planned", bend: 16 },
  { id: "java-corridor", from: "jakarta", to: { x: 446, y: 642 }, status: "planned", bend: -10, terminal: true },
];
