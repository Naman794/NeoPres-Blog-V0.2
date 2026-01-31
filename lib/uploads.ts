import { compressCoverImage, compressInlineImage } from "@/lib/imageCompress";
import { supabaseClient } from "@/lib/supabaseClient";

const createFileName = (file: File) => {
  const extension = file.name.split(".").pop() ?? "jpg";
  return `${crypto.randomUUID()}.${extension}`;
};

export const uploadPostImage = async (postId: string, file: File) => {
  const compressed = await compressInlineImage(file);
  const fileName = createFileName(compressed);
  const path = `posts/${postId}/${fileName}`;

  const { error } = await supabaseClient.storage.from("media").upload(path, compressed, {
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data } = supabaseClient.storage.from("media").getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
};

export const uploadCoverImage = async (postId: string, file: File) => {
  const compressed = await compressCoverImage(file);
  const fileName = createFileName(compressed);
  const path = `posts/${postId}/${fileName}`;

  const { error } = await supabaseClient.storage.from("media").upload(path, compressed, {
    upsert: true,
  });

  if (error) {
    throw error;
  }

  const { data } = supabaseClient.storage.from("media").getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
};
