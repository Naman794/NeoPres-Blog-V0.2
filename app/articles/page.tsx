import PostCard from "@/components/PostCard";
import { supabasePublic } from "@/lib/supabasePublic";

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

const ArticlesPage = async () => {
  const { data: posts } = await supabasePublic
    .from("posts")
    .select(
      "id, slug, title, excerpt, cover_image_url, published_at, status, profiles(display_name, username)",
    )
    .eq("status", "published")
    .eq("is_hidden", false)
    .order("published_at", { ascending: false })
    .limit(12);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Articles
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          All anime + gaming stories
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The full archive of features, recaps, reviews, and guides.
        </p>
      </div>
      <div className="mt-8 space-y-6">
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            slug={post.slug}
            title={post.title}
            category="Published"
            author={post.profiles?.display_name ?? post.profiles?.username ?? "NeoPress"}
            date={formatDate(post.published_at)}
            excerpt={post.excerpt ?? ""}
            coverImageUrl={post.cover_image_url}
          />
        )) ?? null}
      </div>
    </div>
  );
};

export default ArticlesPage;
