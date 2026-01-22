interface DeploymentBranchProps {
  label: string;
  target: 'testflight' | 'production';
  direction: 'left' | 'right';
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  color: string;
}

export const DeploymentBranch = ({
  label,
  target,
  direction,
  startPosition,
  endPosition,
  color,
}: DeploymentBranchProps) => {
  const isLeft = direction === 'left';
  const isProduction = target === 'production';

  // Calculate control points for curved arrow
  const controlX = isLeft ? startPosition.x - 10 : startPosition.x + 10;
  const controlY = startPosition.y - 15;

  const path = `M ${startPosition.x} ${startPosition.y} Q ${controlX} ${controlY} ${endPosition.x} ${endPosition.y}`;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Arrow Path */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <marker
            id={`arrowhead-${direction}-${target}`}
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              fill={color}
            />
          </marker>
        </defs>
        <path
          d={path}
          stroke={color}
          strokeWidth="2"
          fill="none"
          markerEnd={`url(#arrowhead-${direction}-${target})`}
          opacity="0.7"
        />
      </svg>

      {/* Label */}
      <div
        className="absolute px-4 py-2 rounded-lg bg-dark-elevated border-2 backdrop-blur-sm text-sm font-semibold text-dark-text-primary transition-all duration-200 hover:scale-105"
        style={{
          left: `${endPosition.x}%`,
          top: `${endPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          color: isProduction ? '#10b981' : '#f59e0b',
          borderColor: isProduction ? '#10b98140' : '#f59e0b40',
          boxShadow: `0 4px 12px ${isProduction ? '#10b98120' : '#f59e0b20'}`,
        }}
      >
        {label}
      </div>
    </div>
  );
};
