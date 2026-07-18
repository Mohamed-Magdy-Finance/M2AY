import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO, useJsonLd } from "@/hooks/useSEO";
import { siteConfig } from "@/data";
import homepageSummary from "@/data/homepage-summary.json";
import { Layers } from "lucide-react";

export default function About() {
  const { isAr } = useLanguage();
  const { profile, contact, consultation } = siteConfig;

  useSEO({
    title: isAr ? "من أنا" : "About Me",
    description: isAr ? profile.summary : (profile.summaryEn || profile.summary),
    path: "/about",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: profile.fullNameEn || profile.fullName,
        alternateName: profile.fullName,
        jobTitle: profile.titleEn || profile.title,
        description: profile.summaryEn || profile.summary,
        sameAs: [contact.linkedin, contact.github].filter(Boolean),
        knowsAbout: profile.skills,
      },
      {
        "@type": "ProfessionalService",
        name: `${profile.fullNameEn || profile.fullName} — Financial Consultation`,
        provider: { "@type": "Person", name: profile.fullNameEn || profile.fullName },
        description: consultation?.descriptionEn || consultation?.description,
        offers: consultation?.price
          ? { "@type": "Offer", price: consultation.price, priceCurrency: consultation.currency || "USD" }
          : undefined,
        areaServed: "Global",
      },
    ],
  });

  const [form, setForm] = useState({ name: "", message: "" });

  const buildMessage = () => {
    const intro = isAr ? "مرحبًا محمد، اسمي" : "Hi Mohamed, my name is";
    const msgLabel = isAr ? "رسالتي" : "My message";
    return `${intro} ${form.name || (isAr ? "..." : "...")}.\n${msgLabel}: ${form.message || "-"}`;
  };

  const sendViaWhatsApp = () => {
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
  };

  const sendViaEmail = () => {
    const subject = encodeURIComponent(isAr ? "طلب استشارة من الموقع" : "Consultation request from the site");
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-12">
          <picture>
            <source
              type="image/webp"
              srcSet={[
                `${import.meta.env.BASE_URL}images/mohamed-magdy-400w.webp 400w`,
                `${import.meta.env.BASE_URL}images/mohamed-magdy.webp 648w`,
              ].join(", ")}
              sizes="160px"
            />
            <img
              src={`${import.meta.env.BASE_URL}${profile.photoUrl}`}
              alt={isAr ? profile.fullName : (profile.fullNameEn || profile.fullName)}
              className="w-40 h-40 rounded-2xl object-cover border-4 shrink-0"
              style={{ borderColor: "var(--accent)" }}
              width={160}
              height={160}
              loading="lazy"
            />
          </picture>
          <div>
            <h1 className="text-3xl font-extrabold mb-1">{isAr ? profile.fullName : (profile.fullNameEn || profile.fullName)}</h1>
            <p className="text-lg text-muted-foreground mb-4">{isAr ? profile.title : (profile.titleEn || profile.title)}</p>
            <p className="leading-relaxed opacity-90">{isAr ? profile.summary : (profile.summaryEn || profile.summary)}</p>
          </div>
        </div>

        <Card className="p-6 mb-12" style={{ borderColor: "var(--accent)", borderWidth: 1 }}>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="font-bold text-lg">
              {isAr ? "مؤسس نظام M2AY Financial Operating System (M-FOS)" : "Founder of the M2AY Financial Operating System (M-FOS)"}
            </h2>
          </div>
          <p className="text-sm opacity-80 mb-4">
            {isAr
              ? "نظام تشغيل مالي متكامل يجمع بين المعرفة النظرية والتطبيق العملي، مبني على:"
              : "A complete financial operating system that bridges theory and applied practice, built on:"}
          </p>
          <ul className="text-sm space-y-2 opacity-90">
            <li>
              {isAr
                ? `📚 ${homepageSummary.counts.chapters} فصل استراتيجي — من الفلسفة المالية إلى ذكاء السوق`
                : `📚 ${homepageSummary.counts.chapters} strategic chapters — from financial philosophy to market intelligence`}
            </li>
            <li>
              {isAr
                ? `📄 ${homepageSummary.counts.templates} قالب احترافي جاهز للتطبيق الفوري`
                : `📄 ${homepageSummary.counts.templates} professional templates ready for immediate use`}
            </li>
            <li>
              {isAr
                ? `❓ ${homepageSummary.counts.questions}+ سؤال مقابلات مع إجابات نموذجية`
                : `❓ ${homepageSummary.counts.questions}+ interview questions with model answers`}
            </li>
            <li>{isAr ? "🎯 استشارات مخصصة بنهج M-FOS" : "🎯 Bespoke consultations following the M-FOS approach"}</li>
          </ul>
        </Card>

        {profile.skills?.length > 0 && (
          <section className="mb-10">
            <h2 className="font-bold text-lg mb-3">{isAr ? "المهارات" : "Skills"}</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s: string, i: number) => <Badge key={i} variant="secondary">{s}</Badge>)}
            </div>
          </section>
        )}

        {profile.certifications?.length > 0 && (
          <section className="mb-10">
            <h2 className="font-bold text-lg mb-3">{isAr ? "الشهادات" : "Certifications"}</h2>
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((c: string, i: number) => <Badge key={i} variant="outline">{c}</Badge>)}
            </div>
          </section>
        )}

        {profile.experience?.length > 0 && (
          <section className="mb-10">
            <h2 className="font-bold text-lg mb-3">{isAr ? "الخبرة العملية" : "Experience"}</h2>
            <div className="space-y-3">
              {profile.experience.map((e: any, i: number) => (
                <Card key={i} className="p-4">
                  <p className="font-semibold">{isAr ? e.title : (e.titleEn || e.title)}</p>
                  <p className="text-sm text-muted-foreground">
                    {isAr ? e.company : (e.companyEn || e.company)} — {isAr ? e.period : (e.periodEn || e.period)}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {profile.education?.length > 0 && (
          <section className="mb-14">
            <h2 className="font-bold text-lg mb-3">{isAr ? "التعليم" : "Education"}</h2>
            <div className="space-y-3">
              {profile.education.map((e: any, i: number) => (
                <Card key={i} className="p-4">
                  <p className="font-semibold">{isAr ? e.degree : (e.degreeEn || e.degree)}</p>
                  <p className="text-sm text-muted-foreground">
                    {isAr ? e.school : (e.schoolEn || e.school)} — {e.years}
                    {e.grade ? ` — ${isAr ? e.grade : (e.gradeEn || e.grade)}` : ""}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        <Card className="p-6">
          <h2 className="font-bold text-lg mb-1">{isAr ? "احجز استشارة" : "Book a Consultation"}</h2>
          {consultation?.price && (
            <p className="font-bold text-xl mb-2" style={{ color: "var(--accent)" }}>
              ${consultation.price} {isAr ? "للجلسة" : "per session"}
            </p>
          )}
          {consultation?.description && <p className="text-sm text-muted-foreground mb-4">{isAr ? consultation.description : (consultation.descriptionEn || consultation.description)}</p>}

          <p className="text-xs text-muted-foreground mb-4">
            {isAr
              ? "اكتب بياناتك، وهيتفتح واتساب أو الإيميل برسالتك جاهزة — تقدر تبعتها على طول."
              : "Fill in your details, then WhatsApp or Email will open with your message ready to send."}
          </p>

          <div className="space-y-4">
            <Input placeholder={isAr ? "الاسم" : "Name"} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Textarea placeholder={isAr ? "اكتب رسالتك أو استفسارك" : "Tell us what you'd like to discuss"} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={sendViaWhatsApp} className="gap-2" style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                <MessageCircle className="w-4 h-4" /> {isAr ? "إرسال عبر واتساب" : "Send via WhatsApp"}
              </Button>
              <Button onClick={sendViaEmail} variant="outline" className="gap-2">
                <Mail className="w-4 h-4" /> {isAr ? "إرسال عبر الإيميل" : "Send via Email"}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <SiteFooter siteName={siteConfig.siteName} whatsapp={contact.whatsappNumber} email={contact.email} linkedIn={contact.linkedin} />
    </div>
  );
}
