import Link from "next/link";
import { RealizationGallery } from "@/components/RealizationGallery";
import {
  LOCATION_REALIZATION_KEYS,
  REALIZATION_PROJECTS,
} from "@/content/realizations";
import styles from "./RelatedRealizations.module.css";

type Props = {
  locationSlug: string;
  heading?: string;
};

export function RelatedRealizations({
  locationSlug,
  heading = "Powiązane realizacje",
}: Props) {
  const keys = LOCATION_REALIZATION_KEYS[locationSlug];
  if (!keys?.length) return null;
  const keySet = new Set(keys);

  const projects = REALIZATION_PROJECTS.map((project) => ({
    ...project,
    photos: project.photos.filter((photo) => keySet.has(photo.locationKey)),
  })).filter((project) => project.photos.length > 0);

  if (!projects.length) return null;

  return (
    <section className={styles.wrap} aria-labelledby="related-realizations">
      <header className={styles.head}>
        <h2 id="related-realizations">{heading}</h2>
        <p>
          Wybrane realizacje z tego obszaru.{" "}
          <Link href="/realizacje">Wszystkie realizacje</Link>
        </p>
      </header>
      {projects.map((project) => (
        <div key={project.slug} className={styles.block}>
          <h3 className={styles.sub}>
            <Link href={`/realizacje/${project.slug}`}>{project.title}</Link>
          </h3>
          <RealizationGallery
            project={project}
            layout="cases"
            detailHref={`/realizacje/${project.slug}`}
          />
        </div>
      ))}
    </section>
  );
}
