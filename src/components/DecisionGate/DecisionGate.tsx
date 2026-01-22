/**
 * DecisionGate component
 * 
 * Terminal CLI style: Command prompt with SELL/KILL options
 * Format: [ SELL ] or [ KILL ] with inverted video on selection
 */

import { useState } from 'react';
import type { DecisionGate as DecisionGateType, Milestone } from '../../types';
import { MilestoneMarker } from '../milestones/MilestoneMarker';
import { CheckCircle2, XCircle } from 'lucide-react';

interface DecisionGateProps {
  /** Decision gate data */
  decisionGate: DecisionGateType;
  /** Associated milestone */
  milestone: Milestone;
  /** Callback when decision is made */
  onDecisionMade?: (decision: 'sell' | 'kill') => void;
}

export const DecisionGate = ({ decisionGate, milestone, onDecisionMade }: DecisionGateProps) => {
  const [localDecision, setLocalDecision] = useState<DecisionGateType['decision']>(decisionGate.decision);

  const handleDecision = (decision: 'sell' | 'kill') => {
    setLocalDecision(decision);
    onDecisionMade?.(decision);
  };

  const currentDecision = localDecision || decisionGate.decision;

  return (
    <div className="relative mt-4">
      {/* Decision Gate Bar - Terminal Style */}
      <div className="border border-terminal-primary bg-terminal-bg p-4">
        {/* Milestone Marker - Above */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <MilestoneMarker milestone={milestone} size="sm" />
        </div>

        {/* Decision Buttons (if no decision made) - Terminal Style */}
        {!currentDecision && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleDecision('sell')}
              className="border border-terminal-primary bg-terminal-bg text-terminal-primary px-6 py-2 font-mono uppercase tracking-wider hover:bg-terminal-primary hover:text-terminal-bg transition-all duration-200"
            >
              [ SELL ]
            </button>
            <button
              onClick={() => handleDecision('kill')}
              className="border border-terminal-error bg-terminal-bg text-terminal-error px-6 py-2 font-mono uppercase tracking-wider hover:bg-terminal-error hover:text-terminal-bg transition-all duration-200"
            >
              [ KILL ]
            </button>
          </div>
        )}

        {/* Decision Display (if decision made) - Terminal Style */}
        {currentDecision && (
          <div className="flex items-center justify-center">
            <div
              className={`
                px-6 py-2 font-mono uppercase tracking-wider font-bold
                ${currentDecision === 'sell'
                  ? 'bg-terminal-primary text-terminal-bg border border-terminal-primary'
                  : 'bg-terminal-error text-terminal-bg border border-terminal-error'
                }
              `}
            >
              {currentDecision === 'sell' ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} strokeWidth={2} />
                  <span>[ SELL ]</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <XCircle size={16} strokeWidth={2} />
                  <span>[ KILL ]</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Label - Terminal Prompt Style */}
      <div className="mt-2 text-center">
        <p className="text-sm text-terminal-muted font-mono uppercase tracking-wider">&gt; DECISION MAKER</p>
      </div>

      {/* Branch Visualization - Terminal Style */}
      {currentDecision && (
        <div className="mt-4 flex items-center justify-center">
          {currentDecision === 'sell' ? (
            <div className="flex items-center gap-2 text-terminal-primary font-mono uppercase tracking-wider text-sm">
              <span>&gt;</span>
              <span>DEVELOPMENT CONTINUES</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-terminal-error font-mono uppercase tracking-wider text-sm">
              <span>&gt;</span>
              <span>DEVELOPMENT STOPS</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
