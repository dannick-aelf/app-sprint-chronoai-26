import type { ReactNode } from 'react';

interface PhaseBoxProps {
  label: string;
  subLabel?: string;
  color: string;
  position: { x: number; y: number };
  connections?: string[];
  onClick?: () => void;
  children?: ReactNode;
}

export const PhaseBox = ({
  label,
  subLabel,
  color,
  position,
  onClick,
  children,
}: PhaseBoxProps) => {
  return (
    <div
      className="absolute cursor-pointer group transition-all duration-200 ease-out"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Phase: ${label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        className={`
          min-w-[140px] min-h-[90px] px-5 py-4 rounded-xl
          border-2 transition-all duration-300 ease-out
          group-hover:scale-105 group-hover:shadow-lg group-active:scale-95
          flex flex-col items-center justify-center
          bg-dark-elevated backdrop-blur-sm
        `}
        style={{
          borderColor: color,
          boxShadow: `0 4px 16px ${color}25, inset 0 1px 0 ${color}10`,
        }}
      >
        <div
          className="text-base font-semibold text-dark-text-primary text-center"
          style={{ color }}
        >
          {label}
        </div>
        {subLabel && (
          <div className="text-xs text-dark-text-secondary mt-1 text-center">
            {subLabel}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
