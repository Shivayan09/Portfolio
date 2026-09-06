import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,44px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))]">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`border-b border-bone/12 py-[30px] ${
              index === 0
                ? "pr-[22px]"
                : "border-l px-[22px]"
            }`}
          >
            <div className="stroke-text-thick text-[clamp(38px,5.4vw,68px)] font-bold leading-none tracking-[-0.05em] [--stroke:var(--color-acid)]">
              {stat.value}
            </div>
            <div className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ash">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
