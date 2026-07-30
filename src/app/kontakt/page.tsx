import { LeadForm } from "@/components/LeadForm";
import { MapEmbed } from "@/components/MapEmbed";
import { PageShell } from "@/components/PageShell";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import styles from "./kontakt.module.css";

export const metadata = buildPageMetadata({
  title: "Kontakt – umów przegląd lub wyślij fakturę",
  description:
    "Umów 5-letni przegląd instalacji, zamów wycenę lub wyślij faktury do analizy mocy biernej.",
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
      lead="Umów przegląd, zamów wycenę albo wyślij faktury do analizy mocy biernej."
      crumbs={[{ label: "Kontakt" }]}
      showCta={false}
    >
      <div className={styles.grid}>
        <div>
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
          </p>
          <h2>Tematy</h2>
          <ul>
            <li>Umów przegląd instalacji</li>
            <li>Zamów wycenę (dane instalacji / zdjęcia rozdzielnicy)</li>
            <li>
              <Link href="/uslugi/kompensacja-mocy-biernej">
                Analiza faktur — moc bierna
              </Link>
            </li>
          </ul>
        </div>
        <LeadForm title="Formularz kontaktowy" submitLabel="Wyślij" />
      </div>
      <MapEmbed title="Mapa i lokalizacja" />
    </PageShell>
  );
}
