import { PageShell } from "@/components/PageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Poradnik",
  description:
    "Artykuły o przeglądach instalacji, pomiarach elektrycznych i kompensacji mocy biernej.",
  path: "/poradnik",
});

export default function PoradnikPage() {
  return (
    <PageShell
      title="Poradnik"
      lead="System artykułów (MDX) zostanie dodany w etapie 3. Tutaj pojawi się lista wpisów z datą, kategorią i powiązaną usługą."
      crumbs={[{ label: "Poradnik" }]}
    >
      <p>Brak opublikowanych artykułów na etapie 1.</p>
    </PageShell>
  );
}
