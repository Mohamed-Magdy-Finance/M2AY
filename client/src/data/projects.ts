export interface Project {
  slug: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  coverImage: string;
  images: { file: string; titleAr: string; titleEn: string; descAr: string; descEn: string }[];
}

export const projects: Project[] = [
  {
    slug: "juhayna",
    titleAr: "جهينة للصناعات الغذائية",
    titleEn: "Juhayna Food Industries",
    taglineAr: "نموذج تحليلي وتطبيقي في النمذجة المالية وتحليل الأداء",
    taglineEn: "An Applied Financial Modeling and Performance Analysis Case Study",
    coverImage: "images/juhayna/01-Cover.png",
    images: [
      {
        file: "02-Dashboard.png",
        titleAr: "لوحة القيادة الرئيسية (Dashboard)",
        titleEn: "Executive Dashboard",
        descAr: "تجمع هذه اللوحة أهم المؤشرات المالية في مكان واحد، وتمنح نظرة سريعة وواضحة على الإيرادات والأرباح والهوامش ومؤشرات الأداء لدعم القرار بشكل أسرع.",
        descEn: "This dashboard brings the key financial indicators into one place, providing a clear snapshot of revenue, profit, margins, and performance metrics to support faster decision-making.",
      },
      {
        file: "03-KPI-Engine.png",
        titleAr: "محرك مؤشرات الأداء (KPI Engine)",
        titleEn: "KPI Engine",
        descAr: "يعرض هذا الجزء المؤشرات المالية الأساسية المستخرجة من القوائم، ويحسب الربحية والسيولة والرافعة المالية تلقائيًا، ليكون الأساس الذي تعتمد عليه بقية لوحات النموذج.",
        descEn: "This section consolidates the core financial metrics extracted from the statements and calculates profitability, liquidity, and leverage automatically, forming the foundation for the rest of the model.",
      },
      {
        file: "04-Reporting-Layer.png",
        titleAr: "طبقة التقارير (Reporting Layer)",
        titleEn: "Reporting Layer",
        descAr: "كل البيانات المحسوبة داخل النموذج تُنظَّم هنا في صيغة واضحة ومتسقة، بما يضمن سهولة استخدامها في لوحات المعلومات والتحليلات المختلفة.",
        descEn: "Every calculated output in the model is organized here into a clean, consistent format — ensuring it can be used easily across dashboards and analytical views.",
      },
      {
        file: "05-Scenario-Manager.png",
        titleAr: "مدير السيناريوهات (Scenario Manager)",
        titleEn: "Scenario Manager",
        descAr: "هنا مساحة موحدة لإدارة الافتراضات المالية مثل نمو الإيرادات وهوامش الربح ومعدلات الخصم، مع إمكانية اختبار عدة سيناريوهات ومقارنة أثرها على النتائج.",
        descEn: "A centralized space for managing financial assumptions such as revenue growth, profit margins, and discount rates lives here, with the ability to test multiple scenarios and compare their impact.",
      },
      {
        file: "06-Sensitivity.png",
        titleAr: "تحليل الحساسية (Sensitivity Analysis)",
        titleEn: "Sensitivity Analysis",
        descAr: "أثر تغيّر أهم الافتراضات، مثل نمو الإيرادات أو هامش الربح، على النتائج النهائية يظهر بوضوح هنا، بما يساعد على تقييم المخاطر ودعم القرار.",
        descEn: "How changes in key assumptions — like revenue growth or profit margin — affect the final results is measured here, helping assess risk and support decision-making.",
      },
      {
        file: "07-Market-Data-Hub.png",
        titleAr: "مركز بيانات السوق (Market Data Hub)",
        titleEn: "Market Data Hub",
        descAr: "بيانات السوق والمتغيرات الخارجية المستخدمة داخل النموذج مجمّعة في هذا القسم، بما يحافظ على ارتباط الافتراضات بالبيئة الاقتصادية المحيطة.",
        descEn: "Market data and external variables used throughout the model are gathered in this section, keeping assumptions aligned with the surrounding economic environment.",
      },
      {
        file: "08-Control-Panel.png",
        titleAr: "لوحة التحكم (Control Panel) — فحص سلامة النموذج",
        titleEn: "Control Panel — Model Health Check",
        descAr: "اختبارات الجودة وسلامة النموذج تُعرض هنا بالتفصيل: التحقق من صحة المعادلات، ترابط البيانات، واكتشاف الأخطاء، لضمان موثوقية النتائج.",
        descEn: "Quality checks and model integrity tests are displayed here in detail: formula validation, data linkage, and error detection — all to ensure reliable outputs.",
      },
      {
        file: "09-Architecture.png",
        titleAr: "البنية العامة للنموذج (Model Architecture)",
        titleEn: "Model Architecture",
        descAr: "هيكل النموذج المالي وتدفق البيانات بين الإدخال والحسابات والتقارير موضّح هنا، مع تنظيم يضمن سهولة الصيانة ودقة المخرجات.",
        descEn: "The structure of the financial model and the flow of data between inputs, calculations, and reports is illustrated here, built for maintainability and accuracy.",
      },
      {
        file: "10-Audit-Trail.png",
        titleAr: "سجل التتبع (Audit Trail)",
        titleEn: "Audit Trail",
        descAr: "كل تعديل تم على النموذج موثّق هنا: ماذا تغيّر، ومتى، وبأي سياق — بما يوفر شفافية كاملة ويسهّل أي مراجعة مستقبلية.",
        descEn: "Every change made to the model is logged here — what changed, when, and in what context — providing full transparency and making future review easier.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
