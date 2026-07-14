import { ArrowDown, CheckCircle2, MapPin, TerminalSquare } from 'lucide-react';
import { profile } from '../data/portfolio';

const snapshot = [
  ['currently', 'Software Developer · Barloworld Equipment'],
  ['focus', 'Enterprise apps, APIs, dashboards, authentication'],
  ['stack', 'React · TypeScript · Node.js · SQL Server · Azure'],
  ['availability', 'Open to software developer roles'],
];

const specialties = [
  'React & TypeScript',
  'Node.js APIs',
  'SQL Server',
  'Azure AD auth',
  'Enterprise dashboards',
];

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-grid bg-grid border-b border-line"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      <div className="relative mx-auto grid max-w-5xl gap-12 px-6 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="animate-rise font-mono text-xs text-copper">
            <span className="text-slate">$</span> whoami
          </div>

          <h1 className="mt-5 animate-rise text-[2.5rem] font-bold leading-[1.05] text-paper sm:text-6xl md:text-7xl" style={{ animationDelay: '80ms' }}>
            {profile.name}
          </h1>

          <p className="mt-5 max-w-[18rem] animate-rise text-base leading-7 text-muted sm:max-w-2xl sm:text-xl sm:leading-8" style={{ animationDelay: '160ms' }}>
            Software developer building enterprise web applications, secure APIs,
            workflow automation, and reporting tools for real business operations.
          </p>

          <div
            className="mt-8 flex flex-col items-start gap-3 animate-rise sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6"
            style={{ animationDelay: '240ms' }}
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate">
              <MapPin size={13} />
              <span className="sm:hidden">Midrand, Gauteng · remote</span>
              <span className="hidden sm:inline">{profile.location} · open to remote</span>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-line sm:inline-block" />
            <span className="font-mono text-xs text-slate">{profile.role}</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 animate-rise" style={{ animationDelay: '320ms' }}>
            <a
              href="#work"
              className="rounded-md bg-copper px-5 py-2.5 font-mono text-sm font-medium text-ink transition-transform hover:scale-[1.02] hover:bg-copper-bright"
            >
              View work
            </a>
            <a
              href="#build"
              className="rounded-md border border-line px-5 py-2.5 font-mono text-sm font-medium text-paper transition-colors hover:border-slate hover:bg-panel"
            >
              What I build
            </a>
          </div>
        </div>

        <div className="animate-rise rounded-lg border border-line bg-ink/80 shadow-2xl shadow-black/20" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-paper">
              <TerminalSquare size={15} className="text-copper" />
              developer.snapshot
            </span>
            <span className="font-mono text-2xs text-copper">online</span>
          </div>

          <div className="divide-y divide-line">
            {snapshot.map(([label, value]) => (
            <div key={label} className="grid min-w-0 gap-1 px-4 py-4 sm:grid-cols-[8rem_1fr] sm:gap-5 sm:px-5">
              <span className="font-mono text-2xs uppercase text-slate">{label}</span>
                <span className="min-w-0 break-words text-xs leading-6 text-muted sm:text-sm">{value}</span>
            </div>
            ))}
          </div>

          <div className="border-t border-line px-4 py-5 sm:px-5">
            <p className="font-mono text-2xs uppercase text-slate">specializing in</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {specialties.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 font-mono text-xs text-paper">
                  <CheckCircle2 size={14} className="text-copper" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#build"
        aria-label="Scroll to what I build section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate transition-colors hover:text-copper md:block"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
};
