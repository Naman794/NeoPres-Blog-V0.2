"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CoverUploader from "@/components/CoverUploader";
import RichEditor from "@/components/RichEditor";
import { supabaseClient } from "@/lib/supabaseClient";

interface PostEditorFormProps {
  mode: "create" | "edit";
  initialPost?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: unknown;
    cover_image_url: string | null;
    status: string;
    is_hidden: boolean;
  } | null;
}

const parseBlocks = (content: unknown) => {
  if (!content || typeof content !== "object") {
    return [];
  }
  const blocks = (content as { blocks?: unknown }).blocks;
  return Array.isArray(blocks) ? (blocks as { type: string; text?: string }[]) : [];
};

const parseTags = (content: unknown) => {
  if (!content || typeof content !== "object") {
    return [];
  }
  const tags = (content as { tags?: unknown }).tags;
  return Array.isArray(tags) ? (tags as string[]) : [];
};

const formatTags = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const PostEditorForm = ({ mode, initialPost }: PostEditorFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? "");
  const [status, setStatus] = useState(initialPost?.status ?? "draft");
  const [isHidden, setIsHidden] = useState(initialPost?.is_hidden ?? false);
  const [coverUrl, setCoverUrl] = useState(initialPost?.cover_image_url ?? "");
  const [content, setContent] = useState(parseBlocks(initialPost?.content));
  const [tagsInput, setTagsInput] = useState(parseTags(initialPost?.content).join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "create" && title && !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  }, [title, slug, mode]);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      setUserId(data.user?.id ?? null);
    };
    loadUser();
  }, []);

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title,
        slug,
        excerpt,
        status: publish ? "published" : status,
        published_at: publish ? new Date().toISOString() : null,
        is_hidden: isHidden,
        cover_image_url: coverUrl || null,
        author_id: userId,
        content: { blocks: content, tags: formatTags(tagsInput) },
      };

      if (mode === "create") {
        const { error: insertError, data } = await supabaseClient
          .from("posts")
          .insert(payload)
          .select("id")
          .single();
        if (insertError) {
          throw insertError;
        }
        router.push(`/admin/posts/${data.id}/edit`);
        return;
      }

      if (initialPost) {
        const { error: updateError } = await supabaseClient
          .from("posts")
          .update(payload)
          .eq("id", initialPost.id);
        if (updateError) {
          throw updateError;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
      router.refresh();
    }
  };

  const postId = initialPost?.id ?? crypto.randomUUID();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Title
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Post title"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Slug
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              placeholder="post-slug"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Excerpt
            </label>
            <textarea
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              rows={3}
              value={excerpt ?? ""}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="Short summary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Tags (comma separated)
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="anime, gaming, reviews"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Content
            </label>
            <div className="mt-2">
              <RichEditor value={content} onChange={setContent} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 p-4">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Status
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={isHidden}
                onChange={(event) => setIsHidden(event.target.checked)}
              />
              Hide from homepage
            </label>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Cover image
            </label>
            <div className="mt-2">
              <CoverUploader postId={postId} value={coverUrl} onChange={setCoverUrl} />
            </div>
          </div>
        </div>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white"
          type="button"
          onClick={() => handleSave(false)}
          disabled={saving}
        >
          Save draft
        </button>
        <button
          className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700"
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default PostEditorForm;
