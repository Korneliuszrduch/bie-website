import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: Props) {
  return (
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
  );
}
