"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/lib/content";

/**
 * Sticky top bar. Section links light up as you scroll, driven by an
 * IntersectionObserver that picks the topmost visible section.
 *
 * Seven items plus the wordmark do not fit below ~1024px, so under `lg` the
 * nav collapses behind a toggle and drops down as a stacked panel.
 */
export default function Header() {
  const activeId = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useCloseOnEscape(menuOpen, closeMenu);
  useCloseOnDesktop(closeMenu);

  return (
    <header className="sticky top-0 z-40 border-b border-bone/10 bg-ink/86 backdrop-blur-[12px]">
      <div className="mx-auto flex min-h-[58px] max-w-[1280px] items-stretch gap-5 px-[clamp(18px,4vw,44px)]">
        <a
          href="#top"
          onClick={closeMenu}
          className="flex items-center gap-2.5 text-[15px] font-bold tracking-[-0.02em] text-bone"
        >
          <span className="grid size-[22px] place-items-center bg-acid font-mono text-[12px] font-bold text-ink">
            S
          </span>
          SHIVAYAN<span className="text-slate">/CHAKRAVARTY</span>
        </a>

        {/* Desktop rail */}
        <nav className="ml-auto hidden items-stretch font-mono lg:flex">
          {sections.map((section) => (
            <NavLink
              key={section.id}
              section={section}
              isActive={activeId === section.id}
              edge="b"
              className="border-l border-bone/10 border-b-2 px-[13px] text-[11px]"
            />
          ))}
          <a
            href="#contact"
            className="flex items-center border-l border-bone/10 bg-acid px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-bone"
          >
            Contact →
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-auto flex items-center gap-2.5 self-center border border-bone/20 px-3.5 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-bone transition-colors hover:border-acid hover:text-acid lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
          <span aria-hidden className="grid h-[9px] w-3.5 place-items-center">
            <span
              className={`col-start-1 row-start-1 h-px w-full bg-current transition-transform duration-200 ${
                menuOpen ? "rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`col-start-1 row-start-1 h-px w-full bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`col-start-1 row-start-1 h-px w-full bg-current transition-transform duration-200 ${
                menuOpen ? "-rotate-45" : "translate-y-[4px]"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav
        id="mobile-nav"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full border-b border-bone/10 bg-ink/98 font-mono backdrop-blur-[12px] lg:hidden"
      >
        {sections.map((section) => (
          <NavLink
            key={section.id}
            section={section}
            isActive={activeId === section.id}
            edge="l"
            onClick={closeMenu}
            className="border-t border-bone/10 border-l-2 px-[clamp(18px,4vw,44px)] py-3.5 text-[12px]"
          />
        ))}
        <a
          href="#contact"
          onClick={closeMenu}
          className="flex items-center justify-between bg-acid px-[clamp(18px,4vw,44px)] py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-ink"
        >
          Contact <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  );
}

type Section = (typeof sections)[number];

function NavLink({
  section,
  isActive,
  edge,
  onClick,
  className,
}: {
  section: Section;
  isActive: boolean;
  /** Which edge carries the active marker: bottom on desktop, left on mobile. */
  edge: "b" | "l";
  onClick?: () => void;
  className: string;
}) {
  const marker = isActive
    ? edge === "b"
      ? "border-b-acid text-acid"
      : "border-l-acid text-acid"
    : edge === "b"
      ? "border-b-transparent text-ash hover:bg-acid hover:text-ink"
      : "border-l-transparent text-ash hover:bg-acid hover:text-ink";

  return (
    <a
      href={`#${section.id}`}
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className={`flex items-center gap-1.5 uppercase tracking-[0.1em] transition-colors ${className} ${marker}`}
    >
      <span className="opacity-55">{section.index}</span>
      {section.label}
    </a>
  );
}

function useCloseOnEscape(active: boolean, close: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, close]);
}

/** Drop the open state when the viewport grows past the `lg` breakpoint. */
function useCloseOnDesktop(close: () => void) {
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const onChange = () => {
      if (query.matches) closeRef.current();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
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
