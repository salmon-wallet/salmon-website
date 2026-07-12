import { Fragment } from 'react';

interface FlowStripProps {
  /** Ordered node labels. Rendered left-to-right on desktop, stacked on mobile. */
  nodes: string[];
  /** Index of the node to highlight with the accent tint (optional). */
  accentIndex?: number;
}

/**
 * Small connected flow: node → node → node. Horizontal on desktop, vertical
 * on mobile. Shared by the Ecosystem reroute story and the protocols
 * integration → usage → return band.
 */
export default function FlowStrip({ nodes, accentIndex }: FlowStripProps) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-0">
      {nodes.map((node, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span aria-hidden="true" className="self-center px-2 text-accent sm:px-3">
              <span className="hidden sm:inline">→</span>
              <span className="sm:hidden">↓</span>
            </span>
          )}
          <div
            className={`flex-1 rounded-lg border px-3 py-2.5 text-center text-sm leading-tight ${
              i === accentIndex
                ? 'border-accent/50 bg-accent/10 font-medium text-text-primary'
                : 'border-border-subtle bg-card-bg/40 text-text-secondary'
            }`}
          >
            {node}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
