import { PageShell } from "@/components/PageShell";
import { LOCATIONS } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import styles from "./lokalizacje.module.css";

export const metadata = buildPageMetadata({
  title: "Lokalizacje – Pszczyna i Śląsk",
  description:
    "Przeglądy i kompensacja mocy biernej w Pszczynie, Zabrzu, Dąbrowie Górniczej, Sosnowcu i innych miastach Śląska.",
  path: "/lokalizacje",
});

export default function LokalizacjePage() {
  return (
    <PageShell
      title="Lokalizacje"
      lead="Podstawowy obszar: Pszczyna i okolice oraz miasta Śląska. Przy miastach z wykonanymi realizacjami znajdziesz opisy case’ów i formularz kontaktowy."
      crumbs={[{ label: "Lokalizacje" }]}
    >
      <ul className={styles.list}>
        {LOCATIONS.map((loc) => (
          <li key={loc.slug} className={styles.item}>
            <Link href={loc.href} className={styles.link}>
              {loc.name}
            </Link>
            {loc.hasUniqueContent ? (
              <span className={styles.badge}>realizacje + formularz</span>
            ) : null}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
