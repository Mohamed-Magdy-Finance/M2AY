import questions from "./questions.json";

export { questions };
export type Question = (typeof questions)[number];

export function getQuestionsByCategory(categoryId: number): Question[] {
  return questions.filter(q => q.categoryId === categoryId);
}
