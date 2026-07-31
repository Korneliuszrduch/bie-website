import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllServices } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./uslugi.module.css";

export const metadata = buildPageMetadata({
  title: "Usługi elektryczne – przeglądy, pomiary, kompensacja",
  description:
    "Przeglądy instalacji elektrycznych, pomiary, kompensacja mocy biernej, przeglądy firm i maszyn. Zakres zgodny z ofertami CRM.",
  path: "/uslugi",
});

export default function UslugiPage() {
  const services = getAllServices();

  return (
    <PageShell
      title="Usługi elektryczne"
      lead="Treści oparte na ofertach wysyłanych do klientów: przegląd 5-letni z protokołem, pomiary, kompensacja mocy biernej po analizie faktur oraz przegląd maszyn."
      crumbs={[{ label: "Usługi" }]}
    >
      <ul className={styles.grid}>
        {services.map((s) => (
          <li key={s.slug} className={styles.card}>
            <h2 className={styles.h2}>
              <Link href={`/uslugi/${s.slug}`}>{s.title}</Link>
            </h2>
            <p>{s.lead}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
