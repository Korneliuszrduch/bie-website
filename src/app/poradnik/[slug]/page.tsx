import { PageShell } from "@/components/PageShell";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata({
    title: `Artykuł: ${slug}`,
    description: "Szablon artykułu poradnika — treść MDX w etapie 3.",
    path: `/poradnik/${slug}`,
    noIndex: true,
  });
}

export default async function PoradnikSlugPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageShell
      title={`Artykuł: ${slug}`}
      lead="Dynamiczna trasa poradnika. Pełna treść, spis treści i schema Article/BlogPosting — etap 3."
      crumbs={[
        { label: "Poradnik", href: "/poradnik" },
        { label: slug },
      ]}
    />
  );
}
