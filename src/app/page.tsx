import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { MapEmbed } from "@/components/MapEmbed";
import { ReviewsSection } from "@/components/ReviewsSection";
import { INDEXABLE_LOCATIONS } from "@/content/site";
import { REALIZATION_PROJECTS } from "@/content/realizations";
import { getAllServices } from "@/content/services";
import { getCompanyConfig } from "@/lib/env";
import { faqPageJsonLd } from "@/lib/jsonld";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./home.module.css";

export const metadata = buildPageMetadata({
  title: "Przeglądy instalacji elektrycznych – Śląsk",
  description:
    "5-letni przegląd instalacji z protokołem, pomiary elektryczne i kompensacja mocy biernej na Śląsku.",
  path: "/",
});

const HOME_FAQ = [
  {
    q: "Czy przegląd to tylko oględziny?",
    a: "Nie. Przegląd obejmuje profesjonalne pomiary instalacji, między innymi rezystancji izolacji, działania wyłączników RCD, impedancji pętli zwarcia, ciągłości przewodów ochronnych oraz uziemienia. Po zakończeniu klient otrzymuje protokół z wynikami i zaleceniami.",
  },
  {
    q: "Jak przygotować wycenę przeglądu?",
    a: "W większości przypadków wystarczy krótka rozmowa telefoniczna lub kilka zdjęć rozdzielnicy. Jeśli będą potrzebne dodatkowe informacje, podpowiemy, co przygotować. Wycena jest bezpłatna i nie zobowiązuje do skorzystania z usługi.",
  },
  {
    q: "Jak zacząć temat kompensacji mocy biernej?",
    a: "Najczęściej wystarczą 2–3 ostatnie faktury za energię elektryczną. Bezpłatnie sprawdzimy, czy występują opłaty za moc bierną i czy zastosowanie kompensatora będzie opłacalne.",
  },
  {
    q: "Jaka jest podstawa prawna przeglądu?",
    a: "Obowiązek okresowej kontroli instalacji elektrycznej wynika z art. 62 ust. 1 pkt 2 ustawy Prawo budowlane. Zakres i częstotliwość przeglądu zależą od rodzaju obiektu oraz warunków jego użytkowania.",
  },
  {
    q: "Czy usuwamy awarie i braki wykryte podczas przeglądu?",
    a: "Tak, po uzgodnieniu. To usługi dodatkowo płatne, ale często jest to tańsze niż wzywanie kolejnego fachowca — znamy już instalację z przeglądu i protokołu.",
  },
  {
    q: "Ile trwa przegląd instalacji elektrycznej?",
    a: "Czas przeglądu zależy od wielkości i rodzaju obiektu. W przypadku domu jednorodzinnego kontrola najczęściej trwa od 2 do 4 godzin. Po zakończeniu pomiarów przygotowujemy protokół z wynikami oraz zaleceniami.",
  },
  {
    q: "Ile kosztuje przegląd instalacji elektrycznej?",
    a: "Cena zależy od wielkości obiektu, liczby rozdzielnic, obwodów i punktów pomiarowych. Przed rozpoczęciem prac przygotowujemy bezpłatną wycenę, dlatego klient zna koszt usługi z wyprzedzeniem.",
  },
  {
    q: "Czy po przeglądzie otrzymam protokół?",
    a: "Tak. Każdy przegląd kończy się przygotowaniem protokołu z wynikami pomiarów, opisem stanu instalacji oraz wykazem ewentualnych usterek i zaleceń.",
  },
  {
    q: "Jak często należy wykonywać przegląd instalacji elektrycznej?",
    a: "W większości budynków okresową kontrolę instalacji elektrycznej wykonuje się co najmniej raz na 5 lat. W niektórych obiektach, szczególnie narażonych na trudne warunki środowiskowe, kontrole mogą być wymagane częściej.",
  },
  {
    q: "Czy przegląd instalacji elektrycznej jest obowiązkowy?",
    a: "Tak. Obowiązek okresowej kontroli instalacji elektrycznej wynika z art. 62 ust. 1 pkt 2 ustawy Prawo budowlane. Regularne przeglądy pomagają również wykrywać usterki, zanim doprowadzą do awarii lub zagrożenia.",
  },
  {
    q: "Czy wykonujecie przeglądy dla firm i zakładów produkcyjnych?",
    a: "Tak. Wykonujemy przeglądy w domach, biurach, wspólnotach mieszkaniowych, magazynach, halach produkcyjnych, zakładach przemysłowych oraz innych obiektach komercyjnych.",
  },
  {
    q: "Czy podczas przeglądu trzeba wyłączyć prąd?",
    a: "Przy części pomiarów może być konieczne krótkotrwałe wyłączenie zasilania. Zakres i czas przerw ustalamy wcześniej z klientem i staramy się ograniczyć je do niezbędnego minimum.",
  },
  {
    q: "Czy można zamówić tylko pomiary elektryczne?",
    a: "Tak. Wykonujemy również wybrane pomiary ochronne, pomiary do odbioru instalacji, pomiary wymagane przez ubezpieczyciela oraz kontrole wskazanych obwodów lub urządzeń.",
  },
  {
    q: "Czy pomiary są wykonywane zgodnie z obowiązującymi przepisami?",
    a: "Tak. Pomiary wykonujemy zgodnie z obowiązującymi przepisami i odpowiednimi normami, przy użyciu profesjonalnych mierników z aktualnymi świadectwami wzorcowania.",
  },
  {
    q: "Na jakim obszarze działacie?",
    a: "Obsługujemy klientów na terenie województwa śląskiego oraz w okolicznych miejscowościach. Dokładny termin i koszt dojazdu ustalamy podczas wyceny.",
  },
];

