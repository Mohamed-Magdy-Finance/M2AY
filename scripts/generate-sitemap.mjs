/**
 * Generates public/sitemap.xml and public/robots.txt from the real content data.
 * Runs automatically before `vite build` (see package.json's "prebuild" script),
 * so these files can never drift out of sync with the actual site content again.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ⚠️ Update this if the GitHub username or repository name ever changes.
const SITE_ORIGIN = "https://mohamed-magdy-finance.github.io";
const BASE_PATH = "/M2AY";

const dataDir = path.resolve(__dirname, "../client/src/data");
const chapters = JSON.parse(fs.readFileSync(path.join(dataDir, "chapters.json"), "utf-8"));
const templates = JSON.parse(fs.readFileSync(path.join(dataDir, "templates.json"), "utf-8"));
const questionBank = JSON.parse(fs.readFileSync(path.join(dataDir, "question-bank.json"), "utf-8"));

const staticPaths = ["/", "/chapters", "/templates", "/question-bank", "/about", "/privacy-policy", "/terms-of-use"];
const neutralPaths = [
  ...staticPaths,
  ...chapters.map((c) => `/chapters/${c.id}`),
  ...templates.map((t) => `/templates/${t.id}`),
  ...questionBank.categories.map((c) => `/question-bank/${c.id}`),
];

const urlEntries = neutralPaths.map((p) => {
  const suffix = p === "/" ? "" : p;
  const arHref = `${SITE_ORIGIN}${BASE_PATH}/ar${suffix}`;
  const enHref = `${SITE_ORIGIN}${BASE_PATH}/en${suffix}`;
  return [arHref, enHref]
    .map(
      (loc) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${arHref}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
  </url>`
    )
    .join("\n");
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}${BASE_PATH}/sitemap.xml
`;

const publicDir = path.resolve(__dirname, "../client/public");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);

console.log(`✓ Generated sitemap.xml with ${neutralPaths.length * 2} URLs (${neutralPaths.length} pages × 2 languages)`);
console.log(`✓ Generated robots.txt`);
