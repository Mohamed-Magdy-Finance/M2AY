import { useMemo, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileSpreadsheet } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";

const SECTIONS = ["All", "Foundations", "Technical Skills", "Application", "Career OS", "Elite Tools", "Market Intelligence", "Elite Appendices"];
const SECTIONS_AR: Record<string, string> = {
  All: "كل الأقسام", Foundations: "الأساسيات", "Technical Skills": "المهارات الفنية",
  Application: "التطبيق", "Career OS": "نظام التشغيل المهني", "Elite Tools": "أدوات النخبة",
  "Market Intelligence": "ذكاء السوق", "Elite Appendices": "ملاحق متقدمة",
};

export default function Chapters() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "الدليل المالي — 26 فصل" : "The Finance Guide — 26 Chapters",
    description: isAr
      ? "دليل مالي كامل من 26 فصل، من الأساسيات إلى مقعد CFO، بمهام عملية وتقييم ذاتي لكل فصل."
      : "A complete 26-chapter finance guide, from the fundamentals to the CFO seat.",
    path: "/chapters",
  });

  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("All");

  const { data: chapters, isLoading } = trpc.public.chapters.list.useQuery();
  const { data: settings } = trpc.public.settings.useQuery();

  const filtered = useMemo(() => {
    let list = chapters ?? [];
    if (activeSection !== "All") list = list.filter(c => c.section === activeSection);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        c => c.arabicTitle.toLowerCase().includes(q) || c.englishTitle.toLowerCase().includes(q)
      );
    }
    return list;
  }, [chapters, activeSection, search]);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings?.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "الدليل المالي" : "The Finance Guide"}</h1>
        <p className="text-muted-foreground mb-8">
          {isAr ? "26 فصل يأخذك من الأساسيات إلى مقعد CFO" : "26 chapters taking you from the fundamentals to the CFO seat"}
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
          {SECTIONS.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeSection === s ? "border-transparent" : "border-border"
              }`}
              style={activeSection === s ? { background: "var(--accent)", color: "var(--accent-foreground)" } : {}}
            >
              {isAr ? SECTIONS_AR[s] : s}
            </button>
          ))}
        </div>

        {isLoading && <p className="text-center text-muted-foreground py-20">{isAr ? "جاري التحميل..." : "Loading..."}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ch => (
            <Link key={ch.id} href={lp(`/chapters/${ch.id}`)}>
              <Card className="p-5 h-full hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{isAr ? SECTIONS_AR[ch.section] ?? ch.section : ch.section}</Badge>
                  <span className="text-2xl font-extrabold opacity-20">{String(ch.chapterNumber).padStart(2, "0")}</span>
                </div>
                <h3 className="font-bold mb-1">{isAr ? ch.arabicTitle : ch.englishTitle}</h3>
                <p className="text-sm opacity-70 mb-2">{isAr ? ch.englishTitle : ch.arabicTitle}</p>
                {ch.description && (
                  <p className="text-xs opacity-60 line-clamp-2 mb-3">{ch.description}</p>
                )}
                <div className="mt-auto flex items-center justify-between pt-2">
                  <p className="text-xs opacity-60">{isAr ? `الفصل ${ch.chapterNumber}` : `Chapter ${ch.chapterNumber}`}</p>
                  {ch.relatedTemplatesCount > 0 && (
                    <span className="text-xs font-medium flex items-center gap-1" style={{ color: "var(--accent)" }}>
                      <FileSpreadsheet className="w-3 h-3" />
                      {ch.relatedTemplatesCount}
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">{isAr ? "مفيش فصول مطابقة" : "No matching chapters"}</p>
        )}
      </div>

      <SiteFooter whatsapp={settings?.whatsappNumber} email={settings?.contactEmail} linkedIn={settings?.linkedInUrl} siteName={settings?.siteName} footerText={settings?.footerText} />
    </div>
  );
}
