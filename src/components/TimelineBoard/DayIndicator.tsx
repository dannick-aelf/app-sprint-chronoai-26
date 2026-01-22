/**
 * DayIndicator component
 * 
 * Displays day indicators (M T W T F) for each week
 */

interface DayIndicatorProps {
  /** Week number (1-4) */
  weekNumber: number;
}

const DAYS = [
  { short: 'M', full: 'Mon' },
  { short: 'T', full: 'Tue' },
  { short: 'W', full: 'Wed' },
  { short: 'T', full: 'Thu' },
  { short: 'F', full: 'Fri' },
  { short: 'S', full: 'Sat' },
];

export const DayIndicator = ({ weekNumber: _weekNumber }: DayIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1.5 px-3 py-3 cyber-chamfer-sm bg-cyber-card border-2 border-cyber-border backdrop-blur-sm">
      {DAYS.map((day, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1.5 cyber-chamfer-sm bg-cyber-muted/30 border border-cyber-border min-w-[38px] hover:border-cyber-accent hover:cyber-glow-sm transition-all duration-200 cursor-pointer"
          title={day.full}
        >
          <span className="text-sm font-bold text-cyber-foreground leading-tight font-ui uppercase">{day.short}</span>
          <span className="text-[10px] text-cyber-muted-foreground mt-0.5 font-medium hidden sm:block font-ui uppercase">
            {day.full.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
};
