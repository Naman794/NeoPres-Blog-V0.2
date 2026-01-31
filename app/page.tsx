import AdSlot from "@/components/AdSlot";
import CategoryList from "@/components/LeftRail/CategoryList";
import AboutCard from "@/components/LeftRail/AboutCard";
import TrendingList from "@/components/LeftRail/TrendingList";
import PostCard from "@/components/PostCard";

const HomePage = () => {
  const posts = [
    {
      title: "Skyline Sentinels: why quiet arcs hit the hardest",
      category: "Anime Feature",
      author: "Rin Takahara",
      date: "Sept 18, 2024",
      excerpt:
        "A grounded look at how pause-and-breathe episodes make every battle feel earned.",
    },
    {
      title: "Dreamshift Odyssey review: neon strategy with heart",
      category: "Game Review",
      author: "Maya Kondo",
      date: "Sept 16, 2024",
      excerpt:
        "Tactical combat, luminous cities, and a soundtrack that begs for late-night sessions.",
    },
    {
      title: "The watchlist: pastel anime worlds to stream next",
      category: "Curation",
      author: "Jun Park",
      date: "Sept 12, 2024",
      excerpt:
        "We picked six binge-worthy series that blend cozy pacing with bold worldbuilding.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <AboutCard />
          <TrendingList />
          <CategoryList />
          <AdSlot label="Left rail" />
        </aside>

        <section className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Featured
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              NeoPress keeps anime + gaming coverage calm, classic, and curated.
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Catch the best arcs, reviews, and creator notes without the noise.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.title} {...post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
