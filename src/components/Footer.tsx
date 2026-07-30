import Link from "next/link";
import { LOCATIONS, SERVICES } from "@/content/site";
import { getCompanyConfig } from "@/lib/env";
import styles from "./Footer.module.css";

export function Footer() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <h2 className={styles.heading}>{company.name}</h2>
          <p className={styles.text}>
            Przeglądy instalacji elektrycznych, pomiary i kompensacja mocy
            biernej na {company.serviceArea}.
          </p>
          <p className={styles.text}>
            <a href={telHref}>Tel. {company.phoneDisplay}</a>
            {company.phoneSecondaryDisplay && company.phoneSecondary ? (
              <>
                <br />
                <a
                  href={`tel:+48${company.phoneSecondary.replace(/\s/g, "")}`}
                >
                  Tel. {company.phoneSecondaryDisplay}
                </a>
              </>
            ) : null}
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          {company.address ? (
            <p className={styles.text}>{company.address}</p>
          ) : null}
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Usługi</h2>
          <ul className={styles.list}>
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={s.href}>{s.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/uslugi">Wszystkie usługi</Link>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Lokalizacje</h2>
          <ul className={styles.list}>
            {LOCATIONS.map((l) => (
              <li key={l.slug}>
                <Link href={l.href}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Nawigacja</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/realizacje">Realizacje</Link>
            </li>
            <li>
              <Link href="/poradnik">Poradnik</Link>
            </li>
            <li>
              <Link href="/o-firmie">O firmie</Link>
            </li>
            <li>
              <Link href="/kontakt">Kontakt</Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          © {year} {company.legalName || company.name}
          {company.nip ? ` · NIP ${company.nip}` : ""}
        </p>
        <p className={styles.note}>
          Wersja testowa na poddomenie — treść nie jest jeszcze ofertą finalną.
        </p>
      </div>
    </footer>
  );
}
