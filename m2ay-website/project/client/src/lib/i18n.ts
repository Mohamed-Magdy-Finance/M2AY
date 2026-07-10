export const translations = {
  en: {
    // Header
    language: "Language",
    theme: "Theme",
    
    // Hero Section
    exploreGuide: "Explore the Guide",
    scrollExplore: "Scroll to explore",
    
    // Chapters Section
    professionalFinanceGuide: "Professional Finance Guide",
    chaptersDescription: "29 comprehensive chapters covering everything from philosophy to CFO leadership",
    searchPlaceholder: "Search chapters...",
    allCategories: "All Categories",
    noChaptersFound: "No chapters found matching your search.",
    
    // Consultation Section
    needExpertGuidance: "Need Expert Guidance?",
    whatsapp: "WhatsApp",
    email: "Email",
    
    // Footer
    m2ayFinance: "M2AY Finance",
    professionalFinanceSystem: "Professional Finance Career Operating System",
    quickLinks: "Quick Links",
    chapters: "Chapters",
    consultation: "Consultation",
    connect: "Connect",
    allRightsReserved: "All rights reserved.",
  },
  ar: {
    // Header
    language: "اللغة",
    theme: "المظهر",
    
    // Hero Section
    exploreGuide: "استكشف الدليل",
    scrollExplore: "مرر للاستكشاف",
    
    // Chapters Section
    professionalFinanceGuide: "دليل التمويل الاحترافي",
    chaptersDescription: "29 فصلاً شاملاً يغطي كل شيء من الفلسفة إلى قيادة CFO",
    searchPlaceholder: "ابحث عن الفصول...",
    allCategories: "جميع الفئات",
    noChaptersFound: "لم يتم العثور على فصول تطابق بحثك.",
    
    // Consultation Section
    needExpertGuidance: "هل تحتاج إلى إرشادات من الخبراء؟",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    
    // Footer
    m2ayFinance: "M2AY Finance",
    professionalFinanceSystem: "نظام تشغيل مهنة التمويل الاحترافي",
    quickLinks: "روابط سريعة",
    chapters: "الفصول",
    consultation: "الاستشارة",
    connect: "تواصل",
    allRightsReserved: "جميع الحقوق محفوظة.",
  },
};

export type Language = "en" | "ar";

export function t(key: keyof typeof translations.en, lang: Language): string {
  return translations[lang][key] || translations.en[key];
}
