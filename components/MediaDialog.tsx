"use client";

import { useEffect, useRef } from "react";

export type MediaItem = {
  src: string;
  title: string;
};

const isPdf = (src: string) => src.toLowerCase().endsWith(".pdf");

/**
 * Full-screen viewer for screenshots, certificates and letters. Images are
 * shown inline; PDFs are embedded, with an "open in new tab" escape hatch for
 * mobile browsers that can't render a PDF inside an iframe.
 */
export default function MediaDialog({
  item,
  onClose,
}: {
  item: MediaItem | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the <dialog> itself.
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto h-[min(88vh,960px)] w-[min(94vw,1180px)] max-w-none border border-bone/20 bg-ink p-0 text-bone backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-bone/14 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em]">
            <span className="text-acid">▸</span>
            <span className="min-w-0 flex-1 truncate text-mist">
              {item.title}
            </span>
            <a
              href={item.src}
              target="_blank"
              rel="noopener"
              className="border border-bone/20 px-3 py-[7px] text-mist transition-colors hover:border-acid hover:text-acid"
            >
              Open ↗
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="border border-bone/20 px-3 py-[7px] text-mist transition-colors hover:border-acid hover:text-acid"
            >
              ✕
            </button>
          </div>

          <div className="min-h-0 flex-1 bg-bone/[0.03]">
            {isPdf(item.src) ? (
              <iframe
                src={item.src}
                title={item.title}
                className="size-full border-0"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.title}
                className="size-full object-contain p-[clamp(8px,2vw,24px)]"
              />
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
