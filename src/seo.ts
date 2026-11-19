import { profile, projects } from './data/portfolio';

export const SITE_URL = 'https://jackson-khuto-portfolio.vercel.app';
export const OG_IMAGE = `${SITE_URL}/og.jpg`;

export type RouteKey = 'home' | 'services' | 'about' | 'experience' | 'projects' | 'project' | 'skills' | 'contact' | 'notfound';

export const routeMeta: Record<RouteKey, { title: string; description: string }> = {
  home: {
    title: 'Jackson Khuto — Software that takes the busywork off your team',
    description:
      'I build internal tools, approval workflows, dashboards and mobile apps for service and equipment businesses, replacing spreadsheets, email chains and paper job cards.',
  },
  services: {
    title: 'Services — Jackson Khuto',
    description: 'Internal business tools, workflow automation, secure sign-in, APIs and integrations, dashboards and reporting, deployment and support.',
  },
  about: {
    title: 'About — Jackson Khuto',
    description: 'Jackson Khuto is a full-stack developer in Gauteng, South Africa, building internal business software. BSc IT, North-West University.',
  },
  experience: {
    title: 'Experience — Jackson Khuto',
    description: 'Internal business applications, approval workflows, identity and security, reporting, deployment and support.',
  },
  projects: {
    title: 'Projects — Jackson Khuto',
    description: 'Case studies: leave management, approval workflows, workflow automation and more, with the problem, the approach and the architecture.',
  },
  project: {
    title: 'Project — Jackson Khuto',
    description: 'Detailed case study for a Jackson Khuto software project.',
  },
  skills: {
    title: 'Skills — Jackson Khuto',
    description: 'Frontend, backend, data, cloud, mobile and Power Platform skills used to build internal business software.',
  },
  contact: {
    title: 'Contact — Jackson Khuto',
    description: 'Tell Jackson Khuto what you need built: an internal tool, an approval workflow, a dashboard, an integration, or a full-stack role.',
  },
  notfound: {
    title: 'Page not found — Jackson Khuto',
    description: 'This page does not exist.',
  },
};

/** Every URL that is prerendered to static HTML at build time. */
export const staticPaths = ['/', '/services', '/projects', '/experience', '/skills', '/about', '/contact', ...projects.map((p) => p.path)];

export const metaFor = (key: RouteKey, path: string) => {
  const project = key === 'project' ? projects.find((p) => p.path === path) : undefined;
  const meta = project ? { title: `${project.name} case study — Jackson Khuto`, description: project.longDescription } : routeMeta[key];
  return { ...meta, url: `${SITE_URL}${path === '/' ? '/' : path}`, noindex: key === 'notfound' };
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Full-Stack Software Developer',
  description: routeMeta.home.description,
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  email: `mailto:${profile.email}`,
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'North-West University' },
  address: { '@type': 'PostalAddress', addressLocality: 'Midrand', addressRegion: 'Gauteng', addressCountry: 'ZA' },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ['Internal business tools', 'Approval workflows', 'Dashboards and reporting', 'React', 'TypeScript', 'Node.js', 'ASP.NET Core', 'Microsoft Azure', 'Microsoft Entra ID'],
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
    `<meta property="og:site_name" content="Jackson Khuto" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Jackson Khuto: software that takes the busywork off your team" />`,
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
  '/experience': 'experience',
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
