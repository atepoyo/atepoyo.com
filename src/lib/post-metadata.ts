import { z } from "astro/zod";

const dateInput = z.union([
  z.iso.date(),
  z.iso.datetime({ offset: true }),
  z.date(),
]);

const sourceMetadata = z.object({
  title: z.string().trim().min(1),
  date: dateInput,
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export const postMetadataSchema = sourceMetadata.transform((metadata) => ({
  ...metadata,
  date: metadata.date instanceof Date
    ? metadata.date
    : new Date(metadata.date.length === 10
      ? metadata.date + "T00:00:00+09:00"
      : metadata.date),
}));

export function getPostId(entry: string, data: unknown): string {
  const id = entry.replace(/\.md$/, "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(id)) {
    throw new Error("記事のファイル名はYYYY-MM-DD.mdにしてください: " + entry);
  }
  const metadata = sourceMetadata.parse(data);
  // 旧記事では深夜投稿などでファイル名と公開日時が異なる。
  if (typeof metadata.date === "string" && metadata.date.length === 10 && metadata.date !== id) {
    throw new Error("暦日のdateとファイル名が一致しません: " + entry);
  }
  return id;
}

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatPostDate(date: Date): string {
  return dateFormatter.format(date);
}
