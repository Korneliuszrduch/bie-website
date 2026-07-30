#!/usr/bin/env node
/**
 * Minimal SEO smoke checks for staging.
 * Usage: node scripts/seo-smoke.mjs [baseUrl]
 */

const base = (process.argv[2] || process.env.SMOKE_BASE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

async function get(path, { auth } = {}) {
  const headers = {};
  if (auth) headers.Authorization = `Basic ${Buffer.from(auth).toString("base64")}`;
  const res = await fetch(`${base}${path}`, { headers, redirect: "manual" });
  const text = await res.text();
  return { res, text };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function main() {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;
  const auth =
    process.env.BASIC_AUTH_ENABLED === "true" && user && pass
      ? `${user}:${pass}`
      : undefined;

  console.log(`Smoke SEO against ${base}`);

  const robots = await get("/robots.txt");
  assert(robots.res.status === 200, `robots.txt status ${robots.res.status}`);
  assert(
    /Disallow:\s*\//i.test(robots.text),
    "robots.txt should Disallow: / on staging",
  );
  assert(
    !/Sitemap:/i.test(robots.text),
    "robots.txt should not advertise sitemap on staging",
  );
  console.log("OK robots.txt");

  const home = await get("/", { auth });
  assert([200, 401].includes(home.res.status), `home status ${home.res.status}`);
  const xrobots = home.res.headers.get("x-robots-tag") || "";
  if (home.res.status === 200) {
    assert(
      /noindex/i.test(xrobots),
      `Missing X-Robots-Tag noindex, got: "${xrobots}"`,
    );
    assert(
      /noindex/i.test(home.text) && /nofollow/i.test(home.text),
      "HTML should contain noindex,nofollow meta on staging",
    );
    console.log("OK home X-Robots-Tag + meta robots");
  } else {
    assert(
      /noindex/i.test(xrobots),
      "401 response should still send X-Robots-Tag",
    );
    console.log("OK Basic Auth challenge + X-Robots-Tag");
  }

  const sitemap = await get("/sitemap.xml", { auth });
  assert(sitemap.res.status === 200, `sitemap status ${sitemap.res.status}`);
  // Empty urlset is acceptable on staging
  console.log("OK sitemap.xml reachable");

  console.log("All staging SEO smoke checks passed.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
