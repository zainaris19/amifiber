import { useEffect, useRef } from "react";
import { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { NETWORK_COUNTRIES } from "@/data/networkCountries";

// Decorative center map for the regional infrastructure section — markets in
// light blue, context land in warm gray, country dots + labels. Non-interactive.
const MARKER_POS = {
  TH: [100.7, 15.8],
  MY: [101.95, 4.7],
  SG: [103.86, 1.36],
  ID: [107.8, -7.2],
};

export default function NetworkMiniMap() {
  const ref = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    const marketNames = NETWORK_COUNTRIES.map((c) => c.name);
    const NAME = ["coalesce", ["get", "name"], ["get", "NAME"], ["get", "name_en"], ["get", "NAME_EN"], ""];

    const map = new MapLibreMap({
      container: ref.current,
      interactive: false,
      attributionControl: { compact: true },
      style: {
        version: 8,
        sources: {
          demotiles: { type: "vector", url: "https://demotiles.maplibre.org/tiles/tiles.json" },
        },
        layers: [
          { id: "bg", type: "background", paint: { "background-color": "#FBFDFE" } },
          { id: "land-other", type: "fill", source: "demotiles", "source-layer": "countries", paint: { "fill-color": "#EAE8E4" } },
          { id: "land-market", type: "fill", source: "demotiles", "source-layer": "countries", filter: ["match", NAME, marketNames, true, false], paint: { "fill-color": "#B9D6F4" } },
          { id: "borders", type: "line", source: "demotiles", "source-layer": "countries", paint: { "line-color": "#D5D2CC", "line-width": 0.7 } },
        ],
      },
      center: [102.5, 4.8],
      zoom: 3.1,
    });
    mapRef.current = map;
    map.fitBounds(
      [
        [94.8, -9.2],
        [110.2, 20.6],
      ],
      { padding: 12, duration: 0 }
    );

    map.on("load", () => {
      NETWORK_COUNTRIES.forEach((c) => {
        const el = document.createElement("div");
        el.className = "map-country-marker";
        el.innerHTML = `<span class="mcm-dot" data-map-dot="${c.code}"></span><span class="mcm-label">${c.name.toUpperCase()}</span>`;
        new Marker({ element: el, anchor: "center" }).setLngLat(MARKER_POS[c.code]).addTo(map);
      });
      window.dispatchEvent(new Event("amifiber:minimap-ready"));
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={ref} className="h-full w-full" data-testid="network-mini-map" />;
}
