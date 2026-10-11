import { RESUME_URL, profile } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mt-[clamp(64px,9vw,116px)] border-t border-acid"
      style={{
        background:
          "linear-gradient(180deg, rgba(204,255,0,0.09), rgba(6,6,7,0) 70%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-[clamp(18px,4vw,44px)] pb-[clamp(30px,4vw,52px)] pt-[clamp(44px,7vw,92px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-end gap-[clamp(26px,4vw,60px)]">
          <div>
            <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.16em] text-acid">
              Contact
            </div>
            <h2 className="m-0 mb-4 text-balance text-[clamp(30px,5.6vw,68px)] font-bold uppercase leading-[0.96] tracking-[-0.045em]">
              Let&apos;s build
              <br />
              <span className="stroke-text [--stroke:var(--color-acid)]">
                something
              </span>
            </h2>
            <p className="m-0 max-w-[40ch] text-mist">
              Open to internships and full-stack roles. Email is fastest - I reply
              to everything.
            </p>
          </div>

          <div className="grid justify-items-start gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="break-all border-b border-acid/40 pb-1 font-mono text-[clamp(15px,2vw,22px)] text-acid transition-colors hover:border-bone hover:text-bone"
            >
              {profile.email}
            </a>
            <a
              href={profile.phoneHref}
              className="font-mono text-[14px] text-mist transition-colors hover:text-bone"
            >
              {profile.phone}
            </a>

            <div className="mt-1.5 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.1em]">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener"
                className="border border-bone/22 px-4 py-2.5 text-bone transition-colors hover:border-acid hover:text-acid"
              >
                LinkedIn ↗
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener"
                className="border border-bone/22 px-4 py-2.5 text-bone transition-colors hover:border-acid hover:text-acid"
              >
                GitHub ↗
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener"
                className="bg-acid px-4 py-2.5 font-bold text-ink transition-colors hover:bg-bone"
              >
                Résumé ↓
              </a>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(44px,7vw,88px)] flex flex-wrap justify-between gap-[18px] border-t border-bone/14 pt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-slate">
          <span>© 2026 {profile.name}</span>
          <span>Guwahati, India</span>
          <a href="#top" className="text-slate transition-colors hover:text-acid">
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}
