import { PageShell } from "@/components/PageShell";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageShell
      title="Nie znaleziono strony (404)"
      lead="Ten adres nie istnieje albo został przeniesiony. Skorzystaj z nawigacji albo wróć na stronę główną."
      showCta
    >
      <p>
        <Link href="/">Strona główna</Link>
        {" · "}
        <Link href="/uslugi">Usługi</Link>
        {" · "}
        <Link href="/kontakt">Kontakt</Link>
      </p>
    </PageShell>
  );
}
