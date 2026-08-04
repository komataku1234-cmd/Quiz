import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { CategoryFilter, OrderMode, Question } from '../types';

type StartScreenProps = {
  questions: Question[];
  onStart: (category: CategoryFilter, shuffle: boolean) => void;
};

const CATEGORY_FILTER_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'React', label: 'React' },
];

export default function StartScreen({ questions, onStart }: StartScreenProps) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [orderMode, setOrderMode] = useState<OrderMode>('sequential');

  const targetCount = useMemo(
    () => (category === 'all' ? questions.length : questions.filter((q) => q.category === category).length),
    [questions, category]
  );

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight="bold">
        クイズ設定
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="category-select-label">出題カテゴリ</InputLabel>
        <Select
          labelId="category-select-label"
          label="出題カテゴリ"
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryFilter)}
        >
          {CATEGORY_FILTER_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          出題順
        </Typography>
        <RadioGroup
          row
          value={orderMode}
          onChange={(e) => setOrderMode(e.target.value as OrderMode)}
        >
          <FormControlLabel value="sequential" control={<Radio />} label="登録順" />
          <FormControlLabel value="shuffle" control={<Radio />} label="シャッフル" />
        </RadioGroup>
      </FormControl>

      <Typography variant="body2" color="text.secondary">
        出題数：{targetCount}問
      </Typography>

      {targetCount === 0 && (
        <Alert severity="warning">
          このカテゴリの問題がまだありません。作問モードで問題を追加するか、別のカテゴリを選んでください。
        </Alert>
      )}

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrowIcon />}
          disabled={targetCount === 0}
          onClick={() => onStart(category, orderMode === 'shuffle')}
        >
          クイズ開始
        </Button>
      </Box>
    </Stack>
  );
}
