import { List, Typography } from '@mui/material';
import type { Question } from '../types';
import QuestionItem from './QuestionItem';

type QuestionListProps = {
  questions: Question[];
};

export default function QuestionList({ questions }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        登録済みの問題はまだありません。
      </Typography>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </List>
  );
}
