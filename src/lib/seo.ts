import type { Metadata } from "next";
import {
  getCompanyConfig,
  getSiteUrl,
  isIndexingAllowed,
  isStaging,
} from "@/lib/env";

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  /** Force noindex even in production (e.g. thin location pages). */
  noIndex?: boolean;
  ogImage?: string;
};

function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stagingRobotsMeta(): Metadata["robots"] {
  return {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: false,
    noimageindex: false,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
    },
  };
}

/** Production thin pages: noindex but still follow links. */
export function productionRobotsMeta(noIndex = false): Metadata["robots"] {
  if (noIndex) {
    return {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    };
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

/**
 * Builds page metadata with a single brand suffix.
 * Uses `title.absolute` so root `title.template` cannot double-append the company name.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogImage,
}: PageSeoInput): Metadata {
  const company = getCompanyConfig();
  const canonical = absoluteUrl(path);
  const fullTitle = title.includes(company.name)
    ? title
    : `${title} | ${company.name}`;

  // Staging lock vs production thin noindex must stay separate.
  const robots =
    isStaging() || !isIndexingAllowed()
      ? stagingRobotsMeta()
      : productionRobotsMeta(noIndex);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: canonical,
      siteName: company.name,
      title: fullTitle,
      description,
      ...(ogImage ? { images: [{ url: absoluteUrl(ogImage) }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function rootMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

export function defaultRootMetadata(): Metadata {
  const company = getCompanyConfig();
  return {
    metadataBase: rootMetadataBase(),
    title: {
      default: `Przeglądy instalacji elektrycznych | ${company.name}`,
      // Fallback only for pages that do not use buildPageMetadata / absolute titles.
      template: `%s | ${company.name}`,
    },
    description:
      "Przeglądy instalacji elektrycznych, pomiary i kompensacja mocy biernej na Śląsku. Umów przegląd lub zamów wycenę.",
    applicationName: company.name,
    authors: [{ name: company.name }],
    creator: company.name,
    publisher: company.legalName || company.name,
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    robots: isStaging() ? stagingRobotsMeta() : productionRobotsMeta(),
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: company.name,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export const X_ROBOTS_TAG_STAGING = "noindex, nofollow, noarchive";
