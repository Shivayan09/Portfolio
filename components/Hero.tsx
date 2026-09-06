import { RESUME_URL, profile } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-[1280px] px-[clamp(18px,4vw,44px)] pt-[clamp(26px,4vw,54px)] pb-[clamp(34px,5vw,60px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[120px] left-[4%] h-[480px] w-[640px] blur-[30px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(204,255,0,0.2) 0%, transparent 66%)",
        }}
      />

      <div className="relative grid animate-rise grid-cols-[minmax(0,1fr)] gap-[clamp(28px,4vw,44px)]">
        <h1 className="m-0 text-[clamp(52px,12.5vw,172px)] font-bold uppercase leading-[0.86] tracking-[-0.045em]">
          <span className="block">Software</span>
          <span className="stroke-text block [--stroke:var(--color-slate)]">
            engineer
          </span>
          <span className="block text-acid">who ships</span>
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(20px,3vw,44px)] border-t border-bone/14 pt-[22px]">
          <p className="m-0 max-w-[46ch] text-pretty text-[clamp(16px,1.5vw,19px)] text-mist">
            {profile.intro}
          </p>

          <div className="grid content-start gap-[7px] font-mono text-[12.5px] text-ash">
            <div>
              <span className="text-acid">›</span> {profile.location}
            </div>
            <div>
              <span className="text-acid">›</span> {profile.phone}
            </div>
            <div>
              <span className="text-acid">›</span> {profile.email}
              <span className="animate-blink text-acid">_</span>
            </div>
          </div>

          <div className="flex flex-wrap content-start gap-2.5">
            <a
              href="#projects"
              className="bg-acid px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-bone"
            >
              See the builds
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener"
              className="border border-bone/28 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-bone transition-colors hover:border-acid hover:text-acid"
            >
              Résumé ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
