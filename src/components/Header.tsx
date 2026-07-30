import Link from "next/link";
import { CTA_LINKS, MAIN_NAV } from "@/content/site";
import { getCompanyConfig } from "@/lib/env";
import styles from "./Header.module.css";

export function Header() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;
  const tel2 = company.phoneSecondary
    ? `tel:+48${company.phoneSecondary.replace(/\s/g, "")}`
    : null;

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <p className={styles.area}>
          Obsługujemy {company.serviceArea}
        </p>
        <p className={styles.phones}>
          <a className={styles.phone} href={telHref}>
            Tel. {company.phoneDisplay}
          </a>
          {tel2 && company.phoneSecondaryDisplay ? (
            <>
              <span aria-hidden="true"> · </span>
              <a className={styles.phone} href={tel2}>
                {company.phoneSecondaryDisplay}
              </a>
            </>
          ) : null}
        </p>
      </div>
      <div className={styles.main}>
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
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          <Link className={styles.ctaSecondary} href={CTA_LINKS.quote.href}>
            {CTA_LINKS.quote.label}
          </Link>
          <Link className={styles.ctaPrimary} href={CTA_LINKS.review.href}>
            {CTA_LINKS.review.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
