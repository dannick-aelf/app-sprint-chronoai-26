/**
 * Mock data generator for development and testing
 * 
 * Generates sample data for the VibeCode Structure workflow timeline
 */

import type { AppCycle, Phase, Milestone, DecisionGate, Overlap } from '../types/timeline';

/**
 * Generate a mock app cycle
 */
export function generateMockAppCycle(
  cycleNumber: number,
  name: string,
  startDate: Date,
  assignee?: string
): AppCycle {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 28); // 4 weeks

  return {
    id: `cycle-${cycleNumber}`,
    name,
    cycleNumber,
    startDate,
    endDate,
    status: 'active',
    assignee,
    decision: null,
  };
}

/**
 * Generate mock phases for a complete cycle
 */
export function generateMockPhases(appCycleId: string, _startDate: Date): Phase[] {
  const phases: Phase[] = [];

  // Week 1: Ideation & Demo
  phases.push({
    id: `${appCycleId}-phase-ideation`,
    appCycleId,
    week: 1,
    type: 'ideation',
    startDay: 1, // Monday
    endDay: 5, // Friday
    status: 'completed',
    title: 'Create vibecoded app concept & DEMO',
    subtitle: 'Create vibecoded app concept',
    color: '#8b5cf6',
  });

  // Week 2: Internal Testing
  phases.push({
    id: `${appCycleId}-phase-testing`,
    appCycleId,
    week: 2,
    type: 'testing',
    startDay: 1, // Monday
    endDay: 5, // Friday
    status: 'completed',
    title: 'Internal Testing',
    subtitle: 'Company-wide testing',
    technology: 'html',
    color: '#3b82f6',
  });

  // Week 3: Feedback & Decision
  phases.push({
    id: `${appCycleId}-phase-feedback`,
    appCycleId,
    week: 3,
    type: 'feedback',
    startDay: 1, // Monday
    endDay: 5, // Friday
    status: 'active',
    title: 'Feedback & Decision',
    subtitle: 'Survey and development start',
    technology: 'react-native',
    color: '#8b5cf6',
  });

  // Week 4: Market Launch
  phases.push({
    id: `${appCycleId}-phase-launch`,
    appCycleId,
    week: 4,
    type: 'launch',
    startDay: 1, // Monday
    endDay: 5, // Friday
    status: 'pending',
    title: 'Market Launch',
    subtitle: 'TestFlight and market release',
    technology: 'react-native',
    color: '#f59e0b',
  });

  return phases;
}

/**
 * Generate mock milestones for a cycle
 */
export function generateMockMilestones(phases: Phase[]): Milestone[] {
  const milestones: Milestone[] = [];

  // Week 1: CEO Meeting (Friday)
  const ideationPhase = phases.find(p => p.type === 'ideation');
  if (ideationPhase) {
    milestones.push({
      id: `${ideationPhase.id}-milestone-ceo-1`,
      phaseId: ideationPhase.id,
      type: 'ceo-meeting',
      date: new Date(),
      day: 5, // Friday
      description: 'Present app demo at CEO meeting',
      label: 'CEO Meeting',
    });
  }

  // Week 2: Broadcast (Monday)
  const testingPhase = phases.find(p => p.type === 'testing');
  if (testingPhase) {
    milestones.push({
      id: `${testingPhase.id}-milestone-broadcast`,
      phaseId: testingPhase.id,
      type: 'broadcast',
      date: new Date(),
      day: 1, // Monday
      description: 'Broadcast app to entire company',
      label: 'Broadcast',
    });
  }

  // Week 3: Survey Start (Monday), Survey End (Tuesday), Decision (Wednesday)
  const feedbackPhase = phases.find(p => p.type === 'feedback');
  if (feedbackPhase) {
    milestones.push({
      id: `${feedbackPhase.id}-milestone-survey-start`,
      phaseId: feedbackPhase.id,
      type: 'survey-start',
      date: new Date(),
      day: 1, // Monday
      description: 'Survey sent for feedback collection',
      label: 'Survey Start',
    });

    milestones.push({
      id: `${feedbackPhase.id}-milestone-survey-end`,
      phaseId: feedbackPhase.id,
      type: 'survey-end',
      date: new Date(),
      day: 2, // Tuesday
      description: 'Survey feedback collection ends',
      label: 'Survey End',
    });

    milestones.push({
      id: `${feedbackPhase.id}-milestone-decision`,
      phaseId: feedbackPhase.id,
      type: 'decision',
      date: new Date(),
      day: 3, // Wednesday
      description: 'Sell or Kill decision point',
      label: 'Decision Gate',
    });
  }

  // Week 4: TestFlight (Monday), Market Live (Friday)
  const launchPhase = phases.find(p => p.type === 'launch');
  if (launchPhase) {
    milestones.push({
      id: `${launchPhase.id}-milestone-testflight`,
      phaseId: launchPhase.id,
      type: 'testflight',
      date: new Date(),
      day: 1, // Monday
      description: 'TestFlight version ready',
      label: 'TestFlight Ready',
    });

    milestones.push({
      id: `${launchPhase.id}-milestone-market-live`,
      phaseId: launchPhase.id,
      type: 'market-live',
      date: new Date(),
      day: 5, // Friday
      description: 'App goes to market + CEO showcase',
      label: 'Market Live',
    });
  }

  return milestones;
}

