import Link from "next/link";

import { requireAdminOrEditor } from "@/lib/rbac";

const DashboardPage = async () => {
  await requireAdminOrEditor();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Dashboard</h1>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          { title: "Posts", description: "Drafts, publishing, and content edits", href: "/admin/posts" },
          { title: "Homepage", description: "Hero and trending modules", href: "/admin/homepage" },
          { title: "Ad Slots", description: "Manage ad placements and creative", href: "/admin/ads" },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
          >
            <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
