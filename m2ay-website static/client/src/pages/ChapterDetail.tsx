import { useParams, Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { chapters as chaptersData, siteConfig } from "@/data";

export default function ChapterDetail() {
  const params = useParams<{ id: string }>();
  const chapterId = params.id;
  const { isAr, lp } = useLanguage();

  const chapter = chaptersData.find(c => c.id === chapterId);
  const settings = siteConfig;

  useSEO({
    title: chapter ? (isAr ? chapter.titleAr : chapter.titleEn) : (isAr ? "الفصل" : "Chapter"),
    description: chapter ? (isAr ? chapter.descriptionAr : chapter.descriptionEn) : (isAr ? "فصل من الدليل المالي" : "A chapter from the finance guide"),
    path: `/chapters/${chapterId}`,
  });

  if (!chapter) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen flex flex-col">
        <SiteHeader siteName={settings.siteName} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">{isAr ? "الفصل غير موجود" : "Chapter not found"}</p>
            <Link href={lp("/chapters")}>
              <a className="text-accent hover:underline">{isAr ? "العودة للفصول" : "Back to chapters"}</a>
            </Link>
          </div>
        </div>
        <SiteFooter siteName={settings.siteName} />
      </div>
    );
  }

  const currentIndex = chaptersData.findIndex(c => c.id === chapterId);
  const prevChapter = currentIndex > 0 ? chaptersData[currentIndex - 1] : null;
  const nextChapter = currentIndex < chaptersData.length - 1 ? chaptersData[currentIndex + 1] : null;

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings.siteName} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm opacity-70">
          <Link href={lp("/")}><a className="hover:opacity-100">{isAr ? "الرئيسية" : "Home"}</a></Link>
          <span>/</span>
          <Link href={lp("/chapters")}><a className="hover:opacity-100">{isAr ? "الفصول" : "Chapters"}</a></Link>
          <span>/</span>
          <span>{isAr ? chapter.titleAr : chapter.titleEn}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <Badge className="mb-4">{chapter.category}</Badge>
          <h1 className="text-4xl font-extrabold mb-4">{isAr ? chapter.titleAr : chapter.titleEn}</h1>
          <p className="text-lg opacity-80">{isAr ? chapter.descriptionAr : chapter.descriptionEn}</p>
        </div>

        {/* Content */}
        <Card className="p-8 mb-12 prose dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p>{isAr ? chapter.descriptionAr : chapter.descriptionEn}</p>
            <p className="text-sm opacity-70">
              {isAr ? "هذا الفصل جزء من الدليل المالي الشامل" : "This chapter is part of the comprehensive finance guide"}
            </p>
          </div>
        </Card>

        {/* Navigation */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {prevChapter ? (
            <Link href={lp(`/chapters/${prevChapter.id}`)}>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span className="text-sm opacity-70">{isAr ? "الفصل السابق" : "Previous Chapter"}</span>
                </div>
                <p className="font-bold">{isAr ? prevChapter.titleAr : prevChapter.titleEn}</p>
              </Card>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link href={lp(`/chapters/${nextChapter.id}`)}>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-sm opacity-70">{isAr ? "الفصل التالي" : "Next Chapter"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
                <p className="font-bold text-right">{isAr ? nextChapter.titleAr : nextChapter.titleEn}</p>
              </Card>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      <SiteFooter
        whatsapp={settings.contact.whatsapp}
        email={settings.contact.email}
        linkedIn={settings.contact.linkedin}
        siteName={settings.siteName}
      />
    </div>
  );
}
