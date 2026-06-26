import { ArrowDown, MapPin } from 'lucide-react';
import { profile } from '../data/portfolio';

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-grid bg-grid border-b border-line"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="animate-rise font-mono text-xs text-copper">
          <span className="text-slate">$</span> whoami
        </div>

        <h1 className="mt-5 animate-rise text-[2.5rem] font-bold leading-[1.05] tracking-tight text-paper sm:text-6xl md:text-7xl" style={{ animationDelay: '80ms' }}>
          {profile.name}
        </h1>

        <p className="mt-5 max-w-xl animate-rise font-mono text-sm leading-relaxed text-muted sm:text-base" style={{ animationDelay: '160ms' }}>
          <span className="text-copper">function</span> build(<span className="text-paper">idea</span>) {'{'}
          <br />
          &nbsp;&nbsp;<span className="text-slate">// {profile.tagline}</span>
          <br />
          &nbsp;&nbsp;<span className="text-copper">return</span> system.<span className="text-paper">ship</span>(idea);
          <br />
          {'}'}
        </p>

        <div
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 animate-rise"
          style={{ animationDelay: '240ms' }}
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate">
            <MapPin size={13} />
            {profile.location} · open to remote
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
            href="#contact"
            className="rounded-md border border-line px-5 py-2.5 font-mono text-sm font-medium text-paper transition-colors hover:border-slate hover:bg-panel"
          >
            Get in touch
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate transition-colors hover:text-copper md:block"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
};
