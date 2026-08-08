"use client";

import { useState, type FormEvent } from "react";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import { pushDataLayer } from "@/lib/analytics";
import styles from "./LeadForm.module.css";

export type LeadFormProps = {
  title?: string;
  submitLabel?: string;
  defaultService?: string;
  defaultCity?: string;
  compact?: boolean;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  selectedHasPhotovoltaics: string;
  selectedTypeOfBuilding: string;
  selectedNumberOfStoreys: string;
  selectednumberofsquaremetersofthebuilding: string;
  consent: boolean;
  website: string; // honeypot
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  message: "",
  selectedHasPhotovoltaics: "",
  selectedTypeOfBuilding: "",
  selectedNumberOfStoreys: "",
  selectednumberofsquaremetersofthebuilding: "",
  consent: false,
  website: "",
};

const SERVICES = [
  { value: "", label: "- Wybierz temat -" },
  { value: "wycena", label: "Bezpłatna wycena przeglądu" },
  { value: "kompensacja", label: "Kompensacja mocy biernej" },
  { value: "inne", label: "Inne pytanie" },
];

/** Opcje jak w CRM (LeadsPage / display_users) */
const PHOTOVOLTAICS = [
  { value: "", label: "- Wybierz fotowoltaika -" },
  { value: "Brak fotowoltaiki", label: "Brak fotowoltaiki" },
  { value: "Fotowoltaika", label: "Fotowoltaika" },
  {
    value: "Fotowoltaika + magazyn energii do 10 kwh",
    label: "Fotowoltaika + magazyn energii do 10 kwh",
  },
  {
    value: "Fotowoltaika + magazyn energii powyżej 10 kwh",
    label: "Fotowoltaika + magazyn energii powyżej 10 kwh",
  },
];

const BUILDING_TYPES = [
  { value: "", label: "- Wybierz typ budynku -" },
  { value: "Dom", label: "Dom" },
  { value: "Dom szeregowy", label: "Dom szeregowy" },
  { value: "Dom z garażem", label: "Dom z garażem" },
  { value: "Dom z osobnym garażem", label: "Dom z osobnym garażem" },
  { value: "Hala", label: "Hala" },
  { value: "Budynek biurowy", label: "Budynek biurowy" },
  { value: "Mieszkanie w bloku", label: "Mieszkanie w bloku" },
  { value: "Kamienica", label: "Kamienica" },
  { value: "Farma fotowoltaiczna", label: "Farma fotowoltaiczna" },
  { value: "Inne", label: "Inne" },
];

const STOREYS = [
  { value: "", label: "- Wybierz liczbę kondygnacji -" },
  { value: "Parter", label: "Parter" },
  { value: "1 kondygnacja", label: "1 kondygnacja" },
  { value: "2 kondygnacje", label: "2 kondygnacje" },
  { value: "3 kondygnacje", label: "3 kondygnacje" },
  { value: "Powyżej 3 kondygnacji", label: "Powyżej 3 kondygnacji" },
];

const AREAS = [
  { value: "", label: "- Wybierz powierzchnię -" },
  { value: "do 40 m2", label: "do 40 m2" },
  { value: "do 60 m2", label: "do 60 m2" },
  { value: "do 80 m2", label: "do 80 m2" },
  { value: "do 100 m2", label: "do 100 m2" },
  { value: "do 120 m2", label: "do 120 m2" },
  { value: "do 140 m2", label: "do 140 m2" },
  { value: "do 160 m2", label: "do 160 m2" },
  { value: "do 180 m2", label: "do 180 m2" },
  { value: "do 200 m2", label: "do 200 m2" },
  { value: "do 220 m2", label: "do 220 m2" },
  { value: "do 240 m2", label: "do 240 m2" },
  { value: "powyżej 240 m2", label: "powyżej 240 m2" },
];

function isQuoteInspection(service: string) {
  return service === "wycena";
}

