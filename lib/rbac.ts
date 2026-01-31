import { redirect } from "next/navigation";

import { createServerSupabaseClient, getUserFromCookies } from "@/lib/auth";

export const requireAdminOrEditor = async () => {
  const user = await getUserFromCookies();
  if (!user) {
    redirect("/admin/login");
  }

  const supabase = createServerSupabaseClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, display_name, username, avatar_url, bio")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return {
      id: user.id,
      role: "editor",
      display_name: null,
      username: null,
      avatar_url: null,
      bio: null,
    };
  }

  if (profile.role !== "admin" && profile.role !== "editor") {
    redirect("/admin/login");
  }

  return profile;
};

export const requireAdmin = async () => {
  const profile = await requireAdminOrEditor();
  if (profile.role !== "admin") {
    redirect("/admin/dashboard");
  }

  return profile;
};
