import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getCompanyConfig } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./o-firmie.module.css";

export const metadata = buildPageMetadata({
  title: "O firmie",
  description:
    "mgr inż. elektryk Korneliusz Rduch — przeglądy pomiarowe, pomiary i kompensacja mocy biernej na Śląsku. Kwalifikacje: Politechnika Śląska, uprawnienia SEP.",
  path: "/o-firmie",
});

export default function OFirmiePage() {
  const company = getCompanyConfig();
  return (
    <PageShell
      title="O firmie"
      lead={`${company.name} — przeglądy instalacji wykonywane pomiarowo, z protokołem wyników i zaleceń. Bez „samego papieru”.`}
      crumbs={[{ label: "O firmie" }]}
    >
      <section className={styles.section}>
        <h2>Osoba prowadząca</h2>
        <p>{company.personName}</p>
      </section>

      <section className={styles.section} aria-labelledby="kwalifikacje">
        <h2 id="kwalifikacje">Kwalifikacje</h2>
        <ul>
          <li>
            Ukończone studia na Wydziale Elektrycznym Politechniki Śląskiej
          </li>
          <li>Uprawnienia SEP (eksploatacja, pomiary, dozór)</li>
        </ul>
        <p>
          <a
            href={company.credentialsPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ściągnij uprawnienia na dysk (PDF)
          </a>
        </p>

        <ul className={styles.gallery}>
          <li>
            <figure className={styles.figure}>
              <a
                href="/images/uprawnienia/dyplom-politechnika-slaska.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/uprawnienia/dyplom-politechnika-slaska.jpg"
                  alt="Dyplom ukończenia studiów — Wydział Elektryczny Politechniki Śląskiej"
                  width={1024}
                  height={718}
                  className={styles.img}
                  sizes="(max-width: 720px) 100vw, 520px"
                />
              </a>
              <figcaption className={styles.caption}>
                Dyplom — Politechnika Śląska, Wydział Elektryczny
              </figcaption>
            </figure>
          </li>
          <li>
            <figure className={styles.figure}>
              <a
                href={company.credentialsPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/uprawnienia/uprawnienia-e-i-d.png"
                  alt="Uprawnienia elektryczne SEP — eksploatacja i dozór (E i D)"
                  width={410}
                  height={600}
                  className={styles.img}
                  sizes="(max-width: 720px) 100vw, 320px"
                />
              </a>
              <figcaption className={styles.caption}>
                Uprawnienia SEP — eksploatacja, pomiary, dozór (E i D)
              </figcaption>
            </figure>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Dane podmiotu</h2>
        <p>
          {company.legalName}
          {company.nip ? ` · NIP ${company.nip}` : ""}
          <br />
          {company.address}
        </p>
      </section>

      <section className={styles.section}>
        <h2>Jak pracujemy</h2>
        <ul>
          <li>Przegląd pomiarowy — izolacja, uziemienie, PE, SWZ, RCD i inne</li>
          <li>Protokół po zakończeniu prac</li>
          <li>Wycena indywidualna na podstawie danych o instalacji</li>
          <li>
            Kompensacja mocy biernej dopiero po analizie faktur (3 lub 12
            miesięcy)
          </li>
          <li>Możliwość płatności bezgotówkowej</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Dokumenty</h2>
        <ul>
          <li>
            <a
              href={company.credentialsPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Uprawnienia elektryczne (PDF)
            </a>
          </li>
          <li>
            <a
              href={company.calibrationPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Świadectwo wzorcowania (PDF)
            </a>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Opinie</h2>
        <p>
          <a
            href={company.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Zostaw opinię w Google
          </a>
        </p>
      </section>

      <section className={styles.section}>
        <h2>Usługi</h2>
        <p>
          <Link href="/uslugi">Zobacz pełną listę usług</Link>
        </p>
      </section>
    </PageShell>
  );
}
