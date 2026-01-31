import AdSlotsManager from "@/components/admin/AdSlotsManager";
import { requireAdmin } from "@/lib/rbac";

const AdsAdminPage = async () => {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Ad Slots
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Manage ad inventory</h1>
        <p className="mt-2 text-sm text-slate-600">
          Create or update ad slots that render on the public site.
        </p>
      </div>
      <div className="mt-8">
        <AdSlotsManager />
      </div>
    </div>
  );
};

export default AdsAdminPage;
