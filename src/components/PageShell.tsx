import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { getCompanyConfig } from "@/lib/env";
import styles from "./PageShell.module.css";

type Props = {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  showCta?: boolean;
};

export function PageShell({
  title,
  lead,
  crumbs = [],
  children,
  showCta = true,
}: Props) {
  const company = getCompanyConfig();
  const telHref = `tel:+48${company.phone.replace(/\s/g, "")}`;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {crumbs.length > 0 ? <Breadcrumbs items={crumbs} /> : null}
        <header className={styles.header}>
          <h1 className={styles.h1}>{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </header>
        {children}
        <p className={styles.contactLink}>
          Masz pytanie?{" "}
          <Link href="/kontakt">Przejdź do formularza kontaktowego</Link>
          {" · "}
          <a href={telHref}>Zadzwoń</a>
        </p>
        {showCta ? <CtaBand /> : null}
      </div>
    </main>
  );
}
