import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects } from '../data/portfolio';

const statusConfig: Record<string, { label: string; dot: string }> = {
  live: { label: 'deployed', dot: 'bg-copper' },
  api: { label: 'api service', dot: 'bg-slate' },
  archived: { label: 'archived', dot: 'bg-line' },
};

export const Work = () => {
  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/work</div>

        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          Selected projects.
        </h2>
        <p className="mt-3 max-w-xl font-mono text-sm text-muted">
          A few of the systems I've built end to end — full repository list
          is on GitHub.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => {
            const status = statusConfig[project.status];
            return (
              <article
                key={project.id}
                className="group flex flex-col rounded-lg border border-line bg-panel p-6 transition-colors hover:border-slate"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xs text-slate">{project.path}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-2xs text-muted">
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-paper">
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

                <div className="mt-6 flex items-center gap-4 border-t border-line pt-5">
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
