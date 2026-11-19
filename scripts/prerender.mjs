// Turns the client build into static HTML pages, so crawlers and link previews
// see real content instead of an empty <div id="root">.
//
// Runs after `vite build` (client) and `vite build --ssr` (server bundle):
//   dist/index.html            -> template
//   dist-ssr/entry-server.js   -> render(path) => { html, head }
// Writes one HTML file per route (e.g. dist/services.html, dist/projects/flowforge.html),
// a 404.html, and sitemap.xml. Vercel serves /services from services.html via `cleanUrls`.

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

let template = await readFile(join(dist, 'index.html'), 'utf-8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> placeholders');
}

// Inline the (small, ~6 KB gzipped) stylesheet so the first paint doesn't wait on an extra request.
const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLink) {
  const css = await readFile(join(dist, cssLink[1]), 'utf-8');
  template = template.replace(cssLink[0], () => `<style>${css}</style>`);
  console.log(`  inlined ${cssLink[1]} (${(css.length / 1024).toFixed(1)} KB)`);
}

const { render, staticPaths, SITE_URL } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);

const write = async (file, path) => {
  const { html, head } = render(path);
  if (!html.trim()) throw new Error(`Rendered empty HTML for ${path}`);
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  const out = join(dist, file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, page);
  console.log(`  prerendered ${path.padEnd(28)} -> dist/${file}`);
};

for (const path of staticPaths) await write(fileFor(path), path);
await write('404.html', '/404');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod><priority>${path === '/' ? '1.0' : '0.7'}</priority></url>`)
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
console.log(`  wrote sitemap.xml (${staticPaths.length} URLs)`);

await rm(ssrDir, { recursive: true, force: true });
