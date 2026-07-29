import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { siteConfig } from "@/data";
import { projects } from "@/data/projects";

export default function Work() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "نماذج تحليلية وأعمال تطبيقية" : "Analytical Models & Applied Work",
    description: isAr
      ? "أمثلة تطبيقية على النمذجة المالية والتحليل، مبنية على بيانات معلنة، لأغراض شخصية وتوضيحية."
      : "Applied examples of financial modeling and analysis, built on public data, for personal and illustrative purposes.",
    path: "/work",
  });

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "نماذج تحليلية وأعمال تطبيقية" : "Analytical Models & Applied Work"}</h1>
        <p className="text-muted-foreground mb-10">
          {isAr
            ? "أمثلة تطبيقية على النمذجة المالية والتحليل، مبنية على بيانات معلنة، توضح أسلوبي في التنظيم والتحليل والعرض."
            : "Applied examples of financial modeling and analysis, built on publicly disclosed data, illustrating my approach to structure, analysis, and presentation."}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <Link key={p.slug} href={lp(`/work/${p.slug}`)}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={`${import.meta.env.BASE_URL}${p.coverImage}`}
                  alt={isAr ? p.titleAr : p.titleEn}
                  className="w-full aspect-[16/9] object-cover border-b"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="font-bold mb-1">{isAr ? p.titleAr : p.titleEn}</h2>
                  <p className="text-sm text-muted-foreground">{isAr ? p.taglineAr : p.taglineEn}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter siteName={siteConfig.siteName} whatsapp={siteConfig.contact.whatsappNumber} email={siteConfig.contact.email} linkedIn={siteConfig.contact.linkedin} />
    </div>
  );
}
