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
const questionCategories = JSON.parse(fs.readFileSync(path.join(dataDir, "question-categories.json"), "utf-8"));
const questions = JSON.parse(fs.readFileSync(path.join(dataDir, "questions.json"), "utf-8"));

const staticPaths = ["/", "/chapters", "/templates", "/question-bank", "/about", "/privacy-policy", "/terms-of-use"];
const neutralPaths = [
  ...staticPaths,
  ...chapters.map((c) => `/chapters/${c.id}`),
  ...templates.map((t) => `/templates/${t.id}`),
  ...questionCategories.map((c) => `/question-bank/${c.id}`),
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

// ---- Lightweight homepage summary ----
// Home.tsx only needs counts + 3 featured items per section — not the full
// 730KB of chapter/question content. Precomputing this at build time means
// the homepage chunk stays small instead of pulling in every chapter and
// all 222 questions just to display a handful of preview cards.
const sortedChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);

const homepageSummary = {
  counts: {
    chapters: chapters.length,
    templates: templates.length,
    questions: questions.length,
  },
  featuredChapters: sortedChapters.slice(0, 3).map((c) => ({
    id: c.id, chapterNumber: c.chapterNumber, section: c.section,
    arabicTitle: c.arabicTitle, englishTitle: c.englishTitle,
  })),
  featuredTemplates: templates.slice(0, 3).map((t) => ({
    id: t.id, arabicName: t.arabicName, englishName: t.englishName, category: t.category,
  })),
  featuredCategories: questionCategories.slice(0, 3).map((c) => ({
    id: c.id, arabicName: c.arabicName, englishName: c.englishName, questionCount: c.questionCount,
  })),
};

fs.writeFileSync(
  path.resolve(__dirname, "../client/src/data/homepage-summary.json"),
  JSON.stringify(homepageSummary, null, 2)
);
console.log(`✓ Generated homepage-summary.json (${Buffer.byteLength(JSON.stringify(homepageSummary))} bytes vs ~730KB full dataset)`);

// ---- Top questions for FAQPage schema ----
// QuestionBank.tsx only needs 12 questions for its FAQPage JSON-LD — not the
// full 222-question, 521KB dataset. Precomputing this at build time keeps
// that page's chunk light; QuestionBankCategory.tsx (which genuinely needs
// full question detail per category) still imports questions.ts directly.
const topQuestions = questions.slice(0, 12).map((q) => ({
  question: q.question,
  englishQuestion: q.englishQuestion,
  modelAnswer: q.modelAnswer,
  englishModelAnswer: q.englishModelAnswer,
}));
fs.writeFileSync(
  path.resolve(__dirname, "../client/src/data/top-questions.json"),
  JSON.stringify(topQuestions, null, 2)
);
console.log(`✓ Generated top-questions.json (${Buffer.byteLength(JSON.stringify(topQuestions))} bytes vs ~521KB full questions dataset)`);
