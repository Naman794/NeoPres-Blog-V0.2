import { cache } from "react";

import { supabasePublic } from "@/lib/supabasePublic";

const selectPostFields =
  "id, slug, title, excerpt, cover_image_url, published_at, status, is_hidden, author_id, profiles(display_name, username, avatar_url, bio, role)";

export const getHomepageLeftRail = cache(async () => {
export const getHomepageLeftRail = async () => {
  const { data: trendingItems, error: trendingError } = await supabasePublic
    .from("homepage_items")
    .select(`rank, posts(${selectPostFields})`)
    .eq("section_key", "trending")
    .order("rank", { ascending: true });

  if (trendingError) {
    throw trendingError;
  }

  const { data: adSlots, error: adError } = await supabasePublic
    .from("ad_slots")
    .select("key, label, html, image_url, target_url, is_enabled")
    .eq("is_enabled", true);

  if (adError) {
    throw adError;
  }

  return {
    about: {
      title: "NeoPress",
      description:
        "Weekly digests, thoughtful essays, and practical guides for fans who want a clean, classic feed.",
    },
    trending:
      trendingItems
        ?.map((item) => item.posts)
        .filter((post): post is NonNullable<typeof post> => Boolean(post)) ?? [],
    adSlots: adSlots ?? [],
  };
});

export const getHomepageMain = cache(async () => {
};

export const getHomepageMain = async () => {
  const { data: heroItems, error: heroError } = await supabasePublic
    .from("homepage_items")
    .select(`rank, posts(${selectPostFields})`)
    .eq("section_key", "hero")
    .order("rank", { ascending: true });

  if (heroError) {
    throw heroError;
  }

  const { data: latestPosts, error: latestError } = await supabasePublic
    .from("posts")
    .select(selectPostFields)
    .eq("status", "published")
    .eq("is_hidden", false)
    .order("published_at", { ascending: false })
    .limit(6);

  if (latestError) {
    throw latestError;
  }

  return {
    hero:
      heroItems?.map((item) => item.posts).filter(Boolean).slice(0, 1) ?? [],
    latest: latestPosts ?? [],
  };
});

export const getPostBySlug = cache(async (slug: string) => {
};

export const getPostBySlug = async (slug: string) => {
  const { data, error } = await supabasePublic
    .from("posts")
    .select(selectPostFields)
    .eq("slug", slug)
    .eq("status", "published")
    .eq("is_hidden", false)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
});

export const getArticleAdSlots = cache(async (keys: string[]) => {
};

export const getArticleAdSlots = async (keys: string[]) => {
  const { data, error } = await supabasePublic
    .from("ad_slots")
    .select("key, label, html, image_url, target_url, is_enabled")
    .in("key", keys)
    .eq("is_enabled", true);

  if (error) {
    throw error;
  }

  return data ?? [];
});
};
