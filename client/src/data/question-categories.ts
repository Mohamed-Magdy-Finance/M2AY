import questionCategories from "./question-categories.json";

export { questionCategories };
export type QuestionCategory = (typeof questionCategories)[number];
