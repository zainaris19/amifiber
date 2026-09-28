import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { OVERALL_BOUNDS, markersAsGeoJSON, routesAsGeoJSON } from "@/data/networkGeo";

// Compact interactive GIS map for the /network hero — shows the real AMIFIBER
// regional routes. Initialized only when scrolled into view (mobile performance).
export default function NetworkHeroMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !containerRef.current || mapRef.current) return;
    const map = new MapLibreMap({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          demotiles: { type: "vector", url: "https://demotiles.maplibre.org/tiles/tiles.json" },
          network: { type: "geojson", data: routesAsGeoJSON("all") },
          markers: { type: "geojson", data: markersAsGeoJSON("all") },
        },
        layers: [
          { id: "bg", type: "background", paint: { "background-color": "#F6FAFD" } },
          { id: "countries-fill", type: "fill", source: "demotiles", "source-layer": "countries", paint: { "fill-color": "#E9EEF2" } },
          { id: "countries-line", type: "line", source: "demotiles", "source-layer": "countries", paint: { "line-color": "#CDD8E0", "line-width": 0.8 } },
          {
            id: "routes-active",
            type: "line",
            source: "network",
            filter: ["in", ["get", "kind"], ["literal", ["terrestrial", "metro"]]],
            paint: { "line-color": "#0067C5", "line-width": 2 },
          },
          { id: "routes-submarine", type: "line", source: "network", filter: ["==", ["get", "kind"], "submarine"], paint: { "line-color": "#009FE3", "line-width": 2.5 } },
          { id: "nodes-pop", type: "circle", source: "markers", filter: ["==", ["get", "type"], "pop"], paint: { "circle-radius": 3.5, "circle-color": "#0088E8" } },
          { id: "nodes-dc", type: "circle", source: "markers", filter: ["==", ["get", "type"], "dc"], paint: { "circle-radius": 4, "circle-color": "#0088E8", "circle-stroke-width": 1, "circle-stroke-color": "#FFFFFF" } },
          { id: "nodes-hub", type: "circle", source: "markers", filter: ["==", ["get", "type"], "hub"], paint: { "circle-radius": 5.5, "circle-color": "#0067C5", "circle-stroke-width": 1.5, "circle-stroke-color": "#FFFFFF" } },
          { id: "nodes-cls", type: "circle", source: "markers", filter: ["==", ["get", "type"], "cls"], paint: { "circle-radius": 5.5, "circle-color": "#FFFFFF", "circle-stroke-width": 2.5, "circle-stroke-color": "#0067C5" } },
        ],
      },
      center: [102.2, 6.5],
      zoom: 2.9,
      scrollZoom: false,
      attributionControl: { compact: true },
    });
    mapRef.current = map;
    map.fitBounds(OVERALL_BOUNDS, { padding: 30, duration: 0 });
    map.addControl(new NavigationControl({ showCompass: false, showZoom: false }), "bottom-right");
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [visible]);

  return (
    <div className="relative h-full w-full" data-testid="network-hero-map">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
