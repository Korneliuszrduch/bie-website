import Link from "next/link";
import { CTA_LINKS, LOCATIONS } from "@/content/site";
import { getAllServices } from "@/content/services";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./home.module.css";

export const metadata = buildPageMetadata({
  title:
    "Przeglądy instalacji elektrycznych, pomiary i kompensacja mocy biernej",
  description:
    "5-letni przegląd instalacji z protokołem, pomiary elektryczne i kompensacja mocy biernej na Śląsku. Umów przegląd lub wyślij fakturę do analizy.",
  path: "/",
});

const HOME_FAQ = [
  {
    q: "Czy przegląd to tylko oględziny?",
    a: "Nie. W ofercie 5-letniego przeglądu są pomiary izolacji, uziemienia, ciągłości PE, SWZ, test RCD i inne elementy — na końcu protokół z zaleceniami.",
  },
  {
    q: "Jak przygotować wycenę przeglądu?",
    a: "Potrzebuję m.in. liczby gniazdek, RCD, rozdzielnic, informacji o odgromowej oraz zdjęć rozdzielnicy.",
  },
  {
    q: "Jak zacząć temat kompensacji mocy biernej?",
    a: "Wyślij 3 ostatnie faktury za energię (przy sezonowości — 12 miesięcy). Na ich podstawie sprawdzę, czy i w jakiej ilości występuje moc bierna.",
  },
  {
    q: "Jaka jest podstawa prawna przeglądu?",
    a: "Art. 62 ust. 1 pkt 2 ustawy – Prawo budowlane (jak w ofercie wysyłanej do klientów).",
  },
];

