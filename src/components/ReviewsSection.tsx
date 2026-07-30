import { getCompanyConfig } from "@/lib/env";
import { GOOGLE_RATING_SUMMARY, REVIEWS } from "@/content/reviews";
import styles from "./ReviewsSection.module.css";

export function ReviewsSection() {
  const company = getCompanyConfig();

  return (
    <section className={styles.section} aria-labelledby="reviews">
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 id="reviews">Opinie klientów</h2>
          <p>
            Po przeglądzie prosimy o krótką opinię w Google — pomaga innym
            klientom nas znaleźć.
          </p>
          <p className={styles.summary}>
            <span className={styles.summaryScore}>
              {GOOGLE_RATING_SUMMARY.rating}/5
            </span>
            <span>
              na podstawie {GOOGLE_RATING_SUMMARY.count} opinii w Google
            </span>
            <a
              className={styles.verifyLink}
              href={company.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sprawdź opinie w Google →
            </a>
          </p>
        </div>

        <ul className={styles.grid}>
          {REVIEWS.map((r) => (
            <li key={`${r.author}-${r.text.slice(0, 24)}`} className={styles.card}>
              <p className={styles.stars} aria-label={`Ocena ${r.rating} na 5`}>
                {"★".repeat(r.rating)}
                <span className={styles.starsEmpty}>
                  {"★".repeat(5 - r.rating)}
                </span>
              </p>
              <p className={styles.text}>{r.text}</p>
              <p className={styles.meta}>
                <strong>{r.author}</strong>
                <span> · {r.sourceLabel}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a
            className={styles.googleBtn}
            href={company.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Zostaw opinię w Google
          </a>
          <a
            className={styles.verifyBtn}
            href={company.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Zobacz wszystkie opinie
          </a>
          {company.facebookPostUrl ? (
            <a
              className={styles.fbBtn}
              href={company.facebookPostUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zobacz / udostępnij na Facebooku
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
