import type { Metadata } from "next";
import { getAllGenres, getPostsByGenre } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

const siteTitle = "atepoyo.com";

export function generateStaticParams() {
  return getAllGenres().map((genre) => ({ genre }));
}

export function generateMetadata({
  params,
}: {
  params: { genre: string };
}): Metadata {
  const { genre } = params;
  return {
    title: `カテゴリ: ${genre}`,
    description: `${genre}に属する記事一覧 | ${siteTitle}`,
  };
}

export default function GenrePage({ params }: { params: { genre: string } }) {
  const { genre } = params;
  const posts = getPostsByGenre(genre);

  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">カテゴリ: {genre}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/articles/${post.slug}`}>{post.title}</Link>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
