import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.slug }));
}

export default function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (post.slug === "not-found") notFound();

  return (
    <article
      className="container-header"
      style={{ paddingTop: "var(--article-top-margin)" }}
    >
      <h1 className="text-2xl font-bold mb-8">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}

export function generateMetadata({ params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  if (post.slug === "not-found") {
    notFound();
  }
  return { title: post.title };
}
