import imageCompression from "browser-image-compression";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE_MB = 5;

const validateImage = (file: File) => {
  if (!IMAGE_TYPES.includes(file.type)) {
    throw new Error("Unsupported image type. Use JPG, PNG, WebP, or AVIF.");
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error("File too large. Please upload an image under 5MB.");
  }
};

const compressImage = async (
  file: File,
  { maxWidthOrHeight }: { maxWidthOrHeight: number },
) => {
  validateImage(file);
  return imageCompression(file, {
    maxWidthOrHeight,
    initialQuality: 0.75,
    maxSizeMB: 0.4,
    useWebWorker: true,
  });
};

export const compressCoverImage = (file: File) =>
  compressImage(file, { maxWidthOrHeight: 1600 });

export const compressInlineImage = (file: File) =>
  compressImage(file, { maxWidthOrHeight: 1400 });
