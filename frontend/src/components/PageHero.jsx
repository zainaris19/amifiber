import { motion } from "framer-motion";
import Breadcrumb from "./Breadcrumb";

export default function PageHero({ image, imageAlt, eyebrow, title, description, crumbs, children }) {
  return (
    <section className="relative flex h-[500px] items-end overflow-hidden bg-brand-deeper sm:h-[540px] lg:h-[580px]">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#002B55]/95 via-[#002B55]/60 to-[#002B55]/35"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Breadcrumb items={crumbs} light />
        </motion.div>

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#9CC9EC]"
          >
            <span className="h-px w-8 bg-brand-sky" aria-hidden="true" />
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
