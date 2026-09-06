import Section from "@/components/Section";
import { engineeringSkills, skillGroups } from "@/lib/content";

export default function Skills() {
  return (
    <Section id="skills" index="04" label="Stack">
      <div className="grid">
        {skillGroups.map((group) => (
          <SkillRow key={group.label} label={group.label}>
            <div className="flex flex-wrap gap-x-[18px] gap-y-[7px] text-[15px] text-pale">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </SkillRow>
        ))}

        <SkillRow label="Engineering" last>
          <p className="m-0 max-w-[70ch] text-mist">{engineeringSkills}</p>
        </SkillRow>
      </div>
    </Section>
  );
}

function SkillRow({
  label,
  last,
  children,
}: {
  label: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-1 items-start gap-[18px] border-t border-bone/14 py-[22px] sm:grid-cols-[minmax(0,150px)_minmax(0,1fr)] ${
        last ? "border-b" : ""
      }`}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-acid">
        {label}
      </div>
      {children}
    </div>
  );
}
