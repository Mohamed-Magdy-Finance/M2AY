import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/hooks/useLanguage";
import { siteConfig } from "@/data";

export default function PrivacyPolicy() {
  const { isAr, lp } = useLanguage();
  const settings = siteConfig;

  useSEO({
    title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
    description: isAr ? "سياسة الخصوصية الخاصة بموقع M2AY" : "M2AY's privacy policy",
    path: "/privacy-policy",
  });

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings?.siteName} />
      <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
        {isAr ? (
          <>
            <h1>سياسة الخصوصية</h1>
            <p>آخر تحديث: {new Date().toLocaleDateString("ar-EG")}</p>

            <h2>البيانات التي نجمعها</h2>
            <p>
              عند استخدامك لموقع M2AY، قد نجمع البيانات التالية فقط عند تقديمك لها طواعية عبر نموذج حجز الاستشارة:
              الاسم، البريد الإلكتروني، رقم الواتساب (اختياري)، ونص رسالتك.
            </p>

            <h2>كيف نستخدم بياناتك</h2>
            <p>
              نستخدم هذه البيانات حصريًا للتواصل معك بخصوص طلب الاستشارة الذي قدمته. لا نبيع أو نشارك بياناتك مع أي طرف ثالث.
            </p>

            <h2>ملفات تعريف الارتباط (Cookies)</h2>
            <p>
              نستخدم كوكيز أساسية فقط لتفعيل تسجيل دخول لوحة التحكم الخاصة بالإدارة. لا نستخدم كوكيز تتبع إعلانية.
            </p>

            <h2>أمان البيانات</h2>
            <p>
              نتخذ إجراءات معقولة لحماية بياناتك، بما في ذلك تشفير الاتصال (HTTPS) وتخزين كلمات المرور بشكل مشفّر.
            </p>

            <h2>حقوقك</h2>
            <p>
              يمكنك في أي وقت طلب حذف بياناتك التي قدمتها عبر نموذج الاستشارة، عن طريق التواصل معنا مباشرة.
            </p>

            <h2>التواصل</h2>
            <p>
              لأي استفسار بخصوص هذه السياسة، تواصل معنا على{" "}
              {settings.contact.email && <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>}
            </p>
          </>
        ) : (
          <>
            <h1>Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>

            <h2>Data We Collect</h2>
            <p>
              When you use the M2AY website, we may collect the following data only when you voluntarily provide it
              through the consultation booking form: name, email address, WhatsApp number (optional), and your message.
            </p>

            <h2>How We Use Your Data</h2>
            <p>We use this data exclusively to contact you regarding the consultation request you submitted. We do not sell or share your data with any third party.</p>

            <h2>Cookies</h2>
            <p>We use only essential cookies to enable admin dashboard login. We do not use advertising or tracking cookies.</p>

            <h2>Data Security</h2>
            <p>We take reasonable measures to protect your data, including encrypted connections (HTTPS) and encrypted password storage.</p>

            <h2>Your Rights</h2>
            <p>You may request deletion of any data you submitted via the consultation form at any time by contacting us directly.</p>

            <h2>Contact</h2>
            <p>
              For any questions about this policy, contact us at{" "}
              {settings.contact.email && <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>}
            </p>
          </>
        )}
      </div>
      <SiteFooter whatsapp={settings.contact.whatsappNumber} email={settings.contact.email} linkedIn={settings.contact.linkedin} siteName={settings.siteName} />
    </div>
  );
}
