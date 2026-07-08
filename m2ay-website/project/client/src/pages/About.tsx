import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";

export default function About() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "من أنا" : "About Me",
    description: isAr
      ? "تعرّف على محمد مجدي، محلل FP&A، واحجز استشارة مالية أو مهنية."
      : "Learn about Mohamed Magdy, FP&A Analyst, and book a finance or career consultation.",
    path: "/about",
  });

  const { data: profile } = trpc.public.profile.useQuery();
  const { data: settings } = trpc.public.settings.useQuery();
  const submitConsultation = trpc.public.consultation.submit.useMutation();

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });

  const skills: string[] = profile?.skills ? JSON.parse(profile.skills) : [];
  const certifications: string[] = profile?.certifications ? JSON.parse(profile.certifications) : [];
  const experience: any[] = profile?.experience ? JSON.parse(profile.experience) : [];
  const education: any[] = profile?.education ? JSON.parse(profile.education) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitConsultation.mutateAsync(form);
      toast.success(isAr ? "تم إرسال طلبك بنجاح! هنتواصل معك قريبًا." : "Request sent! We'll be in touch soon.");
      setForm({ name: "", email: "", whatsapp: "", message: "" });
    } catch {
      toast.error(isAr ? "حصل خطأ، حاول تاني" : "Something went wrong, please try again");
    }
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings?.siteName} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-12">
          <img
            src={profile?.photoUrl || "/images/mohamed-magdy.jpg"}
            alt={profile?.fullName}
            loading="lazy"
            className="w-40 h-40 rounded-2xl object-cover border-4 shrink-0"
            style={{ borderColor: "var(--accent)" }}
          />
          <div>
            <h1 className="text-3xl font-extrabold mb-1">{profile?.fullName}</h1>
            <p className="text-lg text-muted-foreground mb-4">{profile?.title}</p>
            <p className="leading-relaxed opacity-90">{profile?.summary}</p>
          </div>
        </div>

        {skills.length > 0 && (
          <section className="mb-10">
            <h2 className="font-bold text-lg mb-3">{isAr ? "المهارات" : "Skills"}</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <Badge key={i} variant="secondary">{s}</Badge>)}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-10">
            <h2 className="font-bold text-lg mb-3">{isAr ? "الشهادات" : "Certifications"}</h2>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c, i) => <Badge key={i} variant="outline">{c}</Badge>)}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-10">
            <h2 className="font-bold text-lg mb-3">{isAr ? "الخبرة العملية" : "Experience"}</h2>
            <div className="space-y-3">
              {experience.map((e, i) => (
                <Card key={i} className="p-4">
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-muted-foreground">{e.company} — {e.period}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-14">
            <h2 className="font-bold text-lg mb-3">{isAr ? "التعليم" : "Education"}</h2>
            <div className="space-y-3">
              {education.map((e, i) => (
                <Card key={i} className="p-4">
                  <p className="font-semibold">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.school} — {e.years}{e.grade ? ` — ${e.grade}` : ""}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Consultation form */}
        <Card className="p-6">
          <h2 className="font-bold text-lg mb-1">{isAr ? "احجز استشارة" : "Book a Consultation"}</h2>
          {settings?.consultationPrice && (
            <p className="font-bold text-xl mb-4" style={{ color: "var(--accent)" }}>
              ${settings.consultationPrice} {isAr ? "للجلسة" : "per session"}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              placeholder={isAr ? "الاسم" : "Name"}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <Input
              required
              type="email"
              placeholder={isAr ? "البريد الإلكتروني" : "Email"}
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder={isAr ? "رقم الواتساب (اختياري)" : "WhatsApp number (optional)"}
              value={form.whatsapp}
              onChange={e => setForm({ ...form, whatsapp: e.target.value })}
            />
            <Textarea
              placeholder={isAr ? "اكتب رسالتك أو استفسارك" : "Tell us what you'd like to discuss"}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
            />
            <Button
              type="submit"
              disabled={submitConsultation.isPending}
              style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              {isAr ? "إرسال الطلب" : "Send Request"}
            </Button>
          </form>
        </Card>
      </div>

      <SiteFooter whatsapp={settings?.whatsappNumber} email={settings?.contactEmail} linkedIn={settings?.linkedInUrl} siteName={settings?.siteName} footerText={settings?.footerText} />
    </div>
  );
}
