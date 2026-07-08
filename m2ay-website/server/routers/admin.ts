import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import * as db from "../db";

export const adminRouter = router({
  profile: router({
    get: adminProcedure.query(async () => await db.getProfile()),
    update: adminProcedure
      .input(
        z.object({
          fullName: z.string().optional(),
          title: z.string().optional(),
          email: z.string().email().optional(),
          phone: z.string().optional(),
          location: z.string().optional(),
          linkedIn: z.string().optional(),
          gitHub: z.string().optional(),
          bio: z.string().optional(),
          photoUrl: z.string().optional(),
          summary: z.string().optional(),
          skills: z.array(z.string()).optional(),
          certifications: z.array(z.string()).optional(),
          experience: z.any().optional(),
          education: z.any().optional(),
          languages: z.any().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const data: Record<string, unknown> = { ...input };
        if (input.skills) data.skills = JSON.stringify(input.skills);
        if (input.certifications) data.certifications = JSON.stringify(input.certifications);
        if (input.experience) data.experience = JSON.stringify(input.experience);
        if (input.education) data.education = JSON.stringify(input.education);
        if (input.languages) data.languages = JSON.stringify(input.languages);
        await db.updateProfile(data);
        return { success: true };
      }),
  }),

  settings: router({
    get: adminProcedure.query(async () => await db.getSettings()),
    update: adminProcedure
      .input(
        z.object({
          siteName: z.string().optional(),
          footerText: z.string().optional(),
          consultationPrice: z.number().optional(),
          consultationCurrency: z.string().optional(),
          whatsappNumber: z.string().optional(),
          contactEmail: z.string().email().optional(),
          linkedInUrl: z.string().optional(),
          consultationDescription: z.string().optional(),
          showConsultationSection: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const data: Record<string, unknown> = { ...input };
        if (input.consultationPrice !== undefined) data.consultationPrice = String(input.consultationPrice);
        await db.updateSettings(data);
        return { success: true };
      }),
  }),

  chapters: router({
    list: adminProcedure.query(async () => await db.getAllChapters()),
    create: adminProcedure
      .input(z.object({
        chapterNumber: z.number(),
        section: z.string(),
        arabicTitle: z.string(),
        englishTitle: z.string(),
        description: z.string().optional(),
        arabicContent: z.string().optional(),
        englishContent: z.string().optional(),
        summary: z.string().optional(),
        practicalOutput: z.string().optional(),
        portfolioTask: z.string().optional(),
        selfAssessment: z.string().optional(),
        reflectionQuestion: z.string().optional(),
        nextStep: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        slug: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        seoKeywords: z.string().optional(),
        ogImage: z.string().optional(),
        displayOrder: z.number(),
      }))
      .mutation(async ({ input }) => await db.createChapter(input)),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        chapterNumber: z.number().optional(),
        section: z.string().optional(),
        arabicTitle: z.string().optional(),
        englishTitle: z.string().optional(),
        description: z.string().optional(),
        arabicContent: z.string().optional(),
        englishContent: z.string().optional(),
        summary: z.string().optional(),
        practicalOutput: z.string().optional(),
        portfolioTask: z.string().optional(),
        selfAssessment: z.string().optional(),
        reflectionQuestion: z.string().optional(),
        nextStep: z.string().optional(),
        status: z.enum(["draft", "published"]).optional(),
        slug: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        seoKeywords: z.string().optional(),
        ogImage: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateChapter(id, data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteChapter(input.id);
      return { success: true };
    }),
    relations: adminProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const linkedTemplates = await db.getTemplatesForChapter(input.id);
      const linkedCategories = await db.getQuestionCategoriesForChapter(input.id);
      return { linkedTemplates, linkedCategories };
    }),
  }),

  templates: router({
    list: adminProcedure.query(async () => await db.getAllTemplates(false)),
    create: adminProcedure
      .input(z.object({
        arabicName: z.string(),
        englishName: z.string(),
        shortDescription: z.string().optional(),
        detailedExplanation: z.string().optional(),
        category: z.string(),
        difficultyLevel: z.string().optional(),
        githubRepoUrl: z.string().optional(),
        githubFolderPath: z.string().optional(),
        mainFileName: z.string().optional(),
        previewImageUrl: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        isActive: z.boolean().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => await db.createTemplate(input)),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        arabicName: z.string().optional(),
        englishName: z.string().optional(),
        shortDescription: z.string().optional(),
        detailedExplanation: z.string().optional(),
        category: z.string().optional(),
        difficultyLevel: z.string().optional(),
        githubRepoUrl: z.string().optional(),
        githubFolderPath: z.string().optional(),
        mainFileName: z.string().optional(),
        previewImageUrl: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
        isActive: z.boolean().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateTemplate(id, data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteTemplate(input.id);
      return { success: true };
    }),
  }),

  chapterTemplateLinks: router({
    link: adminProcedure
      .input(z.object({ chapterId: z.number(), templateId: z.number() }))
      .mutation(async ({ input }) => {
        await db.linkChapterTemplate(input.chapterId, input.templateId);
        return { success: true };
      }),
    unlink: adminProcedure
      .input(z.object({ chapterId: z.number(), templateId: z.number() }))
      .mutation(async ({ input }) => {
        await db.unlinkChapterTemplate(input.chapterId, input.templateId);
        return { success: true };
      }),
  }),

  chapterQuestionCategoryLinks: router({
    link: adminProcedure
      .input(z.object({ chapterId: z.number(), categoryId: z.number() }))
      .mutation(async ({ input }) => {
        await db.linkChapterQuestionCategory(input.chapterId, input.categoryId);
        return { success: true };
      }),
    unlink: adminProcedure
      .input(z.object({ chapterId: z.number(), categoryId: z.number() }))
      .mutation(async ({ input }) => {
        await db.unlinkChapterQuestionCategory(input.chapterId, input.categoryId);
        return { success: true };
      }),
  }),

  questionBank: router({
    categories: adminProcedure.query(async () => await db.getAllQuestionCategories()),
    questionsByCategory: adminProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => await db.getQuestionsByCategory(input.categoryId)),
    createQuestion: adminProcedure
      .input(z.object({
        categoryId: z.number(),
        question: z.string(),
        whyAsked: z.string().optional(),
        interviewerMindset: z.string().optional(),
        modelAnswer: z.string().optional(),
        commonMistakes: z.string().optional(),
        followUpQuestion: z.string().optional(),
        followUpAnswer: z.string().optional(),
        englishQuestion: z.string().optional(),
        englishWhyAsked: z.string().optional(),
        englishInterviewerMindset: z.string().optional(),
        englishModelAnswer: z.string().optional(),
        englishCommonMistakes: z.string().optional(),
        englishFollowUpQuestion: z.string().optional(),
        englishFollowUpAnswer: z.string().optional(),
        displayOrder: z.number(),
      }))
      .mutation(async ({ input }) => await db.createInterviewQuestion(input)),
    updateQuestion: adminProcedure
      .input(z.object({
        id: z.number(),
        question: z.string().optional(),
        whyAsked: z.string().optional(),
        interviewerMindset: z.string().optional(),
        modelAnswer: z.string().optional(),
        commonMistakes: z.string().optional(),
        followUpQuestion: z.string().optional(),
        followUpAnswer: z.string().optional(),
        englishQuestion: z.string().optional(),
        englishWhyAsked: z.string().optional(),
        englishInterviewerMindset: z.string().optional(),
        englishModelAnswer: z.string().optional(),
        englishCommonMistakes: z.string().optional(),
        englishFollowUpQuestion: z.string().optional(),
        englishFollowUpAnswer: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateInterviewQuestion(id, data);
      }),
    deleteQuestion: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteInterviewQuestion(input.id);
      return { success: true };
    }),
  }),

  consultationRequests: router({
    list: adminProcedure.query(async () => await db.getAllConsultationRequests()),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "in_review", "contacted", "booked", "completed", "cancelled"]).optional(),
        adminNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return await db.updateConsultationRequest(id, data);
      }),
  }),
});
