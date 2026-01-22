/**
 * IdeationPhase component
 * 
 * Terminal CLI style: Week 1 - Ideation & Demo phase
 */

import type { Phase } from '../../types';
import { PhaseCard } from './PhaseCard';
import { MilestoneMarker } from '../milestones/MilestoneMarker';

interface IdeationPhaseProps {
  /** Phase data */
  phase: Phase;
  /** Whether phase is selected */
  isSelected?: boolean;
  /** Callback when phase is clicked */
  onClick?: () => void;
}

export const IdeationPhase = ({ phase, isSelected, onClick }: IdeationPhaseProps) => {
  // Find CEO meeting milestone (Friday)
  const ceoMilestone = phase.milestones?.find(
    m => m.type === 'ceo-meeting' && m.day === 5
  );

  return (
    <div className="relative space-y-3">
      <PhaseCard
        phase={phase}
        isSelected={isSelected}
        onClick={onClick}
      />
      {ceoMilestone && (
        <div className="flex items-center gap-2 mt-3">
          <MilestoneMarker milestone={ceoMilestone} size="sm" />
          <span className="text-xs text-terminal-muted font-mono uppercase tracking-wider">CEO MEETING</span>
        </div>
      )}
    </div>
  );
};
