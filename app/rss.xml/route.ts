import { Feed } from "feed";
import { getAllPostRecords } from "@/lib/posts";

export async function GET() {
  const posts = getAllPostRecords();
  const siteUrl = "https://atepoyo.com";
  const now = new Date();

  // Feed オブジェクトを作成
  const feed = new Feed({
    title: "atepoyo.com RSS Feed",
    description: "atepoyoが好き勝手に遊ぶサイト",
    id: `${siteUrl}/`,
    link: `${siteUrl}/`,
    language: "ja",
    updated: now,
    generator: "atepoyo-com",
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
    },
    copyright: "© 2024 atepoyo.com",
  });

  // 各投稿をフィードに追加
  posts.forEach((post) => {
    const firstLine = post.contentHtml.replace(/<[^>]+>/g, "").split("\n")[0];

    feed.addItem({
      title: post.title,
      id: `${siteUrl}/articles/${post.slug}`,
      link: `${siteUrl}/articles/${post.slug}`,
      description: firstLine,
      content: post.contentHtml,
      date: new Date(post.date),
    });
  });

  // RSS XML を生成
  const rssXml = feed.rss2();

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
    },
  });
}
