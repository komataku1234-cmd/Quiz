import { useState } from 'react';
import { Container } from '@mui/material';
import { initialQuestions } from './data/initialQuestions';
import type { Question } from './types';
import Panel, { type AppMode } from './components/Panel';
import QuizAuthoring from './components/QuizAuthoring';
import QuizRunner from './components/QuizRunner';

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [mode, setMode] = useState<AppMode>('play');

  const handleAdd = (question: Question) => {
    setQuestions((prev) => [...prev, question]);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Panel mode={mode} onModeChange={setMode}>
        {mode === 'author' ? (
          <QuizAuthoring questions={questions} onAdd={handleAdd} />
        ) : (
          <QuizRunner questions={questions} />
        )}
      </Panel>
    </Container>
  );
}
