import { Fragment } from 'react';
import type { Project } from '../data/site';

interface ArchitectureFlowProps {
  flow: Project['flow'];
  compact?: boolean;
}

/**
 * Renders a project's request flow as stages connected by animated "packets".
 * Horizontal on wide screens; stacks vertically on narrow ones (non-compact only).
 */
export const ArchitectureFlow = ({ flow, compact = false }: ArchitectureFlowProps) => (
  <div
    role="img"
    aria-label={`Architecture: ${flow.map((stage) => `${stage.label} (${stage.nodes.join(', ')})`).join(' → ')}`}
    className={`flex w-full ${compact ? 'flex-row items-center' : 'flex-col items-stretch sm:flex-row sm:items-center'}`}
  >
    {flow.map((stage, index) => (
      <Fragment key={stage.label}>
        {index > 0 && <Connector compact={compact} delay={index * 0.35} />}
        <div className={`min-w-0 ${compact ? 'flex-1' : 'sm:flex-1'}`}>
          <p className={`mb-1.5 font-mono uppercase tracking-[0.14em] text-slate ${compact ? 'text-[8px]' : 'text-[10px]'}`}>{stage.label}</p>
          <div className="grid gap-1">
            {stage.nodes.map((node) => (
              <span
                key={node}
                className={`block rounded border border-line bg-ink/80 font-mono text-paper ${compact ? 'truncate px-1.5 py-1 text-[9px]' : 'break-words px-2 py-2 text-[11px] leading-tight'}`}
                title={node}
              >
                {node}
              </span>
            ))}
          </div>
        </div>
      </Fragment>
    ))}
  </div>
);

const Connector = ({ compact, delay }: { compact: boolean; delay: number }) => (
  <div
    aria-hidden="true"
    className={`relative shrink-0 ${compact ? 'mx-1 mt-4 h-px w-3' : 'mx-auto my-1 h-5 w-px sm:mx-2 sm:my-0 sm:mt-5 sm:h-px sm:w-6'} bg-line`}
  >
    <span
      className={`absolute h-1 w-1 rounded-full bg-copper shadow-[0_0_6px_rgba(201,128,61,0.9)] ${
        compact ? 'top-1/2 -translate-y-1/2 animate-packet-x' : 'left-1/2 -translate-x-1/2 animate-packet-y sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:animate-packet-x'
      }`}
      style={{ animationDelay: `${delay}s` }}
    />
  </div>
);
