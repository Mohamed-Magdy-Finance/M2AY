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
import { useSEO } from "@/hooks/useSEO";
import { siteConfig } from "@/data";

export default function About() {
  const { isAr } = useLanguage();
  const { profile, contact, consultation } = siteConfig;

  useSEO({
    title: isAr ? "من أنا" : "About Me",
    description: profile.summary,
    path: "/about",
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
          <img src={profile.photoUrl} alt={profile.fullName} className="w-40 h-40 rounded-2xl object-cover border-4 shrink-0" style={{ borderColor: "var(--accent)" }} />
          <div>
            <h1 className="text-3xl font-extrabold mb-1">{profile.fullName}</h1>
            <p className="text-lg text-muted-foreground mb-4">{profile.title}</p>
            <p className="leading-relaxed opacity-90">{profile.summary}</p>
          </div>
        </div>

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
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-muted-foreground">{e.company} — {e.period}</p>
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
                  <p className="font-semibold">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.school} — {e.years}{e.grade ? ` — ${e.grade}` : ""}</p>
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
          {consultation?.description && <p className="text-sm text-muted-foreground mb-4">{consultation.description}</p>}

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
