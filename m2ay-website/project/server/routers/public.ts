import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const publicRouter = router({
  chapters: router({
    list: publicProcedure.query(async () => {
      const chapters = await db.getAllChapters(true);
      return await Promise.all(
        chapters.map(async c => ({
          ...c,
          relatedTemplatesCount: (await db.getTemplatesForChapter(c.id)).length,
        }))
      );
    }),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const chapter = await db.getChapterById(input.id);
      if (!chapter || chapter.status !== "published") return null;
      const relatedTemplates = await db.getTemplatesForChapter(input.id);
      const relatedQuestionCategories = await db.getQuestionCategoriesForChapter(input.id);
      const { previous, next } = await db.getAdjacentChapters(chapter.chapterNumber, true);
      return { ...chapter, relatedTemplates, relatedQuestionCategories, previousChapter: previous, nextChapter: next };
    }),
  }),

  templates: router({
    list: publicProcedure.query(async () => {
      return await db.getAllTemplates(true);
    }),
    byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const template = await db.getTemplateById(input.id);
      if (!template) return null;
      const relatedChapters = await db.getChaptersForTemplate(input.id);
      return { ...template, relatedChapters };
    }),
    incrementDownload: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.incrementTemplateDownload(input.id);
      return { success: true };
    }),
  }),

  questionBank: router({
    categories: publicProcedure.query(async () => {
      const categories = await db.getAllQuestionCategories();
      const withCounts = await Promise.all(
        categories.map(async c => ({
          ...c,
          questionCount: (await db.getQuestionsByCategory(c.id)).length,
        }))
      );
      return withCounts;
    }),
    questionsByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getQuestionsByCategory(input.categoryId);
      }),
  }),

  profile: publicProcedure.query(async () => {
    return await db.getProfile();
  }),

  settings: publicProcedure.query(async () => {
    return await db.getSettings();
  }),

  consultation: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          whatsapp: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const request = await db.createConsultationRequest(input);
        return { success: true, id: request?.id };
      }),
  }),
});
