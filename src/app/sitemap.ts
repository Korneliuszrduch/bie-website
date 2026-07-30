import type { MetadataRoute } from "next";
import { LOCATIONS, SERVICES } from "@/content/site";
import { getSiteUrl, isIndexingAllowed } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  // Staging: empty sitemap so nothing is advertised for indexing.
  if (!isIndexingAllowed()) {
    return [];
  }

  const base = getSiteUrl();
  const now = new Date();

  const staticPaths = [
    "",
    "/uslugi",
    "/realizacje",
    "/poradnik",
    "/lokalizacje",
    "/o-firmie",
    "/kontakt",
    "/polityka-prywatnosci",
  ];

  const servicePaths = SERVICES.map((s) => s.href);
  const locationPaths = LOCATIONS.filter((l) => l.hasUniqueContent).map(
    (l) => l.href,
  );

  return [...staticPaths, ...servicePaths, ...locationPaths].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/uslugi/") ? 0.8 : 0.6,
  }));
}
