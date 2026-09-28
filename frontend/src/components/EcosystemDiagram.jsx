import { useReducedMotion } from "framer-motion";
import { COUNTRIES, ECOSYSTEM_TARGETS } from "@/data/networkPage";

// Regional summary diagram: four markets feeding the digital ecosystem.
export default function EcosystemDiagram() {
  const reduce = useReducedMotion();
  const W = 1100;
  const H = 560;
  const countryY = (i) => 70 + i * 140;
  const ecoY = (i) => 50 + i * 92;
  const busX = 320;

  const connections = {
    Thailand: ["Data Centers", "Carriers", "International Gateways"],
    Malaysia: ["Data Centers", "Carriers", "Enterprises"],
    Singapore: ["Data Centers", "Cloud", "Content Networks", "International Gateways"],
    Indonesia: ["Data Centers", "Carriers", "International Gateways"],
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Diagram of AMIFIBER's four country markets connecting to data centers, carriers, cloud, international gateways, content networks and enterprises"
      data-testid="ecosystem-diagram"
      className="h-auto w-full"
    >
      {/* Regional backbone bus */}
      <line x1={busX} y1={countryY(0)} x2={busX} y2={countryY(3)} stroke="#0088E8" strokeWidth="1.75" />
      {!reduce && (
        <circle r="2.8" fill="#38BDF8">
          <animateMotion dur="6s" repeatCount="indefinite" path={`M ${busX} ${countryY(3)} L ${busX} ${countryY(0)}`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="6s" repeatCount="indefinite" />
        </circle>
      )}

      {COUNTRIES.map((c, i) => {
        const y = countryY(i);
        return (
          <g key={c.id}>
            <line x1="150" y1={y} x2={busX} y2={y} stroke="#DCE7EF" strokeWidth="1.5" />
            <circle cx={busX} cy={y} r="4.5" fill="#0057B8" />
            <rect x="20" y={y - 24} width="130" height="48" fill="#FFFFFF" stroke="#C9DAE8" strokeWidth="1.4" />
            <text x="85" y={y + 5} textAnchor="middle" fill="#0A1F33" fontWeight="700" style={{ fontSize: "13px", letterSpacing: "0.12em" }}>
              {c.name.toUpperCase()}
            </text>
          </g>
        );
      })}

      {ECOSYSTEM_TARGETS.map((name, i) => {
        const y = ecoY(i);
        return (
          <g key={name}>
            {COUNTRIES.filter((c) => connections[c.name]?.includes(name)).map((c) => {
              const y1 = countryY(COUNTRIES.indexOf(c));
              const mx = (busX + 830) / 2;
              return (
                <path
                  key={`${c.id}-${name}`}
                  d={`M ${busX + 4} ${y1} C ${mx} ${y1}, ${mx} ${y}, 824 ${y}`}
                  fill="none"
                  stroke="#C9DAE8"
                  strokeWidth="1.25"
                />
              );
            })}
            <circle cx="830" cy={y} r="4" fill="#0088E8" />
            <text x="848" y={y + 5} fill="#0A1F33" fontWeight="600" style={{ fontSize: "13px", letterSpacing: "0.1em" }}>
              {name.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
