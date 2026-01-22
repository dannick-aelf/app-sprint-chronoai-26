/**
 * WeekHeader component
 * 
 * Displays the week number badge and label for each week column
 */

interface WeekHeaderProps {
  /** Week number (1-4) */
  weekNumber: number;
}

export const WeekHeader = ({ weekNumber }: WeekHeaderProps) => {
  return (
    <div className="text-center mb-4 relative z-10">
      {/* Week Number Badge - Cyberpunk Chamfered */}
      <div className="inline-flex items-center justify-center w-20 h-20 cyber-chamfer bg-cyber-card border-2 border-cyber-accent backdrop-blur-sm mb-3 cyber-glow hover:cyber-glow-lg transition-all duration-300">
        <span className="text-4xl font-black text-cyber-accent font-heading cyber-text-glow">
          {weekNumber}
        </span>
      </div>
      {/* Week Label */}
      <div className="text-xl font-bold text-cyber-foreground uppercase tracking-[0.15em] font-heading">
        WEEK {weekNumber}
      </div>
    </div>
  );
};
