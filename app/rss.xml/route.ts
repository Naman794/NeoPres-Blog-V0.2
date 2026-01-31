import { NextResponse } from "next/server";

import { supabasePublic } from "@/lib/supabasePublic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const GET = async () => {
  const { data: posts } = await supabasePublic
    .from("posts")
    .select("slug, title, excerpt, published_at")
    .eq("status", "published")
    .eq("is_hidden", false)
    .order("published_at", { ascending: false })
    .limit(20);

  const items =
    posts
      ?.map((post) => {
        const link = `${siteUrl}/articles/${post.slug}`;
        return `\n      <item>\n        <title><![CDATA[${post.title}]]></title>\n        <link>${link}</link>\n        <guid>${link}</guid>\n        <pubDate>${post.published_at ?? new Date().toISOString()}</pubDate>\n        <description><![CDATA[${post.excerpt ?? ""}]]></description>\n      </item>`;
      })
      .join("") ?? "";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n  <rss version="2.0">\n    <channel>\n      <title>NeoPress</title>\n      <link>${siteUrl}</link>\n      <description>Anime + gaming coverage with a clean, classic read.</description>\n      ${items}\n    </channel>\n  </rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=3600",
    },
  });
};
