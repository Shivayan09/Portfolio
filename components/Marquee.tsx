import { Fragment } from "react";
import { marqueeItems } from "@/lib/content";

/** Two identical tracks scrolling as one, so the loop never shows a seam. */
export default function Marquee() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-acid bg-acid py-[9px] text-ink"
    >
      <div className="flex w-max animate-marquee font-mono text-[12.5px] font-bold uppercase tracking-[0.16em]">
        {[0, 1].map((track) => (
          <div key={track} className="flex gap-[26px] pr-[26px]">
            {marqueeItems.map((item) => (
              <Fragment key={item}>
                <span>{item}</span>
                <span>◆</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
