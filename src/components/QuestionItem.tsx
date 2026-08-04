import { Chip, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import type { Question } from '../types';

type QuestionItemProps = {
  question: Question;
};

export default function QuestionItem({ question }: QuestionItemProps) {
  return (
    <ListItem sx={{ display: 'block', border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
        <Chip label={question.category} size="small" color="primary" variant="outlined" />
        <Typography variant="caption" color="text.secondary">
          制限時間 {question.timeLimitSec}秒
        </Typography>
      </Stack>
      <ListItemText
        primary={question.text}
        secondary={`選択肢：${question.choices.map((choice) => choice.label).join(' / ')}`}
      />
    </ListItem>
  );
}
