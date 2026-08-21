import Link from "next/link";
import { CTA_LINKS } from "@/content/site";
import { getCompanyConfig } from "@/lib/env";
import styles from "./MobileStickyBar.module.css";

export function MobileStickyBar() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;

  return (
    <div className={styles.bar} role="navigation" aria-label="Szybki kontakt">
      <a className={styles.call} href={telHref} data-cta="mobile_sticky_phone">
        <span className={styles.callLabel}>Zadzwoń</span>
        <span className={styles.callNum}>{company.phoneDisplay}</span>
      </a>
      <Link
        className={styles.form}
        href="/#formularz"
        data-cta="mobile_sticky_form"
      >
        Formularz
      </Link>
    </div>
  );
}
