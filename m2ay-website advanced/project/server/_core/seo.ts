import { getChapterById, getTemplateById, getAllQuestionCategories, getQuestionsByCategory, getProfile } from "../db";

const SITE_NAME = "M2AY";
const DEFAULT_IMAGE = "/images/mohamed-magdy.jpg";
const DEFAULT_DESCRIPTION_AR = "دليل مالي احترافي من 26 فصل، قوالب Excel جاهزة، وبنك أسئلة مقابلات لبناء مسارك المهني في التمويل والمحاسبة.";
const DEFAULT_DESCRIPTION_EN = "A 26-chapter finance guide, ready-made Excel templates, and an interview question bank to build your finance career.";

export interface PageMeta {
  title: string;
  description: string;
  image: string;
  jsonLd: Record<string, unknown> | null;
}

function defaultMeta(titleAr: string, titleEn: string, lang: "ar" | "en"): PageMeta {
  return {
    title: `${lang === "ar" ? titleAr : titleEn} | ${SITE_NAME}`,
    description: lang === "ar" ? DEFAULT_DESCRIPTION_AR : DEFAULT_DESCRIPTION_EN,
    image: DEFAULT_IMAGE,
    jsonLd: null,
  };
}

/**
 * Resolves title/description/OG image/JSON-LD for a given request path.
 * `pathname` includes the /ar or /en language prefix (e.g. "/ar/chapters/5").
 * Used to inject real, crawlable, language-correct meta tags into the HTML shell —
 * a lightweight alternative to full SSR for a Vite+Express SPA.
 */
export async function resolvePageMeta(pathname: string, origin: string): Promise<PageMeta> {
  const langMatch = pathname.match(/^\/(ar|en)(\/.*)?$/);
  const lang: "ar" | "en" = langMatch?.[1] === "en" ? "en" : "ar";
  const path = langMatch ? (langMatch[2] || "/") : pathname;
  const isAr = lang === "ar";

  const chapterMatch = path.match(/^\/chapters\/(\d+)$/);
  if (chapterMatch) {
    const chapter = await getChapterById(Number(chapterMatch[1]));
    if (chapter && chapter.status === "published") {
      const title = isAr ? (chapter.seoTitle || chapter.arabicTitle) : chapter.englishTitle;
      const description = (isAr ? (chapter.seoDescription || chapter.summary) : chapter.englishContent?.slice(0, 160)) || DEFAULT_DESCRIPTION_AR;
      return {
        title: `${title} | ${SITE_NAME}`,
        description,
        image: chapter.ogImage || DEFAULT_IMAGE,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: chapter.arabicTitle,
          alternativeHeadline: chapter.englishTitle,
          description: chapter.seoDescription || chapter.summary || undefined,
          inLanguage: lang,
          author: { "@type": "Person", name: "Mohamed Magdy" },
          publisher: { "@type": "Person", name: "Mohamed Magdy" },
          dateModified: chapter.updatedAt ? new Date(chapter.updatedAt).toISOString() : undefined,
          url: `${origin}${pathname}`,
        },
      };
    }
    return defaultMeta("الفصل غير موجود", "Chapter not found", lang);
  }

  const templateMatch = path.match(/^\/templates\/(\d+)$/);
  if (templateMatch) {
    const template = await getTemplateById(Number(templateMatch[1]));
    if (template) {
      const title = isAr ? (template.seoTitle || template.arabicName) : template.englishName;
      return {
        title: `${title} | ${SITE_NAME}`,
        description: template.seoDescription || template.shortDescription || DEFAULT_DESCRIPTION_AR,
        image: template.previewImageUrl || DEFAULT_IMAGE,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: template.arabicName,
          alternateName: template.englishName,
          description: template.shortDescription || undefined,
          about: template.category,
          inLanguage: lang,
          dateModified: template.updatedAt ? new Date(template.updatedAt).toISOString() : undefined,
          url: `${origin}${pathname}`,
        },
      };
    }
    return defaultMeta("القالب غير موجود", "Template not found", lang);
  }

  const qbCategoryMatch = path.match(/^\/question-bank\/(\d+)$/);
  if (qbCategoryMatch) {
    const categoryId = Number(qbCategoryMatch[1]);
    const categories = await getAllQuestionCategories();
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      const questions = await getQuestionsByCategory(categoryId);
      const title = isAr ? category.arabicName : category.englishName;
      return {
        title: `${title} | ${SITE_NAME}`,
        description: isAr
          ? `${questions.length} سؤال مقابلة حقيقي في فئة ${category.arabicName}، بإجابات نموذجية وأخطاء شائعة.`
          : `${questions.length} real interview questions in the ${category.englishName} category, with model answers and common mistakes.`,
        image: DEFAULT_IMAGE,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: lang,
          mainEntity: questions.slice(0, 20).map(q => ({
            "@type": "Question",
            name: isAr ? q.question : (q.englishQuestion || q.question),
            acceptedAnswer: { "@type": "Answer", text: (isAr ? q.modelAnswer : (q.englishModelAnswer || q.modelAnswer)) || "" },
          })),
        },
      };
    }
    return defaultMeta("بنك الأسئلة", "Question Bank", lang);
  }

  if (path === "/question-bank") {
    return defaultMeta(
      "بنك أسئلة المقابلات",
      "Interview Question Bank",
      lang
    );
  }
  if (path === "/chapters") {
    return defaultMeta("الدليل المالي — 26 فصل", "The Finance Guide — 26 Chapters", lang);
  }
  if (path === "/templates") {
    return defaultMeta("القوالب الاحترافية", "Professional Templates", lang);
  }

  if (path === "/about") {
    const profile = await getProfile();
    const title = profile?.fullName || (isAr ? "من أنا" : "About Me");
    return {
      title: `${title} | ${SITE_NAME}`,
      description: profile?.summary || (isAr ? DEFAULT_DESCRIPTION_AR : DEFAULT_DESCRIPTION_EN),
      image: profile?.photoUrl || DEFAULT_IMAGE,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            name: profile?.fullName || "Mohamed Magdy",
            jobTitle: profile?.title,
            email: profile?.email,
            sameAs: [profile?.linkedIn, profile?.gitHub].filter(Boolean),
          },
          {
            "@type": "ProfessionalService",
            name: `${profile?.fullName || "Mohamed Magdy"} — Financial Consultation`,
            provider: { "@type": "Person", name: profile?.fullName || "Mohamed Magdy" },
            areaServed: "EG",
          },
        ],
      },
    };
  }

  if (path === "/privacy-policy") return defaultMeta("سياسة الخصوصية", "Privacy Policy", lang);
  if (path === "/terms-of-use") return defaultMeta("شروط الاستخدام", "Terms of Use", lang);

  // Home page default
  return {
    title: isAr ? "M2AY | محمد مجدي — نظام التشغيل المهني المالي" : "M2AY | Mohamed Magdy — Financial Career Operating System",
    description: isAr ? DEFAULT_DESCRIPTION_AR : DEFAULT_DESCRIPTION_EN,
    image: DEFAULT_IMAGE,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mohamed Magdy",
      jobTitle: "FP&A Analyst",
      inLanguage: lang,
      url: origin,
    },
  };
}

