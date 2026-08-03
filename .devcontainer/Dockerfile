# 1. ベースとなるOS（Node.js 22が入ったLinux）を指定
FROM node:22-bullseye

# 2. pnpmを使えるようにする
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. コンテナ内の作業ディレクトリを決定
WORKDIR /workspace