import { Link, useParams } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSEO } from "@/hooks/useSEO";
import { siteConfig } from "@/data";
import { getProjectBySlug } from "@/data/projects";
import { ArrowRight, ArrowLeft, Layers, Target, Lightbulb, ImageIcon, Gem, Info } from "lucide-react";

export default function WorkDetail() {
  const params = useParams<{ slug: string }>();
  const { isAr, lp } = useLanguage();
  const project = getProjectBySlug(params.slug);

  useSEO({
    title: project ? (isAr ? project.titleAr : project.titleEn) : (isAr ? "عمل تطبيقي" : "Applied Work"),
    description: project ? (isAr ? project.taglineAr : project.taglineEn) : "",
    path: `/work/${params.slug}`,
  });

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader siteName={siteConfig.siteName} />
        <p className="text-center py-32 text-muted-foreground flex-1">{isAr ? "العمل غير موجود" : "Work not found"}</p>
        <SiteFooter siteName={siteConfig.siteName} />
      </div>
    );
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-background text-foreground">
      <SiteHeader siteName={siteConfig.siteName} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumbs
          items={[
            { label: isAr ? "الرئيسية" : "Home", href: "/" },
            { label: isAr ? "نماذج تحليلية وأعمال تطبيقية" : "Analytical Models & Applied Work", href: "/work" },
            { label: isAr ? project.titleAr : project.titleEn },
          ]}
        />

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{isAr ? project.titleAr : project.titleEn}</h1>
          <p className="text-lg text-muted-foreground">{isAr ? project.taglineAr : project.taglineEn}</p>
        </div>

        <img
          src={`${import.meta.env.BASE_URL}${project.coverImage}`}
          alt={isAr ? project.titleAr : project.titleEn}
          className="w-full rounded-2xl border mb-12 shadow-sm"
          loading="eager"
        />

        {/* Overview */}
        <section className="mb-10">
          <p className="leading-relaxed opacity-90">
            {isAr
              ? "هذا المشروع هو دراسة تطبيقية صُممت لتقديم قراءة أوضح للأداء المالي لشركة مدرجة، من خلال هيكلة البيانات وتحويلها إلى عرض تحليلي أكثر تنظيمًا واتساقًا. الهدف لم يكن فقط بناء ملف مالي، بل تقديم تجربة عرض تعكس وضوحًا بصريًا، ومنطقًا تحليليًا، وتسلسلًا يساعد على فهم الأداء بسرعة وثقة."
              : "This project is an applied study designed to provide a clearer view of the financial performance of a publicly listed company, by structuring the data into a more organized and coherent analytical format. The goal was not simply to build a financial file, but to create a presentation that reflects visual clarity, analytical logic, and a sequence that makes performance easier to understand at a glance."}
          </p>
        </section>

        {/* Why this company */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="font-bold text-lg">{isAr ? "لماذا جهينة؟" : "Why Juhayna?"}</h2>
          </div>
          <p className="leading-relaxed opacity-90 text-sm">
            {isAr
              ? "اخترت جهينة لأنها تمثل مثالًا مناسبًا على نوعية الأعمال التي تجمع بين التحليل المالي والعرض التنفيذي، حيث تصبح طريقة تنظيم المعلومة لا تقل أهمية عن المعلومة نفسها. هذا النوع من المشاريع يتيح لي اختبار قدرتي على العمل بدقة، وعلى تقديم المحتوى المالي بأسلوب نظيف ومقنع بدل الاكتفاء بعرض أرقام متفرقة."
              : "I chose Juhayna because it represents the kind of project where financial analysis and executive-level presentation come together, making the way information is organized just as important as the information itself. Projects like this let me test my ability to work with precision while presenting financial content in a clean, professional format rather than simply displaying isolated numbers."}
          </p>
        </section>

        {/* What it includes — real technical detail from the actual file */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="font-bold text-lg">{isAr ? "ما الذي يتضمنه النموذج" : "What the Model Includes"}</h2>
          </div>
          <ul className="space-y-2 text-sm opacity-90">
            <li>
              {isAr
                ? "تسع طرق تقييم مختلفة مطبّقة على نفس الشركة: تدفقات نقدية مخصومة على مديين زمنيين (5 و10 سنوات) بثلاث مقاربات خروج (EBITDA، الإيرادات، النمو النهائي)، مضاعفات مقارنة متعددة (P/E، EV/EBITDA، EV/Revenue، P/B)، ونموذج توزيعات أرباح بنمو مستقر."
                : "Nine distinct valuation methods applied to the same company: discounted cash flow over two horizons (5 and 10 years) with three exit approaches (EBITDA, revenue, terminal growth), multiple comparable multiples (P/E, EV/EBITDA, EV/Revenue, P/B), and a stable-growth dividend model."}
            </li>
            <li>
              {isAr
                ? "تحليل حساسية تفاعلي: مدخلات قابلة للتغيير (نمو الإيرادات، تكلفة البضاعة، سعر الفائدة) تنعكس تلقائيًا على الربح التشغيلي والدين الإجمالي."
                : "Interactive sensitivity analysis: adjustable inputs (revenue growth, cost of goods, interest rate) that flow through automatically to operating profit and total debt."}
            </li>
            <li>
              {isAr
                ? "مدير سيناريوهات بمصدر بيانات واحد موحّد (نمو الإيرادات، هامش EBITDA، الإنفاق الرأسمالي، تكلفة رأس المال، معدل الضريبة) لضمان اتساق الافتراضات في كل جزء من النموذج."
                : "A scenario manager built on a single, unified data source (revenue growth, EBITDA margin, capital expenditure, cost of capital, tax rate) to keep assumptions consistent across every part of the model."}
            </li>
            <li>
              {isAr
                ? "34 ورقة عمل مترابطة، 233 نطاق مسمّى، ونظام فحص داخلي كامل (70 فحص توافق مالي، كلها ناجحة)."
                : "34 interconnected worksheets, 233 named ranges, and a full internal validation system (70 financial consistency checks, all passing)."}
            </li>
          </ul>
        </section>

        {/* Methodology */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="font-bold text-lg">{isAr ? "المنهجية" : "Methodology"}</h2>
          </div>
          <p className="leading-relaxed opacity-90 text-sm">
            {isAr
              ? "بدأ العمل بجمع وترتيب البيانات، ثم بناء التسلسل التحليلي الذي يربط بين المدخلات والحسابات والمخرجات. بعد ذلك تم تنظيم أجزاء النموذج داخل بنية واضحة تسمح بقراءة النموذج بسرعة، مع الحفاظ على العمق التحليلي عند الحاجة. واستُخدمت العناصر البصرية لدعم الفهم وتخفيف كثافة البيانات، لا لمجرد الزخرفة أو التجميل."
              : "The process began with collecting and organizing the data, then building the analytical flow connecting inputs, calculations, and outputs. The model was then structured into a clear framework that allows it to be reviewed quickly while preserving analytical depth where it matters. Visual elements were used to support understanding and reduce information density — not merely to decorate the page."}
          </p>
        </section>

        {/* What it demonstrates */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Gem className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="font-bold text-lg">{isAr ? "ما الذي يوضحه هذا العمل" : "What This Work Demonstrates"}</h2>
          </div>
          <ul className="space-y-1.5 text-sm opacity-90 list-disc ps-5">
            <li>{isAr ? "تطبيق أكثر من منهجية تقييم على نفس الشركة، والمقارنة بين نتائجها" : "Applying more than one valuation methodology to the same company and comparing the results"}</li>
            <li>{isAr ? "بناء تحليل حساسية حقيقي يعكس أثر المتغيرات على الأداء الفعلي" : "Building genuine sensitivity analysis that reflects the impact of variables on actual performance"}</li>
            <li>{isAr ? "تصميم نظام بيانات موحّد يمنع التضارب بين أجزاء النموذج المختلفة" : "Designing a unified data system that prevents inconsistency across different parts of the model"}</li>
            <li>{isAr ? "تنظيم المعلومات المالية المعقدة في عرض متماسك وسهل القراءة" : "Organizing complex financial information into a coherent, easy-to-read presentation"}</li>
          </ul>
        </section>

        {/* Gallery */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h2 className="font-bold text-lg">{isAr ? "لقطات من النموذج" : "Selected Visuals"}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {project.images.slice(1).map((img, i) => (
              <figure key={i}>
                <img
                  src={`${import.meta.env.BASE_URL}images/juhayna/${img.file}`}
                  alt={isAr ? img.captionAr : img.captionEn}
                  className="w-full rounded-xl border shadow-sm"
                  loading="lazy"
                />
                <figcaption className="text-xs text-muted-foreground mt-2">{isAr ? img.captionAr : img.captionEn}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Note / disclaimer */}
        <Card className="p-5 mb-10 flex gap-3" style={{ borderColor: "var(--accent)", borderWidth: 1 }}>
          <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
          <p className="text-sm text-muted-foreground">
            {isAr
              ? "هذا العمل معروض لأغراض شخصية وتوضيحية، بهدف إبراز أسلوبي في التحليل والتنظيم وبناء النماذج المالية. ولا يُقصد به أن يكون توصية استثمارية أو تمثيلًا لخدمة مهنية مباشرة."
              : "This work is presented for personal and illustrative purposes, to highlight my approach to analysis, organization, and financial modeling. It is not intended as investment advice or as a representation of a direct professional engagement."}
          </p>
        </Card>

        <Link href={lp("/work")} className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80" style={{ color: "var(--accent)" }}>
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {isAr ? "العودة إلى نماذج تحليلية وأعمال تطبيقية" : "Back to Analytical Models & Applied Work"}
        </Link>
      </div>

      <SiteFooter siteName={siteConfig.siteName} whatsapp={siteConfig.contact.whatsappNumber} email={siteConfig.contact.email} linkedIn={siteConfig.contact.linkedin} />
    </div>
  );
}
