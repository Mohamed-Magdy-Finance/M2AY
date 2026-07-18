import chapterTemplateLinks from "./chapter-template-links.json";
import chapterQuestionLinks from "./chapter-question-links.json";
import { chapters, type Chapter } from "./chapters";
import { templates, type Template } from "./templates";
import { questionCategories, type QuestionCategory } from "./question-categories";

/** Templates linked to a given chapter (content relationship engine, statically curated). */
export function getTemplatesForChapter(chapterId: number): Template[] {
  const link = chapterTemplateLinks.find(l => l.chapterId === chapterId);
  if (!link) return [];
  return templates.filter(t => link.templateIds.includes(t.id));
}

/** Chapters linked to a given template (reverse of the above). */
export function getChaptersForTemplate(templateId: number): Chapter[] {
  const chapterIds = chapterTemplateLinks
    .filter(l => l.templateIds.includes(templateId))
    .map(l => l.chapterId);
  return chapters.filter(c => chapterIds.includes(c.id));
}

/** Question categories linked to a given chapter — categories only (names/counts), never the full question payload. */
export function getQuestionCategoriesForChapter(chapterId: number): QuestionCategory[] {
  const link = chapterQuestionLinks.find(l => l.chapterId === chapterId);
  if (!link) return [];
  return questionCategories.filter(c => link.categoryIds.includes(c.id));
}
