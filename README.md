# atepoyo.com

AstroでMarkdown記事を静的生成する個人ブログです。

## 開発

Node.js 22.12以上を使います。

```sh
npm ci
npm run dev
```

`posts/YYYY-MM-DD.md` が記事の保存先です。既存のタイムゾーン付き日時を維持し、新規記事は引用符付きの `date: "YYYY-MM-DD"` を使えます。記事URLはファイル名から生成します。画像一つだけの段落では、画像titleをキャプションとして表示します。

## 検証と静的出力

```sh
npm run validate
npm run preview
```

出力先は `dist/` です。記事・カテゴリ・固定ページ・全文RSSを含み、閲覧時のNodeサーバーは不要です。

`npm run validate` は型チェック、lint、テスト、ビルドを順に実行し、途中で失敗したら停止します。ローカル、GitHub Actions、Vercelで同じコマンドを使います。CIではNode.js 22を使用します。

## 公開

コード変更は作業ブランチから `main` へのPRを作成します。GitHub Actionsの `Validate` とVercelのプレビューデプロイが成功したことを確認し、プレビューで変更箇所を確認してからマージします。

`main` へのマージでVercelが本番公開します。Pushやマージの完了だけで公開済みとせず、対象コミットの `Vercel` ステータスが成功したことを確認します。

記事は従来どおりEditorから投稿できます。投稿用GitHub Appだけが `main` のPR・必須チェックのルールをバイパスし、記事を直接保存します。Appによる記事パスの検証と、公開前のVercelでの `npm run validate` により投稿を検証します。GitHubの例外はApp単位で、ファイルパス単位ではありません。

`main` の保護ルールはGitHub側で設定します。PRと `Validate`・`Vercel` の成功を必須にし、例外は投稿用Appに限定します。
