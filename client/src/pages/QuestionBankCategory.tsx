import { useParams, Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { questionBank, siteConfig } from "@/data";

export default function QuestionBankCategory() {
  const params = useParams<{ categoryId: string }>();
  const categoryId = params.categoryId;
  const { isAr, lp } = useLanguage();

  const category = questionBank.categories.find(c => c.id === categoryId);
  const questions = questionBank.questions.filter(q => q.categoryId === categoryId);
  const settings = siteConfig;

  useSEO({
    title: category ? (isAr ? category.titleAr : category.titleEn) : (isAr ? "فئة أسئلة" : "Question Category"),
    description: category ? (isAr ? category.descriptionAr : category.descriptionEn) : (isAr ? "فئة من أسئلة المقابلات" : "A category of interview questions"),
    path: `/question-bank/${categoryId}`,
  });

  if (!category) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen flex flex-col">
        <SiteHeader siteName={settings.siteName} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">{isAr ? "الفئة غير موجودة" : "Category not found"}</p>
            <Link href={lp("/question-bank")}>
              <a className="text-accent hover:underline">{isAr ? "العودة لبنك الأسئلة" : "Back to question bank"}</a>
            </Link>
          </div>
        </div>
        <SiteFooter siteName={settings.siteName} />
      </div>
    );
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings.siteName} />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm opacity-70">
          <Link href={lp("/")}><a className="hover:opacity-100">{isAr ? "الرئيسية" : "Home"}</a></Link>
          <span>/</span>
          <Link href={lp("/question-bank")}><a className="hover:opacity-100">{isAr ? "بنك الأسئلة" : "Question Bank"}</a></Link>
          <span>/</span>
          <span>{isAr ? category.titleAr : category.titleEn}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">{isAr ? category.titleAr : category.titleEn}</h1>
          <p className="text-muted-foreground mb-4">{isAr ? category.descriptionAr : category.descriptionEn}</p>
          <p className="text-sm opacity-70">
            {isAr ? `${questions.length} سؤال في هذه الفئة` : `${questions.length} questions in this category`}
          </p>
        </div>

        {/* Questions Accordion */}
        {questions.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-2">
            {questions.map((q, i) => (
              <AccordionItem key={q.id} value={q.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-start gap-3 text-left">
                    <span className="text-sm font-bold opacity-50 min-w-fit">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{isAr ? q.questionAr : q.questionEn}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-4 ps-8">
                    <div>
                      <h4 className="font-bold mb-2 text-sm">{isAr ? "الإجابة" : "Answer"}</h4>
                      <p className="text-sm opacity-80">{isAr ? q.answerAr : q.answerEn}</p>
                    </div>
                    <div>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground py-12">{isAr ? "لا توجد أسئلة في هذه الفئة" : "No questions in this category"}</p>
        )}
      </div>

      <SiteFooter
        whatsapp={settings.contact.whatsapp}
        email={settings.contact.email}
        linkedIn={settings.contact.linkedin}
        siteName={settings.siteName}
      />
    </div>
  );
}
