/**
 * PhaseCard component
 * 
 * Terminal CLI style: Clean bordered box with terminal aesthetic
 */

import type { Phase } from '../../types';
import { TechnologyBadge } from '../TechnologyBadge/TechnologyBadge';

interface PhaseCardProps {
  /** Phase data to display */
  phase: Phase;
  /** Whether this phase is selected */
  isSelected?: boolean;
  /** Callback when phase is clicked */
  onClick?: () => void;
}

const STATUS_LABELS = {
  pending: '[PENDING]',
  active: '[ACTIVE]',
  completed: '[OK]',
  paused: '[PAUSED]',
  killed: '[ERR]',
};

const STATUS_COLORS = {
  pending: '#1f521f',
  active: '#33ff00',
  completed: '#33ff00',
  paused: '#ffb000',
  killed: '#ff3333',
};

export const PhaseCard = ({ phase, isSelected, onClick }: PhaseCardProps) => {
  const statusLabel = STATUS_LABELS[phase.status] || STATUS_LABELS.pending;
  const statusColor = STATUS_COLORS[phase.status] || STATUS_COLORS.pending;

  return (
    <div
      onClick={onClick}
      className={`
        group cursor-pointer transition-all duration-200
        ${isSelected ? 'ring-2 ring-terminal-primary' : ''}
      `}
    >
      <div
        className={`
          relative border p-4 bg-terminal-bg
          transition-all duration-200
          ${isSelected ? 'border-terminal-primary' : 'border-terminal-border'}
          ${onClick ? 'hover:border-terminal-primary' : ''}
        `}
      >
        {/* Status Indicator */}
        <div className="absolute top-2 right-2">
          <span 
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: statusColor }}
          >
            {statusLabel}
          </span>
        </div>

        {/* Technology Badge - Top Left */}
        {phase.technology && (
          <div className="mb-3">
            <TechnologyBadge technology={phase.technology} />
          </div>
        )}

        {/* Title - Clean, prominent */}
        <h3 className="text-lg font-bold uppercase tracking-wider text-terminal-foreground font-mono mb-2">
          {phase.title}
        </h3>

        {/* Subtitle - Terminal style */}
        {phase.subtitle && (
          <p className="text-sm text-terminal-muted uppercase tracking-wider font-mono">
            &gt; {phase.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
