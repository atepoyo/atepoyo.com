import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-32">
      <div className="page-container">
        <ul className="text-left w-full">
          {posts.map((post) => {
            let formattedDate = "";
            if (post.date) {
              const d = new Date(post.date);
              if (!isNaN(d.getTime())) {
                formattedDate = `${d.getFullYear()}年${
                  d.getMonth() + 1
                }月${d.getDate()}日`;
              } else if (/^\d{4}-\d{2}-\d{2}/.test(post.date)) {
                // 文字列が日付形式の場合
                const [y, m, da] = post.date.split("-");
                formattedDate = `${y}年${parseInt(m, 10)}月${parseInt(da, 10)}日`;
              }
            }
            return (
              <li key={post.slug} className="mb-8">
                <div className="text-sm text-gray-500 mb-1">
                  {formattedDate}
                </div>
                <h2 className="text-xl font-semibold">
                  <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                </h2>
                <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}