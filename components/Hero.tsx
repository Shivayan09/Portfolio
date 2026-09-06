import RocketLaunch from "@/components/RocketLaunch";
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

      <div className="relative grid animate-rise gap-[clamp(28px,4vw,44px)]">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)]">
          <h1 className="m-0 text-[clamp(46px,11.2vw,154px)] font-bold uppercase leading-[0.86] tracking-[-0.045em]">
            {/* All three lines are set flush to the same width. Measured from
                Space Grotesk Bold at this tracking, the words run 4.762em /
                4.200em / 4.815em, so each is scaled up to WHO SHIPS' 4.815em -
                the widest line keeps the h1 size, so the block's footprint is
                unchanged. Tracking is redeclared per line so it resolves against
                that line's own font-size rather than inheriting the h1's
                absolute value, which is what keeps the widths exact. */}
            <span className="block text-[1.011em] tracking-[-0.045em]">
              Software
            </span>
            <span className="block text-[1.146em] tracking-[-0.045em]">
              engineer
            </span>
            <span className="block text-acid">who ships</span>
          </h1>

          <RocketLaunch />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-[clamp(20px,3vw,44px)] gap-y-6 border-t border-bone/14 pt-[22px]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[14px] text-ash">
            <span>
              <span className="text-acid">›</span> {profile.location}
            </span>
            <span>
              <span className="text-acid">›</span> {profile.phone}
            </span>
            <span>
              <span className="text-acid">›</span> {profile.email}
              <span className="animate-blink text-acid">_</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
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
