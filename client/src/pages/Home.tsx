import {
  BookOpen,
  FileSpreadsheet,
  HelpCircle,
  User,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import SectionContainer from "@/components/SectionContainer";
import SectionCard from "@/components/SectionCard";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/hooks/useLanguage";
import { siteConfig } from "@/data";

export default function Home() {
  const { isAr, lp } = useLanguage();

  // SEO Configuration
  useSEO({
    title: isAr
      ? "محمد مجدي - خبير التحليل المالي والاستشارات"
      : "Mohamed Magdy - Financial Analysis & Consulting Expert",
    description: isAr
      ? "منصة تعليمية احترافية متخصصة في التحليل المالي والاستشارات. دليل شامل من 26 فصل، قوالب مالية احترافية، وأسئلة مقابلات حقيقية."
      : "Professional financial education platform. 26-chapter comprehensive guide, ready-to-use templates, and real interview questions.",
    path: "/",
  });

  // Section 1: Financial Guide Cards
  const guideCards = [
    {
      icon: <BookOpen className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "المفاهيم الأساسية",
      titleEn: "Financial Fundamentals",
      descAr: "تعلم أساسيات التحليل المالي والمؤشرات الرئيسية من الصفر",
      descEn: "Master financial analysis fundamentals and key metrics from scratch",
    },
    {
      icon: <BarChart3 className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "التحليل المالي",
      titleEn: "Financial Analysis",
      descAr: "تقنيات متقدمة لتحليل البيانات المالية والقوائم المالية",
      descEn: "Advanced techniques for analyzing financial statements and data",
    },
    {
      icon: <TrendingUp className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "النسب المالية",
      titleEn: "Financial Ratios",
      descAr: "فهم واستخدام النسب المالية في التقييم والتحليل",
      descEn: "Understanding financial ratios for valuation and analysis",
    },
  ];

  // Section 2: Templates Cards
  const templateCards = [
    {
      icon: <FileSpreadsheet className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "نموذج الميزانية",
      titleEn: "Budget Template",
      descAr: "نموذج احترافي لإعداد الميزانيات السنوية والشهرية",
      descEn: "Professional budget planning for annual and monthly forecasts",
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "نموذج التدفقات",
      titleEn: "Cash Flow Model",
      descAr: "تحليل التدفقات النقدية وتوقعاتها بسهولة واحترافية",
      descEn: "Cash flow analysis and forecasting made simple and professional",
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "نموذج التقييم",
      titleEn: "Valuation Model",
      descAr: "نموذج تقييم الشركات المتقدم (DCF و Multiples)",
      descEn: "Advanced company valuation (DCF and Multiples analysis)",
    },
  ];

  // Section 3: Question Bank Cards
  const questionCards = [
    {
      icon: <HelpCircle className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "أسئلة المقابلات",
      titleEn: "Interview Questions",
      descAr: "أسئلة حقيقية من مقابلات FP&A مع إجابات نموذجية",
      descEn: "Real interview questions from FP&A professionals with model answers",
    },
    {
      icon: <Award className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "أسئلة FP&A",
      titleEn: "FP&A Questions",
      descAr: "أسئلة متخصصة في التخطيط والتحليل المالي",
      descEn: "Specialized FP&A and financial planning questions",
    },
    {
      icon: <Zap className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "أسئلة CFA",
      titleEn: "CFA Questions",
      descAr: "أسئلة تحضيرية لامتحان CFA مع شرح مفصل",
      descEn: "CFA exam preparation questions with detailed explanations",
    },
  ];

  // Section 4: About Cards
  const aboutCards = [
    {
      icon: <User className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "من أنا",
      titleEn: "About Me",
      descAr: "تعرف على خلفيتي المهنية وخبرتي في المجال المالي",
      descEn: "Learn about my professional background and financial expertise",
    },
    {
      icon: <MessageSquare className="w-6 h-6" strokeWidth={1.75} />,
      titleAr: "تواصل معي",
      titleEn: "Get in Touch",
      descAr: "احجز استشارة أو اطرح أسئلتك على الخبير مباشرة",
      descEn: "Book a consultation or ask your questions directly",
    },
  ];

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
        {guideCards.map((card, i) => (
          <SectionCard
            key={i}
            href={lp("/chapters")}
            icon={card.icon}
            title={isAr ? card.titleAr : card.titleEn}
            description={isAr ? card.descAr : card.descEn}
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
        {templateCards.map((card, i) => (
          <SectionCard
            key={i}
            href={lp("/templates")}
            icon={card.icon}
            title={isAr ? card.titleAr : card.titleEn}
            description={isAr ? card.descAr : card.descEn}
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
        {questionCards.map((card, i) => (
          <SectionCard
            key={i}
            href={lp("/question-bank")}
            icon={card.icon}
            title={isAr ? card.titleAr : card.titleEn}
            description={isAr ? card.descAr : card.descEn}
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
        {aboutCards.map((card, i) => (
          <SectionCard
            key={i}
            href={lp(card.titleEn === "About Me" ? "/about" : "/about")}
            icon={card.icon}
            title={isAr ? card.titleAr : card.titleEn}
            description={isAr ? card.descAr : card.descEn}
            isAr={isAr}
          />
        ))}
      </SectionContainer>

      {/* Footer */}
      <SiteFooter
        siteName={siteConfig.siteName}
        whatsapp={siteConfig.contact.whatsapp}
        email={siteConfig.contact.email}
        linkedIn={siteConfig.contact.linkedin}
      />
    </div>
  );
}
