// lib/posts.ts
import fs from "fs";
import path from "path";
import { cache } from "react";

const generatedPostsPath = path.join(process.cwd(), "generated", "posts.json");

type PostRecord = {
  slug: string;
  title: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  date: string;
  contentHtml: string;
};

type PostSummary = Omit<PostRecord, "contentHtml">;

function sortPosts(posts: PostRecord[]): PostRecord[] {
  return [...posts].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function readGeneratedPosts(): PostRecord[] {
  if (!fs.existsSync(generatedPostsPath)) {
    throw new Error(
      `Generated posts file not found at ${generatedPostsPath}. Run "npm run generate:posts" before building.`
    );
  }
  try {
    const raw = fs.readFileSync(generatedPostsPath, "utf8");
    const parsed = JSON.parse(raw) as PostRecord[];
    return sortPosts(parsed);
  } catch (error) {
    throw new Error(
      `Failed to parse generated posts from ${generatedPostsPath}: ${error}`
    );
  }
}

const loadPostRecords = cache((): PostRecord[] => {
  return readGeneratedPosts();
});

function getPostSummaries(): PostSummary[] {
  return loadPostRecords().map(({ contentHtml, ...summary }) => {
    void contentHtml;
    return summary;
  });
}

export function getAllPosts() {
  return getPostSummaries();
}

export function getAllPostRecords() {
  return loadPostRecords();
}

export function getPostsByGenre(genre: string) {
  return getPostSummaries().filter((post) => post.categories.includes(genre));
}

export function getAllGenres(): string[] {
  const genres = new Set<string>();
  getPostSummaries().forEach((post) => {
    post.categories.forEach((category) => genres.add(category));
  });
  return Array.from(genres).sort((a, b) => a.localeCompare(b));
}

export function getPostBySlug(slug: string) {
  const post = loadPostRecords().find((entry) => entry.slug === slug);

  if (!post) {
    return {
      slug: "not-found",
      title: "記事が見つかりません",
      categories: ["uncategorized"],
      tags: [],
      contentHtml: "<p>お探しの記事は見つかりませんでした。</p>",
      excerpt: "",
      date: "",
    };
  }

  return post;
}

// スラグ一覧を取得する関数
export function getAllSlugs() {
  return loadPostRecords().map(({ slug }) => ({ slug }));
}
