import type { Answer, CategoryFilter, Question } from '../types';

export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function shuffleQuestions(questions: Question[]): Question[] {
  return shuffleArray(questions);
}

export function buildOrder(questions: Question[], category: CategoryFilter, shuffle: boolean): Question[] {
  const filtered = category === 'all' ? questions : questions.filter((q) => q.category === category);
  return shuffle ? shuffleQuestions(filtered) : filtered;
}

export function judgeAnswer(question: Question, choiceId: string): boolean {
  return question.correctChoiceId === choiceId;
}

export type QuizResult = {
  correctCount: number;
  totalCount: number;
  accuracyPercent: number;
  durationMs: number;
};

export function calcResult(answers: Answer[], durationMs: number): QuizResult {
  const totalCount = answers.length;
  const correctCount = answers.filter((answer) => answer.correct).length;
  const accuracyPercent = totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);
  return { correctCount, totalCount, accuracyPercent, durationMs };
}

export function getWrongQuestions(questions: Question[], answers: Answer[]): Question[] {
  const wrongQuestionIds = new Set(answers.filter((answer) => !answer.correct).map((answer) => answer.questionId));
  return questions.filter((question) => wrongQuestionIds.has(question.id));
}
