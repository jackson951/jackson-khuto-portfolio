import { type FormEvent, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  Check,
  CheckCircle2,
  Command,
  Copy,
  ClipboardList,
  Download,
  Eye,
  FileSpreadsheet,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  Mail,
  MapPin,
  Plug,
  Rocket,
  ShieldCheck,
  UserSearch,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GithubIcon, LinkedinIcon } from './components/BrandIcons';
import { Link } from './components/Link';
import { NavigateContext } from './components/navigation';
import { Reveal } from './components/Reveal';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { CommandPalette } from './components/CommandPalette';
import { CaseStudy } from './components/CaseStudy';
import { audiences, contactTopics, problems, processSteps, services, type ServiceIcon } from './data/copy';
import { bookChatHref, caseStudies, githubHandle, projects, site, stackGroups, type Project } from './data/site';
import { metaFor, resolveRoute, type RouteState } from './seo';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

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

function App({ initialPath }: { initialPath: string }) {
  const [route, setRoute] = useState<RouteState>(() => resolveRoute(initialPath));
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Only animate page changes made inside the app; on first load the prerendered page shows immediately.
  const [navigated, setNavigated] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin);
    const next = resolveRoute(url.pathname);
    const target = `${next.path}${url.search}`;
    if (target !== `${window.location.pathname}${window.location.search}`) {
      window.history.pushState({}, '', target);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    setNavigated(true);
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
    const meta = metaFor(route.key, route.path);

    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:url', meta.url, 'property');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('robots', meta.noindex ? 'noindex' : 'index, follow');
    setCanonical(meta.url);

    // Move focus to the new page for keyboard and screen-reader users (not on first load).
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [route]);

  let page: ReactNode;
  switch (route.key) {
    case 'services':
      page = <ServicesPage />;
      break;
    case 'about':
      page = <AboutPage />;
      break;
    case 'projects':
      page = <ProjectsPage />;
      break;
    case 'project':
      page = route.project ? <ProjectPage project={route.project} /> : <NotFoundPage path={route.path} />;
      break;
    case 'skills':
      page = <SkillsPage />;
      break;
    case 'contact':
      page = <ContactPage />;
      break;
    case 'notfound':
      page = <NotFoundPage path={route.path} />;
      break;
    default:
      page = <HomePage />;
  }

  return (
    <NavigateContext.Provider value={navigate}>
      <div className="min-h-screen bg-ink text-paper">
        <Header currentPath={route.path} navItems={navItems} onOpenPalette={() => setPaletteOpen(true)} />
        <main id="main" ref={mainRef} tabIndex={-1} key={route.path} className={`focus:outline-none ${navigated ? 'animate-rise' : ''}`}>
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
      onClick={() => navigator.clipboard?.writeText(site.email).then(() => setCopied(true))}
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

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  tools: LayoutDashboard,
  workflow: Workflow,
  security: ShieldCheck,
  api: Plug,
  reporting: ChartColumn,
  launch: Rocket,
};

const audienceIcons: Record<(typeof audiences)[number]['id'], LucideIcon> = {
  business: Building2,
  team: Users,
  hiring: UserSearch,
};

const contactLink = (topic: string) => `/contact?topic=${encodeURIComponent(topic)}`;

const problemIcons: Record<(typeof problems)[number]['icon'], LucideIcon> = {
  approvals: Inbox,
  spreadsheets: FileSpreadsheet,
  paper: ClipboardList,
  visibility: Eye,
  integration: Plug,
};

