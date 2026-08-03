# react-starter

React + Vite + TypeScript のスターターテンプレートです。

## セットアップ

```bash
git clone git@github.com:komataku1234-cmd/default.git
cd default
pnpm install
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

## チーム開発を始める前にやること

- [ ] GitHubリポジトリにメンバーをCollaboratorとして招待（Settings → Collaborators）
- [ ] `main`ブランチを保護し、直接pushを禁止してPRを必須化（Settings → Branches）
- [ ] 各メンバーがcloneして`pnpm install`できることを確認
- [ ] 必要であればCI（GitHub Actions）で`pnpm lint` / `pnpm build`を自動実行するよう設定
