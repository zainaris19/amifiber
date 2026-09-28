export function LogoMark({ className = "h-7 w-auto" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="amifiber-mark" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0057B8" />
        </linearGradient>
      </defs>
      <path d="M8 56 L19 8 L28 8 L17 56 Z" fill="url(#amifiber-mark)" />
      <path d="M23 56 L34 8 L43 8 L32 56 Z" fill="url(#amifiber-mark)" opacity="0.88" />
      <path d="M38 56 L49 8 L58 8 L47 56 Z" fill="url(#amifiber-mark)" opacity="0.76" />
    </svg>
  );
}

// Real AMIFIBER brand asset (provided logo, background removed):
//  - "dark": original navy wordmark → white/light backgrounds
//  - "light": white wordmark → dark backgrounds (transparent navbar over video, footer)
export default function Logo({ variant = "dark", className = "" }) {
  const src = variant === "light" ? "/images/amifiber-logo-light.png" : "/images/amifiber-logo.png";
  return (
    <img
      src={src}
      alt="AMIFIBER"
      width="1885"
      height="522"
      className={`h-8 w-auto md:h-9 ${className}`}
      data-testid={`brand-logo-${variant}`}
    />
  );
}
