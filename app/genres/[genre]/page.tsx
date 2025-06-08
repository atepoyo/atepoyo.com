import { getPostsByGenre } from "@/lib/posts";
import Link from "next/link";

export default async function GenrePage({ params }: { params: { genre: string } }) {
  const { genre } = await params;
  const posts = getPostsByGenre(genre);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ジャンル: {genre}</h1>
      {posts.length === 0 ? (
        <p>このジャンルの記事はまだありません。</p>
      ) : (
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
      )}
    </div>
  );
}
