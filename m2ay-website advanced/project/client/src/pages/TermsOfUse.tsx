import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useSEO } from "@/hooks/useSEO";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/hooks/useLanguage";

export default function TermsOfUse() {
  const { isAr, lp } = useLanguage();
  const { data: settings } = trpc.public.settings.useQuery();

  useSEO({
    title: isAr ? "شروط الاستخدام" : "Terms of Use",
    description: isAr ? "شروط استخدام موقع M2AY" : "M2AY's terms of use",
    path: "/terms-of-use",
  });

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={settings?.siteName} />
      <div className="max-w-3xl mx-auto px-4 py-12 prose dark:prose-invert">
        {isAr ? (
          <>
            <h1>شروط الاستخدام</h1>
            <p>آخر تحديث: {new Date().toLocaleDateString("ar-EG")}</p>

            <h2>طبيعة المحتوى</h2>
            <p>
              المحتوى المقدم في هذا الموقع (الدليل المالي، القوالب، بنك الأسئلة) هو محتوى تعليمي وإرشادي عام،
              ولا يُعد استشارة مالية أو مهنية مخصصة إلا في حال حجز جلسة استشارة مباشرة.
            </p>

            <h2>استخدام القوالب</h2>
            <p>
              القوالب المالية المتاحة للتحميل مخصصة للاستخدام الشخصي والتعليمي. المستخدم مسؤول عن التحقق من ملاءمتها
              لحالته الخاصة قبل الاعتماد عليها في أي قرار مالي فعلي.
            </p>

            <h2>حدود المسؤولية</h2>
            <p>
              نبذل قصارى جهدنا لضمان دقة المحتوى، لكننا لا نتحمل مسؤولية أي قرار يُتخذ بناءً على المعلومات
              المقدمة في الموقع دون استشارة مباشرة.
            </p>

            <h2>الملكية الفكرية</h2>
            <p>
              جميع حقوق المحتوى (النصوص، القوالب، التصميم) محفوظة لصاحب الموقع. لا يجوز إعادة نشر أو بيع
              المحتوى دون إذن كتابي.
            </p>

            <h2>التواصل</h2>
            <p>
              لأي استفسار، تواصل معنا على{" "}
              {settings?.contactEmail && <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>}
            </p>
          </>
        ) : (
          <>
            <h1>Terms of Use</h1>
            <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>

            <h2>Nature of Content</h2>
            <p>
              The content on this site (the finance guide, templates, question bank) is general educational content,
              and does not constitute personalized financial or professional advice unless a direct consultation is booked.
            </p>

            <h2>Use of Templates</h2>
            <p>Downloadable financial templates are for personal and educational use. Users are responsible for verifying their suitability before relying on them for any real financial decision.</p>

            <h2>Limitation of Liability</h2>
            <p>We make reasonable efforts to ensure content accuracy, but we are not liable for decisions made based on site content without a direct consultation.</p>

            <h2>Intellectual Property</h2>
            <p>All content rights (text, templates, design) belong to the site owner. Content may not be republished or sold without written permission.</p>

            <h2>Contact</h2>
            <p>
              For any questions, contact us at{" "}
              {settings?.contactEmail && <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>}
            </p>
          </>
        )}
      </div>
      <SiteFooter whatsapp={settings?.whatsappNumber} email={settings?.contactEmail} linkedIn={settings?.linkedInUrl} siteName={settings?.siteName} footerText={settings?.footerText} />
    </div>
  );
}
