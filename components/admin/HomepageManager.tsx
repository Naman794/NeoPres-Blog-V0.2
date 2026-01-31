"use client";

import { useEffect, useMemo, useState } from "react";

import { supabaseClient } from "@/lib/supabaseClient";

interface HomepageItem {
  section_key: string;
  post_id: string;
  rank: number;
  posts?: {
    title: string;
    slug: string;
  } | null;
}

interface PostOption {
  id: string;
  title: string;
  slug: string;
}

const HomepageManager = () => {
  const [items, setItems] = useState<HomepageItem[]>([]);
  const [posts, setPosts] = useState<PostOption[]>([]);
  const [sectionKey, setSectionKey] = useState("hero");
  const [postId, setPostId] = useState("");
  const [rank, setRank] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data } = await supabaseClient
      .from("homepage_items")
      .select("section_key, post_id, rank, posts(title, slug)")
      .order("rank", { ascending: true });
    setItems(data ?? []);
  };

  const fetchPosts = async () => {
    const { data } = await supabaseClient
      .from("posts")
      .select("id, title, slug")
      .eq("status", "published")
      .eq("is_hidden", false)
      .order("published_at", { ascending: false });
    setPosts(data ?? []);
  };

  useEffect(() => {
    fetchItems();
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!postId && posts.length) {
      setPostId(posts[0].id);
    }
  }, [posts, postId]);

  const handleAdd = async () => {
    setError(null);
    const { error: insertError } = await supabaseClient
      .from("homepage_items")
      .upsert({ section_key: sectionKey, post_id: postId, rank });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    fetchItems();
  };

  const handleRemove = async (item: HomepageItem) => {
    await supabaseClient
      .from("homepage_items")
      .delete()
      .match({ section_key: item.section_key, post_id: item.post_id });
    fetchItems();
  };

  const availablePosts = useMemo(
    () => posts.filter((post) => post.id === postId || !items.some((item) => item.post_id === post.id)),
    [posts, items, postId],
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Section
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={sectionKey}
              onChange={(event) => setSectionKey(event.target.value)}
            >
              <option value="hero">Hero</option>
              <option value="trending">Trending</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Post
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={postId}
              onChange={(event) => setPostId(event.target.value)}
            >
              {availablePosts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Rank
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              type="number"
              value={rank}
              onChange={(event) => setRank(Number(event.target.value))}
            />
          </div>
        </div>
        <button
          className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          type="button"
          onClick={handleAdd}
          disabled={!postId}
        >
          Add to section
        </button>
        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.section_key}-${item.post_id}`}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.section_key} • rank {item.rank}
              </p>
              <p className="text-sm font-medium text-slate-900">
                {item.posts?.title ?? item.post_id}
              </p>
            </div>
            <button
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium"
              type="button"
              onClick={() => handleRemove(item)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomepageManager;
