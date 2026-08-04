import { useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { shuffleArray } from '../logic/quiz';
import type { Question, QuizStatus } from '../types';
import Timer from './Timer';

type QuestionScreenProps = {
  question: Question;
  questionNumber: number;
  totalCount: number;
  status: Extract<QuizStatus, 'playing' | 'answered'>;
  selectedChoiceId: string | null;
  onSelect: (choiceId: string) => void;
  onTimeout: () => void;
  onNext: () => void;
};

export default function QuestionScreen({
  question,
  questionNumber,
  totalCount,
  status,
  selectedChoiceId,
  onSelect,
  onTimeout,
  onNext,
}: QuestionScreenProps) {
  // 判断ログ #3: 選択肢は毎回ランダムな並びで表示する
  const displayChoices = useMemo(() => shuffleArray(question.choices), [question.choices]);
  const isAnswered = status === 'answered';

  return (
    <Stack spacing={3}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip label={question.category} size="small" color="primary" variant="outlined" />
          <Typography variant="body2" color="text.secondary">
            {questionNumber} / {totalCount} 問
          </Typography>
        </Stack>
        {/* T-2: 回答後はタイマーの更新を止めるため isRunning を playing のときだけ true にする */}
        <Timer
          timeLimit={question.timeLimitSec}
          isRunning={status === 'playing'}
          onTimeout={onTimeout}
        />
      </Box>

      <Typography variant="h6">{question.text}</Typography>

      <List sx={{ p: 0 }}>
        {displayChoices.map((choice) => {
          const isCorrectChoice = choice.id === question.correctChoiceId;
          const isSelected = choice.id === selectedChoiceId;

          let borderColor: string | undefined;
          if (isAnswered && isCorrectChoice) borderColor = 'success.main';
          else if (isAnswered && isSelected) borderColor = 'error.main';

          return (
            <ListItemButton
              key={choice.id}
              onClick={() => onSelect(choice.id)}
              disabled={isAnswered}
              sx={{
                mb: 1,
                border: '1px solid',
                borderColor: borderColor ?? 'divider',
                borderRadius: 2,
              }}
            >
              <ListItemText primary={choice.label} />
              {isAnswered && isCorrectChoice && <CheckCircleIcon color="success" />}
              {isAnswered && isSelected && !isCorrectChoice && <CancelIcon color="error" />}
            </ListItemButton>
          );
        })}
      </List>

      {isAnswered && (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            {selectedChoiceId === null
              ? '時間切れ（不正解）'
              : selectedChoiceId === question.correctChoiceId
                ? '正解！'
                : '不正解'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {question.explanation}
          </Typography>
        </Paper>
      )}

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={onNext} disabled={!isAnswered}>
          次の問題へ
        </Button>
      </Box>
    </Stack>
  );
}
