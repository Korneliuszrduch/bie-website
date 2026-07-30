import Link from "next/link";
import { CTA_LINKS, MAIN_NAV } from "@/content/site";
import { getCompanyConfig } from "@/lib/env";
import styles from "./Header.module.css";

export function Header() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          <span className={styles.brandText}>
            <strong>{company.name}</strong>
            <span>Przeglądy · pomiary · kompensacja</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Główna nawigacja">
          <ul className={styles.navList}>
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href={telHref}>
            <span className={styles.phoneLabel}>Zadzwoń</span>
            <span className={styles.phoneNum}>{company.phoneDisplay}</span>
          </a>
          <Link className={styles.cta} href={CTA_LINKS.review.href}>
            Wypełnij formularz kontaktowy
          </Link>
        </div>
      </div>
    </header>
  );
}
