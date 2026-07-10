import { eq, asc, desc, and, isNull, isNotNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  chapters, templates, chapterTemplates, questionCategories, interviewQuestions,
  chapterQuestionCategories, chapterVersions, activityLog,
  profile, settings, consultationRequests, admin,
  InsertChapter, InsertTemplate, InsertQuestionCategory, InsertInterviewQuestion,
  InsertConsultationRequest,
} from "../drizzle/schema";
import { ENV } from './_core/env';

const TRASH_RETENTION_DAYS = 30;

async function purgeExpiredTrash() {
  const db = await getDb();
  if (!db) return;
  const cutoff = new Date(Date.now() - TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const { lt } = await import("drizzle-orm");
  await db.delete(chapters).where(and(isNotNull(chapters.deletedAt), lt(chapters.deletedAt, cutoff)));
  await db.delete(templates).where(and(isNotNull(templates.deletedAt), lt(templates.deletedAt, cutoff)));
}

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
  const rows = await db.select().from(chapters).where(isNull(chapters.deletedAt)).orderBy(asc(chapters.displayOrder));
  return publishedOnly ? rows.filter(r => r.status === "published") : rows;
}

export async function getChapterById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(chapters).where(and(eq(chapters.id, id), isNull(chapters.deletedAt))).limit(1);
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

const VERSIONED_CHAPTER_FIELDS = [
  "arabicTitle", "englishTitle", "arabicContent", "englishContent", "summary",
  "practicalOutput", "portfolioTask", "selfAssessment", "reflectionQuestion", "nextStep",
] as const;

export async function updateChapter(id: number, data: Partial<InsertChapter>) {
  const db = await getDb();
  if (!db) return undefined;

  // Snapshot the previous state for mini version history (only when real content changes)
  const touchesVersionedField = VERSIONED_CHAPTER_FIELDS.some(f => f in data);
  if (touchesVersionedField) {
    const existing = await getChapterById(id);
    if (existing) {
      const snapshot: Record<string, unknown> = {};
      for (const field of VERSIONED_CHAPTER_FIELDS) snapshot[field] = existing[field];
      await db.insert(chapterVersions).values({ chapterId: id, snapshot: JSON.stringify(snapshot) });
      // Trim to the last 5 versions
      const versions = await db.select().from(chapterVersions).where(eq(chapterVersions.chapterId, id)).orderBy(desc(chapterVersions.createdAt));
      const toDelete = versions.slice(5);
      for (const v of toDelete) await db.delete(chapterVersions).where(eq(chapterVersions.id, v.id));
    }
  }

  const result = await db.update(chapters).set({ ...data, updatedAt: new Date() }).where(eq(chapters.id, id)).returning();
  return result[0];
}

export async function getChapterVersions(chapterId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(chapterVersions).where(eq(chapterVersions.chapterId, chapterId)).orderBy(desc(chapterVersions.createdAt));
}

export async function restoreChapterVersion(versionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(chapterVersions).where(eq(chapterVersions.id, versionId)).limit(1);
  const version = result[0];
  if (!version) return undefined;
  const snapshot = JSON.parse(version.snapshot);
  return await updateChapter(version.chapterId, snapshot);
}

// Soft delete (Recycle Bin) — moves to trash instead of deleting immediately
export async function deleteChapter(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(chapters).set({ deletedAt: new Date() }).where(eq(chapters.id, id));
}

export async function restoreChapter(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(chapters).set({ deletedAt: null }).where(eq(chapters.id, id));
}

export async function permanentlyDeleteChapter(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(chapters).where(eq(chapters.id, id));
}

export async function getTrashedChapters() {
  const db = await getDb();
  if (!db) return [];
  await purgeExpiredTrash();
  return await db.select().from(chapters).where(isNotNull(chapters.deletedAt)).orderBy(desc(chapters.deletedAt));
}

// ---------- Templates ----------
export async function getAllTemplates(activeOnly = false) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(templates).where(isNull(templates.deletedAt)).orderBy(asc(templates.displayOrder));
  return activeOnly ? rows.filter(r => r.isActive) : rows;
}

export async function getTemplateById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(templates).where(and(eq(templates.id, id), isNull(templates.deletedAt))).limit(1);
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

export async function restoreTemplate(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(templates).set({ deletedAt: null }).where(eq(templates.id, id));
}

export async function permanentlyDeleteTemplate(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(templates).where(eq(templates.id, id));
}

