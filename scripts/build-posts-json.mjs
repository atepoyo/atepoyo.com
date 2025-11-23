#!/usr/bin/env node
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");
const outputDir = path.join(process.cwd(), "generated");
const outputPath = path.join(outputDir, "posts.json");

function toStringArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
}

function sortPosts(posts) {
  return [...posts].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function stripDangerousMarkup(htmlString) {
  const withoutTags = htmlString
    .replace(/<(script|style|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed|link|meta)[^>]*\/?>/gi, "");

  const withoutHandlers = withoutTags
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");

  return withoutHandlers;
}

function renderMarkdown(markdown) {
  const rendered = remark().use(html).processSync(markdown).toString();
  return stripDangerousMarkup(rendered);
}

function build() {
  if (!fs.existsSync(postsDir)) {
    console.error(`posts directory not found: ${postsDir}`);
    process.exit(1);
  }

  const fileNames = fs.readdirSync(postsDir);
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const categories = (() => {
      const fromCategories = toStringArray(data.categories);
      if (fromCategories.length > 0) return fromCategories;
      const fromGenre = toStringArray(data.genre);
      if (fromGenre.length > 0) return fromGenre;
      return ["uncategorized"];
    })();

    const tags = toStringArray(data.tags);
    const excerptSource = content.split("\n")[0] ?? "";
    const excerpt = renderMarkdown(excerptSource);
    const contentHtml = renderMarkdown(content);

    return {
      slug,
      title: data.title || "No Title",
      categories,
      tags,
      excerpt,
      date:
        typeof data.date === "string"
          ? data.date
          : data.date
          ? String(data.date)
          : "",
      contentHtml,
    };
  });

  const sorted = sortPosts(posts);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(sorted, null, 2));
  console.log(`Generated ${outputPath}`);
}

build();
