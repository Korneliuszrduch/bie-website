import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingAllowed } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  if (!isIndexingAllowed()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      // Intentionally omit sitemap on staging — must not be submitted to Google.
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
