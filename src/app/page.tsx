import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { MapEmbed } from "@/components/MapEmbed";
import { ReviewsSection } from "@/components/ReviewsSection";
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
    a: "Art. 62 ust. 1 pkt 2 ustawy – Prawo budowlane.",
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Zgłoszenie",
    d: "Formularz, telefon albo faktury do analizy — ustalamy zakres.",
  },
  {
    n: "02",
    t: "Wycena",
    d: "Indywidualna oferta na podstawie danych o instalacji (cena nie jest z cennika).",
  },
  {
    n: "03",
    t: "Pomiary na obiekcie",
    d: "Przegląd pomiarowy — nie tylko wizualnie.",
  },
  {
    n: "04",
    t: "Protokół",
    d: "Wyniki i zalecenia na piśmie — do ubezpieczyciela i na spokój.",
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
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.badge}>Obsługujemy {company.serviceArea}</p>
            <h1 className={styles.h1}>
              Przeglądy instalacji elektrycznych z protokołem
            </h1>
            <p className={styles.lead}>
              Pomiary, nie „papier”. Po przeglądzie dostajesz wyniki i zalecenia.
              Przy mocy biernej zaczynamy od analizy faktur.
            </p>
            <ul className={styles.bullets}>
              <li>5-letni przegląd instalacji — zakres jak w ofercie</li>
              <li>Protokół z pomiarów (izolacja, uziemienie, RCD, SWZ…)</li>
              <li>Kompensacja mocy biernej po analizie faktur</li>
            </ul>
            <div className={styles.heroCtas}>
              <a className={styles.btnPhone} href={telHref}>
                Zadzwoń: {company.phoneDisplay}
              </a>
              {tel2 && company.phoneSecondaryDisplay ? (
                <a className={styles.btnGhost} href={tel2}>
                  {company.phoneSecondaryDisplay}
                </a>
              ) : null}
              <Link className={styles.btnGhost} href={CTA_LINKS.invoice.href}>
                Wyślij fakturę do analizy
              </Link>
            </div>
            <figure className={styles.heroPhoto}>
              <Image
                src="/images/hero-main.jpg"
                alt={`${company.personName} przy aucie serwisowym — przypomnienie o obowiązkowym przeglądzie elektrycznym`}
                width={800}
                height={600}
                priority
                sizes="(max-width: 960px) 100vw, 420px"
                className={styles.heroPhotoImg}
              />
              <figcaption className={styles.heroPhotoCap}>
                {company.personName} · przeglądy instalacji elektrycznych
              </figcaption>
            </figure>
          </div>
          <div className={styles.heroForm} id="formularz">
            <LeadForm
              title="Umów przegląd / wycenę"
              submitLabel="Wyślij zgłoszenie"
              defaultService=""
            />
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="services">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 id="services">Najważniejsze usługi</h2>
            <p>
              Zakres zgodny z ofertami wysyłanymi do klientów — bez wymyślonych
              cen przeglądu instalacji.
            </p>
          </div>
          <ul className={styles.cards}>
            {featured.map((s) => (
              <li key={s.slug}>
                <Link href={`/uslugi/${s.slug}`} className={styles.card}>
                  <h3>{s.title}</h3>
                  <p>{s.lead}</p>
                  <span>Szczegóły →</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <Link href="/uslugi">Wszystkie usługi</Link>
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="audience">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 id="audience">Dla kogo pracujemy</h2>
          </div>
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

      <section className={styles.section} aria-labelledby="process">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 id="process">Jak wygląda współpraca</h2>
            <p>Prosty przebieg — od zgłoszenia do protokołu.</p>
          </div>
          <ol className={styles.process}>
            {PROCESS.map((step) => (
              <li key={step.n}>
                <span className={styles.stepN}>{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="why">
        <div className={styles.container}>
          <div className={styles.sectionHeadLight}>
            <h2 id="why">Dlaczego warto</h2>
          </div>
          <ul className={styles.why}>
            <li>
              <strong>Pomiary faktyczne</strong>
              <span>Nie robię „tylko papieru” — dostajesz konkretne wyniki.</span>
            </li>
            <li>
              <strong>Protokół po przeglądzie</strong>
              <span>Dokument z zaleceniami, m.in. pod ubezpieczyciela.</span>
            </li>
            <li>
              <strong>Wycena indywidualna</strong>
              <span>Na podstawie danych o instalacji, nie sztywnego cennika.</span>
            </li>
            <li>
              <strong>{company.personName}</strong>
              <span>Uprawnienia elektryczne · płatność bezgotówkowa.</span>
            </li>
          </ul>
        </div>
      </section>

      <ReviewsSection />

      <section className={styles.sectionAlt} aria-labelledby="area">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 id="area">Obszar działania</h2>
            <p>Pszczyna i okolice oraz miasta na {company.serviceArea}:</p>
          </div>
          <ul className={styles.chips}>
            {LOCATIONS.map((loc) => (
              <li key={loc.slug}>
                <Link href={loc.href}>{loc.name}</Link>
              </li>
            ))}
          </ul>
          <MapEmbed title="Mapa — Bezpieczne Instalacje Elektryczne" />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq">
        <div className={styles.containerNarrow}>
          <div className={styles.sectionHead}>
            <h2 id="faq">Najczęstsze pytania</h2>
          </div>
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

      <section className={styles.sectionCta} aria-labelledby="final-cta">
        <div className={styles.container}>
          <div className={styles.finalGrid}>
            <div>
              <h2 id="final-cta">Gotowy na przegląd lub wycenę?</h2>
              <p>
                Zadzwoń albo wypełnij formularz — ustalimy termin i zakres.
              </p>
              <p className={styles.finalPhones}>
                <a href={telHref}>{company.phoneDisplay}</a>
                {tel2 && company.phoneSecondaryDisplay ? (
                  <>
                    {" · "}
                    <a href={tel2}>{company.phoneSecondaryDisplay}</a>
                  </>
                ) : null}
              </p>
            </div>
            <LeadForm
              compact
              title="Szybkie zgłoszenie"
              submitLabel="Wyślij"
              defaultService=""
            />
          </div>
        </div>
      </section>

      <div className={styles.mobileBar}>
        <a href={telHref}>Zadzwoń</a>
        <a href="#formularz">Umów przegląd</a>
      </div>
    </main>
  );
}
