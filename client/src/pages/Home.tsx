import { BookOpen, FileSpreadsheet, HelpCircle, User, MessageSquare } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import SectionContainer from "@/components/SectionContainer";
import SectionCard from "@/components/SectionCard";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/hooks/useLanguage";
import { siteConfig, chapters, templates, questionBank } from "@/data";

const SECTIONS_AR: Record<string, string> = {
  Foundations: "الأساسيات", "Technical Skills": "المهارات الفنية", Application: "التطبيق",
  "Career OS": "نظام التشغيل المهني", "Elite Tools": "أدوات النخبة",
  "Market Intelligence": "ذكاء السوق", "Elite Appendices": "ملاحق متقدمة",
};
const CATEGORIES_AR: Record<string, string> = {
  Valuation: "التقييم", Modeling: "النمذجة", Budgeting: "الموازنة",
  "Personal Finance": "المالية الشخصية", "Accounting Systems": "الأنظمة المحاسبية",
  Startup: "الشركات الناشئة", "Performance Analysis": "تحليل الأداء",
};

export default function Home() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr
      ? "محمد مجدي - خبير التحليل المالي والاستشارات"
      : "Mohamed Magdy - Financial Analysis & Consulting Expert",
    description: isAr
      ? `منصة تعليمية احترافية متخصصة في التحليل المالي والاستشارات. دليل شامل من ${chapters.length} فصل، ${templates.length} قالب مالي احترافي، و${questionBank.questions.length} سؤال مقابلة حقيقي.`
      : `Professional financial education platform. ${chapters.length}-chapter comprehensive guide, ${templates.length} ready-to-use templates, and ${questionBank.questions.length} real interview questions.`,
    path: "/",
  });

  // Featured cards pulled from real data (first 3 of each), not invented placeholder text
  const featuredChapters = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber).slice(0, 3);
  const featuredCategories = [...templates].slice(0, 3);
  const featuredQuestionCats = questionBank.categories.slice(0, 3);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "var(--bg)" }}
    >
      {/* Header */}
      <SiteHeader siteName={siteConfig.siteName} />

      {/* Hero Section */}
      <HeroSection />

      {/* Section 1: Financial Guide */}
      <SectionContainer
        title={isAr ? "الدليل المالي الشامل" : "Complete Financial Guide"}
        description={isAr
          ? "تعلم أساسيات التحليل المالي والمؤشرات المهمة من خبير متخصص في FP&A"
          : "Master financial analysis fundamentals and key metrics from an FP&A specialist"}
      >
        {featuredChapters.map((ch) => (
          <SectionCard
            key={ch.id}
            href={lp(`/chapters/${ch.id}`)}
            icon={<BookOpen className="w-6 h-6" strokeWidth={1.75} />}
            title={isAr ? ch.arabicTitle : ch.englishTitle}
            description={isAr ? (SECTIONS_AR[ch.section] ?? ch.section) : ch.section}
            isAr={isAr}
          />
        ))}
      </SectionContainer>

      {/* Section 2: Templates */}
      <SectionContainer
        title={isAr ? "القوالب المالية الاحترافية" : "Professional Financial Templates"}
        description={isAr
          ? "قوالب جاهزة وقابلة للتخصيص لتسريع عملك المالي واليومي"
          : "Ready-to-use templates to accelerate your financial work"}
        isDark
      >
        {featuredCategories.map((t) => (
          <SectionCard
            key={t.id}
            href={lp(`/templates/${t.id}`)}
            icon={<FileSpreadsheet className="w-6 h-6" strokeWidth={1.75} />}
            title={isAr ? t.arabicName : t.englishName}
            description={isAr ? (CATEGORIES_AR[t.category] ?? t.category) : t.category}
            isAr={isAr}
          />
        ))}
      </SectionContainer>

      {/* Section 3: Question Bank */}
      <SectionContainer
        title={isAr ? "بنك الأسئلة الشامل" : "Comprehensive Question Bank"}
        description={isAr
          ? "تحضر لمقابلاتك مع أسئلة حقيقية وإجابات نموذجية من الخبراء"
          : "Prepare for interviews with real questions and expert model answers"}
      >
        {featuredQuestionCats.map((cat) => (
          <SectionCard
            key={cat.id}
            href={lp(`/question-bank/${cat.id}`)}
            icon={<HelpCircle className="w-6 h-6" strokeWidth={1.75} />}
            title={isAr ? cat.arabicName : cat.englishName}
            description={isAr ? `${cat.questionCount} سؤال` : `${cat.questionCount} questions`}
            isAr={isAr}
          />
        ))}
      </SectionContainer>

      {/* Section 4: About */}
      <SectionContainer
        title={isAr ? "تعرف على المزيد" : "Learn More"}
        description={isAr
          ? "اكتشف المزيد عني وكيف يمكنني مساعدتك في بناء مسارك المهني"
          : "Discover more about me and how I can help build your career"}
        isDark
      >
        <SectionCard
          href={lp("/about")}
          icon={<User className="w-6 h-6" strokeWidth={1.75} />}
          title={isAr ? "من أنا" : "About Me"}
          description={isAr ? "تعرف على خلفيتي المهنية وخبرتي في المجال المالي" : "Learn about my professional background and financial expertise"}
          isAr={isAr}
        />
        <SectionCard
          href={lp("/about")}
          icon={<MessageSquare className="w-6 h-6" strokeWidth={1.75} />}
          title={isAr ? "تواصل معي" : "Get in Touch"}
          description={isAr ? "احجز استشارة أو اطرح أسئلتك على الخبير مباشرة" : "Book a consultation or ask your questions directly"}
          isAr={isAr}
        />
      </SectionContainer>

      {/* Footer */}
      <SiteFooter
        siteName={siteConfig.siteName}
        whatsapp={siteConfig.contact.whatsappNumber}
        email={siteConfig.contact.email}
        linkedIn={siteConfig.contact.linkedin}
      />
    </div>
  );
}
