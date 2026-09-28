import { useEffect } from "react";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export default function Seo({ title, description, path, breadcrumbs }) {
  const crumbKey = JSON.stringify(breadcrumbs || []);

  useEffect(() => {
    const url = `https://www.amifiber.com${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    let ld = document.getElementById("breadcrumb-ld");
    if (crumbKey !== "[]") {
      const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: JSON.parse(crumbKey).map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `https://www.amifiber.com${b.path}`,
        })),
      };
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "breadcrumb-ld";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(data);
    } else if (ld) {
      ld.remove();
    }
  }, [title, description, path, crumbKey]);

  return null;
}
