import Section from "@/components/Section";
import { about } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" title="About">
      <h3 className="m-0 mb-6 max-w-[24ch] text-balance text-[clamp(28px,4.4vw,54px)] font-bold uppercase leading-[1.02] tracking-[-0.035em]">
        Systems that hold up
        <br />
        under <span className="text-acid">load</span>.
      </h3>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(20px,3vw,44px)]">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="m-0 text-pretty text-mist">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-[30px] flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
        {about.tags.map((tag) => (
          <span
            key={tag.label}
            className={`border px-3 py-[7px] ${
              tag.accent
                ? "border-acid/40 text-acid"
                : "border-bone/20 text-mist"
            }`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </Section>
  );
}
