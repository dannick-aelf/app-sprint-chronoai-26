/**
 * Type definitions for the VibeCode Structure workflow timeline system.
 * 
 * These types define the data structures for the 4-week overlapping
 * app development cycle from ideation to market launch.
 */

/**
 * Represents a complete app development cycle (4 weeks)
 */
export interface AppCycle {
  /** Unique identifier for the cycle */
  id: string;
  /** Name of the app being developed */
  name: string;
  /** Cycle number (for tracking multiple cycles) */
  cycleNumber: number;
  /** Start date of the cycle */
  startDate: Date;
  /** End date of the cycle */
  endDate: Date;
  /** Current status of the cycle */
  status: 'active' | 'completed' | 'killed';
  /** Team member assigned to ideation phase */
  assignee?: string;
  /** Decision made at Week 3 Wednesday (Sell/Kill) */
  decision?: 'sell' | 'kill' | null;
  /** Date when decision was made */
  decisionDate?: Date;
  /** Date when app went to market */
  marketLaunchDate?: Date;
}

/**
 * Represents a phase within a week of the development cycle
 */
export interface Phase {
  /** Unique identifier for the phase */
  id: string;
  /** ID of the parent app cycle */
  appCycleId: string;
  /** Week number (1-4) */
  week: number;
  /** Type of phase */
  type: 'ideation' | 'testing' | 'feedback' | 'development' | 'launch';
  /** Starting day of week (1 = Monday, 5 = Friday) */
  startDay: number;
  /** Ending day of week (1 = Monday, 5 = Friday) */
  endDay: number;
  /** Current status of the phase */
  status: 'pending' | 'active' | 'completed' | 'paused' | 'killed';
  /** Team member assigned to this phase */
  assignee?: string;
  /** IDs of phases this phase depends on */
  dependencies?: string[];
  /** Milestones associated with this phase */
  milestones?: Milestone[];
  /** Technology stack used in this phase */
  technology?: 'html' | 'react-native';
  /** Display title */
  title: string;
  /** Display subtitle */
  subtitle?: string;
  /** Color for visualization */
  color?: string;
}

/**
 * Represents a milestone within a phase
 */
export interface Milestone {
  /** Unique identifier for the milestone */
  id: string;
  /** ID of the parent phase */
  phaseId: string;
  /** Type of milestone */
  type: 'ceo-meeting' | 'broadcast' | 'survey-start' | 'survey-end' | 'decision' | 'testflight' | 'market-live';
  /** Date of the milestone */
  date: Date;
  /** Day of week (1 = Monday, 5 = Friday) */
  day: number;
  /** Description of the milestone */
  description: string;
  /** Optional label for display */
  label?: string;
}

/**
 * Represents a decision gate (Week 3 Wednesday)
 */
export interface DecisionGate {
  /** Unique identifier for the decision gate */
  id: string;
  /** ID of the parent app cycle */
  appCycleId: string;
  /** Week number (always 3) */
  week: number;
  /** Day of week (always 3 = Wednesday) */
  day: number;
  /** Decision made: Sell, Kill, or null (pending) */
  decision: 'sell' | 'kill' | null;
  /** Date when decision was made */
  decisionDate?: Date;
  /** Rationale for the decision */
  rationale?: string;
  /** Impact of the decision */
  impact: {
    /** Whether development continues */
    developmentContinues: boolean;
    /** Whether product improvements are needed */
    productImprovements: boolean;
    /** Whether app will launch to market */
    marketLaunch: boolean;
  };
}

/**
 * Represents the overlap between two cycles
 */
export interface Overlap {
  /** Unique identifier for the overlap */
  id: string;
  /** ID of the original (first) cycle */
  originalCycleId: string;
  /** ID of the overlapping (second) cycle */
  overlappingCycleId: string;
  /** Week when overlap starts (always 3) */
  overlapStartWeek: number;
  /** Date when overlap starts */
  overlapStartDate: Date;
}

/**
 * Configuration for timeline display
 */
export interface TimelineConfig {
  /** Show overlap track */
  showOverlap?: boolean;
  /** Zoom level */
  zoomLevel?: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Show technology badges */
  showTechnologyBadges?: boolean;
  /** Show milestone markers */
  showMilestones?: boolean;
}

/**
 * Props for TimelineBoard component
 */
export interface TimelineBoardProps {
  /** Array of app cycles to display */
  cycles: AppCycle[];
  /** Array of phases to display */
  phases?: Phase[];
  /** Array of decision gates */
  decisionGates?: DecisionGate[];
  /** Array of overlaps with their cycles and phases */
  overlaps?: Array<{
    cycle: AppCycle;
    phases: Phase[];
    overlap: Overlap;
  }>;
  /** Configuration options */
  config?: TimelineConfig;
  /** Callback when a phase is clicked */
  onPhaseClick?: (phase: Phase) => void;
  /** Callback when a milestone is clicked */
  onMilestoneClick?: (milestone: Milestone) => void;
  /** Callback when decision is made */
  onDecisionMade?: (decisionGate: DecisionGate) => void;
}
