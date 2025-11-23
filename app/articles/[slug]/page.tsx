import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (post.slug === "not-found") {
    notFound();
  }
  return { title: post.title };
}
