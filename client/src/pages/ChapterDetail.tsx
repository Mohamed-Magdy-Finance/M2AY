import { Link, useParams } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Target, CheckCircle2, ClipboardList, HelpCircle, Compass } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chapters, getAdjacentChapters } from "@/data/chapters";
import { getTemplatesForChapter, getQuestionCategoriesForChapter } from "@/data/relations";
import { siteConfig } from "@/data";

const SECTIONS_AR: Record<string, string> = {
  Foundations: "الأساسيات", "Technical Skills": "المهارات الفنية", Application: "التطبيق",
  "Career OS": "نظام التشغيل المهني", "Elite Tools": "أدوات النخبة",
  "Market Intelligence": "ذكاء السوق", "Elite Appendices": "ملاحق متقدمة",
};

export default function ChapterDetail() {
  const params = useParams<{ id: string }>();
  const chapterId = Number(params.id);
  const { isAr, lp } = useLanguage();

  const chapter = chapters.find(c => c.id === chapterId);

  useSEO({
    title: chapter ? (isAr ? chapter.arabicTitle : chapter.englishTitle) : (isAr ? "الفصل" : "Chapter"),
    description: chapter?.summary || (isAr ? "فصل من الدليل المالي الاحترافي" : "A chapter from the professional finance guide"),
    path: `/chapters/${chapterId}`,
  });

  if (!chapter) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen flex flex-col">
        <SiteHeader siteName={siteConfig.siteName} />
        <p className="text-center py-32 text-muted-foreground flex-1">{isAr ? "الفصل غير موجود" : "Chapter not found"}</p>
        <SiteFooter siteName={siteConfig.siteName} />
      </div>
    );
  }

  const relatedTemplates = getTemplatesForChapter(chapter.id);
  const relatedCategories = getQuestionCategoriesForChapter(chapter.id);
  const { previous, next } = getAdjacentChapters(chapter.chapterNumber);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: isAr ? "الرئيسية" : "Home", href: "/" },
            { label: isAr ? "المنهجية" : "Methodology", href: "/chapters" },
            { label: isAr ? chapter.arabicTitle : chapter.englishTitle },
          ]}
        />

        <Badge variant="outline" className="mb-3">{isAr ? SECTIONS_AR[chapter.section] ?? chapter.section : chapter.section}</Badge>
        <h1 className="text-3xl font-extrabold mb-1">{isAr ? chapter.arabicTitle : chapter.englishTitle}</h1>
        <p className="text-lg text-muted-foreground mb-8">{isAr ? chapter.englishTitle : chapter.arabicTitle}</p>

        <article className="prose dark:prose-invert max-w-none leading-relaxed mb-12">
          {!isAr && !chapter.englishContent && (
            <p className="text-sm italic opacity-70 mb-4 not-prose">
              English version will be available soon. Showing the Arabic content below.
            </p>
          )}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {isAr ? chapter.arabicContent : (chapter.englishContent || chapter.arabicContent)}
          </ReactMarkdown>
        </article>

        {(chapter.summary || chapter.practicalOutput || chapter.portfolioTask) && (
          <Card className="p-6 mb-10" style={{ borderColor: "var(--accent)", borderWidth: 1 }}>
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-5 h-5" style={{ color: "var(--accent)" }} />
              <h2 className="font-bold text-lg">{isAr ? "خاتمة الفصل" : "Chapter Closing"}</h2>
            </div>
            <div className="space-y-5">
              {chapter.summary && (
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--secondary)" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1">{isAr ? "الخلاصة والأهداف" : "Summary & Goals"}</p>
                    <p className="text-sm opacity-80">{chapter.summary}</p>
                  </div>
                </div>
              )}
              {chapter.practicalOutput && (
                <div className="flex gap-3">
                  <ClipboardList className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--secondary)" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1">{isAr ? "المخرج العملي" : "Practical Output"}</p>
                    <p className="text-sm opacity-80">{chapter.practicalOutput}</p>
                  </div>
                </div>
              )}
              {chapter.portfolioTask && (
                <div className="flex gap-3">
                  <ClipboardList className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--secondary)" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1">{isAr ? "مهمة المحفظة" : "Portfolio Task"}</p>
                    <p className="text-sm opacity-80">{chapter.portfolioTask}</p>
                  </div>
                </div>
              )}
              {chapter.selfAssessment && (
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--secondary)" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1">{isAr ? "التقييم الذاتي" : "Self-Assessment"}</p>
                    <p className="text-sm opacity-80">{chapter.selfAssessment}</p>
                  </div>
                </div>
              )}
              {chapter.reflectionQuestion && (
                <div className="flex gap-3">
                  <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--secondary)" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1">{isAr ? "سؤال تفكير" : "Reflection Question"}</p>
                    <p className="text-sm opacity-80">{chapter.reflectionQuestion}</p>
                  </div>
                </div>
              )}
              {chapter.nextStep && (
                <div className="flex gap-3">
                  <Compass className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                  <div>
                    <p className="font-semibold text-sm mb-1">{isAr ? "الخطوة التالية" : "Next Step"}</p>
                    <p className="text-sm opacity-80">{chapter.nextStep}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {relatedTemplates.length > 0 && (
          <div className="mb-10">
            <h2 className="font-bold text-lg mb-4">{isAr ? "قوالب مرتبطة بهذا الفصل" : "Templates related to this chapter"}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedTemplates.map(t => (
                <Link key={t.id} href={lp(`/templates/${t.id}`)}>
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <Badge variant="secondary" className="mb-2">{t.category}</Badge>
                    <p className="font-semibold text-sm">{isAr ? t.arabicName : t.englishName}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedCategories.length > 0 && (
          <div className="mb-10">
            <h2 className="font-bold text-lg mb-4">{isAr ? "أسئلة مقابلات مرتبطة" : "Related interview questions"}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedCategories.map(cat => (
                <Link key={cat.id} href={lp(`/question-bank/${cat.id}`)}>
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} />
                    <p className="font-semibold text-sm">{isAr ? cat.arabicName : cat.englishName}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {(previous || next) && (
          <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
            {previous ? (
              <Link href={lp(`/chapters/${previous.id}`)}>
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3" /> {isAr ? "الفصل السابق" : "Previous Chapter"}
                  </p>
                  <p className="font-semibold text-sm">{isAr ? previous.arabicTitle : previous.englishTitle}</p>
                </Card>
              </Link>
            ) : <div />}
            {next && (
              <Link href={lp(`/chapters/${next.id}`)}>
                <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full text-end">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1 justify-end">
                    {isAr ? "الفصل التالي" : "Next Chapter"} <ArrowLeft className="w-3 h-3" />
                  </p>
                  <p className="font-semibold text-sm">{isAr ? next.arabicTitle : next.englishTitle}</p>
                </Card>
              </Link>
            )}
          </div>
        )}
      </div>

      <SiteFooter siteName={siteConfig.siteName} whatsapp={siteConfig.contact.whatsappNumber} email={siteConfig.contact.email} linkedIn={siteConfig.contact.linkedin} />
    </div>
  );
}
