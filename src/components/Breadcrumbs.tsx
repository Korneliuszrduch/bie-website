import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/jsonld";
import styles from "./Breadcrumbs.module.css";

export type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: Props) {
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    path: item.href,
  }));

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(jsonLdItems)} />
      <nav className={styles.nav} aria-label="Okruszki">
        <ol className={styles.list}>
          <li>
            <Link href="/">Strona główna</Link>
          </li>
          {items.map((item) => (
            <li key={`${item.label}-${item.href ?? "current"}`}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
