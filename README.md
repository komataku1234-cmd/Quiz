# QuizArena

研修（HTML/CSS/JS/TS/React）で学んだ内容をチームで問題化し、出題・採点まで行える4択クイズアプリです。作問モードで問題を登録し、プレイモードでカテゴリと出題順を選んでクイズに挑戦できます。

詳細な要件・設計は [`src/docs/要件定義書.md`](./src/docs/要件定義書.md) と [`src/docs/設計書.md`](./src/docs/設計書.md) を参照してください。

## 主な機能

- **作問モード**：バリデーション付きフォームで問題（問題文・選択肢4つ・正解・解説・制限時間・カテゴリ）を登録し、登録済み一覧をその場で確認できる
- **プレイモード**：出題カテゴリ（すべて／JavaScript／TypeScript／React）と出題順（登録順／シャッフル）を選んでクイズを開始できる
- **制限時間タイマー**：出題中はカウントダウン表示し、0秒で自動的に不正解として次へ進む
- **回答・判定**：選択肢クリックで即判定、正誤と解説を表示し、正解ならスコア加算
- **結果・復習**：正答数・正答率・所要時間を表示し、間違えた問題だけを復習リストとして表示。「もう一度」で最初からやり直せる

※ 登録済み問題の編集・削除、ログイン機能、サーバー永続化（リロードで初期状態に戻る）、複数端末間の同時プレイは対象外です。

## 技術スタック

React 19 / TypeScript / Vite / MUI / Emotion / React Hook Form + Yup（フォーム・バリデーション） / useReducer（クイズ進行の状態管理） / Storybook / Vitest / oxlint

## セットアップ

```bash
git clone git@github.com:komataku1234-cmd/Quiz.git
cd Quiz
pnpm install
pnpm dev
```

## よく使うコマンド

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm build` | 本番ビルド（型チェック含む） |
| `pnpm lint` | Lintチェック（oxlint） |
| `pnpm preview` | ビルド結果をローカルでプレビュー |
| `pnpm storybook` | Storybookを起動 |
| `pnpm build-storybook` | Storybookをビルド |

## ディレクトリ構成

```text
src/
├── App.tsx                    … 作問モード／プレイモードの切り替えと問題データ管理
├── types.ts                   … Question・QuizState などの型定義
├── theme.ts                   … MUI テーマ設定
├── data/initialQuestions.ts   … 初期問題データ（JS/TS/React 各3問）
├── logic/quiz.ts              … 出題順生成・正誤判定・集計などの純粋関数
├── state/quizReducer.ts       … クイズ進行の状態機械（useReducer）
├── validation/questionSchema.ts … 作問フォームの Yup バリデーションスキーマ
├── components/
│   ├── Panel.tsx              … モード切り替えの共通レイアウト
│   ├── QuizAuthoring.tsx      … 作問モードのまとめ（フォーム＋一覧）
│   ├── QuestionForm.tsx       … 問題登録フォーム
│   ├── QuestionList.tsx / QuestionItem.tsx … 登録済み問題一覧
│   ├── QuizRunner.tsx         … クイズ進行の管理（開始・回答・終了）
│   ├── StartScreen.tsx        … 出題設定画面
│   ├── QuestionScreen.tsx     … 出題・回答画面
│   ├── Timer.tsx              … 制限時間カウントダウン
│   └── ResultScreen.tsx       … 結果・復習画面
└── docs/                      … 要件定義書・設計書
```

## 状態管理

クイズの進行（`idle → playing → answered → finished`）は `useReducer` で一元管理しています。回答・時間切れ・次へ・リスタートといった複数の状態が同時に変化するため、更新ロジックを `quizReducer` に集約しています。詳細は設計書の「状態機械の設計」を参照してください。
