import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Layers3,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GithubIcon, LinkedinIcon } from './components/BrandIcons';
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

type RouteKey = 'home' | 'about' | 'experience' | 'projects' | 'project' | 'skills' | 'contact';

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
    title: 'Jackson Khuto - Full-Stack Software Developer',
    description: 'Senior-style portfolio for Jackson Khuto, a full-stack developer building React, Node.js, Spring Boot, SQL, and Azure-enabled business systems.',
  },
  about: {
    title: 'About - Jackson Khuto',
    description: 'Professional summary, values, education, and current focus for Jackson Khuto.',
  },
  experience: {
    title: 'Experience - Jackson Khuto',
    description: 'Enterprise application development, identity, reporting, support, and delivery experience.',
  },
  projects: {
    title: 'Projects - Jackson Khuto',
    description: 'Selected full-stack projects, architecture notes, repositories, and lessons learned.',
  },
  project: {
    title: 'Project Detail - Jackson Khuto',
    description: 'Detailed case study for a selected Jackson Khuto software project.',
  },
  skills: {
    title: 'Skills - Jackson Khuto',
    description: 'Frontend, backend, database, cloud, DevOps, Microsoft ecosystem, and delivery skills.',
  },
  contact: {
    title: 'Contact - Jackson Khuto',
    description: 'Contact Jackson Khuto for software developer roles, collaborations, and full-stack project work.',
  },
};

const stats = [
  { label: 'Current role', value: 'Software Developer' },
  { label: 'Projects', value: `${projects.length}+` },
  { label: 'Core technologies', value: '20+' },
  { label: 'Location', value: 'Midrand, ZA' },
];

const resolveRoute = (path: string): RouteState => {
  const normalized = path.length > 1 ? path.replace(/\/$/, '') : path;
  const project = projects.find((item) => item.path === normalized);

  if (project) return { key: 'project', path: normalized, project };
  if (normalized === '/') return { key: 'home', path: '/' };
  if (normalized === '/about') return { key: 'about', path: normalized };
  if (normalized === '/experience') return { key: 'experience', path: normalized };
  if (normalized === '/projects') return { key: 'projects', path: normalized };
  if (normalized === '/skills') return { key: 'skills', path: normalized };
  if (normalized === '/contact') return { key: 'contact', path: normalized };

  return { key: 'home', path: '/' };
};

