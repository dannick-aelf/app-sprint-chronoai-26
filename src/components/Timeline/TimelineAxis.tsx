interface TimelineAxisProps {
  orientation: 'horizontal' | 'vertical';
  timeRange: { start: Date; end: Date };
  markers?: number;
}

export const TimelineAxis = ({
  orientation,
  timeRange,
  markers = 5,
}: TimelineAxisProps) => {
  const isHorizontal = orientation === 'horizontal';
  const duration = timeRange.end.getTime() - timeRange.start.getTime();
  const markerInterval = duration / (markers - 1);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div
      className={`
        absolute border-dark-border
        ${isHorizontal ? 'bottom-0 left-0 right-0 h-px border-t' : 'top-0 bottom-0 left-0 w-px border-l'}
      `}
    >
      {Array.from({ length: markers }).map((_, index) => {
        const time = new Date(timeRange.start.getTime() + markerInterval * index);
        const position = (index / (markers - 1)) * 100;

        return (
          <div
            key={index}
            className="absolute"
            style={
              isHorizontal
                ? {
                    left: `${position}%`,
                    top: '0',
                    transform: 'translate(-50%, -100%)',
                  }
                : {
                    top: `${position}%`,
                    left: '0',
                    transform: 'translate(-100%, -50%)',
                  }
            }
          >
            {/* Marker Line */}
            <div
              className={`
                bg-dark-border
                ${isHorizontal ? 'w-px h-2' : 'h-px w-2'}
              `}
            />
            {/* Time Label */}
            <div
              className={`
                absolute text-xs text-dark-text-secondary mt-1
                ${isHorizontal ? 'left-1/2 -translate-x-1/2' : 'right-2 top-1/2 -translate-y-1/2'}
                whitespace-nowrap
              `}
            >
              {formatTime(time)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
