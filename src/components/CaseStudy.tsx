import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { isPlaceholder, type CaseStudy as CaseStudyData } from '../data/caseStudies';
import { ArchitectureFlow } from './ArchitectureFlow';
import { Link } from './Link';

/** Highlights unfinished [placeholder] text in development; renders nothing for it in production. */
const Placeholder = ({ text }: { text: string }) =>
  import.meta.env.DEV ? (
    <p className="rounded-md border border-dashed border-amber-400/60 bg-amber-400/10 px-3 py-2 font-mono text-xs text-amber-200">
      TODO (hidden in production): {text}
    </p>
  ) : null;

const Media = ({ study }: { study: CaseStudyData }) => {
  if (study.media?.kind === 'image') {
    return <img src={study.media.src} alt={study.media.alt} loading="lazy" decoding="async" className="h-full w-full rounded-lg border border-line object-cover" />;
  }
  if (study.media?.kind === 'video') {
    return (
      <video controls preload="none" poster={study.media.poster} className="h-full w-full rounded-lg border border-line" aria-label={study.media.alt}>
        <source src={study.media.src} />
      </video>
    );
  }
  // No screenshot yet: show the process the software runs, in plain words.
  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-lg border border-line bg-ink bg-grid p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate">How it works</p>
      <ArchitectureFlow flow={study.steps.map((step, index) => ({ label: `Step ${index + 1}`, nodes: [step] }))} />
    </div>
  );
};

export const CaseStudy = ({ study, index }: { study: CaseStudyData; index: number }) => {
  const outcomeReady = !isPlaceholder(study.outcome);

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-panel">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-6 py-5 md:px-8">
        <span className="font-mono text-xs text-copper">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-2xl font-semibold tracking-tight text-paper">{study.title}</h3>
        <span className="text-sm text-muted">{study.category}</span>
        {study.status && (
          <span className="ml-auto rounded-full border border-copper/40 bg-copper/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-copper">{study.status}</span>
        )}
      </header>

      <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-7">
          <section>
            <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-slate">The problem</h4>
            <p className="mt-2 text-base leading-8 text-paper">{study.problem}</p>
          </section>
          <section>
            <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-slate">What I built</h4>
            <ul className="mt-3 space-y-2.5">
              {study.built.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-6 text-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-copper" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          {outcomeReady ? (
            <section className="rounded-lg border border-copper/30 bg-copper/5 p-4">
              <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-copper">The outcome</h4>
              <p className="mt-2 text-lg font-semibold leading-7 text-paper">{study.outcome}</p>
            </section>
          ) : (
            <Placeholder text={study.outcome} />
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="min-h-[12rem] flex-1">
            <Media study={study} />
          </div>
          {study.note && <p className="text-xs italic text-slate">{study.note}</p>}
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-4 md:px-8">
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {study.stack.map((tech) => (
            <li key={tech} className="rounded border border-line bg-ink px-2 py-0.5 font-mono text-[11px] text-muted">
              {tech}
            </li>
          ))}
        </ul>
        {study.link &&
          (study.link.external ? (
            <a href={study.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-paper transition hover:text-copper">
              {study.link.label} <ArrowUpRight size={15} />
            </a>
          ) : (
            <Link to={study.link.href} className="inline-flex items-center gap-2 font-mono text-sm text-paper transition hover:text-copper">
              {study.link.label} <ArrowRight size={15} />
            </Link>
          ))}
      </footer>
    </article>
  );
};
