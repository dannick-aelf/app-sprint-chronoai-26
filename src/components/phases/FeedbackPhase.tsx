/**
 * FeedbackPhase component
 * 
 * Terminal CLI style: Week 3 - Feedback & Decision phase
 */

import type { Phase, DecisionGate } from '../../types';
import { PhaseCard } from './PhaseCard';
import { MilestoneMarker } from '../milestones/MilestoneMarker';
import { DecisionGate as DecisionGateComponent } from '../DecisionGate/DecisionGate';

interface FeedbackPhaseProps {
  /** Phase data */
  phase: Phase;
  /** Decision gate data */
  decisionGate?: DecisionGate;
  /** Whether phase is selected */
  isSelected?: boolean;
  /** Callback when phase is clicked */
  onClick?: () => void;
  /** Callback when decision is made */
  onDecisionMade?: (decision: 'sell' | 'kill') => void;
}

export const FeedbackPhase = ({
  phase,
  decisionGate,
  isSelected,
  onClick,
  onDecisionMade,
}: FeedbackPhaseProps) => {
  // Find milestones
  const surveyStartMilestone = phase.milestones?.find(m => m.type === 'survey-start');
  const surveyEndMilestone = phase.milestones?.find(m => m.type === 'survey-end');
  const decisionMilestone = phase.milestones?.find(m => m.type === 'decision');

  return (
    <div className="relative space-y-4">
      {/* Main Phase Card */}
      <PhaseCard
        phase={phase}
        isSelected={isSelected}
        onClick={onClick}
      />

      {/* Milestones */}
      <div className="flex flex-wrap gap-2 mt-3">
        {surveyStartMilestone && (
          <div className="flex items-center gap-2">
            <MilestoneMarker milestone={surveyStartMilestone} size="sm" />
            <span className="text-xs text-terminal-muted font-mono uppercase tracking-wider">SURVEY START</span>
          </div>
        )}
        {surveyEndMilestone && (
          <div className="flex items-center gap-2">
            <MilestoneMarker milestone={surveyEndMilestone} size="sm" />
            <span className="text-xs text-terminal-muted font-mono uppercase tracking-wider">SURVEY END</span>
          </div>
        )}
      </div>

      {/* Decision Gate (Wednesday) */}
      {decisionGate && decisionMilestone && (
        <div className="mt-6">
          <DecisionGateComponent
            decisionGate={decisionGate}
            milestone={decisionMilestone}
            onDecisionMade={onDecisionMade}
          />
        </div>
      )}

      {/* Conditional rendering based on decision - Terminal Style */}
      {decisionGate?.decision === 'sell' && (
        <div className="mt-4 p-4 border border-terminal-primary bg-terminal-bg">
          <p className="text-sm text-terminal-primary font-mono uppercase tracking-wider terminal-text-glow">
            &gt; DEVELOPMENT CONTINUES • PRODUCT IMPROVEMENTS (THU-FRI)
          </p>
        </div>
      )}

      {decisionGate?.decision === 'kill' && (
        <div className="mt-4 p-4 border border-terminal-error bg-terminal-bg">
          <p className="text-sm text-terminal-error font-mono uppercase tracking-wider">
            &gt; DEVELOPMENT STOPPED
          </p>
        </div>
      )}
    </div>
  );
};
