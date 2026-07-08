import { eq, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  chapters, templates, chapterTemplates, questionCategories, interviewQuestions,
  chapterQuestionCategories,
  profile, settings, consultationRequests, admin,
  InsertChapter, InsertTemplate, InsertQuestionCategory, InsertInterviewQuestion,
  InsertConsultationRequest,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && ENV.databaseUrl) {
    try {
      const sql = neon(ENV.databaseUrl);
      _db = drizzle(sql);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ---------- Admin auth ----------
export async function getAdminByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(admin).where(eq(admin.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function touchAdminLastSignedIn(email: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(admin).set({ lastSignedIn: new Date() }).where(eq(admin.email, email));
}

// ---------- Chapters ----------
export async function getAllChapters(publishedOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(chapters).orderBy(asc(chapters.displayOrder));
  return publishedOnly ? rows.filter(r => r.status === "published") : rows;
}

export async function getChapterById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(chapters).where(eq(chapters.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAdjacentChapters(chapterNumber: number, publishedOnly = true) {
  const all = await getAllChapters(publishedOnly);
  const sorted = all.slice().sort((a, b) => a.chapterNumber - b.chapterNumber);
  const idx = sorted.findIndex(c => c.chapterNumber === chapterNumber);
  return {
    previous: idx > 0 ? sorted[idx - 1] : null,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export async function createChapter(data: InsertChapter) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(chapters).values(data).returning();
  return result[0];
}

export async function updateChapter(id: number, data: Partial<InsertChapter>) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.update(chapters).set({ ...data, updatedAt: new Date() }).where(eq(chapters.id, id)).returning();
  return result[0];
}

export async function deleteChapter(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(chapters).where(eq(chapters.id, id));
}

// ---------- Templates ----------
export async function getAllTemplates(activeOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(templates).orderBy(asc(templates.displayOrder));
  return activeOnly ? rows.filter(r => r.isActive) : rows;
}

export async function getTemplateById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTemplate(data: InsertTemplate) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(templates).values(data).returning();
  return result[0];
}

export async function updateTemplate(id: number, data: Partial<InsertTemplate>) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.update(templates).set({ ...data, updatedAt: new Date() }).where(eq(templates.id, id)).returning();
  return result[0];
}

export async function deleteTemplate(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(templates).where(eq(templates.id, id));
}

export async function incrementTemplateDownload(id: number) {
  const db = await getDb();
  if (!db) return;
  const t = await getTemplateById(id);
  if (!t) return;
  await db.update(templates).set({ downloadCount: (t.downloadCount ?? 0) + 1 }).where(eq(templates.id, id));
}

// ---------- Chapter <-> Template relationships ----------
export async function getTemplatesForChapter(chapterId: number) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(chapterTemplates).where(eq(chapterTemplates.chapterId, chapterId));
  const results = [];
  for (const link of links) {
    const t = await getTemplateById(link.templateId);
    if (t) results.push(t);
  }
  return results;
}

export async function getChaptersForTemplate(templateId: number) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(chapterTemplates).where(eq(chapterTemplates.templateId, templateId));
  const results = [];
  for (const link of links) {
    const c = await getChapterById(link.chapterId);
    if (c) results.push(c);
  }
  return results;
}

export async function linkChapterTemplate(chapterId: number, templateId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chapterTemplates).values({ chapterId, templateId });
}

export async function unlinkChapterTemplate(chapterId: number, templateId: number) {
  const db = await getDb();
  if (!db) return;
  const { and } = await import("drizzle-orm");
  await db.delete(chapterTemplates).where(and(eq(chapterTemplates.chapterId, chapterId), eq(chapterTemplates.templateId, templateId)));
}

// ---------- Chapter <-> Question Category relationships ----------
export async function getQuestionCategoriesForChapter(chapterId: number) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(chapterQuestionCategories).where(eq(chapterQuestionCategories.chapterId, chapterId));
  const results = [];
  for (const link of links) {
    const result = await db.select().from(questionCategories).where(eq(questionCategories.id, link.categoryId)).limit(1);
    if (result[0]) results.push(result[0]);
  }
  return results;
}

export async function linkChapterQuestionCategory(chapterId: number, categoryId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chapterQuestionCategories).values({ chapterId, categoryId });
}

export async function unlinkChapterQuestionCategory(chapterId: number, categoryId: number) {
  const db = await getDb();
  if (!db) return;
  const { and } = await import("drizzle-orm");
  await db.delete(chapterQuestionCategories).where(and(eq(chapterQuestionCategories.chapterId, chapterId), eq(chapterQuestionCategories.categoryId, categoryId)));
}

// ---------- Interview Question Bank ----------
export async function getAllQuestionCategories() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(questionCategories).orderBy(asc(questionCategories.displayOrder));
}

export async function getQuestionsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(interviewQuestions).where(eq(interviewQuestions.categoryId, categoryId)).orderBy(asc(interviewQuestions.displayOrder));
}

export async function createQuestionCategory(data: InsertQuestionCategory) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(questionCategories).values(data).returning();
  return result[0];
}

export async function createInterviewQuestion(data: InsertInterviewQuestion) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(interviewQuestions).values(data).returning();
  return result[0];
}

export async function updateInterviewQuestion(id: number, data: Partial<InsertInterviewQuestion>) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.update(interviewQuestions).set(data).where(eq(interviewQuestions.id, id)).returning();
  return result[0];
}

export async function deleteInterviewQuestion(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(interviewQuestions).where(eq(interviewQuestions.id, id));
}

// ---------- Profile ----------
export async function getProfile() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(profile).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateProfile(data: Record<string, unknown>) {
  const db = await getDb();
  if (!db) return;
  const existing = await getProfile();
  if (existing) {
    await db.update(profile).set({ ...data, updatedAt: new Date() }).where(eq(profile.id, existing.id));
  } else {
    await db.insert(profile).values(data as any);
  }
}

// ---------- Settings ----------
export async function getSettings() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(settings).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateSettings(data: Record<string, unknown>) {
  const db = await getDb();
  if (!db) return;
  const existing = await getSettings();
  if (existing) {
    await db.update(settings).set({ ...data, updatedAt: new Date() }).where(eq(settings.id, existing.id));
  } else {
    await db.insert(settings).values(data as any);
  }
}

// ---------- Consultation Requests ----------
export async function createConsultationRequest(data: InsertConsultationRequest) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(consultationRequests).values(data).returning();
  return result[0];
}

export async function getAllConsultationRequests() {
  const db = await getDb();
  if (!db) return [];
  const { desc } = await import("drizzle-orm");
  return await db.select().from(consultationRequests).orderBy(desc(consultationRequests.createdAt));
}

export async function updateConsultationRequest(id: number, data: Partial<InsertConsultationRequest>) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.update(consultationRequests).set({ ...data, updatedAt: new Date() }).where(eq(consultationRequests.id, id)).returning();
  return result[0];
}
