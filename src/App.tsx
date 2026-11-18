import { type FormEvent, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Command,
  Copy,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GithubIcon, LinkedinIcon } from './components/BrandIcons';
import { Link } from './components/Link';
import { NavigateContext } from './components/navigation';
import { Reveal } from './components/Reveal';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { CommandPalette } from './components/CommandPalette';
import {
  education,
  experience,
  experienceImpactGroups,
  featuredProjectId,
  profile,
  projects,
  stackGroups,
  type Project,
} from './data/portfolio';

type RouteKey = 'home' | 'about' | 'experience' | 'projects' | 'project' | 'skills' | 'contact' | 'notfound';

interface RouteState {
  key: RouteKey;
  path: string;
  project?: Project;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
];

const routeMeta: Record<RouteKey, { title: string; description: string }> = {
  home: {
    title: 'Jackson Khuto — Full-Stack Software Developer',
    description: 'Portfolio of Jackson Khuto, a full-stack software developer building secure APIs, enterprise applications, workflow automation systems, and React-based interfaces.',
  },
  about: {
    title: 'About — Jackson Khuto',
    description: 'Professional summary, values, education, and current focus for Jackson Khuto.',
  },
  experience: {
    title: 'Experience — Jackson Khuto',
    description: 'Enterprise application development, identity, reporting, support, and delivery experience.',
  },
  projects: {
    title: 'Projects — Jackson Khuto',
    description: 'Selected full-stack projects, architecture notes, repositories, and lessons learned.',
  },
  project: {
    title: 'Project — Jackson Khuto',
    description: 'Detailed case study for a selected Jackson Khuto software project.',
  },
  skills: {
    title: 'Skills — Jackson Khuto',
    description: 'Frontend, backend, database, cloud, DevOps, Microsoft ecosystem, and delivery skills.',
  },
  contact: {
    title: 'Contact — Jackson Khuto',
    description: 'Contact Jackson Khuto for software developer roles, collaborations, and full-stack project work.',
  },
  notfound: {
    title: 'Page not found — Jackson Khuto',
    description: 'This page does not exist.',
  },
};

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  api: 'API',
  archived: 'Archived',
  development: 'In development',
};

const principles = [
  {
    title: 'Understand the process',
    body: 'Before writing code I map the business process, the people involved, and the data that has to move through the system.',
  },
  {
    title: 'Design clear boundaries',
    body: 'Interface, API, business logic, and data layers stay separate so features are easy to change, test, and support.',
  },
  {
    title: 'Secure by default',
    body: 'Authentication, role-based access, and protected credentials are part of the architecture from day one, not bolted on.',
  },
  {
    title: 'Ship and support',
    body: 'Reliable workflows, useful reporting, and deployments that can be diagnosed when something goes wrong in production.',
  },
];

const resolveRoute = (path: string): RouteState => {
  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;
  const project = projects.find((item) => item.path === normalized);

  if (project) return { key: 'project', path: normalized, project };
  if (normalized === '/' || normalized === '') return { key: 'home', path: '/' };
  const simple: Record<string, RouteKey> = {
    '/about': 'about',
    '/experience': 'experience',
    '/projects': 'projects',
    '/skills': 'skills',
    '/contact': 'contact',
  };
  if (simple[normalized]) return { key: simple[normalized], path: normalized };
  return { key: 'notfound', path: normalized };
};

