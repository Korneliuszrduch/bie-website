import { getCompanyConfig, getSiteUrl } from "@/lib/env";

export type JsonLd = Record<string, unknown>;

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Escape `<` so JSON-LD inside <script> cannot break out. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd(): JsonLd {
  const company = getCompanyConfig();
  const url = getSiteUrl();
  const sameAs = [
    company.googleReviewsUrl,
    company.googleReviewUrl,
    company.facebookPostUrl,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: company.name,
    legalName: company.legalName || undefined,
    url,
    email: company.email || undefined,
    telephone: company.phone ? `+48${company.phone.replace(/\s/g, "")}` : undefined,
    taxID: company.nip || undefined,
    address: postalAddressFromConfig(),
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

function postalAddressFromConfig(): JsonLd | undefined {
  const company = getCompanyConfig();
  if (!company.address) return undefined;
  // Address string from site config, e.g. "ul. Borowikowa 3E/4, 43-215 Jankowice"
  const match = company.address.match(
    /^(.*?),\s*(\d{2}-\d{3})\s+(.+)$/,
  );
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

export function electricianJsonLd(): JsonLd {
  const company = getCompanyConfig();
  const url = getSiteUrl();
  const orgId = `${url}/#organization`;

  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${url}/#localbusiness`,
    name: company.name,
    legalName: company.legalName || undefined,
    url,
    email: company.email || undefined,
    telephone: company.phone ? `+48${company.phone.replace(/\s/g, "")}` : undefined,
    image: absoluteUrl("/images/hero-main.jpg"),
    parentOrganization: { "@id": orgId },
    address: postalAddressFromConfig(),
    areaServed: company.serviceArea
      ? { "@type": "AdministrativeArea", name: company.serviceArea }
      : undefined,
    sameAs: company.googleReviewsUrl ? [company.googleReviewsUrl] : undefined,
  };
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
    publisher: { "@id": `${url}/#organization` },
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
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": `${url}/#localbusiness` },
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
