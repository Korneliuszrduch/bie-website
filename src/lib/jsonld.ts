import { getCompanyConfig, getSiteUrl } from "@/lib/env";

export type JsonLd = Record<string, unknown>;

/** Stable graph id for the single business entity on this site. */
export function businessEntityId(): string {
  return `${getSiteUrl()}/#business`;
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Escape `<` so JSON-LD inside <script> cannot break out. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function postalAddressFromConfig(): JsonLd | undefined {
  const company = getCompanyConfig();
  if (!company.address) return undefined;
  const match = company.address.match(/^(.*?),\s*(\d{2}-\d{3})\s+(.+)$/);
  if (match) {
    return {
      "@type": "PostalAddress",
      streetAddress: match[1].trim(),
      postalCode: match[2],
      addressLocality: match[3].trim(),
      addressCountry: "PL",
    };
  }
  return {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressCountry: "PL",
  };
}

/**
 * One firm entity: Electrician + LocalBusiness + Organization, shared @id.
 * Used by WebSite.publisher and Service.provider.
 */
export function businessJsonLd(): JsonLd {
  const company = getCompanyConfig();
  const url = getSiteUrl();
  const sameAs = [
    company.googleReviewsUrl,
    company.googleReviewUrl,
    company.facebookPostUrl,
  ].filter((value, index, arr) => Boolean(value) && arr.indexOf(value) === index);

  return {
    "@context": "https://schema.org",
    "@type": ["Electrician", "LocalBusiness", "Organization"],
    "@id": businessEntityId(),
    name: company.name,
    legalName: company.legalName || undefined,
    url,
    email: company.email || undefined,
    telephone: company.phone
      ? `+48${company.phone.replace(/\s/g, "")}`
      : undefined,
    taxID: company.nip || undefined,
    logo: absoluteUrl("/images/logo-bie.png"),
    image: [
      absoluteUrl("/images/logo-bie.png"),
      absoluteUrl("/images/hero-main.jpg"),
    ],
    address: postalAddressFromConfig(),
    areaServed: company.serviceArea
      ? { "@type": "AdministrativeArea", name: company.serviceArea }
      : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

/** @deprecated Use businessJsonLd — kept as alias for clear call sites. */
export function organizationJsonLd(): JsonLd {
  return businessJsonLd();
}

/** @deprecated Use businessJsonLd — single entity replaces separate Electrician node. */
export function electricianJsonLd(): JsonLd {
  return businessJsonLd();
}

export function webSiteJsonLd(): JsonLd {
  const company = getCompanyConfig();
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: company.name,
    url,
    inLanguage: "pl-PL",
    publisher: { "@id": businessEntityId() },
  };
}

export function breadcrumbListJsonLd(
  items: { name: string; path?: string }[],
): JsonLd {
  const list = [{ name: "Strona główna", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path
        ? { item: absoluteUrl(item.path) }
        : index === list.length - 1
          ? {}
          : {}),
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}): JsonLd {
  const company = getCompanyConfig();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": businessEntityId() },
    areaServed: company.serviceArea
      ? { "@type": "AdministrativeArea", name: company.serviceArea }
      : undefined,
    serviceType: input.name,
  };
}

export function faqPageJsonLd(
  items: { question: string; answer: string }[],
): JsonLd | null {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
