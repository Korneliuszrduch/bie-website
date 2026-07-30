import { PageShell } from "@/components/PageShell";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "O firmie – Bezpieczne Instalacje Elektryczne",
  description:
    "mgr inż. elektryk Korneliusz Rduch — przeglądy pomiarowe, pomiary i kompensacja mocy biernej na Śląsku. K&J Solutions Sp. z o.o.",
  path: "/o-firmie",
});

export default function OFirmiePage() {
  const company = getCompanyConfig();
  return (
    <PageShell
      title="O firmie"
      lead={`${company.name} — przeglądy instalacji wykonywane pomiarowo, z protokołem wyników i zaleceń. Bez „samego papieru”.`}
      crumbs={[{ label: "O firmie" }]}
    >
      <h2>Osoba prowadząca</h2>
      <p>{company.personName}</p>

      <h2>Dane podmiotu</h2>
      <p>
        {company.legalName}
        {company.nip ? ` · NIP ${company.nip}` : ""}
        <br />
        {company.address}
      </p>

      <h2>Jak pracujemy (z ofert i rozmów z klientami)</h2>
      <ul>
        <li>Przegląd pomiarowy — izolacja, uziemienie, PE, SWZ, RCD i inne</li>
        <li>Protokół po zakończeniu prac</li>
        <li>Wycena indywidualna na podstawie danych o instalacji</li>
        <li>
          Kompensacja mocy biernej dopiero po analizie faktur (3 lub 12
          miesięcy)
        </li>
        <li>Możliwość płatności bezgotówkowej</li>
      </ul>

      <h2>Uprawnienia</h2>
      <p>
        Na stronie produkcyjnej WordPress dostępny jest dokument uprawnień (PDF
        D1/E1). Na stagingu nie hostujemy kopii pliku — link pojawi się po
        migracji materiałów.
      </p>

      <h2>Usługi</h2>
      <p>
        <Link href="/uslugi">Zobacz pełną listę usług</Link>
      </p>
    </PageShell>
  );
}
