import { useState } from 'react';
import type { TimelineEvent as TimelineEventType } from './types';

interface TimelineEventProps {
  event: TimelineEventType;
  position: number;
  isSelected: boolean;
  onClick: () => void;
  orientation: 'horizontal' | 'vertical';
}

export const TimelineEvent = ({
  event,
  position,
  isSelected,
  onClick,
  orientation,
}: TimelineEventProps) => {
  const eventColor = event.color || '#6366f1';
  const isHorizontal = orientation === 'horizontal';

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        group absolute cursor-pointer transition-all duration-200 ease-out
        ${isSelected ? 'z-20' : 'z-10'}
        ${isHorizontal ? 'flex items-center' : 'flex flex-col items-center'}
      `}
      style={
        isHorizontal
          ? {
              left: `${position}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }
          : {
              top: `${position}%`,
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }
      }
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Timeline event: ${event.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Event Node */}
      <div
        className={`
          relative flex items-center justify-center
          min-w-[44px] min-h-[44px] rounded-full
          transition-all duration-200 ease-out
          ${isSelected ? 'scale-110' : 'scale-100'}
          ${isSelected ? 'ring-2 ring-offset-2 ring-offset-dark-bg' : ''}
          active:scale-95
        `}
        style={{
          backgroundColor: isSelected ? eventColor : `${eventColor}80`,
          boxShadow: isSelected
            ? `0 0 0 2px ${eventColor}, 0 4px 12px ${eventColor}40`
            : `0 2px 8px ${eventColor}20`,
        }}
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: eventColor }}
        />
      </div>

      {/* Event Label */}
      <div
        className={`
          absolute whitespace-nowrap
          ${isHorizontal ? 'top-full mt-2' : 'left-full ml-3'}
          ${isHorizontal ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2'}
          px-3 py-1.5 rounded-lg
          bg-dark-elevated border border-dark-border
          text-dark-text-primary text-sm font-medium
          transition-opacity duration-200
          ${isSelected || isHovered ? 'opacity-100' : 'opacity-0'}
          pointer-events-none
        `}
      >
        {event.title}
        {event.description && (
          <div className="text-xs text-dark-text-secondary mt-1 max-w-[200px] truncate">
            {event.description}
          </div>
        )}
      </div>
    </div>
  );
};
