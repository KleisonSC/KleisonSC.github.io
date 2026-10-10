# Kleison Silva — Portfolio

A cyberpunk-minimalist personal portfolio (Blade Runner 2049 palette: deep purple + acid green on near-black). Built as a fully static site for GitHub Pages.

**Stack:** Next.js 15 (App Router, `output: 'export'`) · TypeScript · Tailwind CSS v4 · next-intl (EN/FR/PT/ES) · Framer Motion · React Three Fiber + drei · Lenis · KaTeX.

---

## Prerequisites

- **Node.js 20+** and **npm** — <https://nodejs.org>
- **Git** — <https://git-scm.com>

## Local development

```bash
npm install      # first time only
npm run dev      # http://localhost:3000  (redirects to your browser's locale)
npm run build    # static export to ./out
npm run serve    # preview the exported ./out locally
npm run lint
```

> **Windows note:** the npm scripts run through `scripts/run-with-swc.mjs`, which
> pins SWC's native cache to a project-local folder (`.swc-native-cache`). This
> works around a Windows-only "Failed to load native binding" error that can
> occur when the default cache directory sits on a sandbox-restricted ACL. It is
> a no-op on macOS, Linux and CI.

---

## Deploying to GitHub Pages

The repository ships with `.github/workflows/deploy.yml`, which builds and
deploys on every push to `main`.

1. Create a new GitHub repository and push this project to it.
2. In the repo: **Settings → Pages → Build and deployment → Source = "GitHub Actions"**.
3. Push to `main`. The workflow builds the static export and publishes it.

### basePath is automatic

`actions/configure-pages` detects whether this is a **user/org site** or a
**project site** and sets the correct base path for you:

| Repository name              | URL                                         | base path    |
| ---------------------------- | ------------------------------------------- | ------------ |
| `kleisonsilva.github.io`     | `https://kleisonsilva.github.io/`           | *(empty)*    |
| `portfolio` (or any name)    | `https://kleisonsilva.github.io/portfolio/` | `/portfolio` |

Nothing to edit — the build reads `NEXT_PUBLIC_BASE_PATH` from the workflow.

To build locally **as if** under a sub-path:

```bash
# PowerShell
$env:NEXT_PUBLIC_BASE_PATH="/portfolio"; npm run build
# bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

### Update your identity

Edit `src/lib/site.ts` — set your real **GitHub URL** (and confirm email,
LinkedIn, Kaggle). These feed the header, footer and contact page.

---

## Editing content

Almost everything is data-driven. After editing data, also add the matching
text to **each** locale file in `src/i18n/messages/` (`en`, `fr`, `pt`, `es`).

| What                     | File                                                        |
| ------------------------ | ----------------------------------------------------------- |
| Projects                 | `src/data/projects.ts` (+ `projects.items.<slug>` messages) |
| Skills & levels          | `src/data/skills.ts`                                        |
| Career timeline          | `src/data/timeline.ts` (+ `about.timeline.<id>` messages)   |
| PhD axes / roadmap       | `src/data/phd.ts` (+ `phd.*` messages)                      |
| **PhD changelog**        | `updates[]` in `src/data/phd.ts` — just add entries         |
| **PhD publications**     | `publications[]` in `src/data/phd.ts`                       |
| All copy / translations  | `src/i18n/messages/<locale>.json`                           |

Adding a **project**: append an object to `projects.ts`, add
`projects.items.<slug>.{title,summary,description}` to each locale file, and
(optionally) a matching visual in `src/components/projects/ProjectVisual.tsx`.
The card and the `/projects/<slug>` page are generated automatically.

### Swapping the 3D statue

The hero shows a procedural wireframe monument. To use a real model, drop a
CC0 Greek bust as `public/models/statue.glb` and load it with `useGLTF` in
`src/components/home/three/StatueCanvas.tsx` (replace `BustForm`). A static
SVG poster is shown under reduced-motion and while the canvas loads.

### Replacing the CV

Replace `public/cv/Kleison_Silva_CV.pdf` (keep the filename, or update
`cvPath` in `src/lib/site.ts`).

---

## Accessibility

Respects `prefers-reduced-motion` (disables 3D, glitch, grain and smooth
scroll) and targets AA contrast. The custom cursor is disabled on touch
devices.

## Project structure

```
src/
  app/[locale]/        routes: home, about, projects, projects/[slug], phd, contact
  components/          layout, home, about, projects, phd, contact, ui, system
  data/                projects, skills, timeline, phd
  i18n/                routing, request config, navigation, messages/
  lib/                 site config, asset(), hooks
```