/**
 * Generate mock decision gate
 */
export function generateMockDecisionGate(
  appCycleId: string,
  decision: 'sell' | 'kill' | null = null
): DecisionGate {
  return {
    id: `${appCycleId}-decision-gate`,
    appCycleId,
    week: 3,
    day: 3, // Wednesday
    decision,
    decisionDate: decision ? new Date() : undefined,
    impact: {
      developmentContinues: decision === 'sell',
      productImprovements: decision === 'sell',
      marketLaunch: decision === 'sell',
    },
  };
}

/**
 * Generate mock overlap
 */
export function generateMockOverlap(
  originalCycleId: string,
  overlappingCycleId: string,
  startDate: Date
): Overlap {
  return {
    id: `overlap-${originalCycleId}-${overlappingCycleId}`,
    originalCycleId,
    overlappingCycleId,
    overlapStartWeek: 3,
    overlapStartDate: startDate,
  };
}

/**
 * Generate complete mock timeline data
 */
export function generateMockTimelineData() {
  const now = new Date();
  const cycle1Start = new Date(now);
  cycle1Start.setDate(cycle1Start.getDate() - 14); // Started 2 weeks ago

  const cycle2Start = new Date(cycle1Start);
  cycle2Start.setDate(cycle2Start.getDate() + 14); // Starts at Week 3 of cycle 1

  // Generate cycles
  const cycle1 = generateMockAppCycle(1, 'App Alpha', cycle1Start, 'John Doe');
  const cycle2 = generateMockAppCycle(2, 'App Beta', cycle2Start, 'Jane Smith');

  // Generate phases
  const cycle1Phases = generateMockPhases(cycle1.id, cycle1Start);
  const cycle2Phases = generateMockPhases(cycle2.id, cycle2Start);

  // Generate milestones
  const cycle1Milestones = generateMockMilestones(cycle1Phases);
  const cycle2Milestones = generateMockMilestones(cycle2Phases);

  // Attach milestones to phases
  cycle1Phases.forEach(phase => {
    phase.milestones = cycle1Milestones.filter(m => m.phaseId === phase.id);
  });
  cycle2Phases.forEach(phase => {
    phase.milestones = cycle2Milestones.filter(m => m.phaseId === phase.id);
  });

  // Generate decision gates
  const cycle1Decision = generateMockDecisionGate(cycle1.id, 'sell');
  const cycle2Decision = generateMockDecisionGate(cycle2.id, null);

  // Generate overlap
  const overlap = generateMockOverlap(cycle1.id, cycle2.id, cycle2Start);

  return {
    cycles: [cycle1, cycle2],
    phases: [...cycle1Phases, ...cycle2Phases],
    milestones: [...cycle1Milestones, ...cycle2Milestones],
    decisionGates: [cycle1Decision, cycle2Decision],
    overlaps: [overlap],
  };
}
