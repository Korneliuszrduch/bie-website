/**
 * Netsendo / CRM lead ingest — same paths as live BIE WP form + CRM React.
 *
 * Live WP: POST https://mail.korneliuszrduch.pl/subscribe.php (mlid 289)
 * CRM:     POST …/php/register_mail.php (+ optional update_contact.php)
 */

export type BieLeadPayload = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  propertyType: string;
  message: string;
  selectedHasPhotovoltaics: string;
  selectedTypeOfBuilding: string;
  selectedNumberOfStoreys: string;
  selectednumberofsquaremetersofthebuilding: string;
  sourceUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function mapServiceFlags(service: string): {
  electrical: string;
  compensation: string;
} {
  const s = service.toLowerCase();
  if (s === "kompensacja" || s === "analiza-faktury") {
    return { electrical: "", compensation: "Usługa kompensacji mocy" };
  }
  if (s === "przeglad" || s === "wycena" || s === "inne" || s === "") {
    return { electrical: "Usługa elektryczna", compensation: "" };
  }
  return { electrical: "Usługa elektryczna", compensation: "" };
}

function buildComment(payload: BieLeadPayload): string {
  const serviceLabel =
    payload.service === "wycena"
      ? "Bezpłatna wycena przeglądu"
      : payload.service;
  const lines = [
    payload.message && `Wiadomość: ${payload.message}`,
    payload.city && `Miasto: ${payload.city}`,
    serviceLabel && `Temat: ${serviceLabel}`,
    payload.selectedHasPhotovoltaics &&
      `Fotowoltaika: ${payload.selectedHasPhotovoltaics}`,
    payload.selectedTypeOfBuilding &&
      `Typ budynku: ${payload.selectedTypeOfBuilding}`,
    payload.selectedNumberOfStoreys &&
      `Liczba kondygnacji: ${payload.selectedNumberOfStoreys}`,
    payload.selectednumberofsquaremetersofthebuilding &&
      `Powierzchnia: ${payload.selectednumberofsquaremetersofthebuilding}`,
    payload.propertyType &&
      !payload.selectedTypeOfBuilding &&
      `Typ obiektu: ${payload.propertyType}`,
    payload.sourceUrl && `Źródło: ${payload.sourceUrl}`,
    payload.referrer && `Referrer: ${payload.referrer}`,
    (payload.utmSource || payload.utmMedium || payload.utmCampaign) &&
      `UTM: ${[payload.utmSource, payload.utmMedium, payload.utmCampaign].filter(Boolean).join(" / ")}`,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

type RegisterResult = {
  success: boolean;
  sid?: number;
  email?: string;
  message?: string;
  created?: boolean;
};

/** Same as crm-react registerContact → register_mail.php */
export async function registerLeadInCrm(
  payload: BieLeadPayload,
): Promise<RegisterResult> {
  const url =
    process.env.CRM_API_URL?.trim() ||
    "https://terminal.terminaleservice.pl/php/register_mail.php";

  const { first, last } = splitName(payload.name);
  const flags = mapServiceFlags(payload.service);
  const fd = new FormData();
  fd.append("name_first", first);
  fd.append("name_last", last);
  fd.append("email", payload.email);
  fd.append("phone", payload.phone);
  if (payload.city) {
    fd.append("city", payload.city);
  }
  fd.append(
    "placeOfAcquiringTheCustomer",
    [
      "bie-website",
      payload.city && `miasto: ${payload.city}`,
      payload.service && `temat: ${payload.service}`,
    ]
      .filter(Boolean)
      .join(" | "),
  );
  fd.append("leadStage", "Nowy");
  if (flags.electrical) {
    fd.append("selectedElectricalService", flags.electrical);
  }
  if (flags.compensation) {
    fd.append("selectedPowerCompensationService", flags.compensation);
  }

  const res = await fetch(url, { method: "POST", body: fd });
  const text = await res.text();
  let data: RegisterResult & { success?: boolean } = { success: false };
  try {
    data = JSON.parse(text) as RegisterResult;
  } catch {
    throw new Error(`CRM register_mail nie-JSON: ${text.slice(0, 200)}`);
  }
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `CRM HTTP ${res.status}`);
  }
  return data;
}

