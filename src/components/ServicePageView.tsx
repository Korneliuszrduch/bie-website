import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import type { ServiceContent } from "@/content/services";
import { getService } from "@/content/services";
import { faqPageJsonLd, serviceJsonLd } from "@/lib/jsonld";
import styles from "./ServicePageView.module.css";

type Props = {
  service: ServiceContent;
};

export function ServicePageView({ service }: Props) {
  const related = service.relatedServiceSlugs
    .map((slug) => getService(slug))
    .filter((s): s is ServiceContent => s != null && !s.thinContent);

  const faqLd = faqPageJsonLd(
    service.faq.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  );
  const structured = [
    serviceJsonLd({
      name: service.title,
      description: service.metaDescription || service.lead,
      path: `/uslugi/${service.slug}`,
    }),
    ...(faqLd ? [faqLd] : []),
  ];

  return (
    <main className={styles.main}>
      <JsonLd data={structured} />
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: "Usługi", href: "/uslugi" },
            { label: service.title },
          ]}
        />

        <header className={styles.header}>
          <h1 className={styles.h1}>{service.h1}</h1>
          <p className={styles.lead}>{service.lead}</p>
        </header>

        <section className={styles.section} aria-labelledby="problem">
          <h2 id="problem">Problem klienta</h2>
          <p>{service.problem}</p>
        </section>

        <section className={styles.section} aria-labelledby="scope">
          <h2 id="scope">Zakres usługi</h2>
          <ul className={styles.list}>
            {service.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {service.legalNote ? (
            <p className={styles.note}>{service.legalNote}</p>
          ) : null}
          {service.pricingNote ? (
            <p className={styles.note}>{service.pricingNote}</p>
          ) : null}
        </section>

        <section className={styles.section} aria-labelledby="process">
          <h2 id="process">Przebieg realizacji</h2>
          <ol className={styles.steps}>
            {service.process.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        {service.valuationNeeds && service.valuationNeeds.length > 0 ? (
          <section className={styles.section} aria-labelledby="valuation">
            <h2 id="valuation">Dane potrzebne do wyceny</h2>
            <ul className={styles.list}>
              {service.valuationNeeds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={styles.section} aria-labelledby="benefits">
          <h2 id="benefits">Korzyści</h2>
          <ul className={styles.list}>
            {service.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="objects">
          <h2 id="objects">Rodzaje obsługiwanych obiektów</h2>
          <ul className={styles.chips}>
            {service.objects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="related">
          <h2 id="related">Powiązane usługi i treści</h2>
          <ul className={styles.related}>
            {related.map((s) =>
              s ? (
                <li key={s.slug}>
                  <Link href={`/uslugi/${s.slug}`}>{s.title}</Link>
                </li>
              ) : null,
            )}
            <li>
              <Link href="/realizacje">Realizacje</Link>
            </li>
          </ul>
        </section>

        {service.faq.length > 0 ? (
          <section className={styles.section} aria-labelledby="faq">
            <h2 id="faq">Najczęstsze pytania</h2>
            <div className={styles.faq}>
              {service.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <p className={styles.contactLink}>
          <Link
            href={`/kontakt?usluga=${service.slug}`}
            data-cta="service_contact_link"
            data-service={service.slug}
          >
            Przejdź do formularza kontaktowego
          </Link>
        </p>

        <CtaBand
          title={service.ctaTitle}
          text={service.ctaText}
          ctaLocation="service_cta_band"
          serviceName={service.slug}
        />
      </div>
    </main>
  );
}
