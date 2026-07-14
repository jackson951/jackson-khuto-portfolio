import { BriefcaseBusiness, Rocket, ShieldCheck, Workflow } from 'lucide-react';
import { experience, experienceImpactGroups } from '../data/portfolio';

const icons = [BriefcaseBusiness, ShieldCheck, Workflow, Rocket];

export const Experience = () => {
  return (
    <section id="experience" className="border-b border-line bg-panel/30">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/experience</div>

        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          Enterprise delivery, grouped by impact.
        </h2>

        <div className="mt-12 space-y-12">
          {experience.map((job) => (
            <div
              key={job.company}
              className="relative border-l border-line pl-7 sm:pl-9"
            >
              <span
                className={`absolute left-0 top-1.5 -translate-x-1/2 h-2.5 w-2.5 rounded-full border-2 border-ink ${
                  job.current ? 'bg-copper' : 'bg-slate'
                }`}
              />

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-mono text-base font-semibold text-paper sm:text-lg">
                  {job.role}
                </h3>
                <span className="font-mono text-2xs text-slate">{job.period}</span>
              </div>

              <p className="mt-1 font-mono text-xs text-copper">
                {job.company} <span className="text-slate">· {job.location}</span>
                {job.current && (
                  <span className="ml-2 rounded-full border border-copper/30 bg-copper/10 px-2 py-0.5 text-2xs text-copper-bright">
                    current
                  </span>
                )}
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">
                Building and supporting internal enterprise applications across
                frontend, backend, data, identity, reporting, UAT, deployment,
                and production support.
              </p>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {experienceImpactGroups.map((group, index) => {
                  const Icon = icons[index];
                  return (
                    <article key={group.title} className="rounded-lg border border-line bg-ink p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-panel text-copper">
                          <Icon size={17} />
                        </div>
                        <h3 className="font-mono text-sm font-semibold text-paper">
                          {group.title}
                        </h3>
                      </div>

                      <ul className="mt-5 space-y-3">
                        {group.points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-sm leading-6 text-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
