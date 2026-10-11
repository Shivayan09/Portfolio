import Section from "@/components/Section";
import { education } from "@/lib/content";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div>
        {education.map((entry, index) => (
          <div
            key={entry.degree}
            className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-t border-bone/14 py-5 ${
              index === education.length - 1 ? "border-b" : ""
            }`}
          >
            <div>
              <div className="text-[18px] font-medium tracking-[-0.02em]">
                {entry.degree}
              </div>
              <div className="mt-1.5 font-mono text-[12px] text-ash">
                {entry.institution} · {entry.resultPrefix}
                <span className="text-acid">{entry.result}</span>
              </div>
            </div>
            <div className="whitespace-nowrap font-mono text-[12px] text-mist">
              {entry.years}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
