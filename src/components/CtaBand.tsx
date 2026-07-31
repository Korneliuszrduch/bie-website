import Link from "next/link";
import { CTA_LINKS } from "@/content/site";
import { getCompanyConfig } from "@/lib/env";
import styles from "./CtaBand.module.css";

type Props = {
  title?: string;
  text?: string;
  ctaLocation?: string;
  serviceName?: string;
};

export function CtaBand({
  title = "Potrzebujesz przeglądu lub wyceny?",
  text = "Wypełnij formularz albo zadzwoń — oddzwonimy z propozycją terminu.",
  ctaLocation = "cta_band",
  serviceName,
}: Props) {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;

  return (
    <aside className={styles.band}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.actions}>
        <Link
          className={styles.primary}
          href="/#formularz"
          data-cta={ctaLocation}
          data-service={serviceName}
        >
          {CTA_LINKS.review.label}
        </Link>
        <a
          className={styles.phone}
          href={telHref}
          data-cta={`${ctaLocation}_phone`}
          data-service={serviceName}
        >
          Zadzwoń: {company.phoneDisplay}
        </a>
      </div>
    </aside>
  );
}
