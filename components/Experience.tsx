"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Attachments from "@/components/Attachments";
import Section from "@/components/Section";
import { type ExperienceEntry, experience } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

const COUNT = experience.length;
/** Height of the sticky site header, which the pinned box sits beneath. */
const HEADER = 58;
/** Scroll distance per company, as a fraction of the viewport height. */
const STEP = 0.75;
/** Must match the `stage` custom variant in globals.css. */
const STAGE_QUERY = "(min-width: 64rem)";

/**
 * One framed box: a mini navigator of every company on the left, and the
 * selected company's details on the right. On large screens the box is
 * pinned while the page scrolls through a tall track, and scroll position
 * picks the company. On small screens the navigator becomes a strip across
 * the top of the box and companies are switched by tapping.
 */
export default function Experience() {
  const [active, setActive] = useState(0);
  const [staged, setStaged] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia(STAGE_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      setStaged(media.matches);
      if (!media.matches || !track.current) return;

      const step = window.innerHeight * STEP;
      const scrolled = HEADER - track.current.getBoundingClientRect().top;
      const fraction = scrolled / ((COUNT - 0.4) * step);
      progress.current?.style.setProperty(
        "scale",
        `1 ${Math.min(1, Math.max(0, fraction))}`,
      );
      setActive(Math.min(COUNT - 1, Math.max(0, Math.floor(scrolled / step))));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  /**
   * Pinned: scroll the track to where company `index` is on show.
   * Unpinned: switch to it directly and bring its tab into view.
   */
  const select = (index: number, focus = false) => {
    const next = Math.min(COUNT - 1, Math.max(0, index));
    if (staged && track.current) {
      const top = track.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: top - HEADER + next * window.innerHeight * STEP + 2,
      });
    } else {
      setActive(next);
      tabs.current[next]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      event.key
    ];
    if (step === undefined) return;
    event.preventDefault();
    select(active + step, true);
  };

  return (
    <Section id="experience" title="Experience">
      <div
        ref={track}
        style={{ "--count": COUNT } as CSSProperties}
        className="stage:h-[calc(100vh_-_58px_+_(var(--count)_-_0.4)_*_75vh)]"
      >
        <div className="stage:sticky stage:top-[58px] stage:flex stage:h-[calc(100vh_-_58px)] stage:items-center stage:py-6">
          <div
            className="relative grid w-full grid-cols-1 border border-bone/14 stage:h-full stage:max-h-[680px] stage:grid-cols-[minmax(0,250px)_minmax(0,1fr)] stage:grid-rows-[minmax(0,1fr)]"
            style={{
              background:
                "linear-gradient(150deg, rgba(204,255,0,0.06), rgba(6,6,7,0) 55%)",
            }}
          >
            <span
              aria-hidden
              className="absolute -left-px -top-px z-10 size-4 border-l-2 border-t-2 border-acid"
            />
            <span
              aria-hidden
              className="absolute -bottom-px -right-px z-10 size-4 border-b-2 border-r-2 border-acid"
            />

            <nav
              aria-label="Companies"
              className="flex min-w-0 flex-col border-b border-bone/14 bg-bone/[0.02] stage:border-b-0 stage:border-r"
            >
              <div className="hidden px-5 pb-2 pt-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-slate stage:block">
                {pad(COUNT)} companies
              </div>

              <div
                onKeyDown={onKeyDown}
                className="relative flex snap-x scroll-px-3 gap-2 overflow-x-auto p-3 [scrollbar-width:none] stage:flex-col stage:gap-0 stage:overflow-visible stage:p-0"
              >
                <span
                  ref={progress}
                  aria-hidden
                  style={{ scale: "1 0" }}
                  className="absolute left-0 top-0 hidden h-full w-0.5 origin-top bg-acid stage:block"
                />
                {experience.map((entry, index) => {
                  const selected = index === active;
                  return (
                    <button
                      key={entry.company}
                      ref={(el) => {
                        tabs.current[index] = el;
                      }}
                      type="button"
                      aria-current={selected ? "step" : undefined}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(index)}
                      className={`group flex shrink-0 cursor-pointer snap-start items-center gap-3 border px-3 py-2.5 text-left transition-colors duration-300 stage:border-0 stage:px-5 stage:py-3 ${
                        selected
                          ? "border-acid bg-acid/[0.08]"
                          : "border-bone/14 hover:bg-bone/[0.04]"
                      }`}
                    >
                      <CompanyMark job={entry} size="sm" />
                      <span className="min-w-0">
                        <span
                          className={`flex items-center gap-2 whitespace-nowrap text-[15px] font-bold tracking-[-0.01em] transition-colors ${
                            selected
                              ? "text-bone"
                              : "text-mist group-hover:text-bone"
                          }`}
                        >
                          {entry.short}
                          {entry.current && (
                            <span
                              aria-label="current"
                              className="size-1.5 animate-pulse rounded-full bg-acid"
                            />
                          )}
                        </span>
                        <span
                          className={`mt-0.5 block whitespace-nowrap font-mono text-[10.5px] tracking-[0.04em] transition-colors ${
                            selected ? "text-acid" : "text-slate"
                          }`}
                        >
                          {entry.period}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden items-center justify-between border-t border-bone/10 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ash stage:mt-auto stage:flex">
                <span>
                  <span className="text-acid">{pad(active + 1)}</span> /{" "}
                  {pad(COUNT)}
                  <span className="ml-3 text-[10px] text-char">Scroll ↓</span>
                </span>
                <div className="flex gap-1.5">
                  <PagerButton
                    label="Previous company"
                    disabled={active === 0}
                    onClick={() => select(active - 1)}
                  >
                    ↑
                  </PagerButton>
                  <PagerButton
                    label="Next company"
                    disabled={active === COUNT - 1}
                    onClick={() => select(active + 1)}
                  >
                    ↓
                  </PagerButton>
                </div>
              </div>
            </nav>

            <div className="grid min-h-0 min-w-0 grid-cols-1 stage:grid-rows-[minmax(0,1fr)]">
              {experience.map((entry, index) => {
                const position =
                  index === active ? "now" : index < active ? "past" : "next";
                return (
                  <div
                    key={entry.company}
                    inert={index !== active}
                    className={`[grid-area:1/1] min-h-0 overflow-y-auto [scrollbar-width:thin] stage:block stage:transition-[opacity,translate] stage:duration-500 stage:ease-out ${
                      position === "now"
                        ? "animate-rise stage:translate-y-0 stage:animate-none stage:opacity-100"
                        : `hidden stage:pointer-events-none stage:opacity-0 ${
                            position === "past"
                              ? "stage:-translate-y-8"
                              : "stage:translate-y-8"
                          }`
                    }`}
                  >
                    <ExperienceDetails job={entry} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-ash stage:hidden">
        <span>
          <span className="text-acid">{pad(active + 1)}</span> / {pad(COUNT)}
        </span>
        <div className="flex gap-2">
          <PagerButton
            label="Previous company"
            disabled={active === 0}
            onClick={() => select(active - 1)}
          >
            ← Prev
          </PagerButton>
          <PagerButton
            label="Next company"
            disabled={active === COUNT - 1}
            onClick={() => select(active + 1)}
          >
            Next →
          </PagerButton>
        </div>
      </div>
    </Section>
  );
}

function PagerButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer border border-bone/20 px-3 py-[7px] uppercase text-mist transition-colors hover:border-acid hover:text-acid disabled:cursor-default disabled:opacity-35 disabled:hover:border-bone/20 disabled:hover:text-mist"
    >
      {children}
    </button>
  );
}

function ExperienceDetails({ job }: { job: ExperienceEntry }) {
  const multiRole = job.roles.length > 1;

  return (
    <div className="p-[clamp(22px,3vw,36px)]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <CompanyMark job={job} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[12.5px] uppercase tracking-[0.06em] text-acid">
            {job.company}
          </div>
          <div className="mt-1 font-mono text-[11.5px] text-ash">
            {job.location} ·{" "}
            <span className="whitespace-nowrap">{job.mode}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[12px] text-ash">
          {job.current && (
            <span className="flex items-center gap-1.5 border border-acid/40 px-2 py-[3px] text-[10px] tracking-[0.1em] text-acid">
              <span className="size-1.5 animate-pulse rounded-full bg-acid" />
              NOW
            </span>
          )}
          {job.period}
        </div>
      </div>

      <div
        className={`mt-[26px] grid gap-[30px] ${
          multiRole
            ? "ml-[7px] border-l border-bone/14 pl-[clamp(18px,2.6vw,28px)]"
            : ""
        }`}
      >
        {job.roles.map((role) => (
          <div key={role.title} className="relative">
            {multiRole && (
              <span
                aria-hidden
                className="absolute -left-[calc(clamp(18px,2.6vw,28px)+4.5px)] top-[0.55em] size-2 bg-acid"
              />
            )}
            <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-x-[18px] gap-y-1">
              <h3 className="m-0 text-[clamp(22px,2.8vw,32px)] font-bold tracking-[-0.03em]">
                {role.title}
              </h3>
              {role.period && (
                <span className="whitespace-nowrap font-mono text-[12px] text-ash">
                  {role.period}
                </span>
              )}
            </div>

            <ul className="m-0 grid max-w-[76ch] list-none gap-[18px] p-0">
              {role.bullets.map((bullet, index) => (
                <li
                  key={bullet}
                  className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 text-mist"
                >
                  <span className="pt-1 font-mono text-[11px] text-acid">
                    {pad(index + 1)}
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-[28px] flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-[22px]">
        <div className="flex flex-wrap gap-[7px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-ash">
          {job.skills.map((skill) => (
            <span key={skill} className="bg-bone/[0.07] px-2.5 py-[5px]">
              {skill}
            </span>
          ))}
        </div>
        {job.attachments.length > 0 && (
          <Attachments company={job.company} attachments={job.attachments} />
        )}
      </div>
    </div>
  );
}

/** Square logo tile, or a monogram in the same frame when there's no logo. */
function CompanyMark({
  job,
  size,
}: {
  job: ExperienceEntry;
  size: "sm" | "lg";
}) {
  const frame = size === "lg" ? "size-14" : "size-10";
  const tone =
    job.logoTile === "light"
      ? "bg-bone border-bone p-1"
      : job.logoTile === "bleed"
        ? "border-bone/14 p-0"
        : "bg-bone/[0.04] border-bone/14 p-2";

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden border ${frame} ${
        job.logo ? tone : "border-bone/14 bg-bone/[0.04]"
      }`}
    >
      {job.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={job.logo}
          alt={size === "lg" ? `${job.company} logo` : ""}
          className="size-full object-contain"
        />
      ) : (
        <span
          className={`font-mono font-bold tracking-[0.04em] text-bone ${
            size === "lg" ? "text-[13px]" : "text-[11px]"
          }`}
        >
          {job.monogram}
        </span>
      )}
    </span>
  );
}
