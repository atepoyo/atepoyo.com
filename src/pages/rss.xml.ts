import type { APIRoute } from "astro";
import { Feed } from "feed";
import { getPosts, getPostHtml } from "../lib/posts.ts";
import { getExcerpt, getFeedHtml } from "../lib/post-html.ts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("RSS生成にはサイトURLが必要です");
  const siteUrl = site.href;
  const feed = new Feed({
    title: "atepoyo.com RSS Feed",
    description: "atepoyoが好き勝手に遊ぶサイト",
    id: siteUrl,
    link: siteUrl,
    language: "ja",
    updated: new Date(),
    generator: "atepoyo-com",
    feedLinks: { rss: new URL("/rss.xml", site).href },
    copyright: "© 2024 atepoyo.com",
  });
  for (const post of await getPosts()) {
    const html = getPostHtml(post);
    const url = new URL("/articles/" + post.id, site).href;
    feed.addItem({
      title: post.data.title,
      id: url,
      link: url,
      description: getExcerpt(html),
      content: getFeedHtml(html, siteUrl),
      date: post.data.date,
    });
  }
  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml; charset=UTF-8" },
  });
};
