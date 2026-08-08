import Image from "next/image";
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
          <Image
            src="/images/logo-bie.webp"
            alt={company.name}
            width={100}
            height={100}
            className={styles.brandLogo}
            priority
          />
          <span className={styles.brandText}>
            <strong className={styles.brandName}>{company.name}</strong>
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
          <a className={styles.phone} href={telHref} data-cta="header_phone">
            <span className={styles.phoneLabel}>Zadzwoń</span>
            <span className={styles.phoneNum}>{company.phoneDisplay}</span>
          </a>
          <Link
            className={styles.cta}
            href={CTA_LINKS.review.href}
            data-cta="header_cta"
          >
            Wypełnij formularz kontaktowy
          </Link>
        </div>
      </div>
    </header>
  );
}
