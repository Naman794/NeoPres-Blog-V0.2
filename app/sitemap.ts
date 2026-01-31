import type { MetadataRoute } from "next";

import { supabasePublic } from "@/lib/supabasePublic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { data: posts } = await supabasePublic
    .from("posts")
    .select("slug, updated_at")
    .eq("status", "published")
    .eq("is_hidden", false);

  const postEntries =
    posts?.map((post) => ({
      url: `${siteUrl}/articles/${post.slug}`,
      lastModified: post.updated_at ?? new Date().toISOString(),
    })) ?? [];

  return [
    { url: siteUrl, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/articles`, lastModified: new Date().toISOString() },
    ...postEntries,
  ];
};

export default sitemap;
