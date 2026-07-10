import { integer, pgTable, text, timestamp, varchar, decimal, boolean, serial } from "drizzle-orm/pg-core";

/**
 * Admin table — single-owner authentication (email + hashed password).
 * Replaces the old Manus OAuth `users` table. There is exactly one admin (Mohamed Magdy).
 */
export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn"),
});

export type Admin = typeof admin.$inferSelect;
export type InsertAdmin = typeof admin.$inferInsert;

// Chapters table for the finance guide (26 real teaching chapters)
export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  chapterNumber: integer("chapterNumber").notNull().unique(),
  section: varchar("section", { length: 100 }).notNull(),
  arabicTitle: varchar("arabicTitle", { length: 255 }).notNull(),
  englishTitle: varchar("englishTitle", { length: 255 }).notNull(),
  description: text("description"),
  arabicContent: text("arabicContent"),
  englishContent: text("englishContent"),
  summary: text("summary"),
  practicalOutput: text("practicalOutput"),
  portfolioTask: text("portfolioTask"),
  selfAssessment: text("selfAssessment"),
  reflectionQuestion: text("reflectionQuestion"),
  nextStep: text("nextStep"),
  status: varchar("status", { length: 20 }).default("published").notNull(),
  slug: varchar("slug", { length: 255 }),
  seoTitle: varchar("seoTitle", { length: 255 }),
  seoDescription: varchar("seoDescription", { length: 500 }),
  seoKeywords: varchar("seoKeywords", { length: 500 }),
  ogImage: text("ogImage"),
  deletedAt: timestamp("deletedAt"),
  displayOrder: integer("displayOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Chapter = typeof chapters.$inferSelect;
export type InsertChapter = typeof chapters.$inferInsert;

// Financial Excel templates (synced from GitHub)
export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  arabicName: varchar("arabicName", { length: 255 }).notNull(),
  englishName: varchar("englishName", { length: 255 }).notNull(),
  shortDescription: text("shortDescription"),
  detailedExplanation: text("detailedExplanation"),
  category: varchar("category", { length: 100 }).notNull(),
  difficultyLevel: varchar("difficultyLevel", { length: 20 }).default("intermediate"),
  githubRepoUrl: varchar("githubRepoUrl", { length: 500 }),
  githubFolderPath: varchar("githubFolderPath", { length: 255 }),
  mainFileName: varchar("mainFileName", { length: 255 }),
  previewImageUrl: text("previewImageUrl"),
  seoTitle: varchar("seoTitle", { length: 255 }),
  seoDescription: varchar("seoDescription", { length: 500 }),
  downloadCount: integer("downloadCount").default(0),
  isActive: boolean("isActive").default(true).notNull(),
  deletedAt: timestamp("deletedAt"),
  displayOrder: integer("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Template = typeof templates.$inferSelect;
export type InsertTemplate = typeof templates.$inferInsert;

// Many-to-many link between chapters and templates ("Content Relationship Engine")
export const chapterTemplates = pgTable("chapterTemplates", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapterId").notNull().references(() => chapters.id, { onDelete: "cascade" }),
  templateId: integer("templateId").notNull().references(() => templates.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChapterTemplate = typeof chapterTemplates.$inferSelect;
export type InsertChapterTemplate = typeof chapterTemplates.$inferInsert;

// Interview Question Bank — 11 categories
export const questionCategories = pgTable("questionCategories", {
  id: serial("id").primaryKey(),
  categoryNumber: integer("categoryNumber").notNull().unique(),
  arabicName: varchar("arabicName", { length: 255 }).notNull(),
  englishName: varchar("englishName", { length: 255 }).notNull(),
  displayOrder: integer("displayOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuestionCategory = typeof questionCategories.$inferSelect;
export type InsertQuestionCategory = typeof questionCategories.$inferInsert;

// Chapter <-> Question Category links ("related interview questions" on a chapter page)
export const chapterQuestionCategories = pgTable("chapterQuestionCategories", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapterId").notNull().references(() => chapters.id, { onDelete: "cascade" }),
  categoryId: integer("categoryId").notNull().references(() => questionCategories.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChapterQuestionCategory = typeof chapterQuestionCategories.$inferSelect;

// Individual interview questions — 222 total, each with the fixed 6-part structure
export const interviewQuestions = pgTable("interviewQuestions", {
  id: serial("id").primaryKey(),
  categoryId: integer("categoryId").notNull().references(() => questionCategories.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  whyAsked: text("whyAsked"),
  interviewerMindset: text("interviewerMindset"),
  modelAnswer: text("modelAnswer"),
  commonMistakes: text("commonMistakes"),
  followUpQuestion: text("followUpQuestion"),
  followUpAnswer: text("followUpAnswer"),
  englishQuestion: text("englishQuestion"),
  englishWhyAsked: text("englishWhyAsked"),
  englishInterviewerMindset: text("englishInterviewerMindset"),
  englishModelAnswer: text("englishModelAnswer"),
  englishCommonMistakes: text("englishCommonMistakes"),
  englishFollowUpQuestion: text("englishFollowUpQuestion"),
  englishFollowUpAnswer: text("englishFollowUpAnswer"),
  displayOrder: integer("displayOrder").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type InterviewQuestion = typeof interviewQuestions.$inferSelect;
export type InsertInterviewQuestion = typeof interviewQuestions.$inferInsert;

// Profile table for Mohamed Magdy's information
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  location: varchar("location", { length: 255 }),
  linkedIn: varchar("linkedIn", { length: 500 }),
  gitHub: varchar("gitHub", { length: 500 }),
  bio: text("bio"),
  photoUrl: text("photoUrl"),
  summary: text("summary"),
  skills: text("skills"),
  certifications: text("certifications"),
  experience: text("experience"),
  education: text("education"),
  languages: text("languages"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = typeof profile.$inferInsert;

// Settings table for consultation and contact info
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  siteName: varchar("siteName", { length: 100 }).default("M2AY"),
  footerText: varchar("footerText", { length: 255 }),
  consultationPrice: decimal("consultationPrice", { precision: 10, scale: 2 }),
  consultationCurrency: varchar("consultationCurrency", { length: 10 }).default("USD"),
  whatsappNumber: varchar("whatsappNumber", { length: 20 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  linkedInUrl: varchar("linkedInUrl", { length: 500 }),
  consultationDescription: text("consultationDescription"),
  showConsultationSection: boolean("showConsultationSection").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Settings = typeof settings.$inferSelect;
export type InsertSettings = typeof settings.$inferInsert;

// Consultation requests submitted from the site's booking form
export const consultationRequests = pgTable("consultationRequests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).default("new").notNull(),
  adminNotes: text("adminNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type InsertConsultationRequest = typeof consultationRequests.$inferInsert;

// Mini version history — keeps only the last 5 snapshots per chapter (trimmed on write)
export const chapterVersions = pgTable("chapterVersions", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapterId").notNull().references(() => chapters.id, { onDelete: "cascade" }),
  snapshot: text("snapshot").notNull(), // JSON string of the chapter's editable fields at that point in time
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChapterVersion = typeof chapterVersions.$inferSelect;
export type InsertChapterVersion = typeof chapterVersions.$inferInsert;

// Simple activity log — records what changed and when, across the admin panel
export const activityLog = pgTable("activityLog", {
  id: serial("id").primaryKey(),
  action: varchar("action", { length: 50 }).notNull(),
  entityType: varchar("entityType", { length: 50 }).notNull(),
  entityName: varchar("entityName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityLogEntry = typeof activityLog.$inferSelect;
