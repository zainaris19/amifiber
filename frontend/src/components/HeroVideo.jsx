import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const LINES = ["Providing the Backbone", "of Digital Connectivity."];

export default function HeroVideo() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [videoOk, setVideoOk] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    const onError = () => setVideoFailed(true);
    // No capture flag: fires only when every <source> has failed (element-level error)
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError, true);
  }, [reduce, isMobile]);

  const src = isMobile ? "/videos/amifiber-hero-mobile.mp4" : "/videos/amifiber-hero.mp4";
  const showVideo = !reduce && !videoFailed;

  return (
    <section
      id="home"
      ref={sectionRef}
      data-testid="hero-section"
      className="relative flex h-screen min-h-[640px] items-center overflow-hidden bg-brand-deeper"
    >
      <motion.div style={reduce ? undefined : { y: mediaY }} className="absolute inset-0">
        <img
          src="/images/amifiber-hero-poster.jpg"
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {showVideo && (
          <video
            key={src}
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoOk ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/amifiber-hero-poster.jpg"
            onCanPlay={() => setVideoOk(true)}
          >
            <source src={src} type="video/mp4" />
            <source src="/videos/amifiber-hero.webm" type="video/webm" />
          </video>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#002B55]/55 via-[#002B55]/30 to-[#002B55]/10" aria-hidden="true" />

      <motion.div
        style={{
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.45)",
          ...(reduce ? {} : { y: contentY }),
        }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B4D7F1] sm:text-[11px]"
        >
          <span className="h-px w-8 bg-brand-sky" aria-hidden="true" />
          Fiber Infrastructure • Southeast Asia
        </motion.p>

        <h1 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-white">
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base"
        >
          High-capacity fiber infrastructure connecting data centers, carriers, cloud platforms, ISPs, and enterprises
          across Southeast Asia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#network"
            data-testid="hero-explore-network-button"
            className="inline-flex h-11 items-center justify-center bg-brand-blue px-7 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-brand-net"
          >
            Explore Our Network
          </a>
          <a
            href="#contact"
            data-testid="hero-contact-button"
            className="inline-flex h-11 items-center justify-center border border-white/50 px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
          >
            Talk to Our Team
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="mt-10 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/75 sm:text-[11px]"
        >
          <span className="h-px w-5 bg-white/40" aria-hidden="true" />
          Built for mission-critical digital infrastructure.
        </motion.p>
      </motion.div>

      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <div className="relative h-12 w-px overflow-hidden bg-white/25">
          {reduce ? (
            <span className="absolute left-0 top-4 h-4 w-px bg-brand-sky" />
          ) : (
            <motion.span
              className="absolute left-0 h-4 w-px bg-brand-sky"
              animate={{ top: ["-16px", "48px"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
