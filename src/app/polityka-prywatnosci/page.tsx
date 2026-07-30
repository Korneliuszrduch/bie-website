import { PageShell } from "@/components/PageShell";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Polityka prywatności",
  description:
    "Informacje o przetwarzaniu danych osobowych w związku z formularzem kontaktowym i stroną internetową.",
  path: "/polityka-prywatnosci",
});

export default function PolitykaPage() {
  const company = getCompanyConfig();
  return (
    <PageShell
      title="Polityka prywatności"
      lead="Skrócona wersja na potrzeby stagingu. Przed produkcją zweryfikujemy treść prawną."
      crumbs={[{ label: "Polityka prywatności" }]}
      showCta={false}
    >
      <h2>Administrator danych</h2>
      <p>
        {company.legalName}
        {company.nip ? `, NIP ${company.nip}` : ""}.
        {company.address ? ` Adres: ${company.address}.` : ""}
      </p>
      <h2>Kontakt w sprawie danych</h2>
      <p>
        E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>
      <h2>Zakres</h2>
      <p>
        Dane z formularza kontaktowego (imię, telefon, e-mail, treść zapytania)
        przetwarzamy w celu odpowiedzi na zapytanie i przygotowania oferty.
      </p>
    </PageShell>
  );
}
