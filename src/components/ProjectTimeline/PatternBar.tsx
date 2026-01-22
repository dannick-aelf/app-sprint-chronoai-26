interface PatternBarProps {
  label?: string;
  pattern: 'diagonal-blue' | 'diagonal-red';
  markers?: string[];
  position: { x: number; y: number; width: number };
  week: number;
}

export const PatternBar = ({
  label,
  pattern,
  markers = [],
  position,
  week,
}: PatternBarProps) => {
  const isBlue = pattern === 'diagonal-blue';
  const color = isBlue ? '#3b82f6' : '#ef4444';
  const patternId = `diagonal-${pattern}-${week}`;

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${position.width}%`,
        height: '40px',
        transform: 'translateY(-50%)',
      }}
    >
      {/* SVG Pattern Definition */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="10"
              y2="10"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.7"
            />
          </pattern>
          <linearGradient id={`gradient-${patternId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#gradient-${patternId})`}
          className="rounded-lg"
        />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          className="rounded-lg"
        />
        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          className="rounded-lg"
          opacity="0.8"
        />
      </svg>

      {/* Markers */}
      {markers.map((marker, index) => (
        <div
          key={index}
          className="absolute top-1/2 -translate-y-1/2 text-dark-text-primary font-bold"
          style={{
            left: index === 0 ? '8px' : index === markers.length - 1 ? 'auto' : '50%',
            right: index === markers.length - 1 ? '8px' : 'auto',
            transform: index === markers.length - 1 ? 'translateY(-50%)' : 'translate(-50%, -50%)',
          }}
        >
          {marker}
        </div>
      ))}

      {/* Label */}
      {label && (
        <div
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-sm text-dark-text-secondary whitespace-nowrap"
        >
          {label}
        </div>
      )}
    </div>
  );
};
