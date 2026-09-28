import { useReducedMotion } from "framer-motion";

// Dual-path diagram: Data Center A / Data Center B connected by a primary route
// and a diverse route, with animated data pulses.
export default function RouteDiversityDiagram() {
  const reduce = useReducedMotion();
  const pulse = (pathId, dur, begin) =>
    !reduce && (
      <circle r="3" fill="#38BDF8">
        <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
          <mpath href={`#${pathId}`} xlinkHref={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.12;0.75;1"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
        />
      </circle>
    );

  return (
    <svg
      viewBox="0 0 900 470"
      role="img"
      aria-label="Diagram of two physical fiber routes between Data Center A and Data Center B: a primary route and a diverse route"
      data-testid="route-diversity-diagram"
      className="h-auto w-full"
    >
      <title>Primary and diverse fiber routes between two data centers</title>

      <path id="rd-primary" d="M 130 250 H 770" fill="none" stroke="#0088E8" strokeWidth="2" />
      <path id="rd-diverse" d="M 118 232 C 300 78, 600 78, 782 232" fill="none" stroke="#0088E8" strokeWidth="1.5" strokeDasharray="5 8" />

      {pulse("rd-primary", "5s", "0s")}
      {pulse("rd-diverse", "6.5s", "1.2s")}

      {/* Data Center A */}
      <circle cx="110" cy="250" r="11" fill="none" stroke="#0088E8" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="110" cy="250" r="6" fill="#FFFFFF" stroke="#0057B8" strokeWidth="2" />
      <circle cx="110" cy="250" r="2.2" fill="#0088E8" />
      <text x="110" y="290" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        DATA CENTER A
      </text>

      {/* Data Center B */}
      <circle cx="790" cy="250" r="11" fill="none" stroke="#0088E8" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="790" cy="250" r="6" fill="#FFFFFF" stroke="#0057B8" strokeWidth="2" />
      <circle cx="790" cy="250" r="2.2" fill="#0088E8" />
      <text x="790" y="290" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        DATA CENTER B
      </text>

      <text x="450" y="228" textAnchor="middle" fill="#0088E8" fontWeight="700" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
        PRIMARY ROUTE
      </text>
      <text x="450" y="72" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
        DIVERSE ROUTE
      </text>
    </svg>
  );
}