export function injectMetaIntoHtml(html: string, meta: PageMeta, pathname: string, origin: string): string {
  const escape = (s: string) => s.replace(/"/g, "&quot;");
  const langMatch = pathname.match(/^\/(ar|en)(\/.*)?$/);
  const lang = langMatch?.[1] === "en" ? "en" : "ar";
  const restPath = langMatch ? (langMatch[2] || "") : pathname;
  const arUrl = `${origin}/ar${restPath}`;
  const enUrl = `${origin}/en${restPath}`;
  const canonicalUrl = `${origin}${pathname}`;

  const tags = `
    <title>${escape(meta.title)}</title>
    <meta name="description" content="${escape(meta.description)}" />
    <link rel="canonical" href="${escape(canonicalUrl)}" />
    <link rel="alternate" hreflang="ar" href="${escape(arUrl)}" />
    <link rel="alternate" hreflang="en" href="${escape(enUrl)}" />
    <link rel="alternate" hreflang="x-default" href="${escape(arUrl)}" />
    <meta property="og:title" content="${escape(meta.title)}" />
    <meta property="og:description" content="${escape(meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escape(canonicalUrl)}" />
    <meta property="og:image" content="${escape(meta.image)}" />
    <meta property="og:site_name" content="M2AY" />
    <meta property="og:locale" content="${lang === "en" ? "en_US" : "ar_EG"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(meta.title)}" />
    <meta name="twitter:description" content="${escape(meta.description)}" />
    <meta name="twitter:image" content="${escape(meta.image)}" />
    ${meta.jsonLd ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>` : ""}
  `;

  let out = html.replace(/<title>[\s\S]*?<\/title>/, "").replace("</head>", `${tags}\n  </head>`);
  // Also fix the root <html lang="ar" dir="rtl"> tag to reflect the actual requested language
  out = out.replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">`);
  return out;
}
