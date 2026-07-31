# Cutover: WordPress → Next.js

## Co jest w kodzie

- **`/terminy`** — Google Calendar Appointment Scheduling (ten sam schedule co WP).
- **301** — [`src/lib/legacyRedirects.ts`](../src/lib/legacyRedirects.ts) + `next.config.ts` `redirects()`.
- **410** — śmieciowe URL-e WP w `middleware.ts` (`isLegacyGonePath`).
- PDF-y lokalnie: `/images/uprawnienia/uprawnienia-elektryczne-d1-e1.pdf`, `swiadectwo-wzorcowania.pdf`.

## Mapa 301 (skrót)

| Stary WP | Nowy |
|----------|------|
| `/kwalifikacje/` | `/o-firmie` |
| `/5-letni-przeglad-elektryczny/` | `/uslugi/przeglady-instalacji-elektrycznych` |
| `/realizacje-kompensacja-mocy-biernej/` | `/realizacje/kompensacja-mocy-biernej` |
| `/blog/` | `/poradnik` |
| `/form` | `/kontakt` |
| `/terminy/` | `/terminy` (strona żywa) |
| WP PDF wzorcowania / D1_E1 | `/images/uprawnienia/...` |

## 410 Gone

Sklep (`/sklep`, `/koszyk`, …), blog o terminalach płatniczych, `/author/*`, `/category/*`.

## Env produkcja (apex, nie `nowa.*`)

```
NEXT_PUBLIC_SITE_URL=https://bezpieczneinstalacjeelektryczne.pl
SITE_ENV=production
BASIC_AUTH_ENABLED=false
CRM_LEADS_ENABLED=true
NEXT_PUBLIC_CALIBRATION_PDF_URL=/images/uprawnienia/swiadectwo-wzorcowania.pdf
NEXT_PUBLIC_GOOGLE_APPOINTMENTS_URL=https://calendar.google.com/calendar/appointments/schedules/AcZssZ2t_FM-bXLzPEfvgexpL9hIh0fAwY-_OL3CsQXyq4-sE5hh-KXS7Uzxe5Gpf5xheXLJV10Ili6d?gv=true
```

`nowa.*` zostaje stagingiem (hard-lock noindex w middleware).

## Kolejność cutoveru DNS

1. Backup WP (pliki + DB).
2. Deploy Next (`npm run build`, PM2/systemd) na VPS.
3. Nginx/Caddy: apex + `www` → Node, SSL; `www` → apex.
4. Przełącz DNS A/AAAA na ten host.
5. Smoke: `/`, `/terminy`, `/kontakt`, lead → CRM, PDF-y.
6. GSC: sitemap; GBP: URL strony.
7. `curl -sI` na kilka starych ścieżek (301/410).

## Smoke lokalnie

```bash
npm run build && npm start
curl -sI http://127.0.0.1:3000/terminy
curl -sI http://127.0.0.1:3000/5-letni-przeglad-elektryczny/
curl -sI http://127.0.0.1:3000/sklep/
```
