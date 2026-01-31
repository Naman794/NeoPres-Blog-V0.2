import AdSlot from "@/components/AdSlot";
import AuthorCard from "@/components/AuthorCard";

const ArticleDetailPage = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
        <div className="flex min-h-[240px] items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Cover Image Placeholder
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Anime Feature
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">
          The resilience arc: why quiet episodes hit the hardest.
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>By Rin Takahara</span>
          <span>•</span>
          <span>Sept 18, 2024</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </div>
      <div className="prose mt-8 max-w-none text-slate-700">
        <p>
          Slice-of-life episodes are the heartbeat of long-running anime. They reset the pace,
          spotlight supporting characters, and remind us why the stakes matter.
        </p>
        <p>
          In this chapter, the animators let stillness do the work. The result: a story that
          feels grounded and expansive at once, giving the audience time to breathe.
        </p>
        <p>
          The best moments are small: a shared meal, a quiet walk, a promise kept. They set the
          stage for the next surge of action, making every battle feel earned.
        </p>
      </div>
      <div className="mt-10 space-y-6">
        <AdSlot label="Mid-article" />
        <AuthorCard
          name="Rin Takahara"
          role="Editor-in-chief"
          bio="Covers anime storytelling, production notes, and character studies for NeoPress."
        />
      </div>
    </div>
  );
};

export default ArticleDetailPage;
