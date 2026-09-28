import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/data/company";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-brand-line bg-white/95 backdrop-blur-sm" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[76px] lg:px-8">
        <a href="#home" data-testid="navbar-brand-logo" aria-label="AMIFIBER — home" onClick={() => setOpen(false)}>
          <Logo variant={solid ? "dark" : "light"} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`navbar-link-${l.href.slice(1)}`}
              className={`text-sm font-medium transition-colors duration-200 ${
                solid ? "text-brand-ink hover:text-brand-blue" : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            data-testid="navbar-cta-button"
            className={`inline-flex h-10 items-center px-5 text-sm font-semibold transition-all duration-200 ${
              solid
                ? "bg-brand-blue text-white hover:bg-brand-deep"
                : "border border-white/50 text-white hover:bg-white hover:text-brand-deep"
            }`}
          >
            Talk to Our Team
          </a>
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
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              data-testid={`navbar-mobile-link-${l.href.slice(1)}`}
              className="block border-b border-brand-mist3 py-4 font-display text-lg font-semibold text-brand-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            data-testid="navbar-mobile-cta"
            className="mt-6 flex h-12 items-center justify-center bg-brand-blue text-sm font-semibold text-white"
          >
            Talk to Our Team
          </a>
        </nav>
      )}
    </header>
  );
}
