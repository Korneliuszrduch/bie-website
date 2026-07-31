import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Poradnik",
  description:
    "Praktyczne informacje o przeglądach instalacji, pomiarach elektrycznych i kompensacji mocy biernej.",
  path: "/poradnik",
});

export default function PoradnikPage() {
  return (
    <PageShell
      title="Poradnik"
      lead="Najważniejsze odpowiedzi o przeglądach, pomiarach i kompensacji mocy biernej znajdziesz na stronach usług oraz w FAQ."
      crumbs={[{ label: "Poradnik" }]}
    >
      <p>
        Zacznij od:
      </p>
      <ul>
        <li>
          <Link href="/uslugi/przeglady-instalacji-elektrycznych">
            Przeglądy instalacji elektrycznych
          </Link>
        </li>
        <li>
          <Link href="/uslugi/pomiary-elektryczne">Pomiary elektryczne</Link>
        </li>
        <li>
          <Link href="/uslugi/kompensacja-mocy-biernej">
            Kompensacja mocy biernej
          </Link>
        </li>
        <li>
          <Link href="/kontakt">Kontakt / wycena</Link>
        </li>
      </ul>
    </PageShell>
  );
}
