/**
 * MarketLaunchPhase component
 * 
 * Terminal CLI style: Week 4 - Market Launch phase
 */

import type { Phase } from '../../types';
import { PhaseCard } from './PhaseCard';
import { MilestoneMarker } from '../milestones/MilestoneMarker';

interface MarketLaunchPhaseProps {
  /** Phase data */
  phase: Phase;
  /** Whether phase is selected */
  isSelected?: boolean;
  /** Callback when phase is clicked */
  onClick?: () => void;
}

export const MarketLaunchPhase = ({ phase, isSelected, onClick }: MarketLaunchPhaseProps) => {
  // Find milestones
  const testFlightMilestone = phase.milestones?.find(m => m.type === 'testflight');
  const marketLiveMilestone = phase.milestones?.find(m => m.type === 'market-live');

  return (
    <div className="relative space-y-4">
      <PhaseCard
        phase={phase}
        isSelected={isSelected}
        onClick={onClick}
      />

      {/* Milestones */}
      <div className="flex flex-col gap-3 mt-3">
        {testFlightMilestone && (
          <div className="flex items-center gap-2">
            <MilestoneMarker milestone={testFlightMilestone} size="sm" />
            <span className="text-xs text-terminal-muted font-mono uppercase tracking-wider">TESTFLIGHT READY</span>
          </div>
        )}
        {marketLiveMilestone && (
          <div className="flex items-center gap-2">
            <MilestoneMarker milestone={marketLiveMilestone} size="sm" />
            <span className="text-xs text-terminal-muted font-mono uppercase tracking-wider">MARKET LIVE</span>
          </div>
        )}
      </div>
    </div>
  );
};
