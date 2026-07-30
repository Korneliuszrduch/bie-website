import { PageShell } from "@/components/PageShell";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Kontakt – umów przegląd lub wyślij fakturę",
  description:
    "Umów 5-letni przegląd instalacji, zamów wycenę lub wyślij faktury do analizy mocy biernej. Telefony i e-mail.",
  path: "/kontakt",
});

export default function KontaktPage() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;
  const tel2 = company.phoneSecondary
    ? `tel:+48${company.phoneSecondary.replace(/\s/g, "")}`
    : null;

  return (
    <PageShell
      title="Kontakt"
      lead="Umów przegląd, zamów wycenę albo wyślij faktury do analizy mocy biernej. Formularz z walidacją i API leadów — w kolejnym etapie."
      crumbs={[{ label: "Kontakt" }]}
      showCta={false}
    >
      <h2>Dane kontaktowe</h2>
      <p>
        <strong>{company.personName}</strong>
        <br />
        <strong>Telefon:</strong>{" "}
        <a href={telHref}>{company.phoneDisplay}</a>
        {company.phoneSecondaryDisplay && tel2 ? (
          <>
            {" · "}
            <a href={tel2}>{company.phoneSecondaryDisplay}</a>
          </>
        ) : null}
        <br />
        <strong>E-mail:</strong>{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>
        <br />
        <strong>Adres:</strong> {company.address}
        <br />
        <strong>Podmiot:</strong> {company.legalName}
        {company.nip ? `, NIP ${company.nip}` : ""}
      </p>

      <h2>Tematy zapytań (jak w ofertach CRM)</h2>
      <ul>
        <li>
          <Link href="/kontakt?temat=przeglad">Umów przegląd</Link> — 5-letni
          przegląd instalacji z pomiarami i protokołem
        </li>
        <li>
          <Link href="/kontakt?temat=wycena">Zamów wycenę</Link> — prześlij dane
          instalacji (gniazdka, RCD, rozdzielnice, odgromowa, zdjęcia)
        </li>
        <li>
          <Link href="/kontakt?temat=analiza-faktury">
            Wyślij fakturę do analizy
          </Link>{" "}
          — 3 ostatnie faktury (lub 12 przy sezonowości)
        </li>
      </ul>

      <h2>Co napisać w wiadomości</h2>
      <p>
        Dla przeglądu: miasto, typ obiektu, orientacyjny zakres instalacji.
        Dla kompensacji: załącz lub opisz faktury za energię.
      </p>
    </PageShell>
  );
}
