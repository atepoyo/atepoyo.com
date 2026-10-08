import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getPostId, postMetadataSchema, formatPostDate } from "../src/lib/post-metadata.ts";

describe("記事の日時とURL", () => {
  it("新しい暦日を日本時間の午前0時として表示する", () => {
    const data = postMetadataSchema.parse({ title: "記事", date: "2026-10-07" });
    assert.equal(data.date.toISOString(), "2026-10-06T15:00:00.000Z");
    assert.equal(formatPostDate(data.date), "2026年10月7日");
    assert.deepEqual(data.categories, []);
    assert.deepEqual(data.tags, []);
    assert.equal(getPostId("2026-10-07.md", { title: "記事", date: "2026-10-07" }), "2026-10-07");
  });

  it("旧記事の深夜の公開日時とファイル名由来のURLを維持する", () => {
    const source = { title: "旧記事", date: "2021-01-10T01:00:00+09:00", categories: ["diary"], tags: ["life"] };
    const data = postMetadataSchema.parse(source);
    assert.equal(getPostId("2021-01-09.md", source), "2021-01-09");
    assert.equal(data.date.toISOString(), "2021-01-09T16:00:00.000Z");
    assert.equal(formatPostDate(data.date), "2021年1月10日");
    const parsedDate = new Date("2025-09-23T09:57:05.046Z");
    assert.equal(postMetadataSchema.parse({ title: "記事", date: parsedDate }).date.getTime(), parsedDate.getTime());
  });

  it("新規の暦日とファイル名が違う場合は拒否する", () => {
    assert.throws(() => getPostId("2026-10-07.md", { title: "記事", date: "2026-10-08" }), /一致しません/);
    assert.throws(() => getPostId("article.md", { title: "記事", date: "2026-10-07" }), /ファイル名/);
  });

  it("空タイトルや存在しない日付やカテゴリの型違いを拒否する", () => {
    for (const input of [
      { title: " ", date: "2026-10-07" },
      { title: "記事", date: "2026-02-30" },
      { title: "記事", date: "2026-10-07", categories: "diary" },
      { title: "記事", date: "日時不明" },
    ]) assert.equal(postMetadataSchema.safeParse(input).success, false);
  });
});
