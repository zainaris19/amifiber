import { Link } from "react-router-dom";
import Logo from "./Logo";
import { COMPANY, FOOTER_COLUMNS } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-brand-deeper text-white" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-6 font-display text-lg font-semibold text-white">{COMPANY.tagline}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">{COMPANY.description}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-sky">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link
                          to={l.to}
                          data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                          {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-sm text-white/70 transition-colors hover:text-white"
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">{COMPANY.copyright}</p>
          <div className="flex gap-6">
            <Link to="/" data-testid="footer-privacy-link" className="text-sm text-white/50 transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/" data-testid="footer-terms-link" className="text-sm text-white/50 transition-colors hover:text-white">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
