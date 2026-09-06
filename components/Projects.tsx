import Section from "@/components/Section";
import { type Project, projects } from "@/lib/content";

export default function Projects() {
  return (
    <Section id="projects" index="03" label="Builds">
      <div className="grid gap-[18px]">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative overflow-hidden border border-bone/14 p-[clamp(22px,3.4vw,38px)] transition-colors hover:border-acid hover:bg-acid/[0.045]">
      <div
        aria-hidden
        className="stroke-text pointer-events-none absolute right-0 top-0 pr-[14px] pt-1.5 text-[clamp(70px,11vw,150px)] font-bold leading-[0.8] tracking-[-0.06em] [--stroke:rgba(242,243,238,0.1)]"
      >
        {project.number}
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-baseline gap-3.5">
          <h3 className="m-0 text-[clamp(26px,3.6vw,42px)] font-bold uppercase tracking-[-0.04em]">
            {project.name}
          </h3>
          <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-acid">
            {project.tagline}
          </span>
          <span className="ml-auto font-mono text-[11.5px] text-slate">
            {project.date}
          </span>
        </div>

        <ul className="m-0 mt-5 grid max-w-[70ch] list-none gap-[11px] p-0 text-mist">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="text-acid">▸</span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-[7px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-ash">
          {project.stack.map((item) => (
            <span key={item} className="bg-bone/[0.07] px-2.5 py-[5px]">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-2 font-mono text-[11px] uppercase tracking-[0.1em]">
          <a
            href={project.live}
            target="_blank"
            rel="noopener"
            className="border border-acid/45 px-[15px] py-[9px] text-acid transition-colors hover:bg-acid hover:text-ink"
          >
            Live ↗
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noopener"
            className="border border-bone/20 px-[15px] py-[9px] text-mist transition-colors hover:border-bone hover:text-bone"
          >
            Source ↗
          </a>
        </div>
      </div>
    </article>
  );
}
