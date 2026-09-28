import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { STATS } from "@/data/network";

export default function NetworkStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [values, setValues] = useState(STATS.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValues(STATS.map((s) => s.value));
      return;
    }
    const controls = STATS.map((s, i) =>
      animate(0, s.value, {
        duration: 1.8,
        delay: i * 0.12,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) =>
          setValues((prev) => {
            const next = [...prev];
            next[i] = Math.round(v);
            return next;
          }),
      })
    );
    return () => controls.forEach((c) => c.stop());
  }, [inView, reduce]);

  return (
    <section className="border-y border-brand-line bg-brand-mist py-14 lg:py-20" aria-label="Network statistics">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-testid="network-stats">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-5 lg:gap-y-0 lg:divide-x lg:divide-brand-line">
          {STATS.map((s, i) => (
            <div
              key={s.id}
              data-testid={`stats-counter-${s.id}`}
              className={`px-2 lg:px-8 lg:first:pl-0 ${i === STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <p className="font-display text-4xl font-extrabold tracking-tight text-brand-deep sm:text-5xl">
                {values[i].toLocaleString("en-US")}
                {s.suffix}
                {s.unit && (
                  <span className="ml-2 align-middle font-display text-base font-bold text-brand-net sm:text-lg">
                    {s.unit}
                  </span>
                )}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-slate sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
