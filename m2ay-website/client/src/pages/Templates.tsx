import { useMemo, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AutoBanner from "@/components/AutoBanner";
import { useSEO } from "@/hooks/useSEO";

const CATEGORIES = ["All", "Valuation", "Modeling", "Budgeting", "Personal Finance", "Accounting Systems", "Startup", "Performance Analysis"];
const CATEGORIES_AR: Record<string, string> = {
  All: "الكل", Valuation: "التقييم", Modeling: "النمذجة", Budgeting: "الموازنة",
  "Personal Finance": "المالية الشخصية", "Accounting Systems": "الأنظمة المحاسبية",
  Startup: "الشركات الناشئة", "Performance Analysis": "تحليل الأداء",
};

export default function Templates() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "القوالب الاحترافية" : "Professional Templates",
    description: isAr
      ? "12 نموذج مالي احترافي جاهز للتحميل: تقييم، نمذجة، موازنة، ومالية شخصية بمستوى بنوك الاستثمار."
      : "12 professional, bank-grade financial Excel templates ready to download.",
    path: "/templates",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const { data: templates, isLoading } = trpc.public.templates.list.useQuery();
  const { data: settings } = trpc.public.settings.useQuery();

  const filtered = useMemo(() => {
    let list = templates ?? [];
    if (activeCategory !== "All") list = list.filter(t => t.category === activeCategory);
    return list;
  }, [templates, activeCategory]);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings?.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "القوالب الاحترافية" : "Professional Templates"}</h1>
        <p className="text-muted-foreground mb-8">
          {isAr ? "نماذج مالية حقيقية بمستوى بنوك الاستثمار — جاهزة للتحميل والاستخدام" : "Real, bank-grade financial models — ready to download and use"}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === c ? "border-transparent" : "border-border"
              }`}
              style={activeCategory === c ? { background: "var(--accent)", color: "var(--accent-foreground)" } : {}}
            >
              {isAr ? CATEGORIES_AR[c] : c}
            </button>
          ))}
        </div>

        {isLoading && <p className="text-center text-muted-foreground py-20">{isAr ? "جاري التحميل..." : "Loading..."}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t => (
            <Link key={t.id} href={lp(`/templates/${t.id}`)}>
              <Card className="p-3 h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                {t.previewImageUrl ? (
                  <img src={t.previewImageUrl} alt={t.englishName} loading="lazy" className="w-full aspect-[16/9] object-cover rounded-lg mb-3" />
                ) : (
                  <AutoBanner
                    title={isAr ? t.arabicName : t.englishName}
                    category={t.category}
                    difficultyLevel={t.difficultyLevel}
                    updatedAt={t.updatedAt}
                    className="mb-3"
                  />
                )}
                <div className="flex items-center justify-between mb-3 px-1">
                  <Badge variant="secondary">{isAr ? CATEGORIES_AR[t.category] ?? t.category : t.category}</Badge>
                </div>
                <h3 className="font-bold mb-2 px-1">{isAr ? t.arabicName : t.englishName}</h3>
                <p className="text-sm opacity-70 px-1">{t.shortDescription}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter whatsapp={settings?.whatsappNumber} email={settings?.contactEmail} linkedIn={settings?.linkedInUrl} siteName={settings?.siteName} footerText={settings?.footerText} />
    </div>
  );
}
