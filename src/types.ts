export type Category = 'JavaScript' | 'TypeScript' | 'React';

export type CategoryFilter = Category | 'all';

export type OrderMode = 'sequential' | 'shuffle';

export type Choice = {
  id: string; // 選択肢id（crypto.randomUUID()）
  label: string; // 選択肢の文言
};

export type Question = {
  id: string; // 問題id（crypto.randomUUID()）
  text: string; // 問題文
  choices: Choice[]; // 選択肢（4個）
  correctChoiceId: string; // 正解の選択肢id
  explanation: string; // 解説
  timeLimitSec: number; // 制限時間（秒）
  category: Category; // カテゴリ
};

export type QuizStatus = 'idle' | 'playing' | 'answered' | 'finished';

export type Answer = {
  questionId: string;
  selectedChoiceId: string | null;
  correct: boolean;
};

export type QuizState = {
  status: QuizStatus;
  order: Question[];
  currentIndex: number;
  score: number;
  answers: Answer[];
  // 結果画面の所要時間表示のために開始・終了時刻を保持する
  startedAt: number | null;
  finishedAt: number | null;
};

export type QuizAction =
  | { type: 'START'; payload: { questions: Question[]; category: CategoryFilter; shuffle: boolean } }
  | { type: 'SELECT'; payload: { choiceId: string } }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT' }
  | { type: 'RESTART' };
