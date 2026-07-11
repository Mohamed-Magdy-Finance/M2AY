import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileSpreadsheet } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { chapters as chaptersData, siteConfig } from "@/data";

const CATEGORIES = ["All", "Basics", "Analysis", "Planning", "Investment", "Risk"];
const CATEGORIES_AR: Record<string, string> = {
  All: "كل الأقسام",
  Basics: "الأساسيات",
  Analysis: "التحليل",
  Planning: "التخطيط",
  Investment: "الاستثمار",
  Risk: "المخاطر",
};

export default function Chapters() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "الدليل المالي" : "The Finance Guide",
    description: isAr
      ? "دليل مالي شامل يغطي جميع جوانب التمويل والمحاسبة"
      : "A comprehensive finance guide covering all aspects of finance and accounting",
    path: "/chapters",
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let list = chaptersData;
    if (activeCategory !== "All") list = list.filter(c => c.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        c => c.titleAr.toLowerCase().includes(q) || c.titleEn.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "الدليل المالي" : "The Finance Guide"}</h1>
        <p className="text-muted-foreground mb-8">
          {isAr ? "دليل شامل يغطي جميع جوانب التمويل" : "A comprehensive guide covering all aspects of finance"}
        </p>

        <div className="relative mb-6">
          <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={isAr ? "ابحث في الفصول..." : "Search chapters..."}
            className="ps-10"
          />
        </div>

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
          {filtered.map(ch => (
            <Link key={ch.id} href={lp(`/chapters/${ch.id}`)}>
              <Card className="p-5 h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{isAr ? CATEGORIES_AR[ch.category] ?? ch.category : ch.category}</Badge>
                  <span className="text-2xl font-extrabold opacity-20">{String(ch.order).padStart(2, "0")}</span>
                </div>
                <h3 className="font-bold mb-1">{isAr ? ch.titleAr : ch.titleEn}</h3>
                <p className="text-sm opacity-70">{isAr ? ch.descriptionAr : ch.descriptionEn}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <p className="text-xs opacity-60">{isAr ? `الفصل ${ch.order}` : `Chapter ${ch.order}`}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">{isAr ? "مفيش فصول مطابقة" : "No matching chapters"}</p>
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
