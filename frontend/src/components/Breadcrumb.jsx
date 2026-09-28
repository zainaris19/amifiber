import { Link } from "react-router-dom";

export default function Breadcrumb({ items, light = true }) {
  return (
    <nav aria-label="Breadcrumb" data-testid="breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 text-xs ${light ? "text-white/70" : "text-brand-slate"}`}>
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className={light ? "text-white" : "text-brand-ink"}>
                {item.name}
              </span>
            ) : (
              <Link to={item.path} className="transition-colors hover:text-white">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
