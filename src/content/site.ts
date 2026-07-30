export type NavItem = {
  href: string;
  label: string;
  children?: NavItem[];
};

export type ServiceSummary = {
  slug: string;
  title: string;
  shortDescription: string;
  href: string;
};

export type LocationSummary = {
  slug: string;
  name: string;
  href: string;
  /** When false, page should stay noindex until unique content exists. */
  hasUniqueContent: boolean;
};

export const SERVICES: ServiceSummary[] = [
  {
    slug: "przeglady-instalacji-elektrycznych",
    title: "Przeglądy instalacji elektrycznych",
    shortDescription:
      "Okresowe przeglądy instalacji z protokołem – domy, firmy i obiekty usługowe.",
    href: "/uslugi/przeglady-instalacji-elektrycznych",
  },
  {
    slug: "pomiary-elektryczne",
    title: "Pomiary elektryczne",
    shortDescription:
      "Pomiary ochronne i odbiorcze zgodne z normami, z dokumentacją dla ubezpieczyciela.",
    href: "/uslugi/pomiary-elektryczne",
  },
  {
    slug: "przeglady-elektryczne-domow",
    title: "Przeglądy elektryczne domów",
    shortDescription:
      "Przeglądy 5-letnie instalacji w domach jednorodzinnych i lokalach mieszkalnych.",
    href: "/uslugi/przeglady-elektryczne-domow",
  },
  {
    slug: "przeglady-elektryczne-firm",
    title: "Przeglądy elektryczne firm",
    shortDescription:
      "Przeglądy i dokumentacja dla biur, sklepów, zakładów i wspólnot.",
    href: "/uslugi/przeglady-elektryczne-firm",
  },
  {
    slug: "kompensacja-mocy-biernej",
    title: "Kompensacja mocy biernej",
    shortDescription:
      "Analiza faktur i dobór kompensacji – niższe opłaty za energię bierną.",
    href: "/uslugi/kompensacja-mocy-biernej",
  },
  {
    slug: "analiza-jakosci-energii",
    title: "Analiza jakości energii",
    shortDescription:
      "Pomiary jakości zasilania, zakłóceń i parametrów sieci w obiekcie.",
    href: "/uslugi/analiza-jakosci-energii",
  },
  {
    slug: "modernizacja-rozdzielnic",
    title: "Modernizacja rozdzielnic",
    shortDescription:
      "Wymiana i modernizacja rozdzielnic elektrycznych pod kątem bezpieczeństwa.",
    href: "/uslugi/modernizacja-rozdzielnic",
  },
  {
    slug: "ochrona-przeciwprzepieciowa",
    title: "Ochrona przeciwprzepięciowa",
    shortDescription:
      "Dobór i montaż ochrony SPD dla instalacji i urządzeń wrażliwych.",
    href: "/uslugi/ochrona-przeciwprzepieciowa",
  },
  {
    slug: "magazyny-energii",
    title: "Magazyny energii",
    shortDescription:
      "Doradztwo i wykonawstwo w zakresie magazynów energii dla obiektów.",
    href: "/uslugi/magazyny-energii",
  },
  {
    slug: "systemy-ems",
    title: "Systemy EMS",
    shortDescription:
      "Systemy zarządzania energią – monitoring i optymalizacja zużycia.",
    href: "/uslugi/systemy-ems",
  },
];

export const LOCATIONS: LocationSummary[] = [
  {
    slug: "pszczyna",
    name: "Pszczyna",
    href: "/lokalizacje/pszczyna",
    hasUniqueContent: true,
  },
  {
    slug: "zabrze",
    name: "Zabrze",
    href: "/lokalizacje/zabrze",
    hasUniqueContent: true,
  },
  {
    slug: "dabrowa-gornicza",
    name: "Dąbrowa Górnicza",
    href: "/lokalizacje/dabrowa-gornicza",
    hasUniqueContent: true,
  },
  {
    slug: "sosnowiec",
    name: "Sosnowiec",
    href: "/lokalizacje/sosnowiec",
    hasUniqueContent: true,
  },
  {
    slug: "sosnicowice",
    name: "Sośnicowice",
    href: "/lokalizacje/sosnicowice",
    hasUniqueContent: true,
  },
  {
    slug: "tychy",
    name: "Tychy",
    href: "/lokalizacje/tychy",
    hasUniqueContent: false,
  },
  {
    slug: "zory",
    name: "Żory",
    href: "/lokalizacje/zory",
    hasUniqueContent: false,
  },
  {
    slug: "rybnik",
    name: "Rybnik",
    href: "/lokalizacje/rybnik",
    hasUniqueContent: false,
  },
  {
    slug: "katowice",
    name: "Katowice",
    href: "/lokalizacje/katowice",
    hasUniqueContent: false,
  },
  {
    slug: "gliwice",
    name: "Gliwice",
    href: "/lokalizacje/gliwice",
    hasUniqueContent: true,
  },
];

export const MAIN_NAV: NavItem[] = [
  {
    href: "/uslugi",
    label: "Usługi",
    children: SERVICES.map((s) => ({ href: s.href, label: s.title })),
  },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/poradnik", label: "Poradnik" },
  {
    href: "/lokalizacje",
    label: "Lokalizacje",
    children: LOCATIONS.map((l) => ({ href: l.href, label: l.name })),
  },
  { href: "/o-firmie", label: "O firmie" },
  { href: "/kontakt", label: "Kontakt" },
];

export const CTA_LINKS = {
  review: { href: "/kontakt?temat=przeglad", label: "Umów przegląd" },
  quote: { href: "/kontakt?temat=wycena", label: "Zamów wycenę" },
  invoice: {
    href: "/kontakt?temat=analiza-faktury",
    label: "Wyślij fakturę do analizy",
  },
} as const;
