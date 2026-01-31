"use client";

import { useState } from "react";

import { uploadCoverImage } from "@/lib/uploads";

interface CoverUploaderProps {
  postId: string;
  value?: string | null;
  onChange: (url: string) => void;
}

const CoverUploader = ({ postId, value, onChange }: CoverUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      const result = await uploadCoverImage(postId, file);
      onChange(result.publicUrl);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="Cover" className="h-40 w-full rounded-xl object-cover" src={value} />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            No cover image
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-xs font-medium">
          Upload cover
          <input className="hidden" type="file" accept="image/*" onChange={handleUpload} />
        </label>
        {isUploading ? <span className="text-slate-500">Uploading...</span> : null}
        {error ? <span className="text-red-500">{error}</span> : null}
      </div>
    </div>
  );
};

export default CoverUploader;
