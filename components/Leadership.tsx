import Section from "@/components/Section";
import { leadership } from "@/lib/content";

export default function Leadership() {
  return (
    <Section id="leadership" index="05" label="Lead">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {leadership.map((role) => (
          <div
            key={role.role}
            className="border-l-2 border-acid py-1 pl-5"
          >
            <div className="mb-2 font-mono text-[11.5px] text-ash">
              {role.period}
            </div>
            <h3 className="m-0 mb-1 text-[clamp(20px,2.3vw,26px)] font-bold tracking-[-0.03em]">
              {role.role}
            </h3>
            <div className="mb-3 font-mono text-[12px] tracking-[0.06em] text-acid">
              {role.org}
            </div>
            <p className="m-0 text-mist">{role.summary}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
