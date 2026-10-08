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
npm run check
npm run lint
npm test
npm run build
npm run preview
```

出力先は `dist/` です。記事・カテゴリ・固定ページ・全文RSSを含み、閲覧時のNodeサーバーは不要です。

Cloudflare Pagesではビルドコマンドを `npm run build`、出力ディレクトリを `dist` に指定します。`atepoyo.com` を接続する際はCloudflareのDNS設定が必要です。公開サービスの設定はコードのビルドとは別に行います。
