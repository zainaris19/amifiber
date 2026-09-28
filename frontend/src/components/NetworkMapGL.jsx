import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  COUNTRY_BOUNDS,
  COUNTRY_NAME_TO_CODE,
  OVERALL_BOUNDS,
  markersAsGeoJSON,
  routesAsGeoJSON,
} from "@/data/networkGeo";

const DASH_SEQUENCE = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
  [0, 0.5, 3, 3.5],
  [1, 0.5, 3, 2.5],
  [2, 0.5, 3, 1.5],
  [3, 0.5, 3, 0.5],
  [0, 4, 0.5, 3],
  [0, 4, 1, 2],
  [0, 4, 1.5, 1],
];

const ROUTE_LAYERS = ["routes-active", "routes-flow", "routes-submarine", "routes-planned"];
const NODE_LAYERS = ["nodes-hub", "nodes-pop", "nodes-dc", "nodes-cls"];

function buildStyle(countryFilter) {
  const routes = routesAsGeoJSON(countryFilter);
  const markers = markersAsGeoJSON(countryFilter);
  return {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      demotiles: { type: "vector", url: "https://demotiles.maplibre.org/tiles/tiles.json" },
      network: { type: "geojson", data: routes },
      markers: { type: "geojson", data: markers },
    },
    layers: [
      { id: "bg", type: "background", paint: { "background-color": "#F6FAFD" } },
      {
        id: "countries-fill",
        type: "fill",
        source: "demotiles",
        "source-layer": "countries",
        paint: { "fill-color": "#E9EEF2" },
      },
      {
        id: "countries-highlight",
        type: "fill",
        source: "demotiles",
        "source-layer": "countries",
        filter: ["==", ["coalesce", ["get", "name"], ["get", "NAME"], ""], "__none__"],
        paint: { "fill-color": "#CFE3F6" },
      },
      {
        id: "countries-line",
        type: "line",
        source: "demotiles",
        "source-layer": "countries",
        paint: { "line-color": "#CDD8E0", "line-width": 0.8 },
      },
      {
        id: "routes-active",
        type: "line",
        source: "network",
        filter: ["all", ["==", ["get", "status"], "active"], ["in", ["get", "kind"], ["literal", ["terrestrial", "metro"]]]],
        paint: { "line-color": "#0067C5", "line-width": 2 },
      },
      {
        id: "routes-flow",
        type: "line",
        source: "network",
        filter: ["all", ["==", ["get", "status"], "active"], ["in", ["get", "kind"], ["literal", ["terrestrial", "metro"]]]],
        layout: { "line-cap": "round" },
        paint: { "line-color": "#38BDF8", "line-width": 2, "line-dasharray": DASH_SEQUENCE[0] },
      },
      {
        id: "routes-submarine",
        type: "line",
        source: "network",
        filter: ["==", ["get", "kind"], "submarine"],
        paint: { "line-color": "#009FE3", "line-width": 2.5 },
      },
      {
        id: "routes-planned",
        type: "line",
        source: "network",
        filter: ["==", ["get", "status"], "planned"],
        paint: { "line-color": "#67A9E8", "line-width": 1.8, "line-dasharray": [2, 2.5] },
      },
      {
        id: "nodes-pop",
        type: "circle",
        source: "markers",
        filter: ["==", ["get", "type"], "pop"],
        paint: { "circle-radius": 3.5, "circle-color": "#0088E8" },
      },
      {
        id: "nodes-dc",
        type: "circle",
        source: "markers",
        filter: ["==", ["get", "type"], "dc"],
        paint: { "circle-radius": 4, "circle-color": "#0088E8", "circle-stroke-width": 1, "circle-stroke-color": "#FFFFFF" },
      },
      {
        id: "nodes-hub",
        type: "circle",
        source: "markers",
        filter: ["==", ["get", "type"], "hub"],
        paint: { "circle-radius": 5.5, "circle-color": "#0067C5", "circle-stroke-width": 1.5, "circle-stroke-color": "#FFFFFF" },
      },
      {
        id: "nodes-cls",
        type: "circle",
        source: "markers",
        filter: ["==", ["get", "type"], "cls"],
        paint: { "circle-radius": 5.5, "circle-color": "#FFFFFF", "circle-stroke-width": 2.5, "circle-stroke-color": "#0067C5" },
      },
    ],
  };
}

