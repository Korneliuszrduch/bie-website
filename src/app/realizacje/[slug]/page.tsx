import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { RealizationGallery } from "@/components/RealizationGallery";
import {
  getRealizationBySlug,
  REALIZATION_PROJECTS,
} from "@/content/realizations";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return REALIZATION_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getRealizationBySlug(slug);
  if (!project) {
    return buildPageMetadata({
      title: "Realizacja",
      description: "Realizacja nieznaleziona.",
      path: `/realizacje/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `Realizacje: ${project.title}`,
    description: project.lead,
    path: `/realizacje/${project.slug}`,
  });
}

export default async function RealizacjaSlugPage({ params }: Props) {
  const { slug } = await params;
  const project = getRealizationBySlug(slug);
  if (!project) notFound();

  return (
    <PageShell
      title={project.title}
      lead={project.lead}
      crumbs={[
        { label: "Realizacje", href: "/realizacje" },
        { label: project.title },
      ]}
    >
      <p>
        <Link href={project.serviceHref}>{project.serviceLabel}</Link>
      </p>
      <RealizationGallery project={project} layout="cases" />
    </PageShell>
  );
}
