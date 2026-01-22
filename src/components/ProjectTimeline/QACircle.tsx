interface QACircleProps {
  position: { x: number; y: number };
  connections?: string[];
  onClick?: () => void;
}

export const QACircle = ({ position, onClick }: QACircleProps) => {
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
      aria-label="Quality Assurance checkpoint"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div
        className={`
          w-[140px] h-[140px] rounded-full
          border-4 transition-all duration-300 ease-out
          group-hover:scale-110 group-hover:shadow-xl group-active:scale-95
          flex items-center justify-center
          bg-dark-elevated backdrop-blur-sm
          relative overflow-hidden
        `}
        style={{
          borderColor: '#10b981',
          boxShadow: '0 8px 24px #10b98140, inset 0 2px 4px #10b98110',
        }}
      >
        {/* Subtle glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: '#10b981' }}
        />
        <div className="text-6xl font-bold text-[#10b981] relative z-10">Q</div>
      </div>
    </div>
  );
};
