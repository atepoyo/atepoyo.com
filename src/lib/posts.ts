import { getCollection, type CollectionEntry } from "astro:content";

export async function getPosts() {
  const posts = await getCollection("posts");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getGenres(): Promise<string[]> {
  const posts = await getPosts();
  return [...new Set(posts.flatMap((post) => post.data.categories))]
    .sort((a, b) => a.localeCompare(b));
}

export function getPostHtml(post: CollectionEntry<"posts">): string {
  if (!post.rendered) throw new Error("記事のHTMLが生成されていません: " + post.id);
  return post.rendered.html;
}
