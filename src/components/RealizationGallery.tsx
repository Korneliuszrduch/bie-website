import Image from "next/image";
import Link from "next/link";
import { CaseImageSlider } from "@/components/CaseImageSlider";
import {
  photoHasCaseCopy,
  type RealizationPhoto,
  type RealizationProject,
} from "@/content/realizations";
import styles from "./RealizationGallery.module.css";

type Props = {
  project: RealizationProject;
  /** When true, show project title + link to detail page */
  showHeader?: boolean;
  detailHref?: string;
  /**
   * grid = compact thumbnails (lista)
   * cases = photo + problem/solution/result (strona szczegółu)
   */
  layout?: "grid" | "cases";
};

function caseImages(photo: RealizationPhoto) {
  return [
    { src: photo.src, alt: photo.alt },
    ...(photo.gallery ?? []),
  ];
}

function CaseCopy({ photo }: { photo: RealizationPhoto }) {
  const hasCopy = photoHasCaseCopy(photo);
  return (
    <div className={styles.caseBody}>
      <h3 className={styles.caseLocation}>{photo.location}</h3>
      {hasCopy ? (
        <dl className={styles.caseDl}>
          {photo.problem.trim() ? (
            <>
              <dt>Problem</dt>
              <dd>{photo.problem}</dd>
            </>
          ) : null}
          {photo.solution.trim() ? (
            <>
              <dt>Rozwiązanie</dt>
              <dd>{photo.solution}</dd>
            </>
          ) : null}
          {photo.result?.trim() ? (
            <>
              <dt>Efekt</dt>
              <dd>{photo.result}</dd>
            </>
          ) : null}
        </dl>
      ) : (
        <p className={styles.casePending}>
          Opis realizacji (problem / rozwiązanie / efekt) uzupełnimy po zebraniu
          szczegółów od klienta.
        </p>
      )}
    </div>
  );
}

export function RealizationGallery({
  project,
  showHeader = false,
  detailHref,
  layout = "grid",
}: Props) {
  return (
    <section className={styles.section} aria-labelledby={`real-${project.slug}`}>
      {showHeader ? (
        <header className={styles.head}>
          <h2 id={`real-${project.slug}`} className={styles.title}>
            {detailHref ? (
              <Link href={detailHref}>{project.title}</Link>
            ) : (
              project.title
            )}
          </h2>
          <p className={styles.lead}>{project.lead}</p>
          <p className={styles.meta}>
            <Link href={project.serviceHref}>{project.serviceLabel}</Link>
            {detailHref ? (
              <>
                {" · "}
                <Link href={detailHref}>Zobacz szczegóły</Link>
              </>
            ) : null}
          </p>
        </header>
      ) : (
        <h2 id={`real-${project.slug}`} className={styles.srOnly}>
          {project.title}
        </h2>
      )}

      {layout === "cases" ? (
        <ul className={styles.cases}>
          {project.photos.map((photo) => {
            const images = caseImages(photo);
            const multi = images.length > 1;
            return (
              <li
                key={photo.src}
                className={multi ? `${styles.case} ${styles.caseMulti}` : styles.case}
              >
                {multi ? (
                  <>
                    <CaseCopy photo={photo} />
                    <CaseImageSlider images={images} label={photo.location} />
                  </>
                ) : (
                  <>
                    <CaseImageSlider images={images} label={photo.location} />
                    <CaseCopy photo={photo} />
                  </>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className={styles.grid}>
          {project.photos.map((photo) => (
            <li key={photo.src} className={styles.item}>
              <a
                href={detailHref ?? photo.src}
                {...(detailHref
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className={styles.link}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                  className={styles.img}
                />
                <span className={styles.location}>{photo.location}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
