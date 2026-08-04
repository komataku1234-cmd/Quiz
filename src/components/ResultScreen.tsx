import { Box, Button, Chip, Divider, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import type { QuizResult } from '../logic/quiz';
import type { Question } from '../types';

type ResultScreenProps = {
  result: QuizResult;
  wrongQuestions: Question[];
  onRestart: () => void;
};

function formatDuration(durationMs: number): string {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}分${seconds.toString().padStart(2, '0')}秒`;
}

export default function ResultScreen({ result, wrongQuestions, onRestart }: ResultScreenProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight="bold">
        結果
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 140, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            正答数
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {result.correctCount} / {result.totalCount}
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 140, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            正答率
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {result.accuracyPercent}%
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, flex: 1, minWidth: 140, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            所要時間
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatDuration(result.durationMs)}
          </Typography>
        </Paper>
      </Stack>

      <Divider />

      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          復習リスト（間違えた問題）
        </Typography>
        {wrongQuestions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            すべての問題に正解しました！
          </Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {wrongQuestions.map((question) => (
              <ListItem
                key={question.id}
                sx={{ display: 'block', border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 1 }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                  <Chip label={question.category} size="small" />
                </Stack>
                <ListItemText
                  primary={question.text}
                  secondary={`解説：${question.explanation}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<ReplayIcon />} onClick={onRestart}>
          もう一度
        </Button>
      </Box>
    </Stack>
  );
}
