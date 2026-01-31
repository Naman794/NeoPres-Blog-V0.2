import PostCard from "@/components/PostCard";

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
        {posts.map((post) => (
          <PostCard key={post.title} {...post} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
