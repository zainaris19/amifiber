import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 24, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const SectionLabel = ({ children, light = false }) => (
  <p
    className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${
      light ? "text-brand-sky" : "text-brand-blue"
    }`}
  >
    <span className={`h-px w-8 ${light ? "bg-brand-sky" : "bg-brand-blue"}`} aria-hidden="true" />
    {children}
  </p>
);

export default Reveal;
