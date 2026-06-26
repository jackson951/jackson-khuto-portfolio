import { stackGroups } from '../data/portfolio';

export const Stack = () => {
  return (
    <section id="stack" className="border-b border-line bg-panel/30">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="font-mono text-xs text-copper">/stack</div>
        <h2 className="mt-4 text-2xl font-semibold text-paper sm:text-3xl">
          package.json
        </h2>
        <p className="mt-3 max-w-xl font-mono text-sm text-muted">
          The tools I reach for most, grouped by where they sit in the stack.
        </p>

        <div className="mt-12 overflow-hidden rounded-lg border border-line">
          <div className="bg-ink px-5 py-3 font-mono text-xs text-slate">
            dependencies
          </div>
          <div className="divide-y divide-line bg-panel">
            {stackGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="shrink-0 font-mono text-xs uppercase tracking-wider text-slate sm:w-36">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-line bg-ink px-2.5 py-1 font-mono text-xs text-paper transition-colors hover:border-copper/50 hover:text-copper"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
