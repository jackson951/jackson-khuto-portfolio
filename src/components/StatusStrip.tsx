import { stackGroups } from '../data/portfolio';

const flatStack = stackGroups.flatMap((g) => g.items).slice(0, 9);

export const StatusStrip = () => {
  return (
    <div className="border-b border-line bg-panel/60">
      <div className="mx-auto max-w-5xl overflow-hidden px-6 py-2.5">
        <div className="flex items-center gap-3 font-mono text-2xs text-slate">
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" />
            <span className="text-muted">system.status</span>
          </span>
          <span className="shrink-0 text-line">│</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {flatStack.map((item) => (
              <span key={item} className="whitespace-nowrap">
                <span className="text-copper/70">●</span>{' '}
                <span className="text-muted">{item.toLowerCase().replace(/\./g, '-').replace(/\s+/g, '-')}</span>
                <span className="text-slate"> running</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
