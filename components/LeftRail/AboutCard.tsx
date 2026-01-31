interface AboutCardProps {
  title: string;
  description: string;
}

const AboutCard = ({ title, description }: AboutCardProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        About NeoPress
      </p>
      <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
      <button className="mt-5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300">
        Subscribe
      </button>
    </div>
  );
};

export default AboutCard;
