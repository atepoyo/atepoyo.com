import { getPostBySlug, getAllSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug: slug.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (post.slug === 'not-found') {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">記事が見つかりません</h1>
        <p>お探しの記事は存在しないか、削除された可能性があります。</p>
      </div>
    );
  }

  return (
    <article>
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
