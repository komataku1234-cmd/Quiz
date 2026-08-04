import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CATEGORY_OPTIONS, questionFormSchema, type QuestionFormValues } from '../validation/questionSchema';
import type { Question } from '../types';

type QuestionFormProps = {
  onAdd: (question: Question) => void;
};

const CHOICE_INDEXES = [0, 1, 2, 3] as const;

const defaultValues: QuestionFormValues = {
  text: '',
  choices: ['', '', '', ''],
  correctIndex: 0,
  explanation: '',
  timeLimitSec: 30,
  category: 'JavaScript',
};

export default function QuestionForm({ onAdd }: QuestionFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<QuestionFormValues>({
    resolver: yupResolver(questionFormSchema),
    defaultValues,
  });

  const onSubmit = (values: QuestionFormValues) => {
    const choices = values.choices.map((label) => ({ id: crypto.randomUUID(), label }));
    const question: Question = {
      id: crypto.randomUUID(),
      text: values.text,
      choices,
      correctChoiceId: choices[values.correctIndex].id,
      explanation: values.explanation,
      timeLimitSec: values.timeLimitSec,
      category: values.category,
    };
    onAdd(question);
    reset(defaultValues);
  };

  const choicesRootError = errors.choices?.message;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2.5}>
        <Typography variant="h6">問題を作成</Typography>

        {isSubmitSuccessful && <Alert severity="success">問題を登録しました。</Alert>}

        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="問題文"
              multiline
              minRows={2}
              fullWidth
              error={!!errors.text}
              helperText={errors.text?.message}
            />
          )}
        />

        <FormControl error={!!choicesRootError} component="fieldset" fullWidth>
          <FormLabel component="legend">選択肢（左のラジオボタンで正解を選択）</FormLabel>
          <Controller
            name="correctIndex"
            control={control}
            render={({ field: correctField }) => (
              <RadioGroup
                value={String(correctField.value)}
                onChange={(e) => correctField.onChange(Number(e.target.value))}
              >
                <Stack spacing={1.5} mt={1}>
                  {CHOICE_INDEXES.map((index) => (
                    <Controller
                      key={index}
                      name={`choices.${index}`}
                      control={control}
                      render={({ field: choiceField, fieldState }) => (
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                          <Radio value={String(index)} sx={{ mt: 0.5 }} />
                          <TextField
                            {...choiceField}
                            label={`選択肢${index + 1}`}
                            fullWidth
                            size="small"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        </Stack>
                      )}
                    />
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
          <FormHelperText>{choicesRootError ?? errors.correctIndex?.message}</FormHelperText>
        </FormControl>

        <Controller
          name="explanation"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="解説"
              multiline
              minRows={2}
              fullWidth
              error={!!errors.explanation}
              helperText={errors.explanation?.message}
            />
          )}
        />

        <Stack direction="row" spacing={2}>
          <Controller
            name="timeLimitSec"
            control={control}
            render={({ field }) => (
              <TextField
                name={field.name}
                inputRef={field.ref}
                label="制限時間（秒）"
                type="number"
                fullWidth
                value={field.value}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                error={!!errors.timeLimitSec}
                helperText={errors.timeLimitSec?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-form-label">カテゴリ</InputLabel>
                <Select {...field} labelId="category-form-label" label="カテゴリ">
                  {CATEGORY_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category?.message && <FormHelperText>{errors.category.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Stack>

        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" startIcon={<AddCircleIcon />}>
            問題を追加
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
