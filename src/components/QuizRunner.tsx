import { useReducer } from 'react';
import { calcResult, getWrongQuestions } from '../logic/quiz';
import { initialQuizState, quizReducer } from '../state/quizReducer';
import type { CategoryFilter, Question } from '../types';
import QuestionScreen from './QuestionScreen';
import ResultScreen from './ResultScreen';
import StartScreen from './StartScreen';

type QuizRunnerProps = {
  questions: Question[];
};

export default function QuizRunner({ questions }: QuizRunnerProps) {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  if (state.status === 'idle') {
    return (
      <StartScreen
        questions={questions}
        onStart={(category: CategoryFilter, shuffle: boolean) =>
          dispatch({ type: 'START', payload: { questions, category, shuffle } })
        }
      />
    );
  }

  if (state.status === 'finished') {
    const durationMs = (state.finishedAt ?? Date.now()) - (state.startedAt ?? Date.now());
    const result = calcResult(state.answers, durationMs);
    const wrongQuestions = getWrongQuestions(state.order, state.answers);
    return (
      <ResultScreen
        result={result}
        wrongQuestions={wrongQuestions}
        onRestart={() => dispatch({ type: 'RESTART' })}
      />
    );
  }

  const currentQuestion = state.order[state.currentIndex];
  const currentAnswer = state.answers[state.currentIndex] ?? null;

  return (
    <QuestionScreen
      question={currentQuestion}
      questionNumber={state.currentIndex + 1}
      totalCount={state.order.length}
      status={state.status}
      selectedChoiceId={currentAnswer?.selectedChoiceId ?? null}
      onSelect={(choiceId) => dispatch({ type: 'SELECT', payload: { choiceId } })}
      onTimeout={() => dispatch({ type: 'TIMEOUT' })}
      onNext={() => dispatch({ type: 'NEXT' })}
    />
  );
}
