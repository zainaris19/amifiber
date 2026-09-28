import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { DIAGRAM_STAGES } from "@/data/content";

function Pulse({ vertical }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return vertical ? (
    <motion.span
      className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-sky"
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  ) : (
    <motion.span
      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-sky"
      initial={{ left: "0%" }}
      animate={{ left: "100%" }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );
}

function Node({ index, name, vertical }) {
  return (
    <li className={`flex ${vertical ? "flex-row items-center gap-6" : "flex-col"}`} data-testid={`connectivity-diagram-node-${index + 1}`}>
      <span className="relative z-10 block h-[22px] w-[22px] shrink-0 rounded-full border-2 border-brand-blue bg-white">
        <span className="absolute inset-[5px] rounded-full bg-brand-net" aria-hidden="true" />
      </span>
      <div className={vertical ? "" : "mt-5"}>
        <span className="block text-[11px] font-semibold tracking-[0.18em] text-brand-net">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-1.5 block font-display text-sm font-bold uppercase leading-snug tracking-wide text-brand-ink">
          {name}
        </span>
      </div>
    </li>
  );
}

export default function ConnectivityDiagram() {
  return (
    <section id="connectivity" className="scroll-mt-20 bg-brand-mist2 py-24 lg:py-32" data-testid="connectivity-visualization">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Connectivity Architecture</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl">
              One continuous path,
              <br />
              end to end.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-slate sm:text-lg">
              From a single data center to international gateways, AMIFIBER infrastructure carries traffic across every
              layer of the digital ecosystem.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 border border-brand-line bg-white p-8 lg:p-14">
            {/* Horizontal — desktop */}
            <div className="relative hidden md:block">
              <div className="absolute left-[11px] right-[11px] top-[10px] h-px bg-brand-line" aria-hidden="true" />
              <Pulse />
              <ol className="relative grid grid-cols-6 gap-6">
                {DIAGRAM_STAGES.map((name, i) => (
                  <Node key={name} index={i} name={name} />
                ))}
              </ol>
            </div>

            {/* Vertical — mobile */}
            <div className="relative md:hidden">
              <div className="absolute bottom-[11px] left-[10px] top-[11px] w-px bg-brand-line" aria-hidden="true" />
              <Pulse vertical />
              <ol className="relative flex flex-col gap-10">
                {DIAGRAM_STAGES.map((name, i) => (
                  <Node key={name} index={i} name={name} vertical />
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
