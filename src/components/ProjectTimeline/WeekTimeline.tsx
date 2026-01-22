import type { ReactNode } from 'react';

interface WeekTimelineProps {
  children: ReactNode;
}

export const WeekTimeline = ({ children }: WeekTimelineProps) => {
  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Day Indicators */}
      <div className="flex items-center justify-center gap-3 px-6 py-3 border-b border-dark-border bg-dark-surface backdrop-blur-sm">
        {['M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div
            key={index}
            className="w-10 text-center text-xs font-semibold text-dark-text-secondary tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Timeline Content */}
      <div className="flex-1 relative overflow-hidden">{children}</div>
    </div>
  );
};
