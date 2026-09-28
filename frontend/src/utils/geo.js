// Shared linear projection helper for static SVG geo diagrams.
export function makeProjector(bbox, width, height, padding = 30) {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  const spanLon = maxLon - minLon;
  const spanLat = maxLat - minLat;
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;
  const scale = Math.min(usableW / spanLon, usableH / spanLat);
  const offX = (width - scale * spanLon) / 2;
  const offY = (height - scale * spanLat) / 2;
  return ([lon, lat]) => [offX + (lon - minLon) * scale, offY + (maxLat - lat) * scale];
}

export function pathThroughPoints(project, points) {
  return points
    .map((p, i) => {
      const [x, y] = project(p);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}
