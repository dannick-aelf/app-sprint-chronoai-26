/**
 * InternalTestingPhase component
 * 
 * Terminal CLI style: Week 2 - Internal Testing phase
 */

import type { Phase } from '../../types';
import { PhaseCard } from './PhaseCard';
import { MilestoneMarker } from '../milestones/MilestoneMarker';

interface InternalTestingPhaseProps {
  /** Phase data */
  phase: Phase;
  /** Whether phase is selected */
  isSelected?: boolean;
  /** Callback when phase is clicked */
  onClick?: () => void;
}

export const InternalTestingPhase = ({ phase, isSelected, onClick }: InternalTestingPhaseProps) => {
  // Find broadcast milestone (Monday)
  const broadcastMilestone = phase.milestones?.find(
    m => m.type === 'broadcast' && m.day === 1
  );

  return (
    <div className="relative space-y-3">
      <PhaseCard
        phase={phase}
        isSelected={isSelected}
        onClick={onClick}
      />
      {broadcastMilestone && (
        <div className="flex items-center gap-2 mt-3">
          <MilestoneMarker milestone={broadcastMilestone} size="sm" />
          <span className="text-xs text-terminal-muted font-mono uppercase tracking-wider">BROADCAST</span>
        </div>
      )}
    </div>
  );
};
