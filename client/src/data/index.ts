import siteConfig from "./site-config.json";
import chapters from "./chapters.json";
import templates from "./templates.json";
import questionBankRaw from "./question-bank.json";
import chapterTemplateLinks from "./chapter-template-links.json";
import chapterQuestionLinks from "./chapter-question-links.json";

export { siteConfig, chapters, templates };
export const questionBank = questionBankRaw;

export type Chapter = (typeof chapters)[number];
export type Template = (typeof templates)[number];
export type QuestionCategory = (typeof questionBankRaw.categories)[number];
export type Question = (typeof questionBankRaw.questions)[number];

/** Templates linked to a given chapter (content relationship engine, statically curated). */
export function getTemplatesForChapter(chapterId: number): Template[] {
  const link = chapterTemplateLinks.find(l => l.chapterId === chapterId);
  if (!link) return [];
  return templates.filter(t => link.templateIds.includes(t.id));
}

/** Question categories linked to a given chapter. */
export function getQuestionCategoriesForChapter(chapterId: number): QuestionCategory[] {
  const link = chapterQuestionLinks.find(l => l.chapterId === chapterId);
  if (!link) return [];
  return questionBankRaw.categories.filter(c => link.categoryIds.includes(c.id));
}

/** Chapters linked to a given template (reverse of the above). */
export function getChaptersForTemplate(templateId: number): Chapter[] {
  const chapterIds = chapterTemplateLinks
    .filter(l => l.templateIds.includes(templateId))
    .map(l => l.chapterId);
  return chapters.filter(c => chapterIds.includes(c.id));
}

/** Previous/next chapter by chapterNumber order. */
export function getAdjacentChapters(chapterNumber: number) {
  const sorted = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
  const idx = sorted.findIndex(c => c.chapterNumber === chapterNumber);
  return {
    previous: idx > 0 ? sorted[idx - 1] : null,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

export function getQuestionsByCategory(categoryId: number): Question[] {
  return questionBankRaw.questions.filter(q => q.categoryId === categoryId);
}