export async function getTrashedTemplates() {
  const db = await getDb();
  if (!db) return [];
  await purgeExpiredTrash();
  return await db.select().from(templates).where(isNotNull(templates.deletedAt)).orderBy(desc(templates.deletedAt));
}

export async function deleteTemplate(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(templates).set({ deletedAt: new Date() }).where(eq(templates.id, id));
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
  return await db.select().from(consultationRequests).orderBy(desc(consultationRequests.createdAt));
}

export async function updateConsultationRequest(id: number, data: Partial<InsertConsultationRequest>) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.update(consultationRequests).set({ ...data, updatedAt: new Date() }).where(eq(consultationRequests.id, id)).returning();
  return result[0];
}

// ---------- Activity Log ----------
export async function getRecentActivity(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(activityLog).orderBy(desc(activityLog.createdAt)).limit(limit);
}

// ---------- Universal Search ----------
export async function searchAll(query: string) {
  const db = await getDb();
  if (!db) return { chapters: [], templates: [], questions: [] };
  const { ilike, or } = await import("drizzle-orm");
  const q = `%${query}%`;

  const matchedChapters = await db
    .select()
    .from(chapters)
    .where(and(isNull(chapters.deletedAt), eq(chapters.status, "published"), or(ilike(chapters.arabicTitle, q), ilike(chapters.englishTitle, q), ilike(chapters.arabicContent, q))))
    .limit(8);

  const matchedTemplates = await db
    .select()
    .from(templates)
    .where(and(isNull(templates.deletedAt), eq(templates.isActive, true), or(ilike(templates.arabicName, q), ilike(templates.englishName, q), ilike(templates.shortDescription, q))))
    .limit(8);

  const matchedQuestions = await db
    .select()
    .from(interviewQuestions)
    .where(or(ilike(interviewQuestions.question, q), ilike(interviewQuestions.englishQuestion, q)))
    .limit(8);

  return { chapters: matchedChapters, templates: matchedTemplates, questions: matchedQuestions };
}

// ---------- Backup / Export / Import ----------
export interface BackupBundle {
  version: 1;
  exportedAt: string;
  chapters: unknown[];
  templates: unknown[];
  questionCategories: unknown[];
  interviewQuestions: unknown[];
  chapterTemplateLinks: unknown[];
  chapterQuestionCategoryLinks: unknown[];
  profile: unknown;
  settings: unknown;
}

export async function exportBackup(): Promise<BackupBundle | null> {
  const db = await getDb();
  if (!db) return null;
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    chapters: await db.select().from(chapters),
    templates: await db.select().from(templates),
    questionCategories: await db.select().from(questionCategories),
    interviewQuestions: await db.select().from(interviewQuestions),
    chapterTemplateLinks: await db.select().from(chapterTemplates),
    chapterQuestionCategoryLinks: await db.select().from(chapterQuestionCategories),
    profile: (await db.select().from(profile))[0] ?? null,
    settings: (await db.select().from(settings))[0] ?? null,
  };
}

/**
 * Full restore from a backup bundle. This is destructive by design (wipes and
 * re-inserts all content tables) — it's meant as a disaster-recovery tool for a
 * single-admin site, not a merge/sync operation.
 */
export async function importBackup(bundle: BackupBundle) {
  const db = await getDb();
  if (!db) return { success: false, error: "No database connection" };

  try {
    await db.delete(chapterQuestionCategories);
    await db.delete(chapterTemplates);
    await db.delete(interviewQuestions);
    await db.delete(questionCategories);
    await db.delete(chapters);
    await db.delete(templates);

    if (bundle.chapters?.length) await db.insert(chapters).values(bundle.chapters as InsertChapter[]);
    if (bundle.templates?.length) await db.insert(templates).values(bundle.templates as InsertTemplate[]);
    if (bundle.questionCategories?.length) await db.insert(questionCategories).values(bundle.questionCategories as InsertQuestionCategory[]);
    if (bundle.interviewQuestions?.length) await db.insert(interviewQuestions).values(bundle.interviewQuestions as InsertInterviewQuestion[]);
    if (bundle.chapterTemplateLinks?.length) await db.insert(chapterTemplates).values(bundle.chapterTemplateLinks as any[]);
    if (bundle.chapterQuestionCategoryLinks?.length) await db.insert(chapterQuestionCategories).values(bundle.chapterQuestionCategoryLinks as any[]);

    if (bundle.profile) await updateProfile(bundle.profile as Record<string, unknown>);
    if (bundle.settings) await updateSettings(bundle.settings as Record<string, unknown>);

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
