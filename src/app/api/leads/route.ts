import { NextResponse } from "next/server";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  service?: string;
  propertyType?: string;
  message?: string;
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
  if (body.website) return null; // honeypot — silently accept
  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").replace(/\s/g, "");
  if (name.length < 2) return "Podaj imię.";
  if (!/^\+?[0-9]{9,15}$/.test(phone)) return "Podaj prawidłowy telefon.";
  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return "Nieprawidłowy e-mail.";
  }
  return null;
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

  // Honeypot filled → fake success
  if (body.website) {
    return NextResponse.json({ ok: true, mock: true });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  const payload = {
    name: (body.name ?? "").trim(),
    phone: (body.phone ?? "").trim(),
    email: (body.email ?? "").trim(),
    city: (body.city ?? "").trim(),
    service: (body.service ?? "").trim(),
    propertyType: (body.propertyType ?? "").trim(),
    message: (body.message ?? "").trim(),
    sourceUrl: body.sourceUrl ?? "",
    referrer: body.referrer ?? "",
    utmSource: body.utmSource ?? "",
    utmMedium: body.utmMedium ?? "",
    utmCampaign: body.utmCampaign ?? "",
  };

  const crmUrl = process.env.CRM_API_URL?.trim();
  const crmKey = process.env.CRM_API_KEY?.trim();

  if (crmUrl) {
    try {
      const res = await fetch(crmUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(crmKey ? { Authorization: `Bearer ${crmKey}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("[leads] CRM error", res.status);
        return NextResponse.json(
          { ok: false, error: "Błąd integracji CRM. Zadzwoń proszę bezpośrednio." },
          { status: 502 },
        );
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[leads] CRM fetch failed", err);
      return NextResponse.json(
        { ok: false, error: "Błąd połączenia z CRM." },
        { status: 502 },
      );
    }
  }

  // Staging mock — log only, never expose secrets
  console.info("[leads:mock]", JSON.stringify(payload));
  return NextResponse.json({ ok: true, mock: true });
}
