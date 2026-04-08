"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AttachmentRecord } from "@/lib/tickets/contracts";

type FileUploadProps = {
  value: AttachmentRecord[];
  onChange: (attachments: AttachmentRecord[]) => void;
  disabled?: boolean;
};

const maxClientAttachments = 4;

function formatBytes(value: number) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload({
  value,
  onChange,
  disabled,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFiles(files: File[]) {
    if (files.length === 0 || disabled) {
      return;
    }

    if (value.length + files.length > maxClientAttachments) {
      setError(`Upload up to ${maxClientAttachments} screenshots.`);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as
        | { attachments?: AttachmentRecord[]; error?: string }
        | null;

      if (!response.ok || !data?.attachments) {
        throw new Error(data?.error ?? "Unable to upload files right now.");
      }

      onChange([...value, ...data.attachments]);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload files right now.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <label
        htmlFor="ticket-attachments"
        className={`group flex cursor-pointer flex-col rounded-[24px] border border-dashed px-5 py-5 transition-all ${
          disabled
            ? "cursor-not-allowed border-tan/50 bg-sand/40"
            : "border-tan/80 bg-cream hover:border-warm hover:bg-sand/70"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-charcoal">
              Attach screenshots
            </p>
            <p className="mt-1 text-sm text-stone">
              Upload image files to give your dev team instant context.
            </p>
          </div>
          <div className="rounded-full border border-tan/70 bg-sand px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-bark">
            {isUploading ? "Uploading" : `${value.length}/${maxClientAttachments}`}
          </div>
        </div>

        <input
          id="ticket-attachments"
          type="file"
          accept="image/*"
          multiple
          disabled={disabled || isUploading}
          className="sr-only"
          onChange={async (event) => {
            const files = Array.from(event.currentTarget.files ?? []);
            await uploadFiles(files);
            event.currentTarget.value = "";
          }}
        />
      </label>

      <AnimatePresence initial={false}>
        {value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {value.map((attachment) => (
              <div
                key={attachment.id}
                className="overflow-hidden rounded-[24px] border border-tan/70 bg-cream shadow-sm shadow-tan/10"
              >
                <div className="aspect-[16/10] bg-sand">
                  <img
                    src={attachment.url}
                    alt={attachment.originalName}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-charcoal">
                      {attachment.originalName}
                    </p>
                    <p className="mt-1 text-xs text-stone">
                      {formatBytes(attachment.sizeBytes)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onChange(value.filter((item) => item.id !== attachment.id))
                    }
                    className="rounded-full border border-tan/70 px-3 py-1 text-xs font-medium text-bark transition-colors hover:border-charcoal/20 hover:text-charcoal"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
