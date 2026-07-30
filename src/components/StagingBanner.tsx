import { isStaging } from "@/lib/env";
import styles from "./StagingBanner.module.css";

export function StagingBanner() {
  if (!isStaging()) return null;

  return (
    <div className={styles.banner} role="status">
      Środowisko testowe (staging) — strona zablokowana przed indeksowaniem
      Google (noindex / robots.txt / X-Robots-Tag).
    </div>
  );
}