const STATS = [
  {
    value: "150+",
    label: "przeglądów instalacji z protokołem",
    image: "/images/stats/stat-przeglady-v2.webp",
    imageAlt: "Rozdzielnica po przeglądzie instalacji elektrycznej",
  },
  {
    value: "5+",
    label: "lat doświadczenia na Śląsku",
    image: "/images/stats/stat-doswiadczenie-v2.webp",
    imageAlt: "Samochód serwisowy na Śląsku",
  },
  {
    value: "Domy i firmy",
    label: "ten sam zakres pomiarów i dokumentacji",
    image: "/images/stats/stat-domy-firmy-v2.webp",
    imageAlt: "Dom jednorodzinny i kompensator w firmie",
  },
  {
    value: "Protokół",
    label: "pod ubezpieczyciela i przepisy (art. 62)",
    image: "/images/stats/stat-protokol-v2.webp",
    imageAlt: "Protokół z przeglądu i miernik instalacji",
  },
];

/** Wybrane case’y na home: po 1 z kluczowych kategorii, max 6. */
const HOME_REALIZATIONS = (() => {
  const picks: {
    src: string;
    alt: string;
    location: string;
    href: string;
  }[] = [];
  const preferredKeys = [
    "katowice",
    "dankowice",
    "zabrze",
    "sosnowiec",
    "sosnicowice",
    "pszczyna",
  ];
  for (const key of preferredKeys) {
    for (const project of REALIZATION_PROJECTS) {
      const photo = project.photos.find((p) => p.locationKey === key);
      if (!photo) continue;
      if (picks.some((p) => p.src === photo.src)) continue;
      picks.push({
        src: photo.src,
        alt: photo.alt,
        location: photo.location,
        href: `/realizacje/${project.slug}?foto=${encodeURIComponent(photo.src)}`,
      });
      break;
    }
    if (picks.length >= 6) break;
  }
  return picks;
})();

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
    ].includes(s.slug),
  );

  const homeFaqLd = faqPageJsonLd(
    HOME_FAQ.map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <main>
      {homeFaqLd ? <JsonLd data={homeFaqLd} /> : null}
      <link
        rel="preload"
        as="image"
        href="/images/hero-main.webp"
        type="image/webp"
        // @ts-expect-error fetchPriority is valid on link preload
        fetchPriority="high"
      />
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.badge}>Obsługujemy {company.serviceArea}</p>
            <h1 className={styles.h1}>
              Przeglądy instalacji elektrycznych dla domów i firm. Kompensacja
              mocy biernej po analizie faktur.
            </h1>
            <figure className={styles.heroPhoto}>
              <Image
                src="/images/hero-main.webp"
                alt={`${company.personName} przy aucie serwisowym — przypomnienie o obowiązkowym przeglądzie elektrycznym`}
                width={349}
                height={261}
                priority
                fetchPriority="high"
                sizes="(max-width: 960px) min(100vw, 26rem), 26rem"
                className={styles.heroPhotoImg}
              />
              <figcaption className={styles.heroPhotoCap}>
                {company.personName} · przeglądy instalacji elektrycznych
              </figcaption>
            </figure>
            <p className={styles.lead}>
              Pomiary, nie „papier”. Po przeglądzie dostajesz wyniki i zalecenia.
              Protokół zgodny z wymaganiami ubezpieczycieli i przepisami.
            </p>
            <ul className={styles.bullets}>
              <li>5-letni przegląd instalacji — zakres jak w ofercie</li>
              <li>Protokół z pomiarów (izolacja, uziemienie, RCD, SWZ…)</li>
              <li>Kompensacja mocy biernej — dobór i montaż po analizie faktur</li>
            </ul>
            <div className={styles.heroCtas}>
              <a
                className={styles.btnPhone}
                href={telHref}
                data-cta="home_hero_phone"
              >
                Zadzwoń: {company.phoneDisplay}
              </a>
              <a
                className={styles.btnGhost}
                href="#formularz"
                data-cta="home_hero_form"
              >
                Wypełnij formularz kontaktowy
              </a>
              {tel2 && company.phoneSecondaryDisplay ? (
                <a className={styles.btnGhost} href={tel2}>
                  {company.phoneSecondaryDisplay}
                </a>
              ) : null}
            </div>
          </div>
          <div className={styles.heroForm} id="formularz">
            <LeadForm
              title="Wypełnij formularz kontaktowy"
              submitLabel="Wyślij zgłoszenie"
              defaultService=""
            />
          </div>
        </div>
      </section>

      <section className={styles.statsSection} aria-label="W liczbach">
        <div className={styles.container}>
          <ul className={styles.stats}>
            {STATS.map((stat) => (
              <li key={stat.value} className={styles.stat}>
                <div className={styles.statMedia}>
                  <Image
                    src={stat.image}
                    alt={stat.imageAlt}
                    width={320}
                    height={200}
                    sizes="(max-width: 800px) 45vw, 200px"
                    className={styles.statImg}
                  />
                </div>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="home-realizations">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 id="home-realizations">Realizacje</h2>
            <p>
              Wybrane prace z protokołem i pomiarami — kliknij zdjęcie, żeby
              zobaczyć opis case’u.
            </p>
          </div>
          <ul className={styles.realizationsGrid}>
            {HOME_REALIZATIONS.map((item) => (
              <li key={item.src}>
                <Link href={item.href} className={styles.realizationCard}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={640}
                    height={480}
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                    className={styles.realizationImg}
                  />
                  <span className={styles.realizationLoc}>{item.location}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.more}>
            <Link href="/realizacje">Wszystkie realizacje</Link>
          </p>
        </div>
      </section>

      <ReviewsSection />

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

      <section className={styles.sectionAlt} aria-labelledby="area">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 id="area">Obszar działania</h2>
            <p>Pszczyna i okolice oraz miasta na {company.serviceArea}:</p>
          </div>
          <ul className={styles.chips}>
            {INDEXABLE_LOCATIONS.map((loc) => (
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
                <a href={telHref} data-cta="home_faq_phone">
                  {company.phoneDisplay}
                </a>
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
        <a href={telHref} data-cta="home_bottom_phone">
          Zadzwoń
        </a>
        <a href="#formularz">Wypełnij formularz kontaktowy</a>
      </div>
    </main>
  );
}
