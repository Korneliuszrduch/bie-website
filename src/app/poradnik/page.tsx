import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { buildPageMetadata } from "@/lib/seo";

// Temporarily noindex until at least 3 valuable articles are published.
// Then remove noIndex and re-add "/poradnik" to src/app/sitemap.ts.
export const metadata = buildPageMetadata({
  title: "Poradnik",
  description:
    "Praktyczne informacje o przeglądach instalacji, pomiarach elektrycznych i kompensacji mocy biernej.",
  path: "/poradnik",
  noIndex: true,
});

export default function PoradnikPage() {
  return (
    <PageShell
      title="Poradnik"
      lead="Najważniejsze odpowiedzi o przeglądach, pomiarach i kompensacji mocy biernej znajdziesz na stronach usług oraz w FAQ."
      crumbs={[{ label: "Poradnik" }]}
    >
      <p>Zacznij od:</p>
      <ul>
        <li>
          <Link
            href="/uslugi/przeglady-instalacji-elektrycznych"
            data-cta="poradnik_service_link"
            data-service="przeglady-instalacji-elektrycznych"
          >
            Przeglądy instalacji elektrycznych
          </Link>
        </li>
        <li>
          <Link
            href="/uslugi/pomiary-elektryczne"
            data-cta="poradnik_service_link"
            data-service="pomiary-elektryczne"
          >
            Pomiary elektryczne
          </Link>
        </li>
        <li>
          <Link
            href="/uslugi/kompensacja-mocy-biernej"
            data-cta="poradnik_service_link"
            data-service="kompensacja-mocy-biernej"
          >
            Kompensacja mocy biernej
          </Link>
        </li>
        <li>
          <Link href="/kontakt" data-cta="poradnik_contact">
            Kontakt / wycena
          </Link>
        </li>
      </ul>
    </PageShell>
  );
}
