/**
 * Optimize large JPG/PNG under public/images into WebP (+ optional in-place).
 *
 * Usage:
 *   node scripts/optimize-images.mjs --report
 *   node scripts/optimize-images.mjs --write
 *   node scripts/optimize-images.mjs --write --update-refs
 *
 * --report       list candidates only
 * --write        backup originals to public/images/_originals and write .webp
 * --update-refs  rewrite .ts/.tsx references from .jpg/.png to .webp for written files
 * --min-kb=300   minimum size to consider (default 300)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const imagesRoot = path.join(root, "public", "images");
const originalsRoot = path.join(imagesRoot, "_originals");

const args = new Set(process.argv.slice(2));
const reportOnly = args.has("--report") || !args.has("--write");
const doWrite = args.has("--write");
const updateRefs = args.has("--update-refs");
const minKbArg = [...args].find((a) => a.startsWith("--min-kb="));
const minBytes = Number(minKbArg?.split("=")[1] || 300) * 1024;

const SKIP_DIR_NAMES = new Set(["_originals", "Do wykorzystania"]);
const PRIORITY_PREFIXES = [
  "hero-main",
  "stats/",
  "realizacje/",
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function relPosix(file) {
  return path.relative(imagesRoot, file).split(path.sep).join("/");
}

function isCandidate(file) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") return false;
  const stat = fs.statSync(file);
  if (stat.size < minBytes) return false;
  // Skip tiny icons / svg already filtered by ext
  return true;
}

function isPriority(rel) {
  return PRIORITY_PREFIXES.some(
    (p) => rel === p || rel.startsWith(p) || rel.includes(`/${p}`),
  );
}

function qualityFor(rel) {
  // Keep documentation / protocol photos sharper.
  if (rel.includes("protokol") || rel.includes("rozdziel") || rel.includes("uprawnienia")) {
    return 86;
  }
  if (rel.includes("stats/") || rel.startsWith("hero")) return 80;
  return 82;
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "Missing dependency: sharp. Install with: npm install -D sharp",
    );
    process.exit(1);
  }

  const files = walk(imagesRoot).filter(isCandidate);
  const rows = [];

  for (const file of files) {
    const rel = relPosix(file);
    const before = fs.statSync(file).size;
    const webpPath = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const priority = isPriority(rel);
    rows.push({ file, rel, before, webpPath, priority, quality: qualityFor(rel) });
  }

  rows.sort((a, b) => b.before - a.before);

  console.log(`Candidates (>${minBytes / 1024} KB JPG/PNG): ${rows.length}`);
  console.log(
    "rel\tbefore_kb\tpriority\tquality\t" + (doWrite ? "after_kb\tsaved%" : ""),
  );

  const written = [];

  for (const row of rows) {
    if (reportOnly && !doWrite) {
      console.log(
        `${row.rel}\t${(row.before / 1024).toFixed(1)}\t${row.priority}\t${row.quality}`,
      );
      continue;
    }

    // Prefer prioritizing home / realizations / services assets when writing.
    if (!row.priority && !args.has("--all")) continue;

    const backup = path.join(originalsRoot, row.rel);
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    if (!fs.existsSync(backup)) {
      fs.copyFileSync(row.file, backup);
    }

    await sharp(row.file)
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: row.quality, effort: 4 })
      .toFile(row.webpPath);

    const after = fs.statSync(row.webpPath).size;
    const saved = row.before > 0 ? (1 - after / row.before) * 100 : 0;
    console.log(
      `${row.rel}\t${(row.before / 1024).toFixed(1)}\t${row.priority}\t${row.quality}\t${(after / 1024).toFixed(1)}\t${saved.toFixed(1)}%`,
    );
    written.push({ ...row, after, saved, webpRel: row.rel.replace(/\.(jpe?g|png)$/i, ".webp") });
  }

  if (doWrite && updateRefs && written.length) {
    const codeRoot = path.join(root, "src");
    const codeFiles = walk(codeRoot).filter((f) =>
      /\.(tsx?|jsx?|css|md)$/.test(f),
    );
    let replacements = 0;
    for (const codeFile of codeFiles) {
      let text = fs.readFileSync(codeFile, "utf8");
      let next = text;
      for (const w of written) {
        const from = `/images/${w.rel}`;
        const to = `/images/${w.webpRel}`;
        if (next.includes(from)) {
          next = next.split(from).join(to);
          replacements += 1;
        }
      }
      if (next !== text) fs.writeFileSync(codeFile, next, "utf8");
    }
    console.log(`Updated code references (approx hits): ${replacements}`);
  }

  if (doWrite) {
    const reportPath = path.join(root, "scripts", "optimize-images-report.json");
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        written.map((w) => ({
          file: w.rel,
          beforeBytes: w.before,
          afterBytes: w.after,
          savedPercent: Number(w.saved.toFixed(1)),
          webp: w.webpRel,
          usage: w.priority ? "home/realizacje/priority" : "other",
        })),
        null,
        2,
      ),
    );
    console.log(`Wrote ${reportPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
