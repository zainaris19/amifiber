import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Cable, Share2, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, SERVICES_NAV } from "@/data/company";

const DROP_ICONS = { cable: Cable, share: Share2 };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setDropOpen(false);
  }, [location]);

  const solid = scrolled || open;
  const openDrop = () => {
    clearTimeout(closeTimer.current);
    setDropOpen(true);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropOpen(false), 160);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-brand-line bg-white/95 backdrop-blur-sm" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[76px] lg:px-8">
        <Link to="/" data-testid="navbar-brand-logo" aria-label="AMIFIBER — home">
          <Logo variant={solid ? "dark" : "light"} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) =>
            l.label === "Services" ? (
              <div key={l.label} className="relative" onMouseEnter={openDrop} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  onClick={() => setDropOpen(!dropOpen)}
                  aria-expanded={dropOpen}
                  aria-haspopup="true"
                  data-testid="navbar-services-trigger"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                    solid ? "text-brand-ink hover:text-brand-blue" : "text-white/90 hover:text-white"
                  } ${dropOpen ? "!text-brand-blue" : ""}`}
                >
                  {l.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 top-full w-[400px] -translate-x-1/2 pt-3"
                      data-testid="services-dropdown"
                    >
                      <div className="rounded border border-brand-line bg-white shadow-[0_20px_45px_-15px_rgba(0,43,85,0.25)]">
                        <ul className="p-2">
                          {SERVICES_NAV.map((s) => {
                            const Icon = DROP_ICONS[s.icon];
                            return (
                              <li key={s.id}>
                                <Link
                                  to={s.path}
                                  data-testid={`dropdown-item-${s.id}`}
                                  className="group flex items-center gap-4 rounded p-4 transition-colors duration-150 hover:bg-brand-mist"
                                >
                                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-brand-line bg-white text-brand-blue">
                                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold tracking-[0.18em] text-brand-net">{s.number}</span>
                                      <span className="font-display text-sm font-bold text-brand-ink">{s.name}</span>
                                    </span>
                                    <span className="mt-1 block text-xs leading-relaxed text-brand-slate">{s.description}</span>
                                  </span>
                                  <ArrowRight
                                    size={16}
                                    className="ml-auto shrink-0 text-brand-blue opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                    aria-hidden="true"
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <Link
                          to="/services"
                          data-testid="dropdown-view-all"
                          className="group flex items-center justify-between border-t border-brand-line px-5 py-3.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-mist"
                        >
                          View All Services
                          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                data-testid={`navbar-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  solid ? "text-brand-ink hover:text-brand-blue" : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/#contact"
            data-testid="navbar-cta-button"
            className={`inline-flex h-10 items-center px-5 text-sm font-semibold transition-all duration-200 ${
              solid
                ? "bg-brand-blue text-white hover:bg-brand-deep"
                : "border border-white/50 text-white hover:bg-white hover:text-brand-deep"
            }`}
          >
            Talk to Our Team
          </Link>
        </div>

        <button
          type="button"
          className={`lg:hidden ${solid ? "text-brand-ink" : "text-white"}`}
          data-testid="navbar-menu-toggle"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-brand-line bg-white px-4 pb-8 pt-2 lg:hidden" aria-label="Mobile">
          <Link to="/" data-testid="navbar-mobile-link-home" className="block border-b border-brand-mist3 py-4 font-display text-lg font-semibold text-brand-ink">
            Home
          </Link>
          <Link to="/#network" data-testid="navbar-mobile-link-network" className="block border-b border-brand-mist3 py-4 font-display text-lg font-semibold text-brand-ink">
            Network
          </Link>

          {/* Services accordion */}
          <div className="border-b border-brand-mist3">
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              aria-expanded={mobileServicesOpen}
              data-testid="navbar-mobile-services-toggle"
              className="flex w-full items-center justify-between py-4 font-display text-lg font-semibold text-brand-ink"
            >
              Services
              <ChevronDown size={20} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {mobileServicesOpen && (
              <ul className="pb-4 pl-4">
                {SERVICES_NAV.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={s.path}
                      data-testid={`navbar-mobile-service-${s.id}`}
                      className="flex items-center gap-3 border-l-2 border-brand-line py-3 pl-4 text-base font-medium text-brand-ink transition-colors hover:border-brand-blue hover:text-brand-blue"
                    >
                      <span className="text-xs font-bold text-brand-net">{s.number}</span>
                      {s.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    data-testid="navbar-mobile-view-all"
                    className="flex items-center gap-2 border-l-2 border-brand-line py-3 pl-4 text-sm font-semibold text-brand-blue"
                  >
                    View All Services
                    <ArrowRight size={14} />
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link to="/#solutions" data-testid="navbar-mobile-link-solutions" className="block border-b border-brand-mist3 py-4 font-display text-lg font-semibold text-brand-ink">
            Solutions
          </Link>
          <Link to="/#about" data-testid="navbar-mobile-link-about" className="block border-b border-brand-mist3 py-4 font-display text-lg font-semibold text-brand-ink">
            About
          </Link>

          <Link
            to="/#contact"
            data-testid="navbar-mobile-cta"
            className="mt-6 flex h-12 items-center justify-center bg-brand-blue text-sm font-semibold text-white"
          >
            Talk to Our Team
          </Link>
        </nav>
      )}
    </header>
  );
}
