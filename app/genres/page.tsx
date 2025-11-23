import { getAllGenres } from "@/lib/posts";
import Link from "next/link";

export default async function GenresPage() {
  const genres = getAllGenres();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">カテゴリ一覧</h1>
      {genres.length === 0 ? (
        <p>カテゴリがまだありません。</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {genres.map((genre) => (
            <li key={genre} className="bg-gray-100 p-4 rounded-lg">
              <Link href={`/genres/${genre}`} className="text-xl font-semibold hover:text-blue-500">
                {genre}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