export default function NetworkMapGL({ selectedCountry, onCountrySelect, layerVisibility }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const tipRef = useRef(null);
  const animRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new MapLibreMap({
      container: containerRef.current,
      style: buildStyle("all"),
      center: [101.5, 3.5],
      zoom: 3.4,
      attribution: { compact: true },
    });
    mapRef.current = map;
    map.addControl(new NavigationControl({ showCompass: false }), "bottom-right");

    const showTip = (html, x, y) => {
      const el = tipRef.current;
      if (!el) return;
      el.innerHTML = html;
      el.style.left = `${Math.min(x + 14, (containerRef.current?.clientWidth || 300) - 220)}px`;
      el.style.top = `${y + 14}px`;
      el.style.display = "block";
    };
    const hideTip = () => {
      if (tipRef.current) tipRef.current.style.display = "none";
    };

    map.on("load", () => {
      setMapReady(true);

      // Country click → select (safe: relies on demotiles feature properties)
      map.on("click", "countries-fill", (e) => {
        const p = (e.features[0] && e.features[0].properties) || {};
        const name = p.name || p.NAME || p.name_en || p.NAME_EN;
        const code = name && COUNTRY_NAME_TO_CODE[name];
        if (code && onCountrySelect) onCountrySelect(code);
      });

      const routeTip = (e) => {
        const p = e.features[0].properties;
        showTip(
          `<p class="nm-name">${p.name}</p><p class="nm-row"><span>Status</span>${p.status === "active" ? "Active" : "Planned"}</p><p class="nm-row"><span>Type</span>${p.type}</p>`,
          e.point.x,
          e.point.y
        );
      };
      ROUTE_LAYERS.forEach((id) => {
        map.on("mousemove", id, routeTip);
        map.on("mouseleave", id, hideTip);
      });

      const nodeTip = (e) => {
        const p = e.features[0].properties;
        showTip(
          `<p class="nm-name">${p.name}</p><p class="nm-row"><span>Infrastructure</span>${p.type === "cls" ? "Cable Landing Station" : p.type === "dc" ? "Data Center / PoP" : p.type === "hub" ? "Major Hub" : "Network PoP"}</p><p class="nm-row"><span>Status</span>${p.status}</p>`,
          e.point.x,
          e.point.y
        );
      };
      NODE_LAYERS.forEach((id) => {
        map.on("mouseenter", id, () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mousemove", id, nodeTip);
        map.on("mouseleave", id, () => {
          map.getCanvas().style.cursor = "";
          hideTip();
        });
      });
      map.on("click", (e) => {
        const feats = map.queryRenderedFeatures(e.point, { layers: NODE_LAYERS });
        if (!feats.length) hideTip();
      });

      // Slow directional dash flow on active routes
      let step = 0;
      animRef.current = setInterval(() => {
        if (!map.getLayer("routes-flow")) return;
        step = (step + 1) % DASH_SEQUENCE.length;
        map.setPaintProperty("routes-flow", "line-dasharray", DASH_SEQUENCE[step]);
      }, 90);
    });

    return () => {
      if (animRef.current) clearInterval(animRef.current);
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Country filter → re-source layers + fly
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const style = map.getStyle();
    if (style.sources.network) map.getSource("network").setData(routesAsGeoJSON(selectedCountry));
    if (style.sources.markers) map.getSource("markers").setData(markersAsGeoJSON(selectedCountry));

    const bounds = selectedCountry === "all" ? OVERALL_BOUNDS : COUNTRY_BOUNDS[selectedCountry];
    if (bounds) map.fitBounds(bounds, { padding: 56, duration: 1200, maxZoom: 11 });

    const name = Object.keys(COUNTRY_NAME_TO_CODE).find((n) => COUNTRY_NAME_TO_CODE[n] === selectedCountry);
    if (map.getLayer("countries-highlight")) {
      map.setFilter(
        "countries-highlight",
        selectedCountry === "all" || !name
          ? ["==", ["coalesce", ["get", "name"], ["get", "NAME"], ""], "__none__"]
          : ["==", ["coalesce", ["get", "name"], ["get", "NAME"], ""], name]
      );
    }
  }, [selectedCountry, mapReady]);

  // Layer visibility toggles
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !layerVisibility) return;
    const set = (id, visible) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", visible ? "visible" : "none");
    };
    set("routes-active", layerVisibility.active);
    set("routes-flow", layerVisibility.active);
    set("routes-planned", layerVisibility.planned);
    set("routes-submarine", layerVisibility.submarine);
    set("nodes-pop", layerVisibility.dcpop);
    set("nodes-dc", layerVisibility.dcpop);
    set("nodes-hub", layerVisibility.dcpop);
    set("nodes-cls", layerVisibility.cls);
  }, [layerVisibility, mapReady]);

  return (
    <div className="relative h-full w-full" data-testid="gis-network-map">
      <div ref={containerRef} className="h-full w-full" />
      <div
        ref={tipRef}
        className="pointer-events-none absolute z-10 hidden max-w-[230px] border border-brand-line bg-white/97 px-3.5 py-2.5 shadow-[0_8px_24px_-8px_rgba(0,43,85,0.35)]"
        data-testid="gis-map-tooltip"
      />
    </div>
  );
}