const HomePage = () => (
  <>
    <Hero />

    {/* 01 — Problems I solve */}
    <section id="problems" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading index="01" label="Problems I solve" title="Where the busywork usually hides." />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {problems.map((item, index) => {
            const Icon = problemIcons[item.icon];
            // Five cards: two wide on the first row, three on the second.
            const span = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <Reveal key={item.title} delay={(index % 2) * 90} className={`h-full ${span} ${index === problems.length - 1 && problems.length % 2 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <article className="flex h-full flex-col rounded-xl border border-line bg-panel p-6 md:p-7">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-copper/30 bg-copper/10 text-copper">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-paper">{item.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-muted">{item.problem}</p>
                  <div className="mt-5 flex-1 border-t border-line pt-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-copper">What I build</p>
                    <p className="mt-2 text-base leading-7 text-paper">{item.solution}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* 02 — Case studies */}
    <section id="work" className="scroll-mt-20 border-b border-line bg-panel/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            index="02"
            label="Case studies"
            title="Real problems, solved with software."
            action={
              <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
                All projects <ArrowRight size={15} />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-12 space-y-8">
          {caseStudies.slice(0, 3).map((study, index) => (
            <Reveal key={study.id}>
              <CaseStudy study={study} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* 03 — How I work */}
    <section id="how-i-work" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading index="03" label="How I work" title="Simple steps, plain language, no surprises." />
        </Reveal>
        <ProcessSteps />
      </div>
    </section>

    {/* 04 — About */}
    <section id="about" className="scroll-mt-20 border-b border-line bg-panel/30">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <Reveal>
          <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-line bg-panel">
            <Portrait alt={site.name} className="aspect-square h-full w-full object-cover object-center" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading index="04" label="About" title="The person behind the software." />
          <div className="mt-6 space-y-4">
            {site.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: BriefcaseBusiness, term: 'What I do', detail: 'Business applications, from requirements to support' },
              { icon: GraduationCap, term: 'Education', detail: `${site.education.degree}, ${site.education.school}` },
              { icon: MapPin, term: 'Based in', detail: site.location },
            ].map(({ icon: Icon, term, detail }) => (
              <div key={term} className="rounded-lg border border-line bg-ink p-4">
                <dt className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
                  <Icon size={14} className="text-copper" aria-hidden="true" />
                  {term}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-paper">{detail}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink path="/about" variant="secondary">
              More about me <ArrowRight size={16} />
            </ButtonLink>
            <a href={site.cvPath} download className={buttonClass('secondary')}>
              <Download size={16} /> Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>

    {/* 05 — Skills */}
    <section id="skills" className="scroll-mt-20 border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            index="05"
            label="Skills"
            title="The tools behind the work."
            action={
              <Link to="/skills" className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
                All skills <ArrowRight size={15} />
              </Link>
            }
          />
        </Reveal>
        <SkillGroups />
      </div>
    </section>

    <FinalCta />
  </>
);

const SkillGroups = () => (
  <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {/* Groups with no items yet (e.g. Mobile) stay hidden until filled in. */}
    {stackGroups
      .filter((group) => group.items.length > 0)
      .map((group, index) => (
        <Reveal key={group.label} delay={(index % 3) * 70} className="h-full">
          <article className="h-full rounded-xl border border-line bg-panel p-5">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-copper">{group.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-md border border-line bg-ink px-2.5 py-1.5 font-mono text-xs text-paper">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
  </div>
);

const FinalCta = () => (
  <section id="contact" className="relative scroll-mt-20 overflow-hidden border-b border-line">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,128,61,0.18),transparent_60%)]" />
    <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
      <Reveal>
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-paper md:text-6xl">
          Have a process stuck in spreadsheets? <span className="text-copper">Let's fix it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-muted md:text-lg">
          Tell me how the work happens today. I'll come back with a few questions and an honest view of what's worth building first.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={bookChatHref} className={buttonClass('primary')}>
            <Mail size={16} /> Book a chat
          </a>
          <ButtonLink path="/contact" variant="secondary">
            Send a message <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  </section>
);

// The headline's last words (site.taglineHighlight) are shown in the accent colour.
const headlineHighlight = site.tagline.endsWith(site.taglineHighlight) ? site.taglineHighlight : '';
const headlineLead = site.tagline.slice(0, site.tagline.length - headlineHighlight.length).trim();

const Hero = () => {
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
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:gap-12 lg:py-28">
        <div className="max-w-3xl">
          {site.availability && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-copper">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {site.availability}
            </p>
          )}
          <h1 className="text-balance text-[clamp(2.5rem,4.8vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-paper">
            {headlineLead} <span className="text-copper">{headlineHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted sm:text-xl sm:leading-9">{site.subhead}</p>
          <ul className="mt-7 grid gap-2.5 text-sm text-paper sm:grid-cols-3 sm:gap-4">
            {['Built around your real process', 'Secure from day one', 'Supported after launch'].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0 text-copper" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={bookChatHref} className={buttonClass('primary')}>
              <Mail size={16} /> Book a chat
            </a>
            <a href="#work" className={buttonClass('secondary')}>
              See my work <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <figure className="overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/30">
          <div className="relative grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(201,128,61,0.18),transparent_55%),linear-gradient(145deg,#161A20,#0B0E11_72%,#161D25)] px-6 py-10">
            <div className="relative rounded-full bg-copper/10 p-2 shadow-[0_0_65px_rgba(201,128,61,0.12)]">
              <Portrait eager alt={`Portrait of ${site.name}`} className="h-52 w-52 rounded-full border-[3px] border-copper/60 object-cover object-center shadow-2xl shadow-black/40 sm:h-60 sm:w-60" />
            </div>
          </div>
          <figcaption className="border-t border-line px-6 py-5">
            <p className="text-lg font-semibold text-paper">{site.name}</p>
            <p className="mt-1 text-sm text-muted">
              {site.role} · {site.location}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="What I build">
              {site.heroTags.map((item) => (
                <li key={item} className="rounded-full border border-line bg-ink px-2.5 py-1 font-mono text-[11px] text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

const ProcessSteps = () => (
  <>
    <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
      {processSteps.map((step, index) => (
        <li key={step.title} className="bg-ink">
          <Reveal delay={index * 90} className="h-full p-6">
            <span className="font-mono text-xs text-copper">Step {String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 text-lg font-semibold text-paper">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
    <Reveal>
      <p className="mt-8 font-mono text-sm text-muted">
        It all starts with step one.{' '}
        <Link to="/contact" className="text-copper underline-offset-4 hover:underline">
          Tell me about your process →
        </Link>
      </p>
    </Reveal>
  </>
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

const AudienceCta = ({ index }: { index?: string }) => (
  <section className="relative overflow-hidden border-b border-line">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,128,61,0.16),transparent_60%)]" />
    <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">
            {index && <span className="text-slate">{index} / </span>}Let's work together
          </p>
          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-paper md:text-6xl">Got a process that should be software?</h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-8 text-muted md:text-lg">
            Whether you run a business, lead a team, or are hiring, pick the one that fits and tell me a bit more.
          </p>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {audiences.map((audience, i) => {
          const Icon = audienceIcons[audience.id];
          return (
            <Reveal key={audience.id} delay={i * 100} className="h-full">
              <Link
                to={contactLink(audience.topic)}
                className="group flex h-full flex-col rounded-xl border border-line bg-panel/80 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-copper/60 hover:shadow-xl hover:shadow-black/30"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-ink text-copper">
                  <Icon size={19} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-paper">{audience.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted">{audience.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-copper">
                  {audience.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-slate">
          Prefer email? <CopyEmailButton />
        </div>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

const ServicesPage = () => (
  <>
    <PageShell
      eyebrow="/services"
      title="What I can build for you."
      intro="Six kinds of problems I solve for businesses and teams. Each one starts with understanding how things work today, and ends with software people actually want to use."
    >
      <div className="space-y-5">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Reveal key={service.id}>
              <article id={service.id} className="grid scroll-mt-24 gap-8 rounded-xl border border-line bg-panel p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-copper/30 bg-copper/10 text-copper">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-xs text-slate">{String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-6 text-base italic leading-7 text-muted">“{service.problem}”</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-paper md:text-3xl">{service.title}</h2>
                  <p className="mt-4 text-base leading-8 text-muted">{service.pitch}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {service.tech.map((tech) => (
                      <span key={tech} className="rounded border border-line bg-ink px-2 py-1 font-mono text-[11px] text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col rounded-lg border border-line bg-ink p-6">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-slate">What you get</h3>
                  <ul className="mt-5 flex-1 space-y-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-6 text-paper">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-copper" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Link to={contactLink(service.topic)} className={buttonClass('primary')}>
                      I need this <ArrowRight size={16} />
                    </Link>
                    <Link to={service.proof.path} className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
                      {service.proof.label} <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </PageShell>

    <section className="border-b border-line bg-panel/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading index="→" label="Working together" title="From first chat to launch, step by step." />
        </Reveal>
        <ProcessSteps />
      </div>
    </section>

    <AudienceCta />
  </>
);

const AboutPage = () => (
  <PageShell eyebrow="/about" title="Clear systems thinking, practical delivery." intro="I approach software by understanding the process, the people using it, and the data moving through it before designing the interface and API contract.">
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="h-fit rounded-xl border border-line bg-panel p-6 lg:sticky lg:top-24">
        <div className="aspect-square overflow-hidden rounded-lg border border-line bg-[linear-gradient(135deg,#1E2228,#0B0E11)]">
          <Portrait alt={site.name} className="h-full w-full object-cover object-center" />
        </div>
        <dl className="mt-6 space-y-4 font-mono text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-slate">Education</dt>
            <dd className="mt-1 text-paper">{site.education.degree}</dd>
            <dd className="text-muted">
              {site.education.school} · {site.education.period}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.14em] text-slate">Based in</dt>
            <dd className="mt-1 text-paper">{site.location}</dd>
          </div>
        </dl>
        <a href={site.cvPath} download className={`${buttonClass('secondary')} mt-6 w-full justify-center`}>
          Download CV
        </a>
      </aside>
      <div className="space-y-8">
        <p className="text-pretty text-lg leading-9 text-muted">{site.summary}</p>
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
          <h2 className="font-mono text-sm font-semibold text-copper">What I keep sharpening</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Enterprise-grade React interfaces, backend service design, Microsoft identity integrations, and deployment practices that make applications easier to support.
          </p>
        </div>
      </div>
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
  <PageShell eyebrow="/skills" title="Skills, grouped by the work they support." intro="The tools I use to build internal business software, from the screens people use to the data and cloud behind them. No skill bars or percentages.">
    <div className="grid gap-5 md:grid-cols-2">
      {stackGroups
        .filter((group) => group.items.length > 0)
        .map((group, index) => (
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
  const [topic, setTopic] = useState('');
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('topic');
    if (requested && contactTopics.includes(requested)) setTopic(requested);
  }, []);

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
          topic,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(response.status === 400 && body?.message ? body.message : '');
      }
      form.reset();
      setTopic('');
      setStatus('sent');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '');
      setStatus('error');
    }
  };

  return (
    <PageShell eyebrow="/contact" title="Tell me what you need." intro="Pick what's closest, add a few lines about how things work today, and I'll get back to you with questions or next steps.">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="h-fit rounded-xl border border-line bg-panel p-6">
          <div className="space-y-4 font-mono text-sm text-muted">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-copper">
              <Mail size={16} className="shrink-0" />
              {site.email}
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper">
              <GithubIcon size={16} />
              {githubHandle}
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper">
              <LinkedinIcon size={16} />
              LinkedIn profile
            </a>
            <span className="flex items-center gap-3">
              <MapPin size={16} />
              {site.location}
            </span>
          </div>
          <CopyEmailButton className="mt-6 w-full justify-center" />
          <p className="mt-6 border-t border-line pt-6 text-sm leading-7 text-muted">No need for a detailed spec. A few sentences about the problem, who it affects, and what you'd like to change is plenty to start.</p>
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
            <fieldset>
              <legend className="font-mono text-xs text-muted">What do you need?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {contactTopics.map((option) => (
                  <label key={option} className="cursor-pointer">
                    <input type="radio" name="topic" value={option} checked={topic === option} onChange={() => setTopic(option)} className="peer sr-only" />
                    <span className="inline-block rounded-full border border-line bg-ink px-3 py-1.5 font-mono text-xs text-muted transition hover:border-copper/60 hover:text-paper peer-checked:border-copper peer-checked:bg-copper/15 peer-checked:text-copper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-copper">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
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
                placeholder={
                  topic === 'Full-time role'
                    ? 'Tell me about the role, the team and the stack.'
                    : 'How does it work today, and what would you like it to do instead?'
                }
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
                    <a href={`mailto:${site.email}`} className="text-copper underline underline-offset-4">
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

const NotFoundPage = ({ path: initialPath }: { path: string }) => {
  // 404.html is prerendered once and served for every unknown URL, so show the real path only after hydrating.
  const [path, setPath] = useState('');
  useEffect(() => setPath(initialPath), [initialPath]);

  return (
  <section className="border-b border-line bg-grid">
    <div className="mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-paper md:text-6xl">This route returned nothing.</h1>
      <p className="mt-5 font-mono text-sm text-muted">
        <span className="text-copper">GET</span> {path} → <span className="text-paper">404 Not Found</span>
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
};

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
