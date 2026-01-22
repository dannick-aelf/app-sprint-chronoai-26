import { useState, useMemo, useRef, useEffect } from 'react';
import type { TimelineBoardProps, TimelineEvent as TimelineEventType } from './types';
import { TimelineEvent } from './TimelineEvent';
import { TimelineAxis } from './TimelineAxis';

export const TimelineBoard = ({
  events,
  config = {},
  onEventClick,
  onEventSelect,
}: TimelineBoardProps) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEventType | null>(null);
  const [zoomLevel, setZoomLevel] = useState(config.zoomLevel || 1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const orientation = config.orientation || 'vertical';
  const showConnections = config.showConnections !== false;

  // Calculate time range from events
  const timeRange = useMemo(() => {
    if (config.timeRange) {
      return {
        start: new Date(config.timeRange.start),
        end: new Date(config.timeRange.end),
      };
    }

    if (events.length === 0) {
      const now = new Date();
      return {
        start: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
        end: now,
      };
    }

    const timestamps = events.map((e) =>
      e.timestamp instanceof Date ? e.timestamp.getTime() : e.timestamp
    );
    return {
      start: new Date(Math.min(...timestamps)),
      end: new Date(Math.max(...timestamps)),
    };
  }, [events, config.timeRange]);

  // Calculate event positions
  const eventPositions = useMemo(() => {
    const duration = timeRange.end.getTime() - timeRange.start.getTime();
    return events.map((event) => {
      const timestamp =
        event.timestamp instanceof Date
          ? event.timestamp.getTime()
          : event.timestamp;
      const position =
        ((timestamp - timeRange.start.getTime()) / duration) * 100;
      return { event, position };
    });
  }, [events, timeRange]);

  // Handle event selection
  const handleEventClick = (event: TimelineEventType) => {
    setSelectedEvent(event.id === selectedEvent?.id ? null : event);
    onEventClick?.(event);
    onEventSelect?.(event.id === selectedEvent?.id ? null : event);
  };

  // Handle zoom
  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  // Handle pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    isDragging.current = true;
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDragging.current = true;
      dragStart.current = { x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPanOffset({
      x: touch.clientX - dragStart.current.x,
      y: touch.clientY - dragStart.current.y,
    });
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Handle wheel zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        handleZoom(delta);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className="w-full h-full flex flex-col bg-dark-bg text-dark-text-primary">
      {/* Timeline Container */}
      <div
        ref={containerRef}
        className={`
          relative flex-1 overflow-hidden
          ${isHorizontal ? 'min-h-[200px]' : 'min-h-[400px]'}
          cursor-grab active:cursor-grabbing
        `}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Timeline Axis */}
        <TimelineAxis
          orientation={orientation}
          timeRange={timeRange}
          markers={5}
        />

        {/* Timeline Events */}
        <div className="relative w-full h-full">
          {eventPositions.map(({ event, position }) => (
            <TimelineEvent
              key={event.id}
              event={event}
              position={position}
              isSelected={selectedEvent?.id === event.id}
              onClick={() => handleEventClick(event)}
              orientation={orientation}
            />
          ))}

          {/* Connection Lines */}
          {showConnections &&
            selectedEvent &&
            selectedEvent.connections?.map((connectionId) => {
              const connectedEvent = events.find((e) => e.id === connectionId);
              if (!connectedEvent) return null;

              const startPos = eventPositions.find(
                (p) => p.event.id === selectedEvent.id
              )?.position;
              const endPos = eventPositions.find(
                (p) => p.event.id === connectionId
              )?.position;

              if (startPos === undefined || endPos === undefined) return null;

              return (
                <svg
                  key={connectionId}
                  className="absolute inset-0 pointer-events-none z-0"
                >
                  <line
                    x1={isHorizontal ? `${startPos}%` : '50%'}
                    y1={isHorizontal ? '50%' : `${startPos}%`}
                    x2={isHorizontal ? `${endPos}%` : '50%'}
                    y2={isHorizontal ? '50%' : `${endPos}%`}
                    stroke={selectedEvent.color || '#6366f1'}
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    opacity="0.4"
                  />
                </svg>
              );
            })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-t border-dark-border bg-dark-surface">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleZoom(-0.1)}
            className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg bg-dark-elevated border border-dark-border text-dark-text-primary hover:bg-dark-border transition-colors duration-200 active:opacity-80"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="text-sm text-dark-text-secondary min-w-[60px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => handleZoom(0.1)}
            className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg bg-dark-elevated border border-dark-border text-dark-text-primary hover:bg-dark-border transition-colors duration-200 active:opacity-80"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>

        {/* Selected Event Info */}
        {selectedEvent && (
          <div className="flex-1 ml-4 px-4 py-2 rounded-lg bg-dark-elevated border border-dark-border">
            <div className="text-sm font-medium text-dark-text-primary">
              {selectedEvent.title}
            </div>
            {selectedEvent.description && (
              <div className="text-xs text-dark-text-secondary mt-1">
                {selectedEvent.description}
              </div>
            )}
            <div className="text-xs text-dark-text-muted mt-1">
              {new Date(selectedEvent.timestamp).toLocaleDateString()}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setPanOffset({ x: 0, y: 0 });
            setZoomLevel(1);
            setSelectedEvent(null);
            onEventSelect?.(null);
          }}
          className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg bg-dark-elevated border border-dark-border text-dark-text-primary hover:bg-dark-border transition-colors duration-200 active:opacity-80 ml-4"
          aria-label="Reset view"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
