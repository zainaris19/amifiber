import { useReducedMotion } from "framer-motion";
import { makeProjector, pathThroughPoints } from "@/utils/geo";
import { COUNTRY_BOUNDS, NETWORK_LOCATIONS, NETWORK_ROUTES } from "@/data/networkGeo";

// Static GIS-style SVG map of one country's routes (used inside country sections).
export default function CountryRouteMap({ countryId, width = 640, height = 480, showAllLabels = true, testId }) {
  const reduce = useReducedMotion();
  const bbox = COUNTRY_BOUNDS[countryId];
  const project = makeProjector(
    [bbox[0][0] - 0.6, bbox[0][1] - 0.6, bbox[1][0] + 0.6, bbox[1][1] + 0.6],
    width,
    height,
    34
  );

  const routes = NETWORK_ROUTES.filter((r) => r.diagram === countryId);
  const usedLocations = Object.entries(NETWORK_LOCATIONS).filter(
    ([id, l]) => l.label && (l.country === countryId || routes.some((r) => r.points.includes(id)))
  );

  const nodeStyle = (type) => {
    if (type === "cls") return { outer: 7.5, fill: "#FFFFFF", stroke: "#0067C5", strokeW: 2.4, inner: 2.2 };
    if (type === "hub") return { outer: 7, fill: "#0067C5", stroke: "#FFFFFF", strokeW: 1.5, inner: 2.6, halo: true };
    if (type === "dc") return { outer: 4.5, fill: "#0088E8", stroke: "#FFFFFF", strokeW: 1, inner: 0 };
    return { outer: 4, fill: "#FFFFFF", stroke: "#0088E8", strokeW: 1.6, inner: 1.6 };
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Network route map for ${countryId}`}
      data-testid={testId || `country-route-map-${countryId}`}
      className="h-auto w-full"
    >
      {routes.map((r) => {
        const pts = r.points.map((p) => NETWORK_LOCATIONS[p].coords);
        const d = pathThroughPoints(project, pts);
        const stroke = r.status === "planned" ? "#67A9E8" : r.kind === "submarine" ? "#009FE3" : "#0067C5";
        const dash = r.status === "planned" ? "4 7" : r.kind === "submarine" ? "10 5" : undefined;
        const pathId = `crm-${r.id}`;
        return (
          <g key={r.id}>
            <path id={pathId} d={d} fill="none" stroke={stroke} strokeWidth={r.kind === "submarine" ? 2.4 : 2} strokeDasharray={dash} strokeLinecap="round" strokeLinejoin="round" />
            {!reduce && r.status === "active" && (
              <circle r="2.6" fill="#38BDF8">
                <animateMotion dur={r.kind === "submarine" ? "5.5s" : "4.5s"} begin="0.6s" repeatCount="indefinite">
                  <mpath href={`#${pathId}`} xlinkHref={`#${pathId}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.75;1" dur={r.kind === "submarine" ? "5.5s" : "4.5s"} begin="0.6s" repeatCount="indefinite" />
              </circle>
            )}
            {r.kind === "submarine" && (
              <text x={project(pts[0])[0] + 18} y={(project(pts[0])[1] + project(pts[1])[1]) / 2 - 10} fill="#009FE3" fontWeight="700" style={{ fontSize: "10px", letterSpacing: "0.16em" }}>
                SUBSEA
              </text>
            )}
          </g>
        );
      })}

      {usedLocations.map(([id, loc]) => {
        const [x, y] = project(loc.coords);
        const s = nodeStyle(loc.type);
        const label = showAllLabels && loc.label ? loc.shortLabel || loc.label : "";
        const labelAbove = loc.type === "dc" || loc.type === "cls";
        return (
          <g key={id}>
            {s.halo && <circle cx={x} cy={y} r="12" fill="none" stroke="#0088E8" strokeOpacity="0.3" strokeWidth="1.4" />}
            <circle cx={x} cy={y} r={s.outer} fill={s.fill} stroke={s.stroke} strokeWidth={s.strokeW} />
            {s.inner > 0 && <circle cx={x} cy={y} r={s.inner} fill={s.fill === "#FFFFFF" ? "#0088E8" : "#FFFFFF"} />}
            {label && (
              <text
                x={x}
                y={labelAbove ? y - 12 : y + 20}
                textAnchor="middle"
                fill="#52687A"
                fontWeight="600"
                style={{ fontSize: "10.5px", letterSpacing: "0.1em" }}
              >
                {label.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
