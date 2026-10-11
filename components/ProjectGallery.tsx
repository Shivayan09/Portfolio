"use client";

import Image from "next/image";
import { useState } from "react";
import MediaDialog, { type MediaItem } from "@/components/MediaDialog";
import type { Project } from "@/lib/content";

/**
 * A screenshot with a quiet caption line beneath it: the live host on the
 * left, numbered toggles between screenshots on the right. Clicking the
 * image opens it full size.
 */
export default function ProjectGallery({
  name,
  url,
  images,
}: {
  name: string;
  url: string;
  images: Project["images"];
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<MediaItem | null>(null);
  const current = images[active];
  const host = new URL(url).host.replace(/^www\./, "");

  return (
    <figure className="m-0">
      <button
        type="button"
        onClick={() =>
          setOpen({ src: current.src, title: `${name} · ${current.alt}` })
        }
        aria-label={`Enlarge screenshot: ${current.alt}`}
        className="group relative grid w-full cursor-zoom-in overflow-hidden border border-bone/10 transition-colors duration-300 hover:border-acid/50"
      >
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={index === active ? image.alt : ""}
            width={1918}
            height={988}
            sizes="(min-width: 1024px) 640px, 100vw"
            className={`block h-auto w-full transition-[opacity,scale] duration-700 ease-out [grid-area:1/1] group-hover:scale-[1.015] ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </button>

      <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[11px] text-slate">
        <span className="truncate">{host}</span>
        {images.length > 1 && (
          <span className="flex gap-3">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show screenshot: ${image.alt}`}
                aria-pressed={index === active}
                className={`cursor-pointer transition-colors ${
                  index === active ? "text-acid" : "hover:text-bone"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </span>
        )}
      </figcaption>

      <MediaDialog item={open} onClose={() => setOpen(null)} />
    </figure>
  );
}
