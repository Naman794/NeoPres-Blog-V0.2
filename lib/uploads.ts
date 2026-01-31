import { supabaseClient } from "@/lib/supabaseClient";

export const uploadPostImage = async (postId: string, file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const path = `posts/${postId}/${fileName}`;

  const { error } = await supabaseClient.storage.from("media").upload(path, file, {
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data } = supabaseClient.storage.from("media").getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
};
