interface SectionHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
}

const SectionHeader = ({ title, description, actionLabel }: SectionHeaderProps) => {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {title}
        </p>
        {description ? (
          <p className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
            {description}
          </p>
        ) : null}
      </div>
      {actionLabel ? (
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default SectionHeader;
