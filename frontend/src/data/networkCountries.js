// ---------------------------------------------------------------------------
// NETWORK FOOTPRINT MAP CONFIGURATION
// One entry per market. To expand to a new country (e.g. Vietnam, Cambodia,
// Philippines), add an entry here — map, selector and detail panel update
// automatically. Content for each country lives in src/data/networkPage.js
// (matched via contentId).
// bounds: [ [west, south], [east, north] ] used for the smooth map fly-to.
// ---------------------------------------------------------------------------
export const NETWORK_COUNTRIES = [
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    status: "Active Network",
    color: "#0067C5",
    contentId: "thailand",
    bounds: [
      [98.0, 5.5],
      [102.3, 20.8],
    ],
  },
  {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    status: "Active Network",
    color: "#0067C5",
    contentId: "malaysia",
    bounds: [
      [100.0, 0.9],
      [104.4, 6.8],
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    status: "Active Network",
    color: "#0067C5",
    contentId: "singapore",
    bounds: [
      [103.65, 1.15],
      [104.05, 1.48],
    ],
  },
  {
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    status: "Active Network",
    color: "#0067C5",
    contentId: "indonesia",
    bounds: [
      [94.9, -6.9],
      [107.5, 6.4],
    ],
  },
];

// GIS visual palette
export const MAP_STYLE = {
  ocean: "#F5F8FA",
  otherLand: "#F0F3F5",
  marketLand: "#E6EBEF",
  hover: "#D5E9F8",
  selected: "#0067C5",
  borders: "#CBD5DD",
};

export const OVERALL_BOUNDS = [
  [94.6, -8.2],
  [110.8, 22.2],
];
