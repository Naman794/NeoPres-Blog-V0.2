import PostEditorForm from "@/components/admin/PostEditorForm";
import { requireAdminOrEditor } from "@/lib/rbac";

const NewPostPage = async () => {
  await requireAdminOrEditor();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Posts
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create new post</h1>
      </div>
      <div className="mt-8">
        <PostEditorForm mode="create" />
      </div>
    </div>
  );
};

export default NewPostPage;
