export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: Date | number;
  category?: string;
  color?: string;
  metadata?: Record<string, unknown>;
  connections?: string[];
}

export interface TimelineConfig {
  orientation: 'horizontal' | 'vertical';
  timeRange?: { start: Date; end: Date };
  zoomLevel?: number;
  showConnections?: boolean;
  darkMode?: boolean;
}

export interface TimelineBoardProps {
  events: TimelineEvent[];
  config?: Partial<TimelineConfig>;
  onEventClick?: (event: TimelineEvent) => void;
  onEventSelect?: (event: TimelineEvent | null) => void;
}
