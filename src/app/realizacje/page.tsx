import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { RealizationGallery } from "@/components/RealizationGallery";
import { REALIZATION_PROJECTS } from "@/content/realizations";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Realizacje",
  description:
    "Realizacje kompensacji mocy biernej, przeglądów, instalacji, przeróbek i uziomów na Śląsku.",
  path: "/realizacje",
});

export default function RealizacjePage() {
  return (
    <PageShell
      title="Realizacje"
      lead="Wybrane zdjęcia z wykonanych prac. Lokalizacje i opisy case’ów podajemy tylko tam, gdzie są potwierdzone."
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
        <Link href="/uslugi/przeglady-instalacji-elektrycznych">
          przeglądy instalacji
        </Link>
        ,{" "}
        <Link href="/uslugi/kompensacja-mocy-biernej">
          kompensację mocy biernej
        </Link>{" "}
        albo{" "}
        <Link href="/kontakt">skontaktuj się z nami</Link>.
      </p>
    </PageShell>
  );
}
