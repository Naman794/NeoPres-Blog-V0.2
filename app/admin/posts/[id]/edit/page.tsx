import PostEditorForm from "@/components/admin/PostEditorForm";
import { createServerSupabaseClient } from "@/lib/auth";
import { requireAdminOrEditor } from "@/lib/rbac";

const EditPostPage = async ({ params }: { params: { id: string } }) => {
  await requireAdminOrEditor();
  const supabase = createServerSupabaseClient();
  const { data: post } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, content, cover_image_url, status, is_hidden")
    .eq("id", params.id)
    .maybeSingle();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Posts
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Edit post</h1>
      </div>
      <div className="mt-8">
        <PostEditorForm mode="edit" initialPost={post} />
      </div>
    </div>
  );
};

export default EditPostPage;