function App() {
  const [route, setRoute] = useState<RouteState>(() => resolveRoute(window.location.pathname));

  const navigate = (path: string) => {
    const next = resolveRoute(path);
    window.history.pushState({}, '', next.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRoute(next);
  };

  useEffect(() => {
    const onPopState = () => setRoute(resolveRoute(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const meta = route.project
      ? {
          title: `${route.project.name} - Jackson Khuto`,
          description: route.project.longDescription,
        }
      : routeMeta[route.key];

    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('twitter:card', 'summary_large_image');
    setCanonical(`${window.location.origin}${route.path}`);
  }, [route]);

  const page = useMemo(() => {
    switch (route.key) {
      case 'about':
        return <AboutPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'projects':
        return <ProjectsPage onNavigate={navigate} />;
      case 'project':
        return route.project ? <ProjectPage project={route.project} onNavigate={navigate} /> : <HomePage onNavigate={navigate} />;
      case 'skills':
        return <SkillsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  }, [route]);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <Header currentPath={route.path} navItems={navItems} onNavigate={navigate} />
      <main key={route.path} className="animate-rise">
        {page}
      </main>
      <Footer onNavigate={navigate} />
    </div>
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

const PageShell = ({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) => (
  <section className="border-b border-line">
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-paper md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted md:text-lg">{intro}</p>
      </div>
      <div className="mt-12">{children}</div>
    </div>
  </section>
);

const ButtonLink = ({ children, path, onNavigate, variant = 'primary' }: { children: ReactNode; path: string; onNavigate: (path: string) => void; variant?: 'primary' | 'secondary' }) => (
  <button
    type="button"
    onClick={() => onNavigate(path)}
    className={`inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-sm font-medium transition ${
      variant === 'primary'
        ? 'bg-copper text-ink hover:bg-copper-bright'
        : 'border border-line bg-panel/50 text-paper hover:border-copper hover:text-copper'
    }`}
  >
    {children}
  </button>
);

const HomePage = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <section className="border-b border-line bg-grid bg-grid">
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">Full-stack software developer</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-none text-paper md:text-7xl">{profile.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          I build enterprise web applications, secure APIs, workflow tools, and reporting interfaces that support real business operations.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-slate">
          <span className="inline-flex items-center gap-2"><BriefcaseBusiness size={15} />{profile.role}</span>
          <span className="inline-flex items-center gap-2"><MapPin size={15} />{profile.location}</span>
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink path="/projects" onNavigate={onNavigate}>View projects <ArrowRight size={16} /></ButtonLink>
          <ButtonLink path="/contact" onNavigate={onNavigate} variant="secondary">Contact me <Mail size={16} /></ButtonLink>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-panel shadow-2xl shadow-black/20">
        <div className="grid min-h-[22rem] place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(201,128,61,0.24),transparent_34%),linear-gradient(135deg,#11151A,#0B0E11_62%,#141B23)] p-8">
          <div className="flex h-40 w-40 items-center justify-center rounded-full border border-copper/40 bg-ink/70 text-5xl font-semibold text-paper shadow-2xl shadow-black/30">JK</div>
        </div>
        <div className="grid grid-cols-2 border-t border-line">
          {stats.map((stat) => (
            <div key={stat.label} className="border-r border-t border-line p-5 first:border-t-0 odd:border-l-0 even:border-r-0">
              <p className="font-mono text-2xs uppercase text-slate">{stat.label}</p>
              <p className="mt-2 text-lg font-semibold text-paper">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const AboutPage = () => (
  <PageShell eyebrow="/about" title="Clear systems thinking, practical delivery." intro="I approach software by understanding the process, the people using it, and the data moving through it before designing the interface and API contract.">
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="rounded-lg border border-line bg-panel p-6">
        <div className="aspect-square rounded-lg border border-line bg-[linear-gradient(135deg,#1E2228,#0B0E11)] p-6">
          <div className="flex h-full items-center justify-center rounded-md border border-copper/30 font-mono text-6xl font-semibold text-copper">JK</div>
        </div>
        <div className="mt-6 space-y-3 font-mono text-sm text-muted">
          <p>{education.degree}</p>
          <p>{education.school}</p>
          <p>{education.period}</p>
        </div>
      </aside>
      <div className="space-y-8">
        <p className="text-base leading-8 text-muted">{profile.summary}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {['Maintainable architecture', 'Secure access control', 'Useful reporting'].map((value) => (
            <article key={value} className="rounded-lg border border-line bg-panel p-5">
              <ShieldCheck size={18} className="text-copper" />
              <h2 className="mt-4 font-mono text-sm font-semibold text-paper">{value}</h2>
            </article>
          ))}
        </div>
        <div className="rounded-lg border border-line bg-panel p-6">
          <h2 className="font-mono text-sm font-semibold text-paper">Current focus</h2>
          <p className="mt-3 text-sm leading-7 text-muted">Building stronger enterprise-grade React interfaces, deeper backend service design, Microsoft identity integrations, and deployment practices that make applications easier to support.</p>
        </div>
      </div>
    </div>
  </PageShell>
);

const ExperiencePage = () => (
  <PageShell eyebrow="/experience" title="Enterprise delivery, grouped by impact." intro="A timeline view of the work I do across internal applications, identity, reporting, deployment support, and production maintenance.">
    <div className="space-y-10">
      {experience.map((job) => (
        <article key={job.company} className="rounded-lg border border-line bg-panel p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase text-copper">{job.company}</p>
              <h2 className="mt-2 text-2xl font-semibold text-paper">{job.role}</h2>
              <p className="mt-2 font-mono text-xs text-slate">{job.location}</p>
            </div>
            <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{job.period}</span>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {experienceImpactGroups.map((group, index) => {
              const icons = [BriefcaseBusiness, ShieldCheck, Workflow, Sparkles];
              const Icon = icons[index];
              return (
                <div key={group.title} className="rounded-lg border border-line bg-ink p-5">
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
              );
            })}
          </div>
        </article>
      ))}
    </div>
  </PageShell>
);

const ProjectsPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  <PageShell eyebrow="/projects" title="Selected systems and case studies." intro="A compact project grid with enough context for recruiters and engineering teams to understand what was built, why it mattered, and how it was structured.">
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} featured={project.id === featuredProjectId} onNavigate={onNavigate} />
      ))}
    </div>
  </PageShell>
);

const ProjectCard = ({ project, featured, onNavigate }: { project: Project; featured?: boolean; onNavigate: (path: string) => void }) => (
  <article className="group flex min-h-[24rem] flex-col overflow-hidden rounded-lg border border-line bg-panel transition hover:border-copper/60">
    <div className="grid h-36 place-items-center bg-[linear-gradient(135deg,#17202A,#0B0E11)] p-5">
      <Layers3 className="text-copper" size={34} />
    </div>
    <div className="flex flex-1 flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase text-copper">{featured ? 'Featured' : project.status}</p>
        <span className="rounded-full border border-line px-2 py-0.5 font-mono text-2xs text-slate">{project.stack[0]}</span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-paper">{project.name}</h2>
      <p className="mt-2 text-sm text-copper">{project.description}</p>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{project.longDescription}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => onNavigate(project.path)} className="inline-flex items-center gap-2 font-mono text-sm text-paper transition hover:text-copper">
          Case study <ArrowRight size={15} />
        </button>
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-copper">
          <GithubIcon size={15} /> Repository
        </a>
      </div>
    </div>
  </article>
);

const ProjectPage = ({ project, onNavigate }: { project: Project; onNavigate: (path: string) => void }) => (
  <PageShell eyebrow="/project" title={project.name} intro={project.longDescription}>
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <InfoBlock title="Problem" body={project.problem} />
        <InfoBlock title="Solution" body={project.solution} />
        <div className="rounded-lg border border-line bg-panel p-6">
          <h2 className="font-mono text-sm font-semibold text-paper">Architecture</h2>
          <div className="mt-5 space-y-3">
            {project.architecture.map((layer) => (
              <div key={layer} className="rounded-md border border-line bg-ink px-4 py-3 font-mono text-sm text-muted">{layer}</div>
            ))}
          </div>
        </div>
      </div>
      <aside className="space-y-6">
        <div className="rounded-lg border border-line bg-panel p-6">
          <h2 className="font-mono text-sm font-semibold text-paper">Stack</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => <span key={tech} className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-xs text-muted">{tech}</span>)}
          </div>
        </div>
        <ListBlock title="Challenges" items={project.challenges} />
        <ListBlock title="Lessons learned" items={project.lessons} />
        <div className="flex flex-wrap gap-3">
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-copper px-4 py-2.5 font-mono text-sm font-medium text-ink hover:bg-copper-bright">
            <GithubIcon size={16} /> Repository
          </a>
          <ButtonLink path="/projects" onNavigate={onNavigate} variant="secondary">All projects</ButtonLink>
        </div>
      </aside>
    </div>
  </PageShell>
);

const SkillsPage = () => (
  <PageShell eyebrow="/skills" title="Practical skills by engineering surface." intro="Grouped by where the skill shows up in delivery. No decorative progress bars, just stack areas and the type of work each group supports.">
    <div className="grid gap-5 md:grid-cols-2">
      {stackGroups.map((group) => (
        <article key={group.label} className="rounded-lg border border-line bg-panel p-6">
          <h2 className="font-mono text-sm font-semibold uppercase text-copper">{group.label}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {group.items.map((item) => <span key={item} className="rounded border border-line bg-ink px-3 py-1.5 font-mono text-xs text-paper">{item}</span>)}
          </div>
        </article>
      ))}
    </div>
  </PageShell>
);

const ContactPage = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message') }),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageShell eyebrow="/contact" title="Let's talk about the role or system." intro="Best fit: full-stack developer roles, internal systems, workflow products, APIs, dashboards, and maintainable business applications.">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-lg border border-line bg-panel p-6">
          <div className="space-y-4 font-mono text-sm text-muted">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-copper"><Mail size={16} />{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper"><GithubIcon size={16} />github.com/jackson951</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper"><LinkedinIcon size={16} />LinkedIn profile</a>
            <span className="flex items-center gap-3"><MapPin size={16} />{profile.location}</span>
          </div>
          <p className="mt-6 border-t border-line pt-6 text-sm leading-7 text-muted">I usually reply within a day when the message includes role context, project scope, or the problem you want solved.</p>
        </aside>
        <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-line bg-panel p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" />
          </div>
          <label className="grid gap-2 font-mono text-xs text-muted">
            Message
            <textarea name="message" required rows={6} className="resize-none rounded-md border border-line bg-ink px-4 py-3 font-sans text-sm leading-6 text-paper placeholder:text-slate focus:border-copper focus:outline-none" placeholder="Tell me what you are hiring for or building." />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-md bg-copper px-5 py-2.5 font-mono text-sm font-medium text-ink hover:bg-copper-bright disabled:opacity-70">
              <Mail size={16} />{status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
            {status === 'sent' && <p className="font-mono text-xs text-copper">Message sent. I will get back to you soon.</p>}
            {status === 'error' && <p className="font-mono text-xs text-muted">Something went wrong. Email me directly instead.</p>}
          </div>
        </form>
      </div>
    </PageShell>
  );
};

const Field = ({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete: string }) => (
  <label className="grid gap-2 font-mono text-xs text-muted">
    {label}
    <input name={name} type={type} autoComplete={autoComplete} required className="rounded-md border border-line bg-ink px-4 py-3 font-sans text-sm text-paper placeholder:text-slate focus:border-copper focus:outline-none" placeholder={label} />
  </label>
);

const InfoBlock = ({ title, body }: { title: string; body: string }) => (
  <article className="rounded-lg border border-line bg-panel p-6">
    <h2 className="font-mono text-sm font-semibold text-paper">{title}</h2>
    <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
  </article>
);

const ListBlock = ({ title, items }: { title: string; items: string[] }) => (
  <article className="rounded-lg border border-line bg-panel p-6">
    <h2 className="font-mono text-sm font-semibold text-paper">{title}</h2>
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
