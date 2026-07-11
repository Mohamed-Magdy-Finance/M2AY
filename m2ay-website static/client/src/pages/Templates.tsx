import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { templates as templatesData, siteConfig } from "@/data";

const CATEGORIES = ["All", "Budget", "Analysis", "Modeling", "Reporting"];
const CATEGORIES_AR: Record<string, string> = {
  All: "الكل",
  Budget: "الموازنة",
  Analysis: "التحليل",
  Modeling: "النمذجة",
  Reporting: "التقارير",
};

export default function Templates() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "القوالب الاحترافية" : "Professional Templates",
    description: isAr
      ? "قوالب Excel احترافية جاهزة للتحميل"
      : "Professional Excel templates ready to download",
    path: "/templates",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let list = templatesData;
    if (activeCategory !== "All") list = list.filter(t => t.category === activeCategory);
    return list;
  }, [activeCategory]);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "القوالب الاحترافية" : "Professional Templates"}</h1>
        <p className="text-muted-foreground mb-8">
          {isAr ? "نماذج مالية احترافية جاهزة للتحميل والاستخدام" : "Professional financial templates ready to download and use"}
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(t => (
            <Link key={t.id} href={lp(`/templates/${t.id}`)}>
              <Card className="p-4 h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{isAr ? CATEGORIES_AR[t.category] ?? t.category : t.category}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {t.downloadCount}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{isAr ? t.titleAr : t.titleEn}</h3>
                <p className="text-sm opacity-70 line-clamp-2">{isAr ? t.descriptionAr : t.descriptionEn}</p>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">{isAr ? "مفيش قوالب مطابقة" : "No matching templates"}</p>
        )}
      </div>

      <SiteFooter 
        whatsapp={siteConfig.contact.whatsapp} 
        email={siteConfig.contact.email} 
        linkedIn={siteConfig.contact.linkedin} 
        siteName={siteConfig.siteName} 
      />
    </div>
  );
}
