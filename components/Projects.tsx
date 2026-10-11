import ProjectGallery from "@/components/ProjectGallery";
import Section from "@/components/Section";
import { type Project, projects } from "@/lib/content";

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="border-b border-bone/10">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.name}
            project={project}
            mirrored={index % 2 === 1}
          />
        ))}
      </div>
    </Section>
  );
}

/**
 * An open editorial row: screenshot on one side, write-up on the other,
 * divided from the next project by a hairline. Alternate rows swap sides.
 */
function ProjectRow({
  project,
  mirrored,
}: {
  project: Project;
  mirrored: boolean;
}) {
  return (
    <article className="grid items-center gap-[clamp(28px,4.5vw,64px)] border-t border-bone/10 py-[clamp(36px,5vw,64px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {project.images.length > 0 && (
        <div className={mirrored ? "lg:order-2" : ""}>
          <ProjectGallery
            name={project.name}
            url={project.live}
            images={project.images}
          />
        </div>
      )}

      <div>
        <div className="font-mono text-[11.5px] tracking-[0.06em] text-slate">
          <span className="text-acid">{project.number}</span>
          <span className="mx-2.5 text-char">/</span>
          {project.date}
        </div>

        <h3 className="m-0 mt-4 text-[clamp(32px,4vw,52px)] font-bold uppercase leading-[0.92] tracking-[-0.045em]">
          {project.name}
        </h3>
        <p className="m-0 mt-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-acid">
          {project.tagline}
        </p>

        <ul className="m-0 mt-6 grid list-none gap-2.5 p-0 text-[15px] leading-[1.55] text-mist">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span aria-hidden className="text-acid">
                —
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <p className="m-0 mt-6 font-mono text-[11px] uppercase leading-[1.8] tracking-[0.08em] text-ash">
          {project.stack.join(" · ")}
        </p>

        <div className="mt-6 flex gap-6 font-mono text-[11.5px] uppercase tracking-[0.1em]">
          <a
            href={project.live}
            target="_blank"
            rel="noopener"
            className="border-b border-acid pb-1 text-acid transition-colors hover:border-bone hover:text-bone"
          >
            Live site ↗
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noopener"
            className="border-b border-bone/25 pb-1 text-mist transition-colors hover:border-bone hover:text-bone"
          >
            Source ↗
          </a>
        </div>
      </div>
    </article>
  );
}
