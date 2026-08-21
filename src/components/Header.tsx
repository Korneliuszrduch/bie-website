"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTA_LINKS, MAIN_NAV } from "@/content/site";
import { getCompanyConfig } from "@/lib/env";
import styles from "./Header.module.css";

export function Header() {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
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

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? styles.menuIconOpen : styles.menuIcon} />
        </button>
      </div>

      {menuOpen ? (
        <div className={styles.menuLayer}>
          <button
            type="button"
            className={styles.menuBackdrop}
            aria-label="Zamknij menu"
            onClick={closeMenu}
          />
          <nav id="mobile-menu" className={styles.drawer} aria-label="Menu mobilne">
            <ul className={styles.drawerList}>
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              className={styles.drawerPhone}
              href={telHref}
              data-cta="header_menu_phone"
              onClick={closeMenu}
            >
              Zadzwoń {company.phoneDisplay}
            </a>
            <Link
              className={styles.drawerCta}
              href="/#formularz"
              data-cta="header_menu_cta"
              onClick={closeMenu}
            >
              Wypełnij formularz
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
