import { PageShell } from "@/components/PageShell";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildPageMetadata({
    title: `Realizacja (demo): ${slug}`,
    description:
      "Strona realizacji — dane demo na środowisku testowym. Nie stanowi opisu rzeczywistej realizacji.",
    path: `/realizacje/${slug}`,
    noIndex: true,
  });
}

export default async function RealizacjaSlugPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageShell
      title={`Realizacja (demo): ${slug}`}
      lead="To szablon trasy dynamicznej. Treści i zdjęcia dodamy w etapie 3."
      crumbs={[
        { label: "Realizacje", href: "/realizacje" },
        { label: slug },
      ]}
    >
      <p>
        <strong>Uwaga:</strong> brak opublikowanych prawdziwych realizacji w
        tym miejscu.
      </p>
    </PageShell>
  );
}
