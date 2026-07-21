import { useParams } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import { questionCategories } from "@/data/question-categories";
import { getQuestionsByCategory } from "@/data/questions";
import { siteConfig } from "@/data";

export default function QuestionBankCategory() {
  const params = useParams<{ categoryId: string }>();
  const categoryId = Number(params.categoryId);
  const { isAr } = useLanguage();

  const category = questionCategories.find(c => c.id === categoryId);
  const questions = getQuestionsByCategory(categoryId);

  useSEO({
    title: category ? (isAr ? category.arabicName : category.englishName) : (isAr ? "فئة أسئلة" : "Question Category"),
    description: isAr
      ? `${questions.length} سؤال مقابلة حقيقي في هذه الفئة، بإجابات نموذجية وأخطاء شائعة.`
      : `${questions.length} real interview questions in this category, with model answers and common mistakes.`,
    path: `/question-bank/${categoryId}`,
  });

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: isAr ? "الرئيسية" : "Home", href: "/" },
            { label: isAr ? "الجاهزية المهنية" : "Professional Readiness", href: "/question-bank" },
            { label: category ? (isAr ? category.arabicName : category.englishName) : "..." },
          ]}
        />

        {category && (
          <>
            <h1 className="text-3xl font-extrabold mb-1">{isAr ? category.arabicName : category.englishName}</h1>
            <p className="text-muted-foreground mb-8">
              {isAr ? `${questions.length} سؤال في هذه الفئة` : `${questions.length} questions in this category`}
            </p>
          </>
        )}

        <Accordion type="single" collapsible className="space-y-2">
          {questions.map(q => {
            const showEn = !isAr;
            const hasEnglish = Boolean(q.englishQuestion);
            const noTranslation = showEn && !hasEnglish;
            return (
              <AccordionItem key={q.id} value={String(q.id)} className="border rounded-lg px-4">
                <AccordionTrigger className="text-start font-semibold">
                  {showEn && hasEnglish ? q.englishQuestion : q.question}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  {noTranslation && (
                    <p className="text-sm italic opacity-70 mb-2">English version will be available soon. Showing the Arabic content below.</p>
                  )}
                  {(showEn && hasEnglish ? q.englishWhyAsked : q.whyAsked) && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--accent)" }}>{isAr ? "ليه بيتسأل؟" : "Why is it asked?"}</p>
                      <p className="text-sm opacity-80">{showEn && hasEnglish ? q.englishWhyAsked : q.whyAsked}</p>
                    </div>
                  )}
                  {(showEn && hasEnglish ? q.englishInterviewerMindset : q.interviewerMindset) && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--accent)" }}>{isAr ? "عقلية الـ Interviewer" : "Interviewer's Mindset"}</p>
                      <p className="text-sm opacity-80">{showEn && hasEnglish ? q.englishInterviewerMindset : q.interviewerMindset}</p>
                    </div>
                  )}
                  {(showEn && hasEnglish ? q.englishModelAnswer : q.modelAnswer) && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--accent)" }}>{isAr ? "الإجابة النموذجية" : "Model Answer"}</p>
                      <p className="text-sm opacity-80">{showEn && hasEnglish ? q.englishModelAnswer : q.modelAnswer}</p>
                    </div>
                  )}
                  {(showEn && hasEnglish ? q.englishCommonMistakes : q.commonMistakes) && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--accent)" }}>{isAr ? "الأخطاء الشائعة" : "Common Mistakes"}</p>
                      <p className="text-sm opacity-80">{showEn && hasEnglish ? q.englishCommonMistakes : q.commonMistakes}</p>
                    </div>
                  )}
                  {(showEn && hasEnglish ? q.englishFollowUpQuestion : q.followUpQuestion) && (
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "var(--accent)" }}>{isAr ? "سؤال متابعة" : "Follow-up Question"}</p>
                      <p className="text-sm opacity-80">{showEn && hasEnglish ? q.englishFollowUpQuestion : q.followUpQuestion}</p>
                      {(showEn && hasEnglish ? q.englishFollowUpAnswer : q.followUpAnswer) && (
                        <p className="text-sm opacity-70 mt-1">{showEn && hasEnglish ? q.englishFollowUpAnswer : q.followUpAnswer}</p>
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <SiteFooter siteName={siteConfig.siteName} whatsapp={siteConfig.contact.whatsappNumber} email={siteConfig.contact.email} linkedIn={siteConfig.contact.linkedin} />
    </div>
  );
}
