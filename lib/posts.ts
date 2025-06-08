// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  // postsディレクトリが存在しない場合は空の配列を返す
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // MarkdownをHTMLに変換
    const processedExcerpt = remark()
      .use(html)
      .processSync(content.split("\n")[0])
      .toString();

    return {
      slug,
      title: data.title || "No Title",
      genre: data.genre || "uncategorized",
      excerpt: processedExcerpt,
      date:
        typeof data.date === "string"
          ? data.date
          : data.date
          ? String(data.date)
          : "",
    };
  });
  // 新しい順にソート
  posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return posts;
}

export function getPostsByGenre(genre: string) {
  const posts = getAllPosts();
  return posts.filter((post) => post.genre === genre);
}

export function getAllGenres(): string[] {
  const posts = getAllPosts();
  const genres = new Set(posts.map((post) => post.genre));
  return Array.from(genres);
}

export function getPostBySlug(slug: string) {
  const posts = getAllPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return {
      slug: "not-found",
      title: "記事が見つかりません",
      genre: "uncategorized",
      contentHtml: "<p>お探しの記事は見つかりませんでした。</p>",
    };
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Markdownをパースしてコンテンツを取得
  const processedContent = remark().use(html).processSync(content).toString();

  return {
    slug,
    title: data.title || "No Title",
    genre: data.genre || "uncategorized",
    contentHtml: processedContent,
  };
}

// スラグ一覧を取得する関数
export function getAllSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      slug: fileName.replace(/\.md$/, ""),
    };
  });
}
