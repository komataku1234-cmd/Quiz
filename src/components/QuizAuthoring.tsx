import { Divider, Stack, Typography } from '@mui/material';
import type { Question } from '../types';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

type QuizAuthoringProps = {
  questions: Question[];
  onAdd: (question: Question) => void;
};

export default function QuizAuthoring({ questions, onAdd }: QuizAuthoringProps) {
  return (
    <Stack spacing={3}>
      <QuestionForm onAdd={onAdd} />

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">登録済み問題一覧（{questions.length}問）</Typography>
        <QuestionList questions={questions} />
      </Stack>
    </Stack>
  );
}
