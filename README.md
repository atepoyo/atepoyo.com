# atepoyo-com ブログ

## 概要

このリポジトリは、`posts/` ディレクトリに [yyyy-mm-dd.md] 形式の Markdown ファイルを追加・push するだけでブログが更新される静的ブログです。

## 記事の追加方法

1. `posts/` ディレクトリに `2025-06-08.md` のようなファイル名で Markdown ファイルを作成します。
2. フロントマター（`---` で囲まれた部分）に `title` や `genre` などを記載します。
3. 本文を Markdown で記述します。
4. ファイルを push すると自動的にブログに反映されます。

### サンプル

```
---
title: サンプル記事
genre: tech
---

これはサンプル記事です。
Markdownで本文を書けます。
```

## セットアップ

```bash
npm install
npm run dev
```

## 構成

- `posts/` : 記事 Markdown
- `lib/posts.ts` : 記事の読み込みロジック
- `app/` : Next.js アプリ本体
- `components/` : UI コンポーネント
