import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

// Horizontal 5-step engagement process with animated connecting line.
export default function ProcessFlow({ steps, testPrefix = "process" }) {
  const reduce = useReducedMotion();

  return (
    <div data-testid={`${testPrefix}-flow`}>
      {/* Horizontal — desktop */}
      <div className="relative hidden lg:block">
        <div className="absolute left-[22px] right-[22px] top-[21px] h-px bg-brand-line" aria-hidden="true" />
        {!reduce && (
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-sky"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        )}
        <ol className="relative grid grid-cols-5 gap-8">
          {steps.map((s, i) => (
            <li key={s.title} data-testid={`${testPrefix}-step-${i + 1}`}>
              <span className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-brand-blue bg-white font-display text-sm font-bold text-brand-blue">
                {s.number}
              </span>
              <h3 className="mt-5 font-display text-sm font-extrabold uppercase tracking-wide text-brand-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Vertical — mobile */}
      <div className="relative lg:hidden">
        <div className="absolute bottom-[21px] left-[21px] top-[21px] w-px bg-brand-line" aria-hidden="true" />
        {!reduce && (
          <motion.span
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-sky"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        )}
        <ol className="relative flex flex-col gap-10">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-5" data-testid={`${testPrefix}-step-${i + 1}`}>
              <span className="relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-brand-blue bg-white font-display text-sm font-bold text-brand-blue">
                {s.number}
              </span>
              <div>
                <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
