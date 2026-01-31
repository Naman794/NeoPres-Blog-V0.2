const CategoryList = () => {
  const categories = [
    "Anime Analysis",
    "Game Reviews",
    "Creator Culture",
    "Cosplay & Events",
    "Guides & Lists",
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Categories
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
