/**
 * Legacy WordPress URL compatibility for production cutover.
 * Used by next.config.ts redirects() and middleware (410).
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Trailing-slash → clean path (same page on Next). */
function slashOnly(path: string): LegacyRedirect {
  const base = path.replace(/\/$/, "") || "/";
  return { source: `${base}/`, destination: base, permanent: true };
}

/** Old path (both slash variants) → new destination. */
function mapOld(oldPath: string, destination: string): LegacyRedirect[] {
  const base = oldPath.replace(/\/$/, "") || "/";
  return [
    { source: base, destination, permanent: true },
    { source: `${base}/`, destination, permanent: true },
  ];
}

/** 301 maps — money / bookmark / email URLs from the old WP site. */
export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  // Same path on Next — only normalize WP trailing slash
  slashOnly("/kontakt"),
  slashOnly("/polityka-prywatnosci"),
  slashOnly("/realizacje"),
  slashOnly("/terminy"),

  // Renamed / moved pages
  ...mapOld("/kwalifikacje", "/o-firmie"),
  ...mapOld(
    "/realizacje-kompensacja-mocy-biernej",
    "/realizacje/kompensacja-mocy-biernej",
  ),
  ...mapOld(
    "/5-letni-przeglad-elektryczny",
    "/uslugi/przeglady-instalacji-elektrycznych",
  ),
  ...mapOld(
    "/5-letni-przeglad-elektryczny-2",
    "/uslugi/przeglady-instalacji-elektrycznych",
  ),
  ...mapOld("/zadowoleni-klienci", "/"),
  ...mapOld("/blog", "/poradnik"),
  ...mapOld("/wygodny-kontakt", "/kontakt"),
  ...mapOld("/dziekuje", "/kontakt"),
  ...mapOld("/form", "/kontakt"),

  // WP media → local public PDFs
  {
    source: "/wp-content/uploads/2026/04/swiadectwo_wzorcowania.pdf",
    destination: "/images/uprawnienia/swiadectwo-wzorcowania.pdf",
    permanent: true,
  },
  {
    source: "/wp-content/uploads/:year/:month/D1_E1.pdf",
    destination: "/images/uprawnienia/uprawnienia-elektryczne-d1-e1.pdf",
    permanent: true,
  },
];

/** Paths that should return HTTP 410 Gone (junk / obsolete WP content). */
const GONE_BASE = [
  "/sklep",
  "/koszyk",
  "/zamowienie",
  "/moje-konto",
  "/edytor-substrybenta",
  "/linki-partnerskie",
  "/category/nagrania",
  "/author/admin",
  "/akceptacja-transakcji-terminal",
  "/szybkosc-terminala",
  "/czy-warto-miec-terminal",
  "/wybor-operatora",
  "/terminal-przenosny-vx675",
];

export const LEGACY_GONE_PATHS: string[] = GONE_BASE.flatMap((p) => [
  p,
  `${p}/`,
]);

export function isLegacyGonePath(pathname: string): boolean {
  const path = decodeURIComponent(pathname).toLowerCase();
  if (LEGACY_GONE_PATHS.includes(path)) return true;
  if (path.startsWith("/sklep/") || path.startsWith("/product/")) return true;
  if (path.startsWith("/category/") || path.startsWith("/author/")) return true;
  return false;
}
