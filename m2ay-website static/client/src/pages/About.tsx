import { useState } from "react";
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
import { siteConfig } from "@/data";

export default function About() {
  const { isAr, lp } = useLanguage();

  useSEO({
    title: isAr ? "من أنا" : "About Me",
    description: isAr
      ? "تعرّف على محمد مجدي، محلل FP&A، واحجز استشارة مالية أو مهنية."
      : "Learn about Mohamed Magdy, FP&A Analyst, and book a finance or career consultation.",
    path: "/about",
  });

  const profile = siteConfig.profile;
  const settings = siteConfig;

  const skills = profile.skills || [];
  const certifications = profile.certifications || [];

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // في نسخة Static، نستخدم Formspree أو EmailJS
      // للآن، نعرض رسالة نجاح
      toast.success(isAr ? "تم إرسال طلبك بنجاح! هنتواصل معك قريبًا." : "Request sent! We'll be in touch soon.");
      setForm({ name: "", email: "", whatsapp: "", message: "" });
    } catch {
      toast.error(isAr ? "حصل خطأ، حاول تاني" : "Something went wrong, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings.siteName} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">{profile.fullName}</h1>
            <p className="text-lg opacity-80 mb-4">{profile.title}</p>
            <p className="text-base opacity-70 mb-8">{profile.bio}</p>

            <div className="mb-8">
              <h3 className="font-bold mb-3">{isAr ? "المهارات" : "Skills"}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <Badge key={i} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3">{isAr ? "الشهادات" : "Certifications"}</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, i) => (
                  <Badge key={i} variant="outline">{cert}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={profile.photoUrl}
              alt={profile.fullName}
              className="rounded-2xl w-full max-w-sm h-auto object-cover border-4"
              style={{ borderColor: "var(--accent)" }}
            />
          </div>
        </div>

        {/* Consultation Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              {isAr ? "احجز استشارة" : "Book a Consultation"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isAr ? "الاسم" : "Name"}
                </label>
                <Input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={isAr ? "أدخل اسمك" : "Your name"}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={isAr ? "بريدك الإلكتروني" : "your@email.com"}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isAr ? "واتساب (اختياري)" : "WhatsApp (Optional)"}
                </label>
                <Input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder={isAr ? "رقم واتساب" : "+1 (555) 000-0000"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isAr ? "رسالتك" : "Message"}
                </label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={isAr ? "أخبرني عن احتياجاتك" : "Tell me about your needs"}
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                {isSubmitting ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "أرسل الطلب" : "Send Request")}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t">
              <h3 className="font-bold mb-4">{isAr ? "تواصل معي مباشرة" : "Contact Me Directly"}</h3>
              <div className="space-y-3">
                {settings.contact.whatsapp && (
                  <a
                    href={settings.contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm opacity-70">{settings.contact.whatsapp}</p>
                  </a>
                )}
                {settings.contact.email && (
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <p className="font-medium">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                    <p className="text-sm opacity-70">{settings.contact.email}</p>
                  </a>
                )}
                {settings.contact.linkedin && (
                  <a
                    href={settings.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm opacity-70">{settings.contact.linkedin}</p>
                  </a>
                )}
              </div>
            </div>
          </Card>
        </div>
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
