import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
};

/**
 * The repeated editorial layout: a monospaced `01 About` rail on the left and
 * the section body on the right. The rail stacks above the body below `md`.
 */
export default function Section({ id, index, label, children }: SectionProps) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,44px)] pt-[clamp(56px,8vw,104px)]"
    >
      <div className="grid grid-cols-1 gap-[clamp(22px,4vw,52px)] md:grid-cols-[minmax(0,210px)_minmax(0,1fr)]">
        <div className="flex items-baseline gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-acid">
          <span className="text-char">{index}</span>
          {label}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
