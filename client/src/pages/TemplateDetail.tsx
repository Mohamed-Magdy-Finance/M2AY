import { Link, useParams } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Link as LinkIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoBanner from "@/components/AutoBanner";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "sonner";
import { templates } from "@/data/templates";
import { getChaptersForTemplate } from "@/data/relations";
import { siteConfig } from "@/data";

const CATEGORIES_AR: Record<string, string> = {
  Valuation: "التقييم", Modeling: "النمذجة", Budgeting: "الموازنة",
  "Personal Finance": "المالية الشخصية", "Accounting Systems": "الأنظمة المحاسبية",
  Startup: "الشركات الناشئة", "Performance Analysis": "تحليل الأداء",
};

export default function TemplateDetail() {
  const params = useParams<{ id: string }>();
  const templateId = Number(params.id);
  const { isAr, lp } = useLanguage();

  const template = templates.find(t => t.id === templateId);

  useSEO({
    title: template ? (isAr ? template.arabicName : template.englishName) : (isAr ? "قالب" : "Template"),
    description: template?.shortDescription || (isAr ? "قالب مالي احترافي" : "A professional financial template"),
    path: `/templates/${templateId}`,
  });

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader siteName={siteConfig.siteName} />
        <p className="text-center py-32 text-muted-foreground flex-1">{isAr ? "القالب غير موجود" : "Template not found"}</p>
        <SiteFooter siteName={siteConfig.siteName} />
      </div>
    );
  }

  const relatedChapters = getChaptersForTemplate(template.id);

  const handleDownload = () => {
    window.open(template.githubUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(isAr ? "تم نسخ الرابط" : "Link copied");
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: isAr ? "الرئيسية" : "Home", href: "/" },
            { label: isAr ? "القوالب" : "Templates", href: "/templates" },
            { label: isAr ? template.arabicName : template.englishName },
          ]}
        />

        <AutoBanner
          title={isAr ? template.arabicName : template.englishName}
          category={template.category}
          difficultyLevel={template.difficultyLevel}
          className="mb-6 aspect-[21/9]"
        />

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{isAr ? CATEGORIES_AR[template.category] ?? template.category : template.category}</Badge>
          {template.difficultyLevel && <Badge variant="outline">{template.difficultyLevel}</Badge>}
        </div>
        <h1 className="text-3xl font-extrabold mb-1">{isAr ? template.arabicName : template.englishName}</h1>
        <p className="text-lg text-muted-foreground mb-6">{isAr ? template.englishName : template.arabicName}</p>

        <p className="text-base mb-6 leading-relaxed">{template.shortDescription}</p>

        {template.detailedExplanation && (
          <Card className="p-6 mb-8">
            <h2 className="font-bold mb-3">{isAr ? "شرح تفصيلي" : "Detailed Explanation"}</h2>
            <p className="text-sm leading-relaxed opacity-90">{template.detailedExplanation}</p>
          </Card>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          <Button size="lg" onClick={handleDownload} className="gap-2" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
            <Download className="w-4 h-4" />
            {isAr ? "تحميل القالب" : "Download Template"}
          </Button>
          <Button size="lg" variant="outline" onClick={handleCopyLink} className="gap-2">
            <LinkIcon className="w-4 h-4" />
            {isAr ? "نسخ الرابط" : "Copy Link"}
          </Button>
        </div>

        {relatedChapters.length > 0 && (
          <div>
            <h2 className="font-bold text-lg mb-4">{isAr ? "فصول مرتبطة" : "Related Chapters"}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedChapters.map(c => (
                <Link key={c.id} href={lp(`/chapters/${c.id}`)}>
                  <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <Badge variant="outline" className="mb-2">{isAr ? `فصل ${c.chapterNumber}` : `Chapter ${c.chapterNumber}`}</Badge>
                    <p className="font-semibold text-sm">{isAr ? c.arabicTitle : c.englishTitle}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <SiteFooter siteName={siteConfig.siteName} whatsapp={siteConfig.contact.whatsappNumber} email={siteConfig.contact.email} linkedIn={siteConfig.contact.linkedin} />
    </div>
  );
}
