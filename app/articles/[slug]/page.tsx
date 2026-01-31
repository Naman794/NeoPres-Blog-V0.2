import type { Metadata } from "next";

import Image from "next/image";

import AdSlot from "@/components/AdSlot";
import AuthorCard from "@/components/AuthorCard";
import RichContentRenderer from "@/components/RichContentRenderer";
import { getArticleAdSlots, getPostBySlug } from "@/lib/queries";

const formatDate = (value: string | null) => {
  if (!value) {
    return "Draft";
  }
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const estimateReadTime = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const getContentText = (content: unknown) => {
  if (!content || typeof content !== "object") {
    return "";
  }
  const blocks = Array.isArray((content as { blocks?: unknown }).blocks)
    ? (content as { blocks: Array<{ text?: string }> }).blocks
    : [];
  return blocks.map((block) => block.text ?? "").join(" ");
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Article not found | NeoPress" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const canonical = `${siteUrl}/articles/${post.slug}`;

  return {
    title: `${post.title} | NeoPress`,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: canonical,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
};

const ArticleDetailPage = async ({ params }: { params: { slug: string } }) => {
  const [post, adSlots] = await Promise.all([
    getPostBySlug(params.slug),
    getArticleAdSlots(["article-top", "article-mid"]),
  ]);

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-sm text-slate-600">Article not found.</p>
      </div>
    );
  }

  const contentText = getContentText(post.content);
  const readTime = `${estimateReadTime(contentText)} min read`;
  const topAd = adSlots.find((slot) => slot.key === "article-top");
  const midAd = adSlots.find((slot) => slot.key === "article-mid");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="relative h-[240px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
        {post.cover_image_url ? (
          <Image
            alt={post.title}
            src={post.cover_image_url}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex min-h-[240px] items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Cover Image Placeholder
          </div>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Anime Feature
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>By {post.profiles?.display_name ?? post.profiles?.username ?? "NeoPress"}</span>
          <span>•</span>
          <span>{formatDate(post.published_at)}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>
      <div className="mt-8">
        <AdSlot label={topAd?.label ?? "Article top"} />
      </div>
      <div className="mt-8">
        <RichContentRenderer content={post.content as { blocks?: unknown[] }} />
      </div>
      <div className="mt-10 space-y-6">
        <AdSlot label={midAd?.label ?? "Mid-article"} />
        <AuthorCard
          name={post.profiles?.display_name ?? post.profiles?.username ?? "NeoPress"}
          role={post.profiles?.role ?? "Author"}
          bio={post.profiles?.bio ?? "Stories and guides curated by the NeoPress team."}
          avatarUrl={post.profiles?.avatar_url}
        />
      </div>
    </div>
  );
};

export default ArticleDetailPage;
