import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { markdownOptions } from "../src/lib/markdown.ts";
import { getExcerpt, getFeedHtml } from "../src/lib/post-html.ts";

const renderer = await markdownOptions.processor.createRenderer(markdownOptions);
async function html(markdown: string) {
  return (await renderer.render(markdown)).code;
}

describe("サイト側のMarkdown表示", () => {
  it("単独画像のtitleを装飾しないキャプションとして表示する", async () => {
    const result = await html('![代替文](/photos/a.jpg "**装飾しない** <b>文字</b> & 内容")');
    assert.match(result, /<figure><img[^>]+alt="代替文"/);
    assert.match(result, /<figcaption>\*\*装飾しない\*\* &#x3C;b>文字&#x3C;\/b> &#x26; 内容<\/figcaption>/);
    assert.doesNotMatch(result, /<b>|<strong>|title=/);
  });

  it("titleがない画像や空titleにはキャプションを付けない", async () => {
    assert.doesNotMatch(await html('![写真](/photos/a.jpg)\n\n![写真](/photos/b.jpg "")'), /figcaption/);
  });

  it("キャプションの引用符やバックスラッシュや改行を維持する", async () => {
    const source = String.raw`![写真](/a.jpg "引用 \"文\" と \\ と
次の行")`;
    const result = await html(source);
    assert.match(result, /<figcaption>引用 "文" と \\ と\n次の行<\/figcaption>/);
  });

  it("文章中やリンクで囲まれた画像や複数画像にはキャプションを付けない", async () => {
    for (const source of [
      '文 ![写真](/a.jpg "説明") です。',
      '[![写真](/a.jpg "説明")](/articles/2020-01-15)',
      '![写真](/a.jpg "説明") ![写真](/b.jpg "説明")',
    ]) assert.doesNotMatch(await html(source), /figure|figcaption/);
  });

  it("段落や明示改行やコードを維持しGFMの独自記法を解釈しない", async () => {
    const result = await html('一行目  \n二行目\n\n次の段落\n\n~~~js\nconst x = 1;\n~~~\n\n~~削除しない~~\n\nhttps://example.com');
    assert.match(result, /一行目<br>\n二行目/);
    assert.match(result, /<p>次の段落<\/p>/);
    assert.match(result, /<pre><code class="language-js">const x = 1;/);
    assert.match(result, /~~削除しない~~/);
    assert.doesNotMatch(result, /<del>|<a /);
  });

  it("危険なHTMLやjavascriptリンクを記事とRSSの共通出力から除く", async () => {
    const result = await html('<script>alert(1)</script>\n\n[リンク](javascript:alert%281%29)\n\n<img src="/a.jpg" onerror="alert(1)">');
    assert.doesNotMatch(result, /<script|onerror|javascript:/);
  });

  it("画像や見出しを飛ばして最初の本文段落を抜粋する", async () => {
    const result = await html('# 見出し\n\n![写真](/a.jpg "説明")\n\n最初の **本文** & 内容。\n\n次の段落。');
    assert.equal(getExcerpt(result), "最初の 本文 & 内容。");
    assert.equal(getExcerpt(await html('![写真](/a.jpg "説明")')), "");
  });

  it("RSSにも本文とキャプションを含め内部リンクや画像URLを絶対URLにする", async () => {
    const result = await html('![写真](/photos/a.jpg "説明")\n\n[別記事](/articles/2020-01-15) [外部](https://example.com)');
    const feed = getFeedHtml(result, "https://atepoyo.com");
    assert.match(feed, /src="https:\/\/atepoyo.com\/photos\/a.jpg"/);
    assert.match(feed, /href="https:\/\/atepoyo.com\/articles\/2020-01-15"/);
    assert.match(feed, /href="https:\/\/example.com"/);
    assert.match(feed, /<figcaption>説明<\/figcaption>/);
  });
});
