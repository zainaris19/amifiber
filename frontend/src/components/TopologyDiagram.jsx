import { useReducedMotion } from "framer-motion";

// Topology diagram: Data Center A → AMIFIBER POP → primary/diverse routes →
// AMIFIBER POP → Data Center B, with optional ecosystem connections.
export default function TopologyDiagram() {
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

  const dcNode = (cx, cy) => (
    <>
      <circle cx={cx} cy={cy} r="11" fill="none" stroke="#0088E8" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="6" fill="#FFFFFF" stroke="#0057B8" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="2.2" fill="#0088E8" />
    </>
  );

  const popNode = (cx, cy) => (
    <>
      <circle cx={cx} cy={cy} r="13" fill="none" stroke="#0088E8" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="7" fill="#0057B8" />
      <circle cx={cx} cy={cy} r="2.5" fill="#FFFFFF" />
    </>
  );

  const sideNode = (cx, cy) => (
    <>
      <circle cx={cx} cy={cy} r="5" fill="#FFFFFF" stroke="#0088E8" strokeWidth="1.75" />
      <circle cx={cx} cy={cy} r="1.8" fill="#0088E8" />
    </>
  );

  return (
    <svg
      viewBox="0 0 900 660"
      role="img"
      aria-label="Network topology diagram showing Data Center A and Data Center B connected through AMIFIBER points of presence over primary and diverse routes, with optional connections to cloud, carrier, international gateway and enterprise networks"
      data-testid="topology-diagram"
      className="h-auto w-full"
    >
      <title>AMIFIBER topology with primary and diverse routes</title>

      {/* Core vertical links */}
      <path id="top-dca-pop" d="M 450 68 V 176" fill="none" stroke="#DCE7EF" strokeWidth="1.5" />
      <path id="top-primary" d="M 450 204 V 436" fill="none" stroke="#0088E8" strokeWidth="2" />
      <path id="top-diverse" d="M 432 204 C 292 268, 292 372, 432 436" fill="none" stroke="#0088E8" strokeWidth="1.5" strokeDasharray="5 8" />
      <path id="top-pop-dcb" d="M 450 464 V 572" fill="none" stroke="#DCE7EF" strokeWidth="1.5" />

      {/* Ecosystem links */}
      <g stroke="#C9DAE8" strokeWidth="1.25" strokeDasharray="3 6">
        <line x1="437" y1="190" x2="172" y2="190" />
        <line x1="463" y1="190" x2="728" y2="190" />
        <line x1="437" y1="450" x2="172" y2="450" />
        <line x1="463" y1="450" x2="728" y2="450" />
      </g>

      {pulse("top-primary", "4.5s", "0s")}
      {pulse("top-diverse", "6s", "1s")}
      {pulse("top-dca-pop", "4s", "0.4s")}
      {pulse("top-pop-dcb", "4s", "1.8s")}

      {/* Data Center A */}
      {dcNode(450, 56)}
      <text x="470" y="61" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        DATA CENTER A
      </text>

      {/* POP A */}
      {popNode(450, 190)}
      <text x="470" y="166" fill="#0A1F33" fontWeight="700" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        AMIFIBER POP
      </text>

      {/* Route labels */}
      <text x="468" y="318" fill="#0088E8" fontWeight="700" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
        PRIMARY ROUTE
      </text>
      <text x="252" y="326" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
        DIVERSE ROUTE
      </text>

      {/* POP B */}
      {popNode(450, 450)}
      <text x="470" y="426" fill="#0A1F33" fontWeight="700" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        AMIFIBER POP
      </text>

      {/* Data Center B */}
      {dcNode(450, 584)}
      <text x="470" y="589" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        DATA CENTER B
      </text>

      {/* Ecosystem nodes */}
      {sideNode(160, 190)}
      <text x="160" y="216" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        CLOUD
      </text>
      {sideNode(740, 190)}
      <text x="740" y="216" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        CARRIER
      </text>
      {sideNode(160, 450)}
      <text x="160" y="476" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        INTL GATEWAY
      </text>
      {sideNode(740, 450)}
      <text x="740" y="476" textAnchor="middle" fill="#52687A" fontWeight="600" style={{ fontSize: "11px", letterSpacing: "0.14em" }}>
        ENTERPRISE
      </text>
    </svg>
  );
}
