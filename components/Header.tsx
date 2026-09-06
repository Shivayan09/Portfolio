"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/content";

/**
 * Sticky top bar. The section links light up as you scroll, driven by an
 * IntersectionObserver that picks the topmost visible section.
 */
export default function Header() {
  const activeId = useActiveSection();

  return (
    <header className="sticky top-0 z-40 border-b border-bone/10 bg-ink/86 backdrop-blur-[12px]">
      <div className="mx-auto flex min-h-[58px] max-w-[1280px] flex-wrap items-stretch gap-5 px-[clamp(18px,4vw,44px)]">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[15px] font-bold tracking-[-0.02em] text-bone"
        >
          <span className="grid size-[22px] place-items-center bg-acid font-mono text-[12px] font-bold text-ink">
            S
          </span>
          SHIVAYAN<span className="text-slate">/CHAKRAVARTY</span>
        </a>

        <nav className="ml-auto flex flex-wrap items-stretch font-mono">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center gap-1.5 border-l border-bone/10 border-b-2 px-[13px] text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  isActive
                    ? "border-b-acid text-acid"
                    : "border-b-transparent text-ash hover:bg-acid hover:text-ink"
                }`}
              >
                <span className="opacity-55">{section.index}</span>
                {section.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="flex items-center gap-1.5 border-l border-bone/10 bg-acid px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-bone"
          >
            Contact →
          </a>
        </nav>
      </div>
    </header>
  );
}

function useActiveSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (topmost) setActiveId(topmost.target.id);
      },
      { rootMargin: "-70px 0px -62% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return activeId;
}
