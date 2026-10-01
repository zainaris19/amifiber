import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

// Generic technical flow diagram: stages connected by a line with a traveling pulse.
// Used on the Dark Fiber page (customer equipment → AMIFIBER fiber → customer equipment).
export default function FlowDiagram({ stages, highlightIndex = -1, testPrefix = "flow" }) {
  const reduce = useReducedMotion();

  const node = (i) => (
    <span
      className={`relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-brand-blue bg-white ${
        i === highlightIndex ? "bg-brand-blue" : ""
      }`}
      aria-hidden="true"
    >
      {i === highlightIndex ? (
        <span className="h-[10px] w-[10px] rounded-full bg-white" />
      ) : (
        <span className="h-[8px] w-[8px] rounded-full bg-brand-net" />
      )}
    </span>
  );

  return (
    <div data-testid={`${testPrefix}-diagram`}>
      {/* Horizontal — desktop */}
      <div className="relative hidden md:block">
        <div className="absolute left-[11px] right-[11px] top-[10px] h-px bg-brand-line" aria-hidden="true" />
        {!reduce && (
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-sky"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        )}
        <ol className="relative grid grid-cols-5 gap-6">
          {stages.map((s, i) => (
            <li key={i} className="flex flex-col items-center text-center" data-testid={`${testPrefix}-node-${i + 1}`}>
              {node(i)}
              <span className={`mt-5 block font-display text-xs font-bold uppercase leading-snug tracking-wide ${i === highlightIndex ? "text-brand-blue" : "text-brand-ink"}`}>
                {s.title}
              </span>
              {s.sub && <span className="mt-1.5 block text-xs leading-relaxed text-brand-slate">{s.sub}</span>}
            </li>
          ))}
        </ol>
      </div>

      {/* Vertical — mobile */}
      <div className="relative md:hidden">
        <div className="absolute bottom-[11px] left-[10px] top-[11px] w-px bg-brand-line" aria-hidden="true" />
        {!reduce && (
          <motion.span
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-sky"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        )}
        <ol className="relative flex flex-col gap-9">
          {stages.map((s, i) => (
            <li key={i} className="flex items-start gap-5" data-testid={`${testPrefix}-node-${i + 1}`}>
              {node(i)}
              <div>
                <span className={`block font-display text-sm font-bold uppercase leading-snug tracking-wide ${i === highlightIndex ? "text-brand-blue" : "text-brand-ink"}`}>
                  {s.title}
                </span>
                {s.sub && <span className="mt-1 block text-sm leading-relaxed text-brand-slate">{s.sub}</span>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
