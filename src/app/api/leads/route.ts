import { NextResponse } from "next/server";
import {
  registerLeadInCrm,
  subscribeLeadOnNetsendoList,
  updateLeadDetails,
  type BieLeadPayload,
} from "@/lib/netsendoLeads";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  service?: string;
  propertyType?: string;
  message?: string;
  selectedHasPhotovoltaics?: string;
  selectedTypeOfBuilding?: string;
  selectedNumberOfStoreys?: string;
  selectednumberofsquaremetersofthebuilding?: string;
  sourceUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  website?: string; // honeypot
};

const rateMap = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 8;
  const entry = rateMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}

function validate(body: LeadBody): string | null {
  if (body.website) return null;
  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").replace(/\s/g, "");
  if (name.length < 2) return "Podaj imię.";
  if (!/^\+?[0-9]{9,15}$/.test(phone)) return "Podaj prawidłowy telefon.";
  const email = (body.email ?? "").trim();
  if (!email) return "Podaj e-mail.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Nieprawidłowy e-mail.";
  }
  const service = (body.service ?? "").trim();
  if (!service || !["wycena", "kompensacja", "inne", "przeglad", "analiza-faktury"].includes(service)) {
    return "Wybierz temat.";
  }
  return null;
}

function crmEnabled(): boolean {
  const flag = (process.env.CRM_LEADS_ENABLED ?? "true").toLowerCase();
  if (flag === "false" || flag === "0" || flag === "no") return false;
  // Empty CRM_API_URL still uses default register_mail.php when enabled
  return true;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Zbyt wiele zapytań. Spróbuj za chwilę." },
      { status: 429 },
    );
  }

  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Nieprawidłowe dane." },
      { status: 400 },
    );
  }

  if (body.website) {
    return NextResponse.json({ ok: true, mock: true });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  const payload: BieLeadPayload = {
    name: (body.name ?? "").trim(),
    phone: (body.phone ?? "").trim(),
    email: (body.email ?? "").trim(),
    city: (body.city ?? "").trim(),
    service: (body.service ?? "").trim(),
    propertyType: (body.propertyType ?? "").trim(),
    message: (body.message ?? "").trim(),
    selectedHasPhotovoltaics: (body.selectedHasPhotovoltaics ?? "").trim(),
    selectedTypeOfBuilding: (body.selectedTypeOfBuilding ?? "").trim(),
    selectedNumberOfStoreys: (body.selectedNumberOfStoreys ?? "").trim(),
    selectednumberofsquaremetersofthebuilding: (
      body.selectednumberofsquaremetersofthebuilding ?? ""
    ).trim(),
    sourceUrl: body.sourceUrl ?? "",
    referrer: body.referrer ?? "",
    utmSource: body.utmSource ?? "",
    utmMedium: body.utmMedium ?? "",
    utmCampaign: body.utmCampaign ?? "",
  };

  if (!crmEnabled()) {
    console.info("[leads:mock]", JSON.stringify(payload));
    return NextResponse.json({ ok: true, mock: true });
  }

  try {
    // 1) CRM / Netsendo DB — jak „Dodaj kontakt” w crm-react
    const registered = await registerLeadInCrm(payload);
    const sid = registered.sid ?? 0;
    const emailForUpdate = registered.email || payload.email;

    // 2) Miasto + komentarz (wiadomość) bez nadpisywania innych pól
    if (sid || emailForUpdate) {
      await updateLeadDetails(sid, emailForUpdate, payload);
    }

    // 3) Lista Netsendo jak formularz na bezpieczneinstalacjeelektryczne.pl (mlid 289)
    await subscribeLeadOnNetsendoList(payload);

    return NextResponse.json({
      ok: true,
      sid: sid || undefined,
      created: registered.created ?? undefined,
    });
  } catch (err) {
    console.error("[leads] Netsendo/CRM failed", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Błąd zapisu zgłoszenia. Zadzwoń proszę: 730 222 105.",
      },
      { status: 502 },
    );
  }
}
