import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { HelpCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { questionBank, siteConfig } from "@/data";

export default function QuestionBank() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "بنك أسئلة المقابلات" : "Interview Question Bank",
    description: isAr
      ? "بنك أسئلة شامل للمقابلات في مجال التمويل والمحاسبة"
      : "Comprehensive interview question bank for finance and accounting",
    path: "/question-bank",
  });

  const categories = questionBank.categories;
  const totalQuestions = categories.reduce((sum, c) => sum + c.questionCount, 0);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "بنك أسئلة المقابلات" : "Interview Question Bank"}</h1>
        <p className="text-muted-foreground mb-8">
          {isAr
            ? `${totalQuestions} سؤال موزع على ${categories.length} فئة`
            : `${totalQuestions} questions across ${categories.length} categories`}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <Link key={cat.id} href={lp(`/question-bank/${cat.id}`)}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="w-6 h-6 mb-3" style={{ color: "var(--accent)" }} />
                <h3 className="font-bold mb-1">{isAr ? cat.titleAr : cat.titleEn}</h3>
                <p className="text-sm opacity-70 mb-3">{isAr ? cat.descriptionAr : cat.descriptionEn}</p>
                <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  {isAr ? `${cat.questionCount} سؤال` : `${cat.questionCount} questions`}
                </p>
              </Card>
            </Link>
          ))}
        </div>
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
