import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getCompanyConfig, getGoogleAppointmentsEmbedUrl } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./terminy.module.css";

export const metadata = buildPageMetadata({
  title: "Umów termin przeglądu instalacji",
  description:
    "Wybierz dogodny termin 5-letniego przeglądu instalacji elektrycznej w kalendarzu online. Obsługujemy Śląsk.",
  path: "/terminy",
});

export default function TerminyPage() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;
  const appointmentsUrl = getGoogleAppointmentsEmbedUrl();

  return (
    <PageShell
      title="Umów przegląd instalacji"
      lead="Wybierz wolny termin w kalendarzu. Po rezerwacji dostaniesz potwierdzenie."
      crumbs={[{ label: "Terminy przeglądów" }]}
      showCta={false}
    >
      <div className={styles.intro}>
        <p>
          Kalendarz dotyczy przeglądu instalacji elektrycznej. Masz pytanie albo
          potrzebujesz wyceny?{" "}
          <a href={telHref} data-cta="terminy_phone">
            Zadzwoń: {company.phoneDisplay}
          </a>
          {" · "}
          <Link href="/kontakt" data-cta="terminy_contact">
            Formularz kontaktowy
          </Link>
        </p>
      </div>

      <div className={styles.calendarWrap}>
        <iframe
          title="Kalendarz – umów przegląd instalacji elektrycznej"
          src={appointmentsUrl}
          className={styles.calendar}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className={styles.fallback}>
        Kalendarz się nie ładuje?{" "}
        <a
          href={appointmentsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-calendar
          data-cta="terminy_calendar"
        >
          Otwórz umawianie terminu w nowej karcie
        </a>
        .
      </p>
    </PageShell>
  );
}