/** Enrich city + comments after create without wiping other CRM fields. */
export async function updateLeadDetails(
  sid: number,
  email: string,
  payload: BieLeadPayload,
): Promise<void> {
  const url =
    process.env.CRM_UPDATE_URL?.trim() ||
    "https://terminal.terminaleservice.pl/php/update_contact.php";

  const comment = buildComment(payload);
  const hasBuilding =
    Boolean(payload.selectedHasPhotovoltaics) ||
    Boolean(payload.selectedTypeOfBuilding) ||
    Boolean(payload.selectedNumberOfStoreys) ||
    Boolean(payload.selectednumberofsquaremetersofthebuilding);
  if (!payload.city && !comment && !hasBuilding) return;
  if (!email && !sid) return;

  const fd = new FormData();
  fd.append("onlyStatus", "1");
  if (email) fd.append("email", email);
  if (sid) fd.append("sid", String(sid));
  fd.append("leadStage", "Nowy");
  if (payload.city) fd.append("city", payload.city);
  if (payload.selectedHasPhotovoltaics) {
    fd.append("selectedHasPhotovoltaics", payload.selectedHasPhotovoltaics);
  }
  if (payload.selectedTypeOfBuilding) {
    fd.append("selectedTypeOfBuilding", payload.selectedTypeOfBuilding);
  }
  if (payload.selectedNumberOfStoreys) {
    fd.append("selectedNumberOfStoreys", payload.selectedNumberOfStoreys);
  }
  if (payload.selectednumberofsquaremetersofthebuilding) {
    fd.append(
      "selectednumberofsquaremetersofthebuilding",
      payload.selectednumberofsquaremetersofthebuilding,
    );
  }
  fd.append("comments", comment || `Miasto: ${payload.city}`);

  const res = await fetch(url, { method: "POST", body: fd });
  if (!res.ok) {
    const text = await res.text();
    console.error("[leads] update_contact failed", res.status, text.slice(0, 200));
  }
}

/**
 * Same ingest as https://bezpieczneinstalacjeelektryczne.pl/ contact form
 * → mail.korneliuszrduch.pl/subscribe.php (lista mlid 289).
 * Email is required by that form; skip when missing.
 */
export async function subscribeLeadOnNetsendoList(
  payload: BieLeadPayload,
): Promise<void> {
  const email = payload.email.trim();
  if (!email) return;

  const enabled = (process.env.NETSENDO_SUBSCRIBE_ENABLED ?? "true").toLowerCase();
  if (enabled === "false" || enabled === "0" || enabled === "no") return;

  const url =
    process.env.NETSENDO_SUBSCRIBE_URL?.trim() ||
    "https://mail.korneliuszrduch.pl/subscribe.php";
  const mlid = process.env.NETSENDO_MLID?.trim() || "289";
  const token =
    process.env.NETSENDO_TOKEN?.trim() ||
    "5d1728b5470d6f96b08425f027f70fb9d745e9ab";

  const { first } = splitName(payload.name);
  const source =
    payload.sourceUrl || "https://bezpieczneinstalacjeelektryczne.pl/";

  const body = new URLSearchParams();
  body.set("fname", first || payload.name);
  body.set("email", email);
  body.set("phone", payload.phone);
  body.set("fields[165]", "Akceptuję politykę prywatności");
  body.set("fields[204]", "bezpieczneinstalacje");
  body.set("fields[122]", "KONTAKT INSTALACJE ELEKTRYCZNE");
  body.set("fields[80]", source);
  body.set("fields[266]", "");
  body.set("fields[238]", "formularz_kontaktowy_bie_website");
  body.set("mlid", mlid);
  body.set("req", "fname:email:phone:165");
  body.set("token", token);
  body.set("coregister", "");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    redirect: "manual",
  });

  // subscribe.php often redirects on success
  if (res.status >= 400) {
    const text = await res.text();
    console.error("[leads] subscribe.php failed", res.status, text.slice(0, 200));
  }
}
