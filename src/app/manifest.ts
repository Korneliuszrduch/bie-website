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
        sizes: "32x32",
        type: "image/png",
      },
    ],
    id: getSiteUrl(),
  };
}
