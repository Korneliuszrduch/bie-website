import { PageShell } from "@/components/PageShell";
import { LOCATIONS } from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildPageMetadata({
  title: "Lokalizacje – Pszczyna i Śląsk",
  description:
    "Przeglądy i pomiary elektryczne w Pszczynie, Tychach, Żorach, Rybniku, Katowicach i Gliwicach.",
  path: "/lokalizacje",
});

export default function LokalizacjePage() {
  return (
    <PageShell
      title="Lokalizacje"
      lead="Podstawowy obszar: Pszczyna i okolice oraz miasta Śląska. Każde miasto ma osobną stronę z linkami do usług z ofert CRM."
      crumbs={[{ label: "Lokalizacje" }]}
    >
      <ul>
        {LOCATIONS.map((loc) => (
          <li key={loc.slug}>
            <Link href={loc.href}>{loc.name}</Link>
            {!loc.hasUniqueContent ? (
              <span> — treść skrócona (noindex do rozbudowy)</span>
            ) : (
              <span> — strona z lokalnym opisem</span>
            )}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
