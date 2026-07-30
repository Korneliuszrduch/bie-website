import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { RealizationGallery } from "@/components/RealizationGallery";
import { REALIZATION_PROJECTS } from "@/content/realizations";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Realizacje",
  description:
    "Zdjęcia z realizacji kompensacji mocy biernej i innych prac elektrycznych na Śląsku.",
  path: "/realizacje",
});

export default function RealizacjePage() {
  return (
    <PageShell
      title="Realizacje"
      lead="Wybrane zdjęcia z wykonanych instalacji. Lokalizacje podajemy tylko tam, gdzie są potwierdzone."
      crumbs={[{ label: "Realizacje" }]}
    >
      {REALIZATION_PROJECTS.map((project) => (
        <RealizationGallery
          key={project.slug}
          project={project}
          showHeader
          detailHref={`/realizacje/${project.slug}`}
        />
      ))}
      <p>
        Szukasz wyceny? Zobacz{" "}
        <Link href="/uslugi/kompensacja-mocy-biernej">
          ofertę kompensacji mocy biernej
        </Link>{" "}
        albo{" "}
        <Link href="/kontakt">skontaktuj się z nami</Link>.
      </p>
    </PageShell>
  );
}
