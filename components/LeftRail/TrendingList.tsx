const TrendingList = () => {
  const items = [
    "Skyline Sentinels recap: episode 7",
    "Best JRPG party builds this month",
    "Studio Lune color theory breakdown",
    "Co-op releases worth a weekend",
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Trending
      </p>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3">
            <span className="text-xs font-semibold text-slate-400">{`0${index + 1}`}</span>
            <span className="font-medium text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingList;
