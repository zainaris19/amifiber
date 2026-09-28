import { MARQUEE_ITEMS } from "@/data/content";

export default function Marquee() {
  return (
    <section aria-label="Areas of focus" className="overflow-hidden border-y border-brand-line bg-white py-5">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {MARQUEE_ITEMS.map((item) => (
              <li key={`${copy}-${item}`} className="flex items-center">
                <span className="whitespace-nowrap px-8 font-display text-sm font-bold uppercase tracking-[0.25em] text-brand-deep">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 bg-brand-sky" aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
