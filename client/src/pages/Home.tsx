import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { siteConfig, chapters as chaptersData, templates as templatesData } from "@/data";

const CAREER_PATH_AR = [
  "خريج جديد", "محلل مبتدئ", "محلل FP&A", "قائد فريق مالي", "مدير مالي", "CFO",
];
const CAREER_PATH_EN = [
  "Fresh Graduate", "Junior Analyst", "FP&A Analyst", "Finance Team Lead", "Finance Manager", "CFO",
];

export default function Home() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "محمد مجدي — نظام التشغيل المهني المالي" : "Mohamed Magdy — Financial Career Operating System",
    description: isAr
      ? "دليل مالي احترافي من 26 فصل، قوالب Excel جاهزة، وبنك أسئلة مقابلات لبناء مسارك المهني في التمويل والمحاسبة."
      : "A 26-chapter finance guide, ready-made Excel templates, and an interview question bank to build your finance career.",
    path: "/",
  });

  const profile = siteConfig.profile;
  const settings = siteConfig;

  const skills = profile.skills || [];
  const certifications = profile.certifications || [];

  const featuredChapters = chaptersData.slice(0, 6);
  const featuredTemplates = templatesData.slice(0, 4);

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings.siteName} />

      {/* HERO */}
      <section
        className="relative overflow-hidden px-4 py-20 md:py-28"
        style={{ background: "var(--sidebar)", color: "var(--sidebar-foreground)" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
              {isAr ? "نظام تشغيل مهني مالي" : "Financial Career Operating System"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              {profile.fullName}
            </h1>
            <p className="text-lg opacity-90 mb-2">
              {profile.title}
            </p>
            <p className="text-base opacity-80 mb-8 max-w-lg">
              {isAr
                ? "أساعدك تبني مسارك المهني في التمويل والمحاسبة بأدوات حقيقية، دليل من 26 فصل، وقوالب مالية احترافية."
                : "Helping you build your finance career with real tools, a 26-chapter guide, and professional financial templates."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={lp("/chapters")}>
                <Button size="lg" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                  {isAr ? "ابدأ رحلتك" : "Start Your Journey"}
                  {isAr ? <ArrowLeft className="w-4 h-4 ms-2" /> : <ArrowRight className="w-4 h-4 ms-2" />}
                </Button>
              </Link>
              <Link href={lp("/about")}>
                <Button size="lg" variant="outline" className="border-white/30 text-inherit hover:bg-white/10">
                  {isAr ? "احجز استشارة" : "Book a Consultation"}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-40"
                style={{ background: "var(--accent)" }}
              />
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                fetchPriority="high"
                className="relative rounded-2xl w-72 h-96 md:w-80 md:h-[26rem] object-cover border-4"
                style={{ borderColor: "var(--accent)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Career path line */}
        <div className="max-w-5xl mx-auto mt-16 hidden md:block">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-0.5" style={{ background: "var(--accent)", opacity: 0.5 }} />
            {(isAr ? CAREER_PATH_AR : CAREER_PATH_EN).map((step, i) => (
              <div key={i} className="relative flex flex-col items-center gap-2 z-10">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span className="text-xs opacity-80 whitespace-nowrap">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY M2AY */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {isAr ? "ليه M2AY؟" : "Why M2AY?"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <Card key={i} className="p-5 text-center">
              <p className="font-semibold text-sm">{cert}</p>
            </Card>
          ))}
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {skills.map((s, i) => (
              <Badge key={i} variant="secondary">{s}</Badge>
            ))}
          </div>
        )}
      </section>

      {/* CHAPTERS PREVIEW */}
      <section className="px-4 py-16" style={{ background: "var(--muted)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{isAr ? "الدليل المالي" : "The Finance Guide"}</h2>
            <Link href={lp("/chapters")} className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
              {isAr ? "شوف كل الفصول ←" : "View all chapters →"}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredChapters.map(ch => (
              <Link key={ch.id} href={lp(`/chapters/${ch.id}`)}>
                <Card className="p-5 h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{ch.category}</Badge>
                    <span className="text-2xl font-extrabold opacity-20">{String(ch.order).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-bold mb-1">{isAr ? ch.titleAr : ch.titleEn}</h3>
                  <p className="text-sm opacity-70">{isAr ? ch.descriptionAr : ch.descriptionEn}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{isAr ? "القوالب الاحترافية" : "Professional Templates"}</h2>
          <Link href={lp("/templates")} className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            {isAr ? "كل القوالب ←" : "All templates →"}
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTemplates.map(t => (
            <Link key={t.id} href={lp(`/templates/${t.id}`)}>
              <Card className="p-5 h-full hover:shadow-lg transition-shadow cursor-pointer">
                <Badge className="mb-3" variant="secondary">{t.category}</Badge>
                <h3 className="font-bold text-sm mb-2">{isAr ? t.titleAr : t.titleEn}</h3>
                <p className="text-xs opacity-70 line-clamp-3">{isAr ? t.descriptionAr : t.descriptionEn}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CONSULTATION CTA */}
      <section className="px-4 py-16 text-center" style={{ background: "var(--sidebar)", color: "var(--sidebar-foreground)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {isAr ? "محتاج استشارة مالية أو مهنية؟" : "Need a finance or career consultation?"}
          </h2>
          <p className="opacity-80 mb-2">
            {isAr ? "تواصل معي للحصول على استشارة شخصية" : "Contact me for personalized consultation"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={lp("/about")}>
              <Button size="lg" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                {isAr ? "احجز الآن" : "Book Now"}
              </Button>
            </Link>
            {settings.contact.whatsapp && (
              <a href={settings.contact.whatsapp} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      <SiteFooter 
        whatsapp={settings.contact.whatsapp} 
        email={settings.contact.email} 
        linkedIn={settings.contact.linkedin} 
        siteName={settings.siteName} 
      />
    </div>
  );
}
