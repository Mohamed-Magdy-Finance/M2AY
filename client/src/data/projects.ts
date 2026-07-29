export interface Project {
  slug: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  coverImage: string;
  images: { file: string; captionAr: string; captionEn: string }[];
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
      { file: "01-Cover.png", captionAr: "صفحة الغلاف — نظرة عامة على النموذج ونطاقه", captionEn: "Cover page — model overview and scope" },
      { file: "02-Dashboard.png", captionAr: "لوحة القيادة الرئيسية — أهم المؤشرات المالية في نظرة واحدة", captionEn: "Main dashboard — key financial indicators at a glance" },
      { file: "03-KPI-Engine.png", captionAr: "محرك مؤشرات الأداء", captionEn: "KPI engine" },
      { file: "04-Reporting-Layer.png", captionAr: "طبقة التقارير", captionEn: "Reporting layer" },
      { file: "05-Scenario-Manager.png", captionAr: "مدير السيناريوهات — مصدر بيانات موحّد للافتراضات", captionEn: "Scenario manager — a single source of truth for assumptions" },
      { file: "06-Sensitivity.png", captionAr: "تحليل الحساسية — أثر تغيّر المتغيرات الأساسية على الأداء", captionEn: "Sensitivity analysis — the impact of key variables on performance" },
      { file: "07-Market-Data-Hub.png", captionAr: "مركز بيانات السوق", captionEn: "Market data hub" },
      { file: "08-Control-Panel.png", captionAr: "لوحة التحكم — فحوصات سلامة النموذج", captionEn: "Control panel — model health checks" },
      { file: "09-Architecture.png", captionAr: "البنية العامة للنموذج", captionEn: "Overall model architecture" },
      { file: "10-Audit-Trail.png", captionAr: "سجل المراجعة والتتبع", captionEn: "Audit trail" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
