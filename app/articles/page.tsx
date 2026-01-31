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

const PAGE_SIZE = 12;

const ArticlesPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const pageNumber = Math.max(Number(searchParams.page ?? "1"), 1);
  const from = (pageNumber - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
const ArticlesPage = async () => {
  const { data: posts } = await supabasePublic
    .from("posts")
    .select(
      "id, slug, title, excerpt, cover_image_url, published_at, status, profiles(display_name, username)",
    )
    .eq("status", "published")
    .eq("is_hidden", false)
    .order("published_at", { ascending: false })
    .range(from, to);
    .limit(12);

const ArticlesPage = () => {
  const posts = [
    {
      title: "The quest log for modern shonen pacing",
      category: "Feature",
      author: "Aya Sato",
      date: "Sept 10, 2024",
      excerpt: "Why smaller arcs keep momentum high without losing emotional depth.",
    },
    {
      title: "Inside the coziest indie worlds of 2024",
      category: "Roundup",
      author: "Liam Park",
      date: "Sept 08, 2024",
      excerpt: "From pixel farms to pastel skies, cozy is here to stay.",
    },
    {
      title: "Composer spotlight: scoring for boss battles",
      category: "Interview",
      author: "Mina Ito",
      date: "Sept 04, 2024",
      excerpt: "Turning combat into symphony and leaning into emotional motifs.",
    },
  ];

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
      <div className="mt-10 flex items-center justify-between text-sm text-slate-600">
        <a
          className={`rounded-full border border-slate-200 px-4 py-2 ${pageNumber === 1 ? \"pointer-events-none opacity-50\" : \"\"}`}
          href={`/articles?page=${pageNumber - 1}`}
        >
          Previous
        </a>
        <span>Page {pageNumber}</span>
        <a
          className={`rounded-full border border-slate-200 px-4 py-2 ${posts && posts.length < PAGE_SIZE ? \"pointer-events-none opacity-50\" : \"\"}`}
          href={`/articles?page=${pageNumber + 1}`}
        >
          Next
        </a>
        {posts.map((post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
