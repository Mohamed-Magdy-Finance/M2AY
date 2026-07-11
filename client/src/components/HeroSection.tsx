import { Link } from "wouter";
import { ArrowRight, ArrowLeft, TrendingUp, PieChart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export default function HeroSection() {
  const { isAr, lp } = useLanguage();

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 50%, var(--primary-light) 100%)`,
      }}
    >
      {/* Animated Background Elements - Financial Theme */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {/* Floating circles */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "var(--accent)", animation: "float 20s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "var(--secondary)", animation: "float 25s ease-in-out infinite reverse" }}
        />
        {/* Grid pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-0 h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(201, 166, 107, 0.15)", color: "var(--accent)" }}>
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">{isAr ? "نظام تشغيل مالي احترافي" : "Professional Financial Operating System"}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                style={{
                  color: "var(--text-light)",
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {isAr ? "محمد مجدي" : "Mohamed Magdy"}
              </h1>
              <p
                className="text-xl md:text-2xl font-semibold opacity-90"
                style={{ color: "var(--accent)" }}
              >
                {isAr ? "خبير التحليل المالي والاستشارات" : "Financial Analysis & Consulting Expert"}
              </p>
              <p
                className="text-lg md:text-xl opacity-80 max-w-2xl leading-relaxed"
                style={{ color: "var(--text-light)" }}
              >
                {isAr
                  ? "أساعدك ببناء مسارك المهني في التمويل والمحاسبة بأدوات حقيقية، دليل من 26 فصل، وقوالب مالية احترافية."
                  : "I help you build your finance career with real tools, a 26-chapter guide, and professional financial templates."}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { number: "50+", label: isAr ? "درس" : "Lessons" },
                { number: "30+", label: isAr ? "نموذج" : "Templates" },
                { number: "200+", label: isAr ? "سؤال" : "Questions" },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-3xl md:text-4xl font-bold" style={{ color: "var(--accent)" }}>
                    {stat.number}
                  </p>
                  <p className="text-sm opacity-70" style={{ color: "var(--text-light)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
              <Link href={lp("/chapters")}>
                <a>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto group font-semibold text-base"
                    style={{
                      background: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    {isAr ? "ابدأ رحلتك" : "Start Your Journey"}
                    {isAr ? (
                      <ArrowLeft className="w-5 h-5 ms-2 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-5 h-5 ms-2 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </a>
              </Link>
              <Link href={lp("/about")}>
                <a>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto font-semibold text-base border-2"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "var(--text-light)",
                      background: "transparent",
                    }}
                  >
                    {isAr ? "احجز استشارة" : "Book Consultation"}
                  </Button>
                </a>
              </Link>
            </div>
          </div>

          {/* Right Visual - Financial Icons Grid */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-sm h-96">
              {/* Card 1 - Top Right */}
              <div
                className="absolute top-0 right-0 w-56 h-40 rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "var(--accent-light)" }}
                  >
                    <BarChart3 className="w-6 h-6" style={{ color: "var(--accent)" }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                    {isAr ? "تحليل مالي" : "Financial Analysis"}
                  </span>
                </div>
                <p className="text-xs opacity-70" style={{ color: "var(--text-secondary)" }}>
                  {isAr ? "تقنيات متقدمة" : "Advanced techniques"}
                </p>
              </div>

              {/* Card 2 - Bottom Left */}
              <div
                className="absolute bottom-0 left-0 w-56 h-40 rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "var(--accent-light)" }}
                  >
                    <PieChart className="w-6 h-6" style={{ color: "var(--accent)" }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                    {isAr ? "قوالب جاهزة" : "Ready Templates"}
                  </span>
                </div>
                <p className="text-xs opacity-70" style={{ color: "var(--text-secondary)" }}>
                  {isAr ? "احترافية وسهلة" : "Professional & easy"}
                </p>
              </div>

              {/* Card 3 - Center */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-40 rounded-3xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: "var(--accent-light)" }}
                  >
                    <TrendingUp className="w-6 h-6" style={{ color: "var(--accent)" }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>
                    {isAr ? "مقابلات" : "Interviews"}
                  </span>
                </div>
                <p className="text-xs opacity-70" style={{ color: "var(--text-secondary)" }}>
                  {isAr ? "تحضر احترافي" : "Expert prep"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
        <div
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 animate-bounce"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          <div className="w-1 h-2 bg-current rounded-full" />
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
      `}</style>
    </section>
  );
}
