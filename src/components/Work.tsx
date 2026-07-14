import { ArrowRight, CheckCircle2, ExternalLink, Layers3 } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { featuredProjectId, projects } from '../data/portfolio';

const statusConfig: Record<string, { label: string; dot: string }> = {
  live: { label: 'deployed', dot: 'bg-copper' },
  api: { label: 'api service', dot: 'bg-slate' },
  archived: { label: 'archived', dot: 'bg-line' },
};

export const Work = () => {
  const featuredProject = projects.find((project) => project.id === featuredProjectId) ?? projects[0];
  if (!featuredProject) return null;

  const otherProjects = projects.filter((project) => project.id !== featuredProject.id);
  const featuredStatus = statusConfig[featuredProject.status];
  const architecture = ['React UI', 'Node.js API', 'PostgreSQL', 'JWT / RBAC'];

  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/work</div>

        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          Featured work that shows the system, not just the screen.
        </h2>
        <p className="mt-3 max-w-xl font-mono text-sm text-muted">
          Projects selected to show full-stack thinking: frontend flows,
          backend APIs, data design, access control, and deployment readiness.
        </p>

        <article className="mt-12 overflow-hidden rounded-lg border border-line bg-panel">
          <div className="grid gap-px bg-line lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-panel p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-2xs uppercase text-copper">featured project</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-2xs text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${featuredStatus.dot}`} />
                  {featuredStatus.label}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-paper">
                {featuredProject.name}
              </h3>
              <p className="mt-2 text-sm text-copper">{featuredProject.description}</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-2xs uppercase text-slate">problem</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Leave requests can become difficult to track when approvals,
                    balances, user roles, and request history are handled across
                    disconnected manual processes.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-2xs uppercase text-slate">solution</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Built a full-stack leave management platform with secure
                    authentication, role-aware workflows, a responsive interface,
                    and a structured data layer.
                  </p>
                </div>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {featuredProject.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5 text-sm leading-6 text-muted">
                    <CheckCircle2 size={15} className="mt-1 shrink-0 text-copper" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-2xs text-paper"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-line pt-6">
                <a
                  href={featuredProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-paper transition-colors hover:text-copper"
                >
                  <GithubIcon size={14} />
                  Repository
                </a>
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-paper transition-colors hover:text-copper"
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                )}
              </div>
            </div>

            <div className="bg-ink p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs text-paper">
                <Layers3 size={15} className="text-copper" />
                architecture.flow
              </div>

              <div className="mt-8 space-y-3">
                {architecture.map((layer, index) => (
                  <div key={layer}>
                    <div className="rounded-md border border-line bg-panel px-4 py-3 font-mono text-sm text-paper">
                      {layer}
                    </div>
                    {index < architecture.length - 1 && (
                      <div className="flex h-7 items-center pl-5 text-slate">
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-8 border-t border-line pt-6 text-sm leading-6 text-muted">
                The focus is not only on building screens, but on connecting
                user workflows to reliable APIs, protected access, and a
                database model that supports the business process.
              </p>
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => {
            const status = statusConfig[project.status];
            return (
              <article
                key={project.id}
                className="group flex flex-col rounded-lg border border-line bg-ink p-5 transition-colors hover:border-slate hover:bg-panel"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xs text-slate">{project.path}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-2xs text-muted">
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-paper">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-copper">{project.description}</p>

                <p className="mt-4 text-sm leading-6 text-muted">
                  {project.longDescription}
                </p>

                <ul className="mt-4 space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-6 text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-line bg-ink px-2 py-0.5 font-mono text-2xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-4 border-t border-line pt-5">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-paper transition-colors hover:text-copper"
                  >
                    <GithubIcon size={14} />
                    Repository
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-paper transition-colors hover:text-copper"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/jackson951?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:border-copper hover:text-copper"
          >
            <GithubIcon size={16} />
            View all repositories
          </a>
        </div>
      </div>
    </section>
  );
};
