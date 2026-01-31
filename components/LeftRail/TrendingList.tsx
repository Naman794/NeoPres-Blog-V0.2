interface TrendingItem {
  id: string;
  title: string;
  slug: string;
}

interface TrendingListProps {
  items: TrendingItem[];
}

const TrendingList = ({ items }: TrendingListProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Trending
      </p>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          No trending posts yet. Add published posts in the admin homepage manager.
        </p>
      ) : (
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {items.map((item, index) => (
            <li key={item.id} className="flex gap-3">
              <span className="text-xs font-semibold text-slate-400">{`0${index + 1}`}</span>
              <a className="font-medium text-slate-700 hover:text-slate-900" href={`/articles/${item.slug}`}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingList;
