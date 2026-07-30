import styles from "./LocationLead.module.css";
import { LeadForm } from "@/components/LeadForm";

type Props = {
  cityName: string;
  defaultCity: string;
  defaultService?: string;
};

export function LocationLead({
  cityName,
  defaultCity,
  defaultService = "",
}: Props) {
  return (
    <section className={styles.wrap} aria-labelledby="location-lead">
      <div className={styles.copy}>
        <h2 id="location-lead">Umów dojazd do {cityName}</h2>
        <p>
          Zostaw numer — oddzwonimy w sprawie przeglądu, wyceny albo analizy
          faktury pod kątem mocy biernej.
        </p>
      </div>
      <div className={styles.form}>
        <LeadForm
          title={`Kontakt — ${cityName}`}
          submitLabel="Wyślij zgłoszenie"
          defaultCity={defaultCity}
          defaultService={defaultService}
          compact
        />
      </div>
    </section>
  );
}
