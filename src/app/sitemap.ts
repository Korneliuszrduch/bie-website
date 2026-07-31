import type { MetadataRoute } from "next";
import { REALIZATION_PROJECTS } from "@/content/realizations";
import { LOCATIONS } from "@/content/site";
import { getAllServices } from "@/content/services";
import { getSiteUrl, isIndexingAllowed } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  // Staging: empty sitemap so nothing is advertised for indexing.
  if (!isIndexingAllowed()) {
    return [];
  }

  const base = getSiteUrl();
  const now = new Date();

  // /poradnik stays in nav but is temporarily noindex until ≥3 articles exist.
  const staticPaths = [
    "",
    "/uslugi",
    "/realizacje",
    "/lokalizacje",
    "/o-firmie",
    "/terminy",
    "/kontakt",
    "/polityka-prywatnosci",
  ];

  const servicePaths = getAllServices()
    .filter((s) => !s.thinContent)
    .map((s) => `/uslugi/${s.slug}`);

  // Locations without unique content are noindex — keep them out of the sitemap.
  const locationPaths = LOCATIONS.filter((l) => l.hasUniqueContent).map(
    (l) => l.href,
  );
  const realizationPaths = REALIZATION_PROJECTS.map(
    (p) => `/realizacje/${p.slug}`,
  );

  return [
    ...staticPaths,
    ...servicePaths,
    ...locationPaths,
    ...realizationPaths,
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/uslugi/") ? 0.8 : 0.6,
  }));
}
