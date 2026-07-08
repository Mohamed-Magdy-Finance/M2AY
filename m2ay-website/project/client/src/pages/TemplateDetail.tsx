import { useState } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Download, Link as LinkIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AutoBanner from "@/components/AutoBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import { toast } from "sonner";

export default function TemplateDetail() {
  const params = useParams<{ id: string }>();
  const templateId = Number(params.id);
  const { isAr, lp } = useLanguage();

  const { data: template, isLoading } = trpc.public.templates.byId.useQuery({ id: templateId });
  const { data: settings } = trpc.public.settings.useQuery();
  const incrementDownload = trpc.public.templates.incrementDownload.useMutation();

  useSEO({
    title: template ? (isAr ? template.arabicName : template.englishName) : (isAr ? "قالب" : "Template"),
    description: template?.shortDescription || (isAr ? "قالب مالي احترافي" : "A professional financial template"),
    path: `/templates/${templateId}`,
  });

  if (isLoading) return <p className="text-center py-32 text-muted-foreground">{isAr ? "جاري التحميل..." : "Loading..."}</p>;
  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader siteName={settings?.siteName} />
        <p className="text-center py-32 text-muted-foreground flex-1">{isAr ? "القالب غير موجود" : "Template not found"}</p>
        <SiteFooter siteName={settings?.siteName} footerText={settings?.footerText} />
      </div>
    );
  }

  const downloadUrl = template.githubRepoUrl && template.githubFolderPath
    ? `${template.githubRepoUrl}/tree/main/${template.githubFolderPath}`
    : template.githubRepoUrl;

  const handleDownload = () => {
    incrementDownload.mutate({ id: template.id });
    if (downloadUrl) window.open(downloadUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(isAr ? "تم نسخ الرابط" : "Link copied");
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings?.siteName} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: isAr ? "الرئيسية" : "Home", href: "/" },
            { label: isAr ? "القوالب" : "Templates", href: "/templates" },
            { label: isAr ? template.arabicName : template.englishName },
          ]}
        />

        {template.previewImageUrl ? (
          <img src={template.previewImageUrl} alt={template.englishName} className="w-full aspect-[16/9] object-cover rounded-xl mb-6" />
        ) : (
          <AutoBanner
            title={isAr ? template.arabicName : template.englishName}
            category={template.category}
            difficultyLevel={template.difficultyLevel}
            updatedAt={template.updatedAt}
            className="mb-6 aspect-[21/9]"
          />
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{template.category}</Badge>
          {template.difficultyLevel && <Badge variant="outline">{template.difficultyLevel}</Badge>}
          {template.updatedAt && (
            <Badge variant="outline" className="opacity-70">
              {isAr ? "آخر تحديث: " : "Updated: "}
              {new Date(template.updatedAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
            </Badge>
          )}
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
          <Button
            size="lg"
            onClick={handleDownload}
            className="gap-2"
            style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
          >
            <Download className="w-4 h-4" />
            {isAr ? "تحميل القالب" : "Download Template"}
          </Button>
          <Button size="lg" variant="outline" onClick={handleCopyLink} className="gap-2">
            <LinkIcon className="w-4 h-4" />
            {isAr ? "نسخ الرابط" : "Copy Link"}
          </Button>
        </div>

        {template.relatedChapters && template.relatedChapters.length > 0 && (
          <div>
            <h2 className="font-bold text-lg mb-4">{isAr ? "فصول مرتبطة" : "Related Chapters"}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {template.relatedChapters.map(c => (
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

      <SiteFooter whatsapp={settings?.whatsappNumber} email={settings?.contactEmail} linkedIn={settings?.linkedInUrl} siteName={settings?.siteName} footerText={settings?.footerText} />
    </div>
  );
}
