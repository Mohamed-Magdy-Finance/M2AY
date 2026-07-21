import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AutoBanner from "@/components/AutoBanner";
import { useSEO } from "@/hooks/useSEO";
import { templates } from "@/data/templates";
import { siteConfig } from "@/data";

const CATEGORIES = ["All", "Valuation", "Modeling", "Budgeting", "Personal Finance", "Accounting Systems", "Startup", "Performance Analysis"];
const CATEGORIES_AR: Record<string, string> = {
  All: "الكل", Valuation: "التقييم", Modeling: "النمذجة", Budgeting: "الموازنة",
  "Personal Finance": "المالية الشخصية", "Accounting Systems": "الأنظمة المحاسبية",
  Startup: "الشركات الناشئة", "Performance Analysis": "تحليل الأداء",
};

export default function Templates() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "النماذج المالية" : "Financial Models",
    description: isAr
      ? `${templates.length} نموذج مالي احترافي جاهز للتحميل بمستوى بنوك الاستثمار.`
      : `${templates.length} professional, bank-grade financial Excel templates ready to download.`,
    path: "/templates",
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = useMemo(
    () => (activeCategory === "All" ? templates : templates.filter(t => t.category === activeCategory)),
    [activeCategory]
  );

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "النماذج المالية" : "Financial Models"}</h1>
        <p className="text-muted-foreground mb-8">
          {isAr ? `${templates.length} نموذج مالي حقيقي بمستوى بنوك الاستثمار — جاهز للتحميل` : `${templates.length} real, bank-grade financial models — ready to download`}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeCategory === c ? "border-transparent" : "border-border"}`}
              style={activeCategory === c ? { background: "var(--accent)", color: "var(--accent-foreground)" } : {}}
            >
              {isAr ? CATEGORIES_AR[c] : c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t => (
            <Link key={t.id} href={lp(`/templates/${t.id}`)}>
              <Card className="p-3 h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                <AutoBanner title={isAr ? t.arabicName : t.englishName} category={t.category} difficultyLevel={t.difficultyLevel} className="mb-3" />
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

      <SiteFooter siteName={siteConfig.siteName} whatsapp={siteConfig.contact.whatsappNumber} email={siteConfig.contact.email} linkedIn={siteConfig.contact.linkedin} />
    </div>
  );
}
