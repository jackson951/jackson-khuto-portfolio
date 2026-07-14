import {
  BarChart3,
  Database,
  GitBranch,
  KeyRound,
  ServerCog,
  Workflow,
} from 'lucide-react';
import { buildAreas } from '../data/portfolio';

const icons = [ServerCog, Workflow, GitBranch, BarChart3, KeyRound, Database];

export const WhatIBuild = () => {
  return (
    <section id="build" className="border-b border-line bg-panel/30">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <div className="font-mono text-xs text-copper">/what-i-build</div>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold leading-snug text-paper sm:text-3xl">
              Secure business systems, not just good-looking screens.
            </h2>
            <p className="mt-5 max-w-md font-mono text-sm leading-7 text-muted">
              I build enterprise web applications that streamline workflows,
              protect access, surface operational data, and make internal
              processes easier to run.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {buildAreas.map((area, index) => {
              const Icon = icons[index];
              return (
                <article key={area.title} className="bg-ink p-5 transition-colors hover:bg-panel">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-panel text-copper">
                    <Icon size={17} />
                  </div>
                  <h3 className="mt-4 font-mono text-sm font-semibold text-paper">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{area.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
