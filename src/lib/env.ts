/**
 * Environment helpers with hard staging safety.
 * Hosts under nowa.* can never enable public indexing.
 */

export type SiteEnv = "staging" | "production";

function readEnv(name: string, fallback = ""): string {
  return (process.env[name] ?? fallback).trim();
}

export function getSiteUrl(): string {
  const raw = readEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
  return raw.replace(/\/$/, "");
}

export function getConfiguredSiteEnv(): SiteEnv {
  return readEnv("SITE_ENV", "staging") === "production"
    ? "production"
    : "staging";
}

/** True when public URL or host looks like the staging subdomain. */
export function isNowaStagingHost(hostnameOrUrl?: string): boolean {
  const value = (hostnameOrUrl ?? getSiteUrl()).toLowerCase();
  try {
    const host = value.includes("://")
      ? new URL(value).hostname
      : value.split("/")[0].split(":")[0];
    return host === "nowa.bezpieczneinstalacjeelektryczne.pl" || host.startsWith("nowa.");
  } catch {
    return value.includes("nowa.bezpieczneinstalacjeelektryczne.pl");
  }
}

/**
 * Effective environment after safety lock.
 * Production indexing is allowed only when SITE_ENV=production AND host is not nowa.*.
 */
export function getEffectiveSiteEnv(hostname?: string): SiteEnv {
  if (isNowaStagingHost(hostname) || isNowaStagingHost()) {
    return "staging";
  }
  return getConfiguredSiteEnv();
}

export function isStaging(hostname?: string): boolean {
  return getEffectiveSiteEnv(hostname) === "staging";
}

export function isIndexingAllowed(hostname?: string): boolean {
  return !isStaging(hostname);
}

export function getCompanyConfig() {
  return {
    name: readEnv(
      "NEXT_PUBLIC_COMPANY_NAME",
      "Bezpieczne Instalacje Elektryczne",
    ),
    legalName: readEnv(
      "NEXT_PUBLIC_COMPANY_LEGAL_NAME",
      "K&J Solutions Sp. z o.o.",
    ),
    nip: readEnv("NEXT_PUBLIC_COMPANY_NIP", "6381853954"),
    phone: readEnv("NEXT_PUBLIC_COMPANY_PHONE", "730222105"),
    phoneDisplay: readEnv(
      "NEXT_PUBLIC_COMPANY_PHONE_DISPLAY",
      "730 222 105",
    ),
    /** Optional second number — leave empty to show only the primary phone. */
    phoneSecondary: readEnv("NEXT_PUBLIC_COMPANY_PHONE_SECONDARY", ""),
    phoneSecondaryDisplay: readEnv(
      "NEXT_PUBLIC_COMPANY_PHONE_SECONDARY_DISPLAY",
      "",
    ),
    email: readEnv(
      "NEXT_PUBLIC_COMPANY_EMAIL",
      "przeglady@bezpieczneinstalacjeelektryczne.pl",
    ),
    address: readEnv(
      "NEXT_PUBLIC_COMPANY_ADDRESS",
      "ul. Borowikowa 3E/4, 43-215 Jankowice",
    ),
    personName: readEnv(
      "NEXT_PUBLIC_PERSON_NAME",
      "mgr inż. elektryk Korneliusz Rduch",
    ),
    serviceArea: readEnv("NEXT_PUBLIC_SERVICE_AREA", "Śląsk"),
    googleReviewUrl: readEnv(
      "NEXT_PUBLIC_GOOGLE_REVIEW_URL",
      "https://g.page/r/CdxehSpgWU54EAE/review",
    ),
    /** Wizytówka / lista opinii (bez /review = podgląd, nie formularz). */
    googleReviewsUrl: readEnv(
      "NEXT_PUBLIC_GOOGLE_REVIEWS_URL",
      "https://g.page/r/CdxehSpgWU54EAE",
    ),
    credentialsPdfUrl: readEnv(
      "NEXT_PUBLIC_CREDENTIALS_PDF_URL",
      "/images/uprawnienia/uprawnienia-elektryczne-d1-e1.pdf",
    ),
    calibrationPdfUrl: readEnv(
      "NEXT_PUBLIC_CALIBRATION_PDF_URL",
      "https://bezpieczneinstalacjeelektryczne.pl/wp-content/uploads/2026/04/swiadectwo_wzorcowania.pdf",
    ),
    facebookPostUrl: readEnv(
      "NEXT_PUBLIC_FACEBOOK_POST_URL",
      "https://www.facebook.com/photo/?fbid=122145789008779573&set=a.122145789620779573",
    ),
  };
}

export function isBasicAuthEnabled(): boolean {
  const flag = readEnv("BASIC_AUTH_ENABLED", "false").toLowerCase();
  return flag === "true" || flag === "1" || flag === "yes";
}

export function getBasicAuthCredentials(): { user: string; password: string } {
  return {
    user: readEnv("BASIC_AUTH_USER", "bie"),
    password: readEnv("BASIC_AUTH_PASSWORD", ""),
  };
}
