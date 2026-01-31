interface ArticleCardProps {
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
}

const ArticleCard = ({ title, category, excerpt, readTime }: ArticleCardProps) => {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {category}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm text-slate-600">{excerpt}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <span>{readTime}</span>
        <a className="font-medium text-slate-900" href="/articles/neo-quest">
          Read →
        </a>
      </div>
    </article>
  );
};

export default ArticleCard;
