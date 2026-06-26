import { experience } from '../data/portfolio';

export const Experience = () => {
  return (
    <section id="experience" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/experience</div>

        <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          Where the work happened.
        </h2>

        <div className="mt-12 space-y-10">
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

              <ul className="mt-4 space-y-2.5">
                {job.bullets.map((b, idx) => (
                  <li key={idx} className="flex gap-2.5 text-sm leading-6 text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
