import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { hashPassword } from "./_core/auth";
import {
  admin, chapters, templates, questionCategories, interviewQuestions,
  profile, settings,
} from "../drizzle/schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required. Set it in your .env file before seeding.");
}

const sql = neon(connectionString);
const db = drizzle(sql);

const seedDir = path.resolve(import.meta.dirname, "../drizzle/seed-data");

async function main() {
  console.log("🌱 Seeding M2AY database...");

  // 1) Admin account
  const adminEmail = process.env.ADMIN_EMAIL || "mohamedeones123@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "M*01000#";
  const passwordHash = await hashPassword(adminPassword);
  await db.insert(admin).values({ email: adminEmail, passwordHash }).onConflictDoNothing();
  console.log(`✓ Admin account ready (${adminEmail})`);

  // 2) Profile (Mohamed Magdy — real CV data)
  await db.insert(profile).values({
    fullName: "محمد مجدي",
    title: "FP&A Analyst | Financial Planning, Data Analytics & Business Intelligence",
    email: adminEmail,
    phone: "+201013019563",
    location: "طنطا، الغربية، مصر",
    linkedIn: "https://linkedin.com/in/mohamed-magdy-finance",
    gitHub: "https://github.com/Mohamed-Magdy-Finance",
    photoUrl: "/images/mohamed-magdy.jpg",
    summary: "محلل تخطيط مالي وتحليل (FP&A) يعتمد على البيانات، بخبرة عملية في تحويل البيانات التشغيلية والمالية إلى رؤى استراتيجية. متمكن من النمذجة المالية، دعم الموازنات، وتقارير الأداء باستخدام Power BI وExcel المتقدم وأنظمة ERP (Oracle وXero).",
    skills: JSON.stringify([
      "التخطيط والتحليل المالي (FP&A)", "النمذجة المالية والتقييم", "Power BI & DAX",
      "Power Query / ETL", "Oracle Financials (ERP)", "Xero Cloud Accounting",
      "الموازنات والتنبؤ", "تحليل الانحراف",
    ]),
    certifications: JSON.stringify([
      "Financial Analysis & Modeling (CFI)", "Professional Financial Accountant (PFA)",
      "Oracle Financials Training", "Xero Accounting Foundations",
    ]),
    education: JSON.stringify([
      { degree: "ماجستير إدارة الأعمال - تمويل واستثمار", school: "جامعة طنطا", years: "2025 – 2027" },
      { degree: "بكالوريوس تجارة - محاسبة وتمويل", school: "جامعة طنطا", years: "2021 – 2025", grade: "جيد جدًا" },
    ]),
    experience: JSON.stringify([
      { title: "مستشار عمليات (بالمشروع)", company: "شركة ناشئة لمنتجات الألبان", period: "أغسطس – سبتمبر 2025" },
      { title: "مشرف عمليات", company: "Foshan Electrical and Lighting Co., Ltd", period: "يوليو – نوفمبر 2025" },
      { title: "محاسب مبتدئ ومنسق عمليات", company: "El Abd Patisserie", period: "يونيو – أكتوبر 2024" },
    ]),
    languages: JSON.stringify(["العربية (اللغة الأم)", "الإنجليزية (احترافي)"]),
  }).onConflictDoNothing();
  console.log("✓ Profile seeded");

  // 3) Settings (consultation + contact)
  await db.insert(settings).values({
    consultationPrice: "99.00",
    consultationCurrency: "USD",
    whatsappNumber: "+201013019563",
    contactEmail: adminEmail,
    linkedInUrl: "https://linkedin.com/in/mohamed-magdy-finance",
    consultationDescription: "جلسة استشارية فردية لمناقشة مسارك المهني المالي، مراجعة سيرتك الذاتية، أو التحضير لمقابلة عمل.",
    showConsultationSection: true,
  }).onConflictDoNothing();
  console.log("✓ Settings seeded");

  // 4) Chapters (26 real teaching chapters)
  const chaptersData = JSON.parse(fs.readFileSync(path.join(seedDir, "chapters.json"), "utf-8"));
  for (const c of chaptersData) {
    await db.insert(chapters).values(c).onConflictDoNothing();
  }
  console.log(`✓ ${chaptersData.length} chapters seeded`);

  // 5) Templates (12 real Excel models from GitHub)
  const templatesData = JSON.parse(fs.readFileSync(path.join(seedDir, "templates.json"), "utf-8"));
  const githubRepoUrl = "https://github.com/Mohamed-Magdy-Finance/Financial-Analysis-Portfolio";
  let displayOrder = 1;
  for (const t of templatesData) {
    await db.insert(templates).values({ ...t, githubRepoUrl, displayOrder: displayOrder++ }).onConflictDoNothing();
  }
  console.log(`✓ ${templatesData.length} templates seeded`);

  // 6) Interview Question Bank (11 categories + questions)
  const categoriesData = JSON.parse(fs.readFileSync(path.join(seedDir, "question-categories.json"), "utf-8"));
  const questionsData = JSON.parse(fs.readFileSync(path.join(seedDir, "questions.json"), "utf-8"));

  const categoryIdMap: Record<number, number> = {};
  for (const c of categoriesData) {
    const inserted = await db.insert(questionCategories).values(c).onConflictDoNothing().returning();
    if (inserted[0]) categoryIdMap[c.categoryNumber] = inserted[0].id;
  }
  console.log(`✓ ${categoriesData.length} question categories seeded`);

  let qCount = 0;
  for (const q of questionsData) {
    const categoryId = categoryIdMap[q.categoryNumber];
    if (!categoryId) continue;
    const { categoryNumber, ...rest } = q;
    await db.insert(interviewQuestions).values({ ...rest, categoryId });
    qCount++;
  }
  console.log(`✓ ${qCount} interview questions seeded`);

  console.log("🎉 Seeding complete!");
}

main().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