function App() {
  const [route, setRoute] = useState<RouteState>(() => resolveRoute(window.location.pathname));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  const navigate = useCallback((path: string) => {
    const next = resolveRoute(path);
    if (next.path !== window.location.pathname) {
      window.history.pushState({}, '', next.path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    setRoute(next);
  }, []);

  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onPopState = () => setRoute(resolveRoute(window.location.pathname));
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    const meta = route.project
      ? { title: `${route.project.name} case study — Jackson Khuto`, description: route.project.longDescription }
      : routeMeta[route.key];

    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:url', `${window.location.origin}${route.path}`, 'property');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('robots', route.key === 'notfound' ? 'noindex' : 'index, follow');
    setCanonical(`${window.location.origin}${route.path}`);

    // Move focus to the new page for keyboard and screen-reader users (not on first load).
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [route]);

  let page: ReactNode;
  switch (route.key) {
    case 'about':
      page = <AboutPage />;
      break;
    case 'experience':
      page = <ExperiencePage />;
      break;
    case 'projects':
      page = <ProjectsPage />;
      break;
    case 'project':
      page = route.project ? <ProjectPage project={route.project} /> : <NotFoundPage />;
      break;
    case 'skills':
      page = <SkillsPage />;
      break;
    case 'contact':
      page = <ContactPage />;
      break;
    case 'notfound':
      page = <NotFoundPage />;
      break;
    default:
      page = <HomePage onOpenPalette={() => setPaletteOpen(true)} />;
  }

  return (
    <NavigateContext.Provider value={navigate}>
      <div className="min-h-screen bg-ink text-paper">
        <Header currentPath={route.path} navItems={navItems} onOpenPalette={() => setPaletteOpen(true)} />
        <main id="main" ref={mainRef} tabIndex={-1} key={route.path} className="animate-rise focus:outline-none">
          {page}
        </main>
        <Footer />
        <CommandPalette open={paletteOpen} onClose={closePalette} onNavigate={navigate} pages={navItems} />
      </div>
    </NavigateContext.Provider>
  );
}

const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
};

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
};

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

const PageShell = ({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) => (
  <section className="border-b border-line">
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">{eyebrow}</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-paper md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-muted md:text-lg">{intro}</p>
      </div>
      <div className="mt-12">{children}</div>
    </div>
  </section>
);

const SectionHeading = ({ index, label, title, action }: { index: string; label: string; title: string; action?: ReactNode }) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">
        <span className="text-slate">{index} /</span> {label}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-paper md:text-4xl">{title}</h2>
    </div>
    {action}
  </div>
);

const buttonClass = (variant: 'primary' | 'secondary') =>
  `inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-sm font-medium transition ${
    variant === 'primary' ? 'bg-copper text-ink hover:bg-copper-bright' : 'border border-line bg-panel/50 text-paper hover:border-copper hover:text-copper'
  }`;

const ButtonLink = ({ children, path, variant = 'primary' }: { children: ReactNode; path: string; variant?: 'primary' | 'secondary' }) => (
  <Link to={path} className={buttonClass(variant)}>
    {children}
  </Link>
);

const Portrait = ({ className, eager = false, alt }: { className: string; eager?: boolean; alt: string }) => (
  <picture>
    <source srcSet="/profile.webp" type="image/webp" />
    <img
      src="/profile.jpg"
      alt={alt}
      width={640}
      height={640}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  </picture>
);

const CopyEmailButton = ({ className = '' }: { className?: string }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(profile.email).then(() => setCopied(true))}
      className={`${buttonClass('secondary')} ${className}`}
      aria-live="polite"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Copied!' : 'Copy email'}
    </button>
  );
};

const StatusBadge = ({ status }: { status: Project['status'] }) => (
  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-copper">
    <span className={`h-1.5 w-1.5 rounded-full ${status === 'live' ? 'bg-emerald-400' : 'bg-copper'} ${status === 'development' ? 'animate-pulse' : ''}`} />
    {statusLabel[status]}
  </span>
);

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

