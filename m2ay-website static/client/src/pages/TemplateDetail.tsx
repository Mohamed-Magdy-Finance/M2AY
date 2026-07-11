import { useParams, Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Download } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "sonner";
import { templates as templatesData, siteConfig } from "@/data";

export default function TemplateDetail() {
  const params = useParams<{ id: string }>();
  const templateId = params.id;
  const { isAr, lp } = useLanguage();

  const template = templatesData.find(t => t.id === templateId);
  const settings = siteConfig;

  useSEO({
    title: template ? (isAr ? template.titleAr : template.titleEn) : (isAr ? "قالب" : "Template"),
    description: template ? (isAr ? template.descriptionAr : template.descriptionEn) : (isAr ? "قالب مالي احترافي" : "A professional financial template"),
    path: `/templates/${templateId}`,
  });

  if (!template) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen flex flex-col">
        <SiteHeader siteName={settings.siteName} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">{isAr ? "القالب غير موجود" : "Template not found"}</p>
            <Link href={lp("/templates")}>
              <a className="text-accent hover:underline">{isAr ? "العودة للقوالب" : "Back to templates"}</a>
            </Link>
          </div>
        </div>
        <SiteFooter siteName={settings.siteName} />
      </div>
    );
  }

  const currentIndex = templatesData.findIndex(t => t.id === templateId);
  const prevTemplate = currentIndex > 0 ? templatesData[currentIndex - 1] : null;
  const nextTemplate = currentIndex < templatesData.length - 1 ? templatesData[currentIndex + 1] : null;

  const handleDownload = () => {
    toast.success(isAr ? "جاري التحميل..." : "Download started...");
    // فتح رابط التحميل
    if (template.downloadUrl) {
      window.open(template.downloadUrl, "_blank");
    }
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings.siteName} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm opacity-70">
          <Link href={lp("/")}><a className="hover:opacity-100">{isAr ? "الرئيسية" : "Home"}</a></Link>
          <span>/</span>
          <Link href={lp("/templates")}><a className="hover:opacity-100">{isAr ? "القوالب" : "Templates"}</a></Link>
          <span>/</span>
          <span>{isAr ? template.titleAr : template.titleEn}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <Badge className="mb-4">{template.category}</Badge>
          <h1 className="text-4xl font-extrabold mb-4">{isAr ? template.titleAr : template.titleEn}</h1>
          <p className="text-lg opacity-80">{isAr ? template.descriptionAr : template.descriptionEn}</p>
        </div>

        {/* Content */}
        <Card className="p-8 mb-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">{isAr ? "عن هذا القالب" : "About This Template"}</h2>
              <p className="opacity-80">{isAr ? template.descriptionAr : template.descriptionEn}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">{isAr ? "الفئة" : "Category"}</h3>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
              <div>
                <h3 className="font-bold mb-2">{isAr ? "عدد التحميلات" : "Downloads"}</h3>
                <p className="text-sm opacity-80">{template.downloadCount.toLocaleString()}</p>
              </div>
            </div>

            {template.relatedChapters && template.relatedChapters.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">{isAr ? "الفصول المرتبطة" : "Related Chapters"}</h3>
                <div className="flex flex-wrap gap-2">
                  {template.relatedChapters.map((chapterId, i) => (
                    <Badge key={i} variant="outline">
                      {isAr ? "الفصل" : "Chapter"} {chapterId}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t">
              <Button
                onClick={handleDownload}
                size="lg"
                className="w-full gap-2"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                <Download className="w-4 h-4" />
                {isAr ? "تحميل القالب" : "Download Template"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {prevTemplate ? (
            <Link href={lp(`/templates/${prevTemplate.id}`)}>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span className="text-sm opacity-70">{isAr ? "القالب السابق" : "Previous Template"}</span>
                </div>
                <p className="font-bold">{isAr ? prevTemplate.titleAr : prevTemplate.titleEn}</p>
              </Card>
            </Link>
          ) : (
            <div />
          )}

          {nextTemplate ? (
            <Link href={lp(`/templates/${nextTemplate.id}`)}>
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-sm opacity-70">{isAr ? "القالب التالي" : "Next Template"}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
                <p className="font-bold text-right">{isAr ? nextTemplate.titleAr : nextTemplate.titleEn}</p>
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
