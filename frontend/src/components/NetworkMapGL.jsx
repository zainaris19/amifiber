import { useEffect, useRef } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_STYLE, NETWORK_COUNTRIES, OVERALL_BOUNDS } from "@/data/networkCountries";

// Interactive country footprint map. Country polygons only — no route lines,
// no pulses, no markers. Accurate cartography via MapLibre vector tiles.
const NAME_EXPR = ["coalesce", ["get", "name"], ["get", "NAME"], ["get", "name_en"], ["get", "NAME_EN"], ["get", "NAME_LOCAL"], ""];
const MARKET_BY_NAME = Object.fromEntries(NETWORK_COUNTRIES.map((c) => [c.name, c.code]));
const nameOf = (p) => p && (p.name || p.NAME || p.name_en || p.NAME_EN);

const noneFilter = ["==", NAME_EXPR, "__none__"];
const inList = (names) => ["match", NAME_EXPR, names, true, false];

export default function NetworkMapGL({ selectedCountry, onCountrySelect }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const selectedRef = useRef(selectedCountry);
  selectedRef.current = selectedCountry;
  const selectRef = useRef(onCountrySelect);
  selectRef.current = onCountrySelect;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const marketNames = NETWORK_COUNTRIES.map((c) => c.name);

    const map = new MapLibreMap({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          demotiles: { type: "vector", url: "https://demotiles.maplibre.org/tiles/tiles.json" },
        },
        layers: [
          { id: "bg", type: "background", paint: { "background-color": MAP_STYLE.ocean } },
          { id: "countries-base", type: "fill", source: "demotiles", "source-layer": "countries", paint: { "fill-color": MAP_STYLE.otherLand } },
          { id: "countries-market", type: "fill", source: "demotiles", "source-layer": "countries", filter: inList(marketNames), paint: { "fill-color": MAP_STYLE.marketLand } },
          { id: "countries-hover", type: "fill", source: "demotiles", "source-layer": "countries", filter: noneFilter, paint: { "fill-color": MAP_STYLE.hover } },
          { id: "countries-selected", type: "fill", source: "demotiles", "source-layer": "countries", filter: inList(marketNames), paint: { "fill-color": MAP_STYLE.selected } },
          { id: "countries-border", type: "line", source: "demotiles", "source-layer": "countries", paint: { "line-color": MAP_STYLE.borders, "line-width": 0.7 } },
        ],
      },
      center: [102.5, 4.5],
      zoom: 3.2,
      maxZoom: 11.5,
      scrollZoom: false,
      attributionControl: { compact: true },
    });
    mapRef.current = map;
    window.__amifiberMap = map;
    map.addControl(new NavigationControl({ showCompass: false }), "bottom-right");
    map.fitBounds(OVERALL_BOUNDS, { padding: 20, duration: 0 });

    map.on("mousemove", "countries-base", (e) => {
      const name = nameOf(e.features[0] && e.features[0].properties);
      const code = name ? MARKET_BY_NAME[name] : null;
      map.getCanvas().style.cursor = code ? "pointer" : "";
      map.setFilter("countries-hover", code && code !== selectedRef.current ? ["==", NAME_EXPR, name] : noneFilter);
    });
    map.on("mouseleave", "countries-base", () => {
      map.getCanvas().style.cursor = "";
      map.setFilter("countries-hover", noneFilter);
    });
    map.on("click", "countries-base", (e) => {
      const name = nameOf(e.features[0] && e.features[0].properties);
      const code = name ? MARKET_BY_NAME[name] : null;
      if (code && selectRef.current) selectRef.current(code);
    });

    return () => {
      map.remove();
      mapRef.current = null;
      delete window.__amifiberMap;
    };
  }, []);

  // Selection → highlight + smooth fly-to
  useEffect(() => {
    const apply = () => {
      const map = mapRef.current;
      if (!map || !map.getLayer("countries-selected")) return;
      const entry = NETWORK_COUNTRIES.find((c) => c.code === selectedCountry.toUpperCase());
      const names = selectedCountry === "all" ? NETWORK_COUNTRIES.map((c) => c.name) : entry ? [entry.name] : [];
      map.setFilter("countries-selected", names.length ? inList(names) : noneFilter);
      const bounds = selectedCountry === "all" ? OVERALL_BOUNDS : entry && entry.bounds;
      if (bounds) map.fitBounds(bounds, { padding: 44, duration: 1100 });
    };
    const map = mapRef.current;
    if (!map) return;
    map.loaded() ? apply() : map.once("load", apply);
  }, [selectedCountry]);

  return (
    <div className="relative h-full w-full" data-testid="gis-network-map">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
