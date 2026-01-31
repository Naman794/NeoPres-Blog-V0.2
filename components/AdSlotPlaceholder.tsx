interface AdSlotPlaceholderProps {
  label: string;
}

const AdSlotPlaceholder = ({ label }: AdSlotPlaceholderProps) => {
  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Ad Slot
      </p>
      <p className="mt-2 font-medium text-slate-600">{label}</p>
    </div>
  );
};

export default AdSlotPlaceholder;
