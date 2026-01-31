interface PostCardProps {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  coverImageUrl?: string | null;
}

const PostCard = ({
  slug,
  title,
  category,
  author,
  date,
  excerpt,
  coverImageUrl,
}: PostCardProps) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        <span>{category}</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>{date}</span>
      </div>
      <div className="mt-5 flex flex-col gap-5 md:flex-row">
        <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 md:h-24 md:w-40">
          {coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" className="h-full w-full object-cover" src={coverImageUrl} />
          ) : (
            "Cover"
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-900">
            <a className="hover:text-slate-700" href={`/articles/${slug}`}>
              {title}
            </a>
          </h3>
          <p className="mt-2 text-sm text-slate-600">{excerpt}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">
            {author}
          </p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
