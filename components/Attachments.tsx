"use client";

import { useState } from "react";
import MediaDialog, { type MediaItem } from "@/components/MediaDialog";
import type { Attachment } from "@/lib/content";

export default function Attachments({
  company,
  attachments,
}: {
  company: string;
  attachments: Attachment[];
}) {
  const [open, setOpen] = useState<MediaItem | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.1em]">
        {attachments.map((doc) => (
          <button
            key={doc.href}
            type="button"
            onClick={() =>
              setOpen({ src: doc.href, title: `${company} · ${doc.label}` })
            }
            className="flex cursor-pointer items-center gap-2 border border-acid/45 px-[13px] py-[8px] uppercase text-acid transition-colors hover:bg-acid hover:text-ink"
          >
            <span aria-hidden>◫</span>
            {doc.label}
          </button>
        ))}
      </div>
      <MediaDialog item={open} onClose={() => setOpen(null)} />
    </>
  );
}
