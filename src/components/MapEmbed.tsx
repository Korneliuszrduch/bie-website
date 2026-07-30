import { getCompanyConfig } from "@/lib/env";
import styles from "./MapEmbed.module.css";

const DEFAULT_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d275782.51560854824!2d19.18776981211856!3d50.04494853733437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716bb8b30ceac29%3A0x784e59602a855edc!2sInstalacje%20Elektryczne!5e0!3m2!1spl!2spl!4v1597492857839!5m2!1spl!2spl";

type Props = {
  title?: string;
  className?: string;
};

export function MapEmbed({
  title = "Mapa — obszar działania",
}: Props) {
  const company = getCompanyConfig();
  const embedUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim() || DEFAULT_EMBED;
  const mapsLink =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL?.trim() ||
    company.googleReviewsUrl ||
    "https://g.page/r/CdxehSpgWU54EAE";

  return (
    <section className={styles.wrap} aria-labelledby="map-heading">
      <div className={styles.head}>
        <h2 id="map-heading">{title}</h2>
        <p>
          {company.address
            ? `${company.address} · obszar: ${company.serviceArea}`
            : `Obszar działania: ${company.serviceArea}`}
        </p>
        <a
          className={styles.link}
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Otwórz w Google Maps →
        </a>
      </div>
      <div className={styles.frame}>
        <iframe
          title="Mapa Google — Bezpieczne Instalacje Elektryczne"
          src={embedUrl}
          width="600"
          height="450"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
