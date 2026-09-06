import Section from "@/components/Section";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <Section id="experience" index="02" label="Work">
      <div
        className="relative border border-bone/14 p-[clamp(22px,3.4vw,40px)]"
        style={{
          background:
            "linear-gradient(150deg, rgba(204,255,0,0.06), rgba(6,6,7,0) 55%)",
        }}
      >
        <span
          aria-hidden
          className="absolute -left-px -top-px size-4 border-l-2 border-t-2 border-acid"
        />
        <span
          aria-hidden
          className="absolute -bottom-px -right-px size-4 border-b-2 border-r-2 border-acid"
        />

        <div className="flex flex-wrap items-baseline justify-between gap-[18px]">
          <h3 className="m-0 text-[clamp(22px,2.8vw,32px)] font-bold tracking-[-0.03em]">
            {experience.role}
          </h3>
          <span className="whitespace-nowrap font-mono text-[12px] text-ash">
            {experience.period}
          </span>
        </div>

        <div className="mb-[26px] mt-2 font-mono text-[12.5px] tracking-[0.06em] text-acid">
          {experience.company}
        </div>

        <ul className="m-0 grid max-w-[76ch] list-none gap-[18px] p-0">
          {experience.bullets.map((bullet, index) => (
            <li
              key={bullet}
              className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 text-mist"
            >
              <span className="pt-1 font-mono text-[11px] text-acid">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
