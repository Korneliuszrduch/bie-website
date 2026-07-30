import { PageShell } from "@/components/PageShell";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

type Loc = {
  slug: string;
  name: string;
  locative: string;
  h1: string;
};

const LOC: Record<string, Loc> = {
  tychy: {
    slug: "tychy",
    name: "Tychy",
    locative: "Tychach",
    h1: "Usługi elektryczne w Tychach",
  },
  zory: {
    slug: "zory",
    name: "Żory",
    locative: "Żorach",
    h1: "Usługi elektryczne w Żorach",
  },
  rybnik: {
    slug: "rybnik",
    name: "Rybnik",
    locative: "Rybniku",
    h1: "Usługi elektryczne w Rybniku",
  },
  katowice: {
    slug: "katowice",
    name: "Katowice",
    locative: "Katowicach",
    h1: "Usługi elektryczne w Katowicach",
  },
  gliwice: {
    slug: "gliwice",
    name: "Gliwice",
    locative: "Gliwicach",
    h1: "Usługi elektryczne w Gliwicach",
  },
};

function LocationBody({ loc }: { loc: Loc }) {
  const company = getCompanyConfig();
  return (
    <PageShell
      title={loc.h1}
      lead={`Przeglądy instalacji, pomiary i kompensacja mocy biernej — dojazd do ${loc.locative} w ramach obszaru ${company.serviceArea}.`}
      crumbs={[
        { label: "Lokalizacje", href: "/lokalizacje" },
        { label: loc.name },
      ]}
    >
      <h2>Zakres usług w {loc.locative}</h2>
      <ul>
        <li>
          <Link href="/uslugi/przeglady-instalacji-elektrycznych">
            Przeglądy instalacji elektrycznych
          </Link>
        </li>
        <li>
          <Link href="/uslugi/pomiary-elektryczne">Pomiary elektryczne</Link>
        </li>
        <li>
          <Link href="/uslugi/kompensacja-mocy-biernej">
            Kompensacja mocy biernej
          </Link>
        </li>
        <li>
          <Link href="/uslugi/przeglady-elektryczne-firm">
            Przeglądy firm i maszyn
          </Link>
        </li>
      </ul>
      <h2>Dojazd</h2>
      <p>
        Dojeżdżamy do {loc.locative} z obszaru Pszczyna / {company.serviceArea}.
        Termin ustalamy indywidualnie.
      </p>
      <h2>Kontakt</h2>
      <p>
        <Link href={`/kontakt?miasto=${loc.slug}`}>
          Formularz z miastem {loc.name}
        </Link>
      </p>
      <p>
        <em>
          Strona lokalna ma na razie ograniczoną unikalną treść — meta robots:
          noindex do czasu rozbudowy.
        </em>
      </p>
    </PageShell>
  );
}

export function makeLocationPage(slug: keyof typeof LOC) {
  const loc = LOC[slug];
  return function LocationPage() {
    return <LocationBody loc={loc} />;
  };
}

export function makeLocationMetadata(slug: keyof typeof LOC) {
  const loc = LOC[slug];
  return buildPageMetadata({
    title: loc.h1,
    description: `Przeglądy instalacji elektrycznych, pomiary i kompensacja mocy biernej — ${loc.name} i okolice.`,
    path: `/lokalizacje/${loc.slug}`,
    noIndex: true,
  });
}
