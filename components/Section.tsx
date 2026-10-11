import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/**
 * The repeated editorial layout: a heading on the top left, ruled off to the
 * right edge, with the section body full width beneath it.
 */
export default function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,44px)] pt-[clamp(56px,8vw,104px)]"
    >
      <div className="mb-[clamp(26px,3.6vw,44px)] flex items-center gap-[clamp(14px,2vw,22px)]">
        <span aria-hidden className="size-2.5 shrink-0 bg-acid" />
        <h2 className="m-0 text-[clamp(26px,3.4vw,40px)] font-bold uppercase leading-none tracking-[-0.035em]">
          {title}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-bone/14" />
      </div>
      {children}
    </section>
  );
}
