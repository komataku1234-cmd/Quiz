import * as yup from 'yup';
import type { Category } from '../types';

export const CATEGORY_OPTIONS: Category[] = ['JavaScript', 'TypeScript', 'React'];

export const questionFormSchema = yup.object({
  text: yup
    .string()
    .transform((value: string | undefined) => value?.trim())
    .required('問題文は5文字以上で入力してください。')
    .min(5, '問題文は5文字以上で入力してください。')
    .max(200, '問題文は5文字以上で入力してください。'),
  choices: yup
    .array()
    .of(
      yup
        .string()
        .transform((value: string | undefined) => value?.trim())
        .required('選択肢を入力してください。')
        .max(60, '選択肢は60文字以内で入力してください。')
    )
    .length(4)
    .required()
    // 独自ルール：4つの選択肢に重複があってはならない
    .test('unique-choices', '選択肢が重複しています。', (value) => {
      if (!value) return true;
      const filled = value.filter((label): label is string => !!label);
      return new Set(filled).size === filled.length;
    }),
  correctIndex: yup
    .number()
    .required('正解を選択してください。')
    .oneOf([0, 1, 2, 3], '正解を選択してください。'),
  explanation: yup
    .string()
    .transform((value: string | undefined) => value?.trim())
    .required('解説は10文字以上で入力してください。')
    .min(10, '解説は10文字以上で入力してください。'),
  timeLimitSec: yup
    .number()
    .typeError('制限時間は5〜120秒で入力してください。')
    .integer('制限時間は5〜120秒で入力してください。')
    .min(5, '制限時間は5〜120秒で入力してください。')
    .max(120, '制限時間は5〜120秒で入力してください。')
    .required('制限時間は5〜120秒で入力してください。'),
  category: yup
    .mixed<Category>()
    .oneOf(CATEGORY_OPTIONS, 'カテゴリを正しく選択してください。')
    .required('カテゴリを正しく選択してください。'),
});

export type QuestionFormValues = yup.InferType<typeof questionFormSchema>;
