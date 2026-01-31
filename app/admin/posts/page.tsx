import Link from "next/link";

import { createServerSupabaseClient } from "@/lib/auth";
import { requireAdminOrEditor } from "@/lib/rbac";

const PostsPage = async () => {
  await requireAdminOrEditor();
  const supabase = createServerSupabaseClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, status, published_at, slug")
    .order("updated_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Posts
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">All posts</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          New post
        </Link>
      </div>
      <div className="mt-8 space-y-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{post.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                {post.status}
              </p>
            </div>
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
            >
              Edit
            </Link>
          </div>
        )) ?? null}
      </div>
    </div>
  );
};

export default PostsPage;
