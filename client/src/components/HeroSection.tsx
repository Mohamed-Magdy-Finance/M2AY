import { Link } from "wouter";
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { chapters, templates, questionBank } from "@/data";

export default function HeroSection() {
  const { isAr, lp } = useLanguage();

  return (
    <section className="relative w-full min-h-screen grid lg:grid-cols-2" style={{ background: "var(--sidebar)" }}>
      {/* Photo — full-bleed, touches the screen edge, no frame */}
      <div className={`relative min-h-[52vh] lg:min-h-screen ${isAr ? "lg:order-2" : "lg:order-1"}`}>
        <img
          src={`${import.meta.env.BASE_URL}images/mohamed-magdy-hero.jpg`}
          alt={isAr ? "محمد مجدي" : "Mohamed Magdy"}
          className="hero-photo"
          loading="eager"
        />
        {/* The one visual transition: a single soft fade where the photo meets the text column */}
        <div
          className="hidden lg:block absolute inset-y-0 w-32 pointer-events-none"
          style={
            isAr
              ? { left: 0, background: "linear-gradient(to right, var(--sidebar) 0%, transparent 100%)" }
              : { right: 0, background: "linear-gradient(to left, var(--sidebar) 0%, transparent 100%)" }
          }
        />
        <div
          className="lg:hidden absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--sidebar) 0%, transparent 100%)" }}
        />
      </div>

      {/* Text column — generous whitespace is the point */}
      <div className={`relative flex items-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0 ${isAr ? "lg:order-1" : "lg:order-2"}`}>
        {/* Glass-line rhythm — echoes the window mullions in the photo, very subtle */}
        <div className="hidden lg:flex absolute inset-y-0 start-0 gap-10 opacity-[0.06] pointer-events-none">
          <div className="w-px h-full" style={{ background: "var(--sidebar-foreground)" }} />
          <div className="w-px h-full" style={{ background: "var(--sidebar-foreground)" }} />
        </div>

        <div className="relative max-w-xl mx-auto lg:mx-0 space-y-7 text-center lg:text-start">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(200, 162, 74, 0.15)", color: "var(--accent)" }}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {isAr ? "نظام تشغيل مالي احترافي" : "Professional Financial Operating System"}
            </span>
          </div>

          <div className="space-y-4">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "var(--sidebar-foreground)", letterSpacing: "-0.02em" }}
            >
              {isAr ? "محمد مجدي" : "Mohamed Magdy"}
            </h1>
            <p className="text-xl md:text-2xl font-semibold" style={{ color: "var(--accent)" }}>
              {isAr ? "خبير التحليل المالي والاستشارات" : "Financial Analysis & Consulting Expert"}
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed" style={{ color: "var(--sidebar-foreground)" }}>
              {isAr
                ? "أساعدك ببناء مسارك المهني في التمويل والمحاسبة بأدوات حقيقية، دليل من 26 فصل، وقوالب مالية احترافية."
                : "I help you build your finance career with real tools, a 26-chapter guide, and professional financial templates."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { number: `${chapters.length}`, label: isAr ? "فصل" : "Chapters" },
              { number: `${templates.length}`, label: isAr ? "نموذج" : "Templates" },
              { number: `${questionBank.questions.length}+`, label: isAr ? "سؤال" : "Questions" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: "var(--accent)" }}>{stat.number}</p>
                <p className="text-sm opacity-70" style={{ color: "var(--sidebar-foreground)" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <Link href={lp("/chapters")}>
              <Button
                size="lg"
                className="w-full sm:w-auto group font-semibold text-base"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                {isAr ? "ابدأ رحلتك" : "Start Your Journey"}
                {isAr ? (
                  <ArrowLeft className="w-5 h-5 ms-2 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 ms-2 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </Link>
            <Link href={lp("/about")}>
              <Button
                size="lg"
                className="w-full sm:w-auto font-semibold text-base border-2"
                style={{ borderColor: "rgba(255, 255, 255, 0.3)", color: "var(--sidebar-foreground)", background: "transparent" }}
              >
                {isAr ? "احجز استشارة" : "Book Consultation"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
