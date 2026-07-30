"use client";

import { useState, type FormEvent } from "react";
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
  consent: boolean;
  website: string; // honeypot
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "przeglad",
  message: "",
  consent: false,
  website: "",
};

const SERVICES = [
  { value: "przeglad", label: "Umów przegląd instalacji" },
  { value: "wycena", label: "Zamów wycenę" },
  { value: "analiza-faktury", label: "Wyślij fakturę do analizy" },
  { value: "kompensacja", label: "Kompensacja mocy biernej" },
  { value: "inne", label: "Inne pytanie" },
];

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

  function validate(values: FormState) {
    const next: Record<string, string> = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      next.name = "Podaj imię (min. 2 znaki).";
    }
    const phone = values.phone.replace(/\s/g, "");
    if (!/^\+?[0-9]{9,15}$/.test(phone)) {
      next.phone = "Podaj prawidłowy numer telefonu.";
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Nieprawidłowy e-mail.";
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
          propertyType: "",
          message: form.message.trim(),
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
      setStatus("ok");
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
    return (
      <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
        <h2 className={styles.title}>Dziękujemy</h2>
        <p className={styles.success}>
          Zgłoszenie przyjęte. Oddzwonimy w sprawie terminu lub wyceny.
        </p>
        <button
          type="button"
          className={styles.submit}
          onClick={() => setStatus("idle")}
        >
          Wyślij kolejne
        </button>
      </div>
    );
  }

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
        E-mail (opcjonalnie)
        <input
          className={styles.input}
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => field("email", e.target.value)}
          autoComplete="email"
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
        >
          {SERVICES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.label}>
        Wiadomość
        <textarea
          className={styles.textarea}
          name="message"
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={(e) => field("message", e.target.value)}
          placeholder="Np. dom, liczba rozdzielnic, faktury…"
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
          <a href="/polityka-prywatnosci">Polityka prywatności</a>
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
    </form>
  );
}
