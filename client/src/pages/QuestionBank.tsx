import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { HelpCircle } from "lucide-react";
import { useSEO, useJsonLd } from "@/hooks/useSEO";
import { questionCategories } from "@/data/question-categories";
import topQuestions from "@/data/top-questions.json";
import { siteConfig } from "@/data";
import homepageSummary from "@/data/homepage-summary.json";

export default function QuestionBank() {
  const { isAr, lp } = useLanguage();
  const totalQuestions = homepageSummary.counts.questions;

  useSEO({
    title: isAr ? "بنك أسئلة المقابلات" : "Interview Question Bank",
    description: isAr
      ? `${totalQuestions} سؤال حقيقي شائع في مقابلات التمويل والمحاسبة، بإجابات نموذجية وأخطاء شائعة.`
      : `${totalQuestions}+ real finance & accounting interview questions with model answers and common mistakes.`,
    path: "/question-bank",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topQuestions.map(q => ({
      "@type": "Question",
      name: isAr ? q.question : (q.englishQuestion || q.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: (isAr ? q.modelAnswer : (q.englishModelAnswer || q.modelAnswer)) || "",
      },
    })),
  });

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-2">{isAr ? "بنك أسئلة المقابلات" : "Interview Question Bank"}</h1>
        <p className="text-muted-foreground mb-8">
          {isAr
            ? `${totalQuestions} سؤال حقيقي شائع في مقابلات التمويل والمحاسبة، موزعة على ${questionCategories.length} فئة`
            : `${totalQuestions} real, common finance & accounting interview questions across ${questionCategories.length} categories`}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questionCategories.map(cat => (
            <Link key={cat.id} href={lp(`/question-bank/${cat.id}`)}>
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="w-6 h-6 mb-3" style={{ color: "var(--accent)" }} />
                <h3 className="font-bold mb-1">{isAr ? cat.arabicName : cat.englishName}</h3>
                <p className="text-sm opacity-70 mb-3">{isAr ? cat.englishName : cat.arabicName}</p>
                <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  {isAr ? `${cat.questionCount} سؤال` : `${cat.questionCount} questions`}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter siteName={siteConfig.siteName} whatsapp={siteConfig.contact.whatsappNumber} email={siteConfig.contact.email} linkedIn={siteConfig.contact.linkedin} />
    </div>
  );
}
