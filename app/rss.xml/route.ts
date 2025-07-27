import { Feed } from "feed";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
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
      rss2: `${siteUrl}/rss.xml`,
    },
    copyright: "© 2024 atepoyo.com",
  });

  // 各投稿をフィードに追加
  await Promise.all(
    posts.map(async (post) => {
      const postDetail = getPostBySlug(post.slug);
      // 1行目抜粋（HTMLタグ除去）
      const firstLine = postDetail.contentHtml
        .replace(/<[^>]+>/g, "")
        .split("\n")[0];

      feed.addItem({
        title: post.title,
        id: `${siteUrl}/articles/${post.slug}`,
        link: `${siteUrl}/articles/${post.slug}`,
        description: firstLine,
        content: postDetail.contentHtml,
        date: new Date(post.date),
      });
    })
  );

  // RSS XML を生成
  const rssXml = feed.rss2();

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
    },
  });
}