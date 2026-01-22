/**
 * MilestoneMarker component
 * 
 * Terminal CLI style: Simple bordered boxes with icons
 */

import type { Milestone } from '../../types';
import { 
  Users, 
  Radio, 
  FileText, 
  CheckCircle2, 
  Scale, 
  TestTube, 
  Rocket 
} from 'lucide-react';

interface MilestoneMarkerProps {
  /** Milestone data */
  milestone: Milestone;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Callback when clicked */
  onClick?: () => void;
}

const MILESTONE_CONFIG: Record<Milestone['type'], { Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; color: string; label: string }> = {
  'ceo-meeting': {
    Icon: Users,
    color: '#33ff00',
    label: 'CEO MEETING',
  },
  'broadcast': {
    Icon: Radio,
    color: '#33ff00',
    label: 'BROADCAST',
  },
  'survey-start': {
    Icon: FileText,
    color: '#33ff00',
    label: 'SURVEY START',
  },
  'survey-end': {
    Icon: CheckCircle2,
    color: '#33ff00',
    label: 'SURVEY END',
  },
  'decision': {
    Icon: Scale,
    color: '#33ff00',
    label: 'DECISION',
  },
  'testflight': {
    Icon: TestTube,
    color: '#33ff00',
    label: 'TESTFLIGHT',
  },
  'market-live': {
    Icon: Rocket,
    color: '#33ff00',
    label: 'MARKET LIVE',
  },
};

const SIZE_CLASSES = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const ICON_SIZES = {
  sm: 12,
  md: 16,
  lg: 20,
};

export const MilestoneMarker = ({ milestone, size = 'md', onClick }: MilestoneMarkerProps) => {
  const config = MILESTONE_CONFIG[milestone.type];
  const sizeClass = SIZE_CLASSES[size];
  const iconSize = ICON_SIZES[size];
  const IconComponent = config.Icon;

  return (
    <div
      onClick={onClick}
      className={`
        ${sizeClass}
        flex items-center justify-center border bg-terminal-bg
        cursor-pointer transition-all duration-200
        ${onClick ? 'hover:border-terminal-primary' : ''}
        font-mono
      `}
      style={{
        borderColor: config.color,
      }}
      title={milestone.label || config.label}
    >
      <span style={{ color: config.color }}>
        <IconComponent 
          size={iconSize} 
          className="flex-shrink-0"
          strokeWidth={2}
        />
      </span>
    </div>
  );
};
