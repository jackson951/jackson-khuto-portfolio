import { projects, site } from './data/site';

export const SITE_URL = site.url;
export const OG_IMAGE = `${SITE_URL}/og.jpg`;

export type RouteKey = 'home' | 'services' | 'about' | 'projects' | 'project' | 'skills' | 'contact' | 'notfound';

export const routeMeta: Record<RouteKey, { title: string; description: string }> = {
  home: {
    title: `${site.name} — ${site.tagline.replace(/\.$/, '')}`,
    description: site.description,
  },
  services: {
    title: `Services — ${site.name}`,
    description: 'Internal business tools, workflow automation, secure sign-in, APIs and integrations, dashboards and reporting, deployment and support.',
  },
  about: {
    title: `About — ${site.name}`,
    description: `${site.name} is a ${site.role.toLowerCase()} in ${site.location}, building business applications for teams of any size and industry.`,
  },

  projects: {
    title: `Projects — ${site.name}`,
    description: 'Case studies: leave management, approval workflows, workflow automation and more, with the problem, the approach and the architecture.',
  },
  project: {
    title: `Project — ${site.name}`,
    description: `Detailed case study for a ${site.name} software project.`,
  },
  skills: {
    title: `Skills — ${site.name}`,
    description: 'Frontend, backend, data, cloud, mobile and Power Platform skills used to build internal business software.',
  },
  contact: {
    title: `Contact — ${site.name}`,
    description: `Tell ${site.name} what you need built: an internal tool, an approval workflow, a dashboard, an integration, or a full-stack role.`,
  },
  notfound: {
    title: `Page not found — ${site.name}`,
    description: 'This page does not exist.',
  },
};

/** Every URL that is prerendered to static HTML at build time. */
export const staticPaths = ['/', '/services', '/projects', '/skills', '/about', '/contact', ...projects.map((p) => p.path)];

export const metaFor = (key: RouteKey, path: string) => {
  const project = key === 'project' ? projects.find((p) => p.path === path) : undefined;
  const meta = project ? { title: `${project.name} case study — ${site.name}`, description: project.longDescription } : routeMeta[key];
  return { ...meta, url: `${SITE_URL}${path === '/' ? '/' : path}`, noindex: key === 'notfound' };
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  description: routeMeta.home.description,
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  email: `mailto:${site.email}`,
  alumniOf: { '@type': 'CollegeOrUniversity', name: site.education.school },
  address: { '@type': 'PostalAddress', addressRegion: site.address.region, addressCountry: site.address.country },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ['Internal business tools', 'Workflow automation', 'Dashboards and reporting', 'Systems integration', 'React', 'TypeScript', 'Node.js', 'ASP.NET Core', 'Microsoft Azure', 'Microsoft Entra ID'],
};

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** <head> tags for a route, as an HTML string (used by the prerender step). */
export const renderHead = (key: RouteKey, path: string) => {
  const meta = metaFor(key, path);
  const t = escapeAttr(meta.title);
  const d = escapeAttr(meta.description);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex' : 'index, follow'}" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${meta.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="author" content="${escapeAttr(site.name)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(site.name)}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(`${site.name}: ${site.tagline}`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(personSchema).replace(/</g, '\\u003c')}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
};

export interface RouteState {
  key: RouteKey;
  path: string;
  project?: (typeof projects)[number];
}

const simpleRoutes: Record<string, RouteKey> = {
  '/services': 'services',
  '/about': 'about',
  '/projects': 'projects',
  '/skills': 'skills',
  '/contact': 'contact',
};

/** Maps a URL (query and hash ignored) to the page it shows. Shared by the browser router and the prerenderer. */
export const resolveRoute = (path: string): RouteState => {
  const pathname = path.split(/[?#]/)[0] || '/';
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const project = projects.find((item) => item.path === normalized);

  if (project) return { key: 'project', path: normalized, project };
  if (normalized === '/' || normalized === '') return { key: 'home', path: '/' };
  if (simpleRoutes[normalized]) return { key: simpleRoutes[normalized], path: normalized };
  return { key: 'notfound', path: normalized };
};
