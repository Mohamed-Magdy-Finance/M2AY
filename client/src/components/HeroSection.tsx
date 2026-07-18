import { Link } from "wouter";
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import homepageSummary from "@/data/homepage-summary.json";

export default function HeroSection() {
  const { isAr, lp } = useLanguage();
  const { counts } = homepageSummary;

  return (
    <section
      className="relative w-full min-h-screen grid lg:grid-cols-2"
      style={{
        background: isAr
          ? "linear-gradient(to right, color-mix(in srgb, var(--sidebar) 78%, #9FC0CF 22%) 0%, var(--sidebar) 100%)"
          : "linear-gradient(to left, color-mix(in srgb, var(--sidebar) 78%, #9FC0CF 22%) 0%, var(--sidebar) 100%)",
      }}
    >
      {/* Photo — full-bleed, touches the screen edge, no frame */}
      <div className={`relative min-h-[52vh] lg:min-h-screen ${isAr ? "lg:order-2" : "lg:order-1"}`}>
        <picture>
          <source
            type="image/webp"
            srcSet={[
              `${import.meta.env.BASE_URL}images/mohamed-magdy-hero-400w.webp 400w`,
              `${import.meta.env.BASE_URL}images/mohamed-magdy-hero-800w.webp 800w`,
              `${import.meta.env.BASE_URL}images/mohamed-magdy-hero-1200w.webp 1200w`,
              `${import.meta.env.BASE_URL}images/mohamed-magdy-hero.webp 1710w`,
            ].join(", ")}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/mohamed-magdy-hero.jpg`}
            alt={isAr ? "محمد مجدي" : "Mohamed Magdy"}
            className="hero-photo"
            width={1710}
            height={2560}
            // This is the LCP (Largest Contentful Paint) image — it must load eagerly,
            // never lazily, or it becomes the bottleneck it's meant to avoid.
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* The one visual transition: a single soft fade where the photo meets the text column.
            Real behavior (verified against the live deployed site, not assumed): the layout mirrors —
            Arabic puts the photo on the physical left (text on the right), English puts the photo on
            the physical right (text on the left). The fade edge must match whichever side is adjacent
            to the text column for each language. */}
        <div
          className="hidden lg:block absolute inset-y-0 w-32 pointer-events-none"
          style={
            isAr
              ? { right: 0, background: "linear-gradient(to left, var(--sidebar) 0%, transparent 100%)" }
              : { left: 0, background: "linear-gradient(to right, var(--sidebar) 0%, transparent 100%)" }
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
              {isAr ? "M2AY Financial Operating System" : "M2AY Financial Operating System (M-FOS)"}
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
              {isAr ? "مؤسس نظام M-FOS للتشغيل المالي" : "Founder of the M-FOS Financial Operating System"}
            </p>
            <p className="text-base md:text-lg opacity-80 leading-relaxed" style={{ color: "var(--sidebar-foreground)" }}>
              {isAr
                ? "M-FOS مش مجرد معرفة نظرية — إطار منهجي متكامل من 26 فصل، وقوالب مالية احترافية، وبنك أسئلة حقيقي، يبني عقلية المدير المالي خطوة بخطوة."
                : "M-FOS isn't just theory — it's a complete methodology of a 26-chapter guide, professional templates, and a real question bank, built to develop a CFO-level mindset step by step."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { number: `${counts.chapters}`, label: isAr ? "فصل" : "Chapters" },
              { number: `${counts.templates}`, label: isAr ? "نموذج" : "Templates" },
              { number: `${counts.questions}+`, label: isAr ? "سؤال" : "Questions" },
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
