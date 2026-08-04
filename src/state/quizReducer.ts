import { buildOrder, judgeAnswer } from '../logic/quiz';
import type { Answer, QuizAction, QuizState } from '../types';

export const initialQuizState: QuizState = {
  status: 'idle',
  order: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  startedAt: null,
  finishedAt: null,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START': {
      const { questions, category, shuffle } = action.payload;
      const order = buildOrder(questions, category, shuffle);
      return {
        ...initialQuizState,
        status: 'playing',
        order,
        startedAt: Date.now(),
      };
    }

    case 'SELECT': {
      // T-4: playing 以外（回答済み）は二重回答を防ぐため無視する
      if (state.status !== 'playing') return state;

      const currentQuestion = state.order[state.currentIndex];
      const correct = judgeAnswer(currentQuestion, action.payload.choiceId);
      const answer: Answer = {
        questionId: currentQuestion.id,
        selectedChoiceId: action.payload.choiceId,
        correct,
      };

      return {
        ...state,
        status: 'answered',
        score: correct ? state.score + 1 : state.score,
        answers: [...state.answers, answer],
      };
    }

    case 'TIMEOUT': {
      if (state.status !== 'playing') return state;

      const currentQuestion = state.order[state.currentIndex];
      const answer: Answer = {
        questionId: currentQuestion.id,
        selectedChoiceId: null,
        correct: false,
      };

      return {
        ...state,
        status: 'answered',
        answers: [...state.answers, answer],
      };
    }

    case 'NEXT': {
      if (state.status !== 'answered') return state;

      const isLastQuestion = state.currentIndex + 1 >= state.order.length;
      if (isLastQuestion) {
        return { ...state, status: 'finished', finishedAt: Date.now() };
      }

      return { ...state, status: 'playing', currentIndex: state.currentIndex + 1 };
    }

    case 'RESTART':
      return initialQuizState;

    default:
      return state;
  }
}
