import { PageShell } from "@/components/PageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Realizacje",
  description:
    "Wybrane realizacje przeglądów, pomiarów i kompensacji mocy biernej. Na stagingu wyłącznie dane demo.",
  path: "/realizacje",
});

export default function RealizacjePage() {
  return (
    <PageShell
      title="Realizacje"
      lead="System realizacji (dane lokalne TS/JSON + strony [slug]) powstanie w etapie 3. Na razie nie publikujemy fikcyjnych case studies jako prawdziwych."
      crumbs={[{ label: "Realizacje" }]}
    >
      <p>
        Placeholder listy. Przykładowe wpisy demo będą wyraźnie oznaczone.
      </p>
    </PageShell>
  );
}