const HomePage = ({ onOpenPalette }: { onOpenPalette: () => void }) => {
  const featured = projects.find((project) => project.id === featuredProjectId) ?? projects[0];
  const others = projects.filter((project) => project.id !== featured.id);
  return (
    <>
      <Hero onOpenPalette={onOpenPalette} />

      {/* 01 — Selected work */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <SectionHeading
              index="01"
              label="Selected work"
              title="Systems I've designed and built."
              action={
                <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
                  All projects <ArrowRight size={15} />
                </Link>
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-6">
            <Reveal>
              <FeaturedProject project={featured} />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {others.map((project, index) => (
                <Reveal key={project.id} delay={index * 120}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — How I work */}
      <section className="border-b border-line bg-panel/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <SectionHeading index="02" label="How I work" title="Start with the problem, not the framework." />
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <li key={principle.title} className="bg-ink">
                <Reveal delay={index * 90} className="h-full p-6">
                  <span className="font-mono text-xs text-copper">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-lg font-semibold text-paper">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{principle.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 — Experience */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading index="03" label="Experience" title="Building internal systems for the enterprise." />
            <p className="mt-6 max-w-md text-base leading-8 text-muted">
              Day to day I deliver business applications end to end: React interfaces, Node.js services, Microsoft Entra ID security, approval workflows, reporting, and the deployments that keep them running.
            </p>
            <div className="mt-8">
              <ButtonLink path="/experience" variant="secondary">
                Full experience <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Timeline />
          </Reveal>
        </div>
      </section>

      {/* 04 — Stack */}
      <section className="border-b border-line bg-panel/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <SectionHeading
              index="04"
              label="Toolbox"
              title="The stack I reach for."
              action={
                <Link to="/skills" className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
                  All skills <ArrowRight size={15} />
                </Link>
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.slice(0, 6).map((group, index) => (
              <Reveal key={group.label} delay={index * 60}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">{group.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-md border border-line bg-ink px-2.5 py-1.5 font-mono text-xs text-paper transition-colors hover:border-copper/60">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
};

const Hero = ({ onOpenPalette }: { onOpenPalette: () => void }) => {
  const ref = useRef<HTMLElement>(null);

  // A soft copper spotlight follows the pointer across the grid.
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== 'mouse') return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  return (
    <section ref={ref} onPointerMove={onPointerMove} className="group relative isolate overflow-hidden border-b border-line bg-grid">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(201,128,61,0.08),transparent_48%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(201,128,61,0.08), transparent 70%)' }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-copper">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-copper" />
            </span>
            Full-stack software developer
          </div>
          <h1 className="mt-6 text-[clamp(3.1rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-paper">
            Jackson <span className="text-copper">Khuto.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            I turn complex business processes into <span className="text-paper">secure, reliable software</span>, from React interfaces and backend APIs to workflow automation and reporting tools.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-slate">
            <span className="inline-flex items-center gap-2">
              <BriefcaseBusiness size={15} className="text-copper" />
              {profile.role}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-copper" />
              {profile.location}
            </span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink path="/projects">
              Explore my work <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink path="/contact" variant="secondary">
              Get in touch <Mail size={16} />
            </ButtonLink>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-copper">
              <GithubIcon size={15} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-copper">
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <button type="button" onClick={onOpenPalette} className="ml-auto hidden items-center gap-2 font-mono text-xs text-slate transition hover:text-copper sm:inline-flex">
              Press <kbd className="rounded border border-line bg-panel px-1.5 py-0.5 text-[10px] text-muted">Ctrl</kbd>
              <kbd className="rounded border border-line bg-panel px-1.5 py-0.5 text-[10px] text-muted">K</kbd> to jump anywhere
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/30">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 font-mono text-[11px] text-slate">~/jackson — whoami</span>
          </div>
          <div className="relative grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(201,128,61,0.18),transparent_55%),linear-gradient(145deg,#161A20,#0B0E11_72%,#161D25)] px-6 py-10">
            <div className="relative rounded-full bg-copper/10 p-2 shadow-[0_0_65px_rgba(201,128,61,0.12)]">
              <Portrait eager alt="Portrait of Jackson Khuto" className="h-56 w-56 rounded-full border-[3px] border-copper/60 object-cover object-center shadow-2xl shadow-black/40 sm:h-64 sm:w-64" />
            </div>
          </div>
          <div className="border-t border-line bg-ink/60 px-5 py-4 font-mono text-xs leading-6">
            <p>
              <span className="text-copper">$</span> <span className="text-paper">cat stack.txt</span>
            </p>
            <p className="text-muted">React · TypeScript · Node.js · ASP.NET Core · Azure</p>
            <p>
              <span className="text-copper">$</span> <span className="text-paper">echo $FOCUS</span>
            </p>
            <p className="text-muted">
              secure APIs, workflow automation, enterprise apps<span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-copper" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProject = ({ project }: { project: Project }) => (
  <article className="group relative grid overflow-hidden rounded-xl border border-line bg-panel transition hover:border-copper/60 lg:grid-cols-[0.95fr_1.05fr]">
    <div className="flex flex-col p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-copper/40 bg-copper/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-copper">Featured</span>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="mt-5 text-3xl font-semibold tracking-tight text-paper">{project.name}</h3>
      <p className="mt-2 text-copper">{project.description}</p>
      <ul className="mt-6 space-y-2.5">
        {project.highlights.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted">
            <CheckCircle2 size={15} className="mt-1 shrink-0 text-copper" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
        <Link to={project.path} className={buttonClass('primary')}>
          Read case study <ArrowRight size={16} />
        </Link>
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
          <GithubIcon size={15} /> Source
        </a>
      </div>
    </div>
    <div className="relative flex flex-col justify-center gap-6 border-t border-line bg-ink/60 bg-grid p-6 md:p-8 lg:border-l lg:border-t-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Request flow</p>
      <ArchitectureFlow flow={project.flow} />
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span key={tech} className="rounded border border-line bg-panel px-2 py-1 font-mono text-[11px] text-muted">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </article>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel transition duration-300 hover:-translate-y-0.5 hover:border-copper/60 hover:shadow-xl hover:shadow-black/30">
    <div className="border-b border-line bg-ink/60 bg-grid px-5 py-6">
      <ArchitectureFlow flow={project.flow} compact />
    </div>
    <div className="flex flex-1 flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={project.status} />
        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-2xs text-slate">{project.stack[0]}</span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-paper">
        {/* The stretched link makes the whole card clickable while keeping one accessible link. */}
        <Link to={project.path} className="after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:after:rounded-xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-copper">
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-copper">{project.description}</p>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{project.longDescription}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="inline-flex items-center gap-2 font-mono text-sm text-paper transition group-hover:text-copper">
          Case study <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
          <GithubIcon size={15} /> Source
        </a>
      </div>
    </div>
  </article>
);

const Timeline = () => {
  const items = [
    ...experience.map((job) => ({
      icon: BriefcaseBusiness,
      title: job.role,
      org: job.current ? 'Current role' : 'Previous role',
      meta: job.period,
      current: job.current,
    })),
    {
      icon: GraduationCap,
      title: education.degree,
      org: education.school,
      meta: education.period,
      current: false,
    },
  ];

  return (
    <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[1.4rem] before:top-6 before:w-px before:bg-line">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="relative flex gap-5 rounded-xl border border-line bg-panel p-5">
            <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${item.current ? 'border-copper bg-copper/15 text-copper' : 'border-line bg-ink text-slate'}`}>
              <Icon size={13} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-copper">{item.org}</p>
              <h3 className="mt-1.5 text-lg font-semibold text-paper">{item.title}</h3>
              <p className="mt-1 font-mono text-xs text-slate">{item.meta}</p>
              {item.current && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['React', 'TypeScript', 'Node.js', 'Entra ID', 'Azure', 'IIS'].map((tech) => (
                    <span key={tech} className="rounded border border-line bg-ink px-2 py-0.5 font-mono text-[11px] text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

const ContactCta = () => (
  <section className="relative overflow-hidden border-b border-line">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,128,61,0.16),transparent_60%)]" />
    <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">
          <span className="text-slate">05 /</span> Contact
        </p>
        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-paper md:text-6xl">
          Have a role or a system that needs building?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-muted md:text-lg">
          I'm happy to talk about full-stack roles, internal tools, workflow products, and APIs. Tell me what you're working on.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink path="/contact">
            Send a message <ArrowUpRight size={16} />
          </ButtonLink>
          <CopyEmailButton />
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

const AboutPage = () => (
  <PageShell eyebrow="/about" title="Clear systems thinking, practical delivery." intro="I approach software by understanding the process, the people using it, and the data moving through it before designing the interface and API contract.">
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="h-fit rounded-xl border border-line bg-panel p-6 lg:sticky lg:top-24">
        <div className="aspect-square overflow-hidden rounded-lg border border-line bg-[linear-gradient(135deg,#1E2228,#0B0E11)]">
          <Portrait alt="Jackson Khuto" className="h-full w-full object-cover object-center" />
        </div>
        <dl className="mt-6 space-y-4 font-mono text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-slate">Education</dt>
            <dd className="mt-1 text-paper">{education.degree}</dd>
            <dd className="text-muted">
              {education.school} · {education.period}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-slate">Based in</dt>
            <dd className="mt-1 text-paper">{profile.location}</dd>
          </div>
        </dl>
        <a href="/Jackson-Khuto-CV.pdf" download className={`${buttonClass('secondary')} mt-6 w-full justify-center`}>
          Download CV
        </a>
      </aside>
      <div className="space-y-8">
        <p className="text-pretty text-lg leading-9 text-muted">{profile.summary}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <article key={principle.title} className="rounded-xl border border-line bg-panel p-5">
              <span className="font-mono text-xs text-copper">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="mt-3 font-semibold text-paper">{principle.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{principle.body}</p>
            </article>
          ))}
        </div>
        <div className="rounded-xl border border-copper/30 bg-copper/5 p-6">
          <h2 className="font-mono text-sm font-semibold text-copper">Current focus</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Building stronger enterprise-grade React interfaces, deeper backend service design, Microsoft identity integrations, and deployment practices that make applications easier to support.
          </p>
        </div>
      </div>
    </div>
  </PageShell>
);

const ExperiencePage = () => (
  <PageShell eyebrow="/experience" title="Enterprise delivery, grouped by impact." intro="The work I do across internal applications, identity, reporting, deployment support, and production maintenance.">
    <div className="space-y-10">
      {experience.map((job) => (
        <article key={job.company} className="rounded-xl border border-line bg-panel p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-copper">{job.company}</p>
              <h2 className="mt-2 text-2xl font-semibold text-paper">{job.role}</h2>
              <p className="mt-2 font-mono text-xs text-slate">{job.location}</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
              {job.current && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              {job.period}
            </span>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {experienceImpactGroups.map((group, index) => {
              const icons = [BriefcaseBusiness, ShieldCheck, Workflow, Sparkles];
              const Icon = icons[index % icons.length];
              return (
                <Reveal key={group.title} delay={index * 80} className="h-full">
                  <div className="h-full rounded-lg border border-line bg-ink p-5">
                    <div className="flex items-center gap-3">
                      <Icon size={17} className="text-copper" />
                      <h3 className="font-mono text-sm font-semibold text-paper">{group.title}</h3>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {group.points.map((point) => (
                        <li key={point} className="flex gap-2.5 text-sm leading-6 text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </article>
      ))}
      <article className="flex flex-wrap items-center gap-5 rounded-xl border border-line bg-panel p-6 md:p-8">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-ink text-copper">
          <GraduationCap size={18} />
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-copper">{education.school}</p>
          <h2 className="mt-1 text-xl font-semibold text-paper">{education.degree}</h2>
        </div>
        <span className="ml-auto rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{education.period}</span>
      </article>
    </div>
  </PageShell>
);

const ProjectsPage = () => (
  <PageShell eyebrow="/projects" title="Selected systems and case studies." intro="Each project includes the problem, the architecture, and what I learned, so you can see how I think as well as what I built.">
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal key={project.id} delay={(index % 2) * 120}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  </PageShell>
);

const ProjectPage = ({ project }: { project: Project }) => {
  const index = projects.findIndex((item) => item.id === project.id);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-copper">
            <ArrowLeft size={14} /> All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">Case study {String(index + 1).padStart(2, '0')}</p>
            <span className="text-slate">·</span>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-paper md:text-7xl">{project.name}</h1>
          <p className="mt-4 text-lg text-copper md:text-xl">{project.description}</p>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-muted md:text-lg">{project.longDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('primary')}>
                Live site <ArrowUpRight size={16} />
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={buttonClass(project.liveUrl ? 'secondary' : 'primary')}>
              <GithubIcon size={16} /> {project.additionalRepoUrls?.length ? 'Backend repository' : 'Repository'}
            </a>
            {project.additionalRepoUrls?.map((url) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
                <GithubIcon size={16} /> {url.toLowerCase().includes('web') ? 'Frontend repository' : 'Server repository'}
              </a>
            ))}
          </div>

          <div className="mt-14 rounded-xl border border-line bg-ink bg-grid p-6 md:p-8">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate">Architecture · request flow</p>
            <ArchitectureFlow flow={project.flow} />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Reveal>
              <InfoBlock index="01" title="The problem" body={project.problem} />
            </Reveal>
            <Reveal>
              <InfoBlock index="02" title="The approach" body={project.solution} />
            </Reveal>
            <Reveal>
              <ListBlock index="03" title="What it does" items={project.highlights} />
            </Reveal>
            <Reveal>
              <article className="rounded-xl border border-line bg-panel p-6">
                <h2 className="font-mono text-sm font-semibold text-paper">
                  <span className="text-copper">04</span> Architecture layers
                </h2>
                <ol className="mt-5 space-y-2">
                  {project.architecture.map((layer, layerIndex) => (
                    <li key={layer} className="flex items-center gap-3 rounded-md border border-line bg-ink px-4 py-3 font-mono text-sm text-muted">
                      <span className="text-[10px] text-slate">{String(layerIndex + 1).padStart(2, '0')}</span>
                      {layer}
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl border border-line bg-panel p-6">
              <h2 className="font-mono text-sm font-semibold text-paper">Stack</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-xs text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <ListBlock title="Challenges" items={project.challenges} />
            <ListBlock title="Lessons learned" items={project.lessons} />
          </aside>
        </div>
      </section>

      {next && next.id !== project.id && (
        <section className="border-b border-line">
          <Link to={next.path} className="group mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-12 md:py-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate">Next case study</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-paper transition group-hover:text-copper md:text-5xl">{next.name}</p>
              <p className="mt-2 text-sm text-muted">{next.description}</p>
            </div>
            <ArrowRight size={36} className="shrink-0 text-copper transition-transform group-hover:translate-x-2" />
          </Link>
        </section>
      )}
    </>
  );
};

const SkillsPage = () => (
  <PageShell eyebrow="/skills" title="Practical skills by engineering surface." intro="Grouped by where each skill shows up in delivery. No decorative progress bars, just the stack and the kind of work it supports.">
    <div className="grid gap-5 md:grid-cols-2">
      {stackGroups.map((group, index) => (
        <Reveal key={group.label} delay={(index % 2) * 80} className="h-full">
          <article className="h-full rounded-xl border border-line bg-panel p-6">
            <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-copper">{group.label}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded border border-line bg-ink px-3 py-1.5 font-mono text-xs text-paper">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </PageShell>
);

const ContactPage = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          company: data.get('company'),
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(response.status === 400 && body?.message ? body.message : '');
      }
      form.reset();
      setStatus('sent');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '');
      setStatus('error');
    }
  };

  return (
    <PageShell eyebrow="/contact" title="Let's talk about the role or system." intro="Best fit: full-stack developer roles, internal systems, workflow products, APIs, dashboards, and maintainable business applications.">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="h-fit rounded-xl border border-line bg-panel p-6">
          <div className="space-y-4 font-mono text-sm text-muted">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 break-all hover:text-copper">
              <Mail size={16} className="shrink-0" />
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper">
              <GithubIcon size={16} />
              github.com/jackson951
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper">
              <LinkedinIcon size={16} />
              LinkedIn profile
            </a>
            <span className="flex items-center gap-3">
              <MapPin size={16} />
              {profile.location}
            </span>
          </div>
          <CopyEmailButton className="mt-6 w-full justify-center" />
          <p className="mt-6 border-t border-line pt-6 text-sm leading-7 text-muted">For opportunities or collaborations, share a little context about the role, project, or problem you want to solve.</p>
        </aside>

        {status === 'sent' ? (
          <div className="grid place-items-center rounded-xl border border-copper/40 bg-panel p-10 text-center animate-pop" role="status">
            <div>
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-copper/15 text-copper">
                <Check size={22} />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-paper">Message sent.</h2>
              <p className="mt-3 text-sm leading-7 text-muted">Thanks for reaching out. I'll get back to you soon.</p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-6 font-mono text-xs text-muted underline-offset-4 hover:text-copper hover:underline">
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-xl border border-line bg-panel p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" autoComplete="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@company.com" />
            </div>
            {/* Honeypot: hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company
                <input name="company" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="grid gap-2 font-mono text-xs text-muted">
              Message
              <textarea
                name="message"
                required
                rows={7}
                maxLength={5000}
                className="resize-y rounded-md border border-line bg-ink px-4 py-3 font-sans text-sm leading-6 text-paper placeholder:text-slate focus:border-copper focus:outline-none"
                placeholder="Tell me what you are hiring for or building."
              />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === 'sending'} className={`${buttonClass('primary')} disabled:cursor-wait disabled:opacity-70`}>
                <Mail size={16} />
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p aria-live="polite" className="font-mono text-xs text-muted">
                {status === 'error' && (
                  <>
                    {errorMessage || "Couldn't send right now."}{' '}
                    <a href={`mailto:${profile.email}`} className="text-copper underline underline-offset-4">
                      Email me directly
                    </a>
                    .
                  </>
                )}
              </p>
            </div>
          </form>
        )}
      </div>
    </PageShell>
  );
};

const NotFoundPage = () => (
  <section className="border-b border-line bg-grid">
    <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-paper md:text-6xl">This route returned nothing.</h1>
      <p className="mt-5 font-mono text-sm text-muted">
        <span className="text-copper">GET</span> {window.location.pathname} → <span className="text-paper">404 Not Found</span>
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink path="/">
          <ArrowLeft size={16} /> Back home
        </ButtonLink>
        <ButtonLink path="/projects" variant="secondary">
          View projects
        </ButtonLink>
      </div>
      <p className="mt-10 inline-flex items-center gap-2 font-mono text-xs text-slate">
        <Command size={13} /> Tip: press Ctrl/⌘ + K to search everything
      </p>
    </div>
  </section>
);

const Field = ({ label, name, type = 'text', autoComplete, placeholder }: { label: string; name: string; type?: string; autoComplete: string; placeholder: string }) => (
  <label className="grid gap-2 font-mono text-xs text-muted">
    {label}
    <input
      name={name}
      type={type}
      autoComplete={autoComplete}
      required
      maxLength={200}
      className="rounded-md border border-line bg-ink px-4 py-3 font-sans text-sm text-paper placeholder:text-slate focus:border-copper focus:outline-none"
      placeholder={placeholder}
    />
  </label>
);

const InfoBlock = ({ index, title, body }: { index?: string; title: string; body: string }) => (
  <article className="rounded-xl border border-line bg-panel p-6">
    <h2 className="font-mono text-sm font-semibold text-paper">
      {index && <span className="text-copper">{index} </span>}
      {title}
    </h2>
    <p className="mt-3 text-base leading-8 text-muted">{body}</p>
  </article>
);

const ListBlock = ({ index, title, items }: { index?: string; title: string; items: string[] }) => (
  <article className="rounded-xl border border-line bg-panel p-6">
    <h2 className="font-mono text-sm font-semibold text-paper">
      {index && <span className="text-copper">{index} </span>}
      {title}
    </h2>
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted">
          <CheckCircle2 size={15} className="mt-1 shrink-0 text-copper" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </article>
);

export default App;
