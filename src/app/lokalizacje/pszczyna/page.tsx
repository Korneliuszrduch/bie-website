import Link from "next/link";
import { LocationLead } from "@/components/LocationLead";
import { PageShell } from "@/components/PageShell";
import { RelatedRealizations } from "@/components/RelatedRealizations";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Przeglądy i pomiary elektryczne w Pszczynie",
  description:
    "5-letni przegląd instalacji, pomiary i kompensacja mocy biernej w Pszczynie i okolicach. Realizacje: sklep rybny, browar, Goczałkowice, Kozy.",
  path: "/lokalizacje/pszczyna",
});

export default function PszczynaPage() {
  const company = getCompanyConfig();

  return (
    <PageShell
      title="Przeglądy i pomiary elektryczne w Pszczynie"
      lead={`Działamy w Pszczynie i okolicach — przeglądy pomiarowe instalacji, pomiary oraz analiza faktur pod kątem mocy biernej. Siedziba: ${company.address}.`}
      crumbs={[
        { label: "Lokalizacje", href: "/lokalizacje" },
        { label: "Pszczyna" },
      ]}
    >
      <h2>Zakres usług w Pszczynie</h2>
      <ul>
        <li>
          <Link href="/uslugi/przeglady-instalacji-elektrycznych">
            5-letni przegląd instalacji elektrycznej
          </Link>{" "}
          — pomiary + protokół
        </li>
        <li>
          <Link href="/uslugi/pomiary-elektryczne">Pomiary elektryczne</Link>
        </li>
        <li>
          <Link href="/uslugi/przeglady-elektryczne-domow">
            Przeglądy w domach
          </Link>
        </li>
        <li>
          <Link href="/uslugi/przeglady-elektryczne-firm">
            Przeglądy firm i maszyn
          </Link>
        </li>
        <li>
          <Link href="/uslugi/kompensacja-mocy-biernej">
            Kompensacja mocy biernej
          </Link>{" "}
          — najpierw faktury
        </li>
      </ul>

      <h2>Dojazd</h2>
      <p>
        Obsługujemy Pszczynę i okolice (m.in. Goczałkowice-Zdrój, Kozy) w ramach
        obszaru {company.serviceArea}. Termin i dojazd ustalamy przy wycenie.
      </p>

      <h2>FAQ — Pszczyna</h2>
      <details>
        <summary>Czy dojazd do Pszczyny jest w ofercie?</summary>
        <p>
          Tak — to podstawowy obszar działania. Szczegóły terminu podamy przy
          umówieniu przeglądu lub wycenie.
        </p>
      </details>
      <details>
        <summary>Jak szybko umówić przegląd?</summary>
        <p>
          Zadzwoń pod {company.phoneDisplay}
          {company.phoneSecondaryDisplay
            ? ` lub ${company.phoneSecondaryDisplay}`
            : ""}{" "}
          albo zostaw kontakt w formularzu poniżej.
        </p>
      </details>

      <RelatedRealizations
        locationSlug="pszczyna"
        heading="Realizacje w Pszczynie i okolicach"
      />

      <LocationLead
        cityName="Pszczyna"
        defaultCity="Pszczyna"
        defaultService="przeglad"
      />
    </PageShell>
  );
}
