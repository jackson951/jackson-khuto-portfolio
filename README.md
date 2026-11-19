# Jackson Khuto — Portfolio

A personal portfolio site built with React, TypeScript, Tailwind CSS, and Vite.
Every page is prerendered to static HTML at build time, so search engines and
link previews see the full content.

## Stack

- React 19 + TypeScript
- Vite (build tool) with build-time prerendering (`scripts/prerender.mjs`)
- Tailwind CSS v3
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload, usually http://localhost:5173
npm run build     # type-check, build, prerender every page into dist/
npm run lint
```

## How to update content

**Almost everything you'll ever change is in one file: `src/data/site.ts`.**

| To change…                                   | Edit in `src/data/site.ts`             |
| -------------------------------------------- | -------------------------------------- |
| Name, email, GitHub, LinkedIn, location      | `site`                                 |
| Headline, subhead, search/preview description | `site.tagline`, `site.subhead`, `site.description` |
| "Available for projects" badge               | `site.availability` (set to `null` to hide) |
| Short bio (homepage) / summary (About page)  | `site.bio`, `site.summary`             |
| Skills                                       | `stackGroups` (empty groups are hidden) |
| Projects (pages under `/projects`)           | `projects`                             |
| Homepage case studies                        | `caseStudies`                          |

**Updating your CV:** replace `public/Jackson_Khuto_CV.pdf` with the new file
(same name). If you rename it, update `site.cvPath`.

**Adding a case study:** append an object to `caseStudies`. Write the problem,
what you built, and the outcome in plain business language; put the tech in
`stack`. Anything in `[square brackets]` is treated as a placeholder: it is
highlighted when you run `npm run dev` and hidden in production builds, so
unfinished text never goes live. Add a screenshot with
`media: { kind: 'image', src: '/case-studies/name.webp', alt: '…' }` (put the
file in `public/case-studies/`).

**Keep it timeless.** Describe what you do, not your current job title or
employer, and never hard-code "X years of experience". If you need a number,
use `yearsOfExperience()`, which is calculated from `site.startYear`.
Titles and employers belong on LinkedIn and in the CV.

Rarely needed:

- `src/data/copy.ts`: wording for the services, "problems I solve", process
  and audience sections. Nothing personal lives here.
- `src/seo.ts`: per-page titles and descriptions. Personal details come from
  `site.ts` automatically.
- `index.html`: the favicon shows the initials "jk".

After any change, run `npm run build` to check everything still compiles.

## Project structure

```
src/
  data/site.ts        Everything personal or time-sensitive (edit this)
  data/copy.ts        Generic page copy (services, problems, process)
  components/         Reusable UI: Header, Footer, CaseStudy, ArchitectureFlow, …
  App.tsx             Pages and routing
  seo.ts              Per-page meta tags, JSON-LD and the route list
  entry-server.tsx    Build-time renderer used by the prerender step
  main.tsx            Browser entry (hydrates the prerendered HTML)
scripts/prerender.mjs Writes one HTML file per page, 404.html and sitemap.xml
api/contact.js        Vercel function behind the contact form
```

## Deploying

Deployed on **Vercel**. `vercel.json` turns on `cleanUrls`, so `/services` is
served from `services.html` and unknown URLs get `404.html`. The contact form
needs these environment variables in Vercel: `SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASS`, `CONTACT_TO` (optional: `SMTP_SECURE`, `CONTACT_FROM`).

If you add a new page, add its path to `staticPaths` in `src/seo.ts` so it is
prerendered and included in `sitemap.xml`.

## Customizing the design

Colors, fonts, and animation tokens are defined in `tailwind.config.js`:

- `ink`: main background (`#0B0E11`)
- `panel`: slightly lighter surface for cards/sections (`#11151A`)
- `line`: borders and dividers (`#1E2228`)
- `paper`: primary text color (`#EDEDE8`)
- `muted` / `slate`: secondary text colors (both pass WCAG AA contrast)
- `copper` / `copper-bright`: accent color used for emphasis and links
