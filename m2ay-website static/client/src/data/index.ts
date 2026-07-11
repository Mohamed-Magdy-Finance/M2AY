import siteConfig from './site-config.json';
import chapters from './chapters.json';
import templates from './templates.json';
import questionBank from './question-bank.json';

export { siteConfig, chapters, templates, questionBank };

export type Chapter = typeof chapters[0];
export type Template = typeof templates[0];
export type QuestionCategory = typeof questionBank.categories[0];
export type Question = typeof questionBank.questions[0];
