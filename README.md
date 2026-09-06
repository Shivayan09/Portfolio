# Portfolio — Shivayan Chakravarty

Next.js 15 (App Router) implementation of the "Portfolio v2" design canvas.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

| Path | What's in it |
| --- | --- |
| `app/layout.tsx` | Fonts (Space Grotesk / JetBrains Mono), metadata, `<html>` shell |
| `app/globals.css` | Tailwind v4 `@theme` tokens (palette, fonts, keyframes) + text-stroke helpers |
| `app/page.tsx` | Section order |
| `lib/content.ts` | Every piece of copy — edit here, not in the components |
| `components/` | One file per section, plus `Section` (the numbered rail layout) and `GridField` |

`components/Header.tsx` is the only client component; it runs the
IntersectionObserver that highlights the active nav item while scrolling.

## Before deploying

1. **Résumé** — drop the PDF at `public/Shivayan-Chakravarty-Resume.pdf`
   (the filename `RESUME_URL` in `lib/content.ts` points at). Nothing renders
   the file, so the link 404s until it's there.
2. **Links** — `profile.linkedin`, `profile.github`, and each project's
   `live` / `source` are `"#"` placeholders in `lib/content.ts`.

## Design tokens

| Token | Value | Used for |
| --- | --- | --- |
| `ink` | `#060607` | page background |
| `bone` | `#f2f3ee` | primary text |
| `acid` | `#ccff00` | accent |
| `mist` | `#b6b9ae` | body copy |
| `ash` | `#8a8d82` | mono labels |
| `slate` | `#6f7268` | footer / de-emphasised |
| `char` | `#4d4f47` | section numerals |

Alpha variants use Tailwind's opacity modifier, e.g. `border-bone/14`.
