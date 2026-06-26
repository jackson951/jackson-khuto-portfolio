# Jackson Khuto — Portfolio

A personal portfolio site built with React, TypeScript, Tailwind CSS, and Vite.

## Stack

- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS v3
- lucide-react (icons)

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

This starts a local server (usually at `http://localhost:5173`) with hot reload.

Build for production:

```bash
npm run build
```

Output goes to the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

## Editing your content

All real content — name, contact info, work experience, education, the
stack list, and project entries — lives in one place:

```
src/data/portfolio.ts
```

Update that file to change anything text-based on the site without touching
the components. Each project entry includes a `repoUrl` and an optional
`liveUrl` — add a `liveUrl` once a project has a live deployed demo, and a
"Live" link will automatically appear on that project's card.

## Project structure

```
src/
  components/   All page sections (Header, Hero, About, Experience, Stack, Work, Contact, Footer)
  data/         portfolio.ts — single source of truth for all content
  index.css     Global styles, fonts, focus states
  App.tsx       Assembles all sections into the page
  main.tsx      React entry point
```

## Deploying

This is a static site after build — it can be deployed anywhere that serves
static files. A few common options:

**Vercel** (recommended, zero-config for Vite):
1. Push this project to a GitHub repo
2. Import the repo at vercel.com
3. Vercel auto-detects Vite — no configuration needed

**Netlify:**
1. Push to GitHub
2. New site from Git at netlify.com
3. Build command: `npm run build`, publish directory: `dist`

**GitHub Pages:**
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "npm run build && gh-pages -d dist"`
3. Set `base: '/your-repo-name/'` in `vite.config.ts`
4. Run `npm run deploy`

## Customizing the design

Colors, fonts, and animation tokens are defined in `tailwind.config.js`.
The palette:

- `ink` — main background (`#0B0E11`)
- `panel` — slightly lighter surface for cards/sections (`#11151A`)
- `line` — borders and dividers (`#1E2228`)
- `paper` — primary text color (`#EDEDE8`)
- `muted` / `slate` — secondary text colors
- `copper` / `copper-bright` — accent color used for emphasis and links
