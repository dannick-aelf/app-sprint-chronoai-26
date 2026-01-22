export interface Week {
  weekNumber: number;
  label: string;
  track: 'web' | 'ios' | 'both';
}

export interface Phase {
  id: string;
  label: string;
  subLabel?: string;
  type: 'box' | 'circle' | 'bar' | 'branch';
  week: number;
  position?: { x: number; y: number };
  connections?: string[];
  status: 'pending' | 'active' | 'completed';
  visualStyle: {
    color: string;
    pattern?: 'diagonal-blue' | 'diagonal-red' | 'solid';
    markers?: string[];
  };
}

export interface DeploymentBranch {
  id: string;
  label: string;
  target: 'testflight' | 'production';
  direction: 'left' | 'right';
  week: number;
}
