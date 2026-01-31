import HomepageManager from "@/components/admin/HomepageManager";
import { requireAdmin } from "@/lib/rbac";

const HomepageAdminPage = async () => {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Homepage
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Hero & trending</h1>
        <p className="mt-2 text-sm text-slate-600">
          Add posts to the hero and trending sections and control ordering.
        </p>
      </div>
      <div className="mt-8">
        <HomepageManager />
      </div>
    </div>
  );
};

export default HomepageAdminPage;
