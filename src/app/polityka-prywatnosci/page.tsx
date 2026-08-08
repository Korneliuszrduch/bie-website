import { PageShell } from "@/components/PageShell";
import { PrivacyPolicyContent } from "@/components/PrivacyPolicyContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Polityka prywatności",
  description:
    "Polityka prywatności K&J Solutions Sp. z o.o. — przetwarzanie danych osobowych, formularz kontaktowy, cookies i narzędzia zewnętrzne.",
  path: "/polityka-prywatnosci",
});

export default function PolitykaPage() {
  return (
    <PageShell
      title="Polityka prywatności"
      lead="Informacje o przetwarzaniu danych osobowych w związku ze stroną internetową, formularzem kontaktowym i realizacją usług."
      crumbs={[{ label: "Polityka prywatności" }]}
      showCta={false}
    >
      <PrivacyPolicyContent />
    </PageShell>
  );
}