export function LeadForm({
  title = "Umów bezpłatną konsultację",
  submitLabel = "Wyślij zgłoszenie",
  defaultService,
  defaultCity = "",
  compact = false,
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    service: defaultService || INITIAL.service,
    city: defaultCity,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  function validate(values: FormState) {
    const next: Record<string, string> = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      next.name = "Podaj imię (min. 2 znaki).";
    }
    const phone = values.phone.replace(/\s/g, "");
    if (!/^\+?[0-9]{9,15}$/.test(phone)) {
      next.phone = "Podaj prawidłowy numer telefonu.";
    }
    if (!values.email.trim()) {
      next.email = "Podaj e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Nieprawidłowy e-mail.";
    }
    if (!values.service) {
      next.service = "Wybierz temat.";
    }
    if (!values.consent) {
      next.consent = "Wymagana zgoda na kontakt.";
    }
    return next;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const quote = isQuoteInspection(form.service);
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          city: form.city.trim(),
          service: form.service,
          propertyType: quote ? form.selectedTypeOfBuilding : "",
          message: form.message.trim(),
          selectedHasPhotovoltaics: quote
            ? form.selectedHasPhotovoltaics
            : "",
          selectedTypeOfBuilding: quote ? form.selectedTypeOfBuilding : "",
          selectedNumberOfStoreys: quote ? form.selectedNumberOfStoreys : "",
          selectednumberofsquaremetersofthebuilding: quote
            ? form.selectednumberofsquaremetersofthebuilding
            : "",
          sourceUrl:
            typeof window !== "undefined" ? window.location.href : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          website: form.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Nie udało się wysłać formularza.");
      }
      setSubmitted({
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        message: form.message.trim(),
      });
      setStatus("ok");
      // Conversion event — no PII in the payload.
      pushDataLayer({
        event: "lead_form_success",
        cta_location: compact ? "lead_form_compact" : "lead_form",
        service_name: form.service || undefined,
      });
      setForm({
        ...INITIAL,
        service: defaultService || INITIAL.service,
        city: defaultCity,
      });
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Wystąpił błąd wysyłki.",
      );
    }
  }

  function field(name: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  if (status === "ok") {
    const serviceLabel =
      SERVICES.find((s) => s.value === submitted?.service)?.label ||
      submitted?.service ||
      "—";
    const showQuote = isQuoteInspection(submitted?.service || "");
    const rows: { label: string; value: string }[] = [
      { label: "Imię", value: submitted?.name || "—" },
      { label: "Telefon", value: submitted?.phone || "—" },
      { label: "E-mail", value: submitted?.email || "—" },
      ...(submitted?.city
        ? [{ label: "Miasto", value: submitted.city }]
        : []),
      { label: "Temat", value: serviceLabel },
      ...(showQuote && submitted?.selectedHasPhotovoltaics
        ? [
            {
              label: "Fotowoltaika",
              value: submitted.selectedHasPhotovoltaics,
            },
          ]
        : []),
      ...(showQuote && submitted?.selectedTypeOfBuilding
        ? [
            {
              label: "Typ budynku",
              value: submitted.selectedTypeOfBuilding,
            },
          ]
        : []),
      ...(showQuote && submitted?.selectedNumberOfStoreys
        ? [
            {
              label: "Liczba kondygnacji",
              value: submitted.selectedNumberOfStoreys,
            },
          ]
        : []),
      ...(showQuote && submitted?.selectednumberofsquaremetersofthebuilding
        ? [
            {
              label: "Powierzchnia budynku",
              value: submitted.selectednumberofsquaremetersofthebuilding,
            },
          ]
        : []),
      ...(submitted?.message
        ? [{ label: "Dodatkowe uwagi", value: submitted.message }]
        : []),
    ];

    return (
      <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
        <h2 className={styles.title}>Dziękujemy</h2>
        <p className={styles.success}>
          Zgłoszenie przyjęte. Oddzwonimy w sprawie terminu lub wyceny.
        </p>
        <div className={styles.sentSummary}>
          <p className={styles.sentHeading}>Wysłane dane</p>
          <dl className={styles.sentList}>
            {rows.map((row) => (
              <div key={row.label} className={styles.sentRow}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.successActions}>
          <button
            type="button"
            className={styles.submit}
            onClick={() => {
              if (submitted) {
                setForm({
                  ...submitted,
                  consent: true,
                  website: "",
                });
              }
              setErrors({});
              setServerError("");
              setSubmitted(null);
              setStatus("idle");
            }}
          >
            Popraw dane
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => {
              setForm({
                ...INITIAL,
                service: defaultService || INITIAL.service,
                city: defaultCity,
              });
              setErrors({});
              setServerError("");
              setSubmitted(null);
              setStatus("idle");
            }}
          >
            Wyślij kolejne
          </button>
        </div>
      </div>
    );
  }

  const showQuoteFields = isQuoteInspection(form.service);

  return (
    <form
      className={`${styles.card} ${compact ? styles.compact : ""}`}
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.hint}>Oddzwonimy — bez zobowiązań.</p>

      {/* Honeypot */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => field("website", e.target.value)}
        />
      </div>

      <label className={styles.label}>
        Imię
        <input
          className={styles.input}
          name="name"
          value={form.name}
          onChange={(e) => field("name", e.target.value)}
          autoComplete="name"
          required
        />
        {errors.name ? <span className={styles.error}>{errors.name}</span> : null}
      </label>

      <label className={styles.label}>
        Telefon
        <input
          className={styles.input}
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => field("phone", e.target.value)}
          autoComplete="tel"
          required
        />
        {errors.phone ? (
          <span className={styles.error}>{errors.phone}</span>
        ) : null}
      </label>

      <label className={styles.label}>
        E-mail
        <input
          className={styles.input}
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => field("email", e.target.value)}
          autoComplete="email"
          required
        />
        {errors.email ? (
          <span className={styles.error}>{errors.email}</span>
        ) : null}
      </label>

      <label className={styles.label}>
        Miasto
        <input
          className={styles.input}
          name="city"
          value={form.city}
          onChange={(e) => field("city", e.target.value)}
          autoComplete="address-level2"
        />
      </label>

      <label className={styles.label}>
        Temat
        <select
          className={styles.input}
          name="service"
          value={form.service}
          onChange={(e) => field("service", e.target.value)}
          required
        >
          {SERVICES.map((s) => (
            <option key={s.label} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.service ? (
          <span className={styles.error}>{errors.service}</span>
        ) : null}
      </label>

      {showQuoteFields ? (
        <>
          <label className={styles.label}>
            Fotowoltaika
            <select
              className={styles.input}
              name="selectedHasPhotovoltaics"
              value={form.selectedHasPhotovoltaics}
              onChange={(e) =>
                field("selectedHasPhotovoltaics", e.target.value)
              }
            >
              {PHOTOVOLTAICS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Typ budynku
            <select
              className={styles.input}
              name="selectedTypeOfBuilding"
              value={form.selectedTypeOfBuilding}
              onChange={(e) => field("selectedTypeOfBuilding", e.target.value)}
            >
              {BUILDING_TYPES.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Liczba kondygnacji
            <select
              className={styles.input}
              name="selectedNumberOfStoreys"
              value={form.selectedNumberOfStoreys}
              onChange={(e) => field("selectedNumberOfStoreys", e.target.value)}
            >
              {STOREYS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Powierzchnia budynku
            <select
              className={styles.input}
              name="selectednumberofsquaremetersofthebuilding"
              value={form.selectednumberofsquaremetersofthebuilding}
              onChange={(e) =>
                field(
                  "selectednumberofsquaremetersofthebuilding",
                  e.target.value,
                )
              }
            >
              {AREAS.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </>
      ) : null}

      <label className={styles.label}>
        Dodatkowe uwagi
        <textarea
          className={styles.textarea}
          name="message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={(e) => field("message", e.target.value)}
          placeholder="Twoje dodatkowe uwagi…"
        />
      </label>

      <label className={styles.check}>
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => field("consent", e.target.checked)}
        />
        <span>
          Wyrażam zgodę na kontakt w sprawie zapytania.{" "}
          <button
            type="button"
            className={styles.policyLink}
            onClick={() => setPrivacyOpen(true)}
          >
            Polityka prywatności
          </button>
        </span>
      </label>
      {errors.consent ? (
        <span className={styles.error}>{errors.consent}</span>
      ) : null}

      {serverError ? <p className={styles.error}>{serverError}</p> : null}

      <button
        className={styles.submit}
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Wysyłanie…" : submitLabel}
      </button>

      <PrivacyPolicyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </form>
  );
}