export default function HomePage() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;
  const tel2 = company.phoneSecondary
    ? `tel:+48${company.phoneSecondary.replace(/\s/g, "")}`
    : null;
  const featured = getAllServices().filter((s) =>
    [
      "przeglady-instalacji-elektrycznych",
      "pomiary-elektryczne",
      "kompensacja-mocy-biernej",
      "przeglady-elektryczne-firm",
      "przeglady-elektryczne-domow",
      "modernizacja-rozdzielnic",
    ].includes(s.slug),
  );

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{company.name}</p>
          <h1 className={styles.h1}>
            Przeglądy instalacji elektrycznych, pomiary i kompensacja mocy
            biernej na {company.serviceArea}
          </h1>
          <p className={styles.lead}>
            Przegląd wykonuję pomiarowo — nie tylko wizualnie. Po pracy
            otrzymujesz protokół z wynikami i zaleceniami. Przy mocy biernej
            zaczynamy od analizy faktur, a nie od zgadywania ceny urządzenia.
          </p>
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} href={CTA_LINKS.review.href}>
              {CTA_LINKS.review.label}
            </Link>
            <Link className={styles.btnSecondary} href={CTA_LINKS.quote.href}>
              {CTA_LINKS.quote.label}
            </Link>
            <Link className={styles.btnGhost} href={CTA_LINKS.invoice.href}>
              {CTA_LINKS.invoice.label}
            </Link>
            <a className={styles.btnPhone} href={telHref}>
              Zadzwoń: {company.phoneDisplay}
            </a>
            {tel2 && company.phoneSecondaryDisplay ? (
              <a className={styles.btnPhone} href={tel2}>
                {company.phoneSecondaryDisplay}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="services-heading">
        <div className={styles.container}>
          <h2 id="services-heading" className={styles.h2}>
            Najważniejsze usługi
          </h2>
          <p className={styles.sectionLead}>
            Zakres jak w ofertach wysyłanych do klientów: przegląd 5-letni z
            protokołem, pomiary, kompensacja mocy biernej po analizie faktur.
          </p>
          <ul className={styles.cardGrid}>
            {featured.map((service) => (
              <li key={service.slug} className={styles.card}>
                <h3 className={styles.h3}>
                  <Link href={`/uslugi/${service.slug}`}>{service.title}</Link>
                </h3>
                <p>{service.lead}</p>
              </li>
            ))}
          </ul>
          <p>
            <Link className={styles.textLink} href="/uslugi">
              Wszystkie usługi
            </Link>
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="audience-heading">
        <div className={styles.container}>
          <h2 id="audience-heading" className={styles.h2}>
            Dla kogo pracujemy
          </h2>
          <ul className={styles.chips}>
            {[
              "domy",
              "firmy",
              "zakłady produkcyjne",
              "hale",
              "wspólnoty",
              "obiekty usługowe",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="why-heading">
        <div className={styles.container}>
          <h2 id="why-heading" className={styles.h2}>
            Dlaczego warto wybrać firmę
          </h2>
          <ul className={styles.bullets}>
            <li>
              Pomiary faktyczne — nie robię „tylko papieru”; dostajesz konkretną
              informację, co wymaga poprawy
            </li>
            <li>
              Protokół z wynikami po przeglądzie (zakres jak w ofercie 5-letniej)
            </li>
            <li>Uprawnienia elektryczne (PDF dostępny na żądanie / na WP)</li>
            <li>Możliwość płatności bezgotówkowej</li>
            <li>Obsługa klientów indywidualnych i firm na {company.serviceArea}</li>
            <li>mgr inż. elektryk Korneliusz Rduch</li>
          </ul>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="scope-heading">
        <div className={styles.container}>
          <h2 id="scope-heading" className={styles.h2}>
            Zakres przeglądu 5-letniego (z oferty)
          </h2>
          <ul className={styles.bullets}>
            <li>Oględziny instalacji i rozdzielnic</li>
            <li>Pomiary rezystancji izolacji (Up 500 V DC)</li>
            <li>Ciągłość przewodów ochronnych, uziemienie, SWZ</li>
            <li>Test RCD, kolejność faz</li>
            <li>PV i odgromowa — jeśli dotyczy</li>
          </ul>
          <p className={styles.sectionLead}>
            Podstawa prawna: art. 62 ust. 1 pkt 2 ustawy – Prawo budowlane.
            Oferta ważna 12 miesięcy. Cena — indywidualna.
          </p>
          <Link
            className={styles.textLink}
            href="/uslugi/przeglady-instalacji-elektrycznych"
          >
            Szczegóły przeglądu instalacji
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <div className={styles.container}>
          <h2 id="projects-heading" className={styles.h2}>
            Realizacje
          </h2>
          <p className={styles.sectionLead}>
            Na etapie testowym nie publikujemy fikcyjnych case studies. Prawdziwe
            realizacje dodamy po dostarczeniu materiałów (m.in. kompensacja mocy
            biernej).
          </p>
          <Link className={styles.textLink} href="/realizacje">
            Sekcja realizacji
          </Link>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="area-heading">
        <div className={styles.container}>
          <h2 id="area-heading" className={styles.h2}>
            Obszar działania
          </h2>
          <p className={styles.sectionLead}>
            Działamy na {company.serviceArea} — m.in. Pszczyna i okolice oraz:
          </p>
          <ul className={styles.chips}>
            {LOCATIONS.map((loc) => (
              <li key={loc.slug}>
                <Link href={loc.href}>{loc.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="reviews-heading">
        <div className={styles.container}>
          <h2 id="reviews-heading" className={styles.h2}>
            Opinie klientów
          </h2>
          <p className={styles.placeholder}>
            Placeholder — bez fikcyjnych opinii. Po migracji można podłączyć
            zweryfikowane referencje / wizytówkę Google.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="faq-heading">
        <div className={styles.container}>
          <h2 id="faq-heading" className={styles.h2}>
            FAQ
          </h2>
          <div className={styles.faq}>
            {HOME_FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="contact-heading">
        <div className={styles.container}>
          <h2 id="contact-heading" className={styles.h2}>
            Formularz i dane kontaktowe
          </h2>
          <p className={styles.sectionLead}>
            Pełny formularz z API leadów — etap 3. Teraz zadzwoń lub napisz:
          </p>
          <p>
            <strong>Tel.</strong>{" "}
            <a href={telHref}>{company.phoneDisplay}</a>
            {company.phoneSecondaryDisplay ? (
              <>
                {" · "}
                <a href={tel2!}>{company.phoneSecondaryDisplay}</a>
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
          <div className={styles.ctaRow}>
            <Link className={styles.btnPrimary} href="/kontakt">
              Przejdź do kontaktu
            </Link>
            <Link className={styles.btnGhost} href={CTA_LINKS.invoice.href}>
              Wyślij fakturę do analizy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
