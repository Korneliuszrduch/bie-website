import type { MetadataRoute } from "next";
import { getCompanyConfig, getSiteUrl } from "@/lib/env";

export default function manifest(): MetadataRoute.Manifest {
  const company = getCompanyConfig();
  return {
    name: company.name,
    short_name: "BIE",
    description:
      "Przeglądy instalacji elektrycznych, pomiary i kompensacja mocy biernej na Śląsku.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F6F8",
    theme_color: "#0C3B5E",
    lang: "pl",
    icons: [
      {
        src: "/icon",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/images/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo-bie-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    id: getSiteUrl(),
  };
}
