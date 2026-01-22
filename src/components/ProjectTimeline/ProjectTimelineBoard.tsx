import { useState } from 'react';

interface Phase {
  id: string;
  title: string;
  subtitle?: string;
  week: number;
  track: 'web' | 'ios';
  status: 'completed' | 'active' | 'upcoming';
  color: string;
  icon?: string;
}

const phases: Phase[] = [
  {
    id: 'x-broadcast',
    title: 'X-broadcast',
    subtitle: 'Internal test',
    week: 2,
    track: 'web',
    status: 'completed',
    color: '#3b82f6',
  },
  {
    id: 'version-sb',
    title: 'Version -SB',
    subtitle: 'Sandbox environment',
    week: 3,
    track: 'ios',
    status: 'active',
    color: '#8b5cf6',
  },
  {
    id: 'qa',
    title: 'Quality Assurance',
    subtitle: 'Testing phase',
    week: 3,
    track: 'ios',
    status: 'active',
    color: '#10b981',
  },
  {
    id: 'dev-ux',
    title: 'Dev + UX',
    subtitle: 'Development start',
    week: 3,
    track: 'ios',
    status: 'active',
    color: '#8b5cf6',
  },
  {
    id: 'decision',
    title: 'Decision Gate',
    subtitle: 'Decision maker',
    week: 3,
    track: 'ios',
    status: 'upcoming',
    color: '#3b82f6',
  },
  {
    id: 'completion',
    title: 'Completion',
    subtitle: 'Final phase',
    week: 4,
    track: 'ios',
    status: 'upcoming',
    color: '#ef4444',
  },
];

export const ProjectTimelineBoard = () => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const weeks = [1, 2, 3, 4];
  const webPhases = phases.filter((p) => p.track === 'web');
  const iosPhases = phases.filter((p) => p.track === 'ios');

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              vibecoded X
            </h1>
            <p className="text-gray-400 text-lg">4-Week Development Timeline</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sm text-gray-400">Y.E</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm">
              <span className="text-sm font-medium text-purple-300">Marketing OR Product</span>
            </div>
          </div>
        </div>

        {/* Track Labels */}
        <div className="flex gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-gray-300">Web Track</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-medium text-gray-300">iOS Track</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Week Headers */}
        <div className="relative mb-12">
          {/* Timeline Connector Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-transparent rounded-full"></div>
          
          <div className="grid grid-cols-4 gap-6 relative">
            {weeks.map((week) => (
              <div key={week} className="relative">
                {/* Week Number - Large and Prominent */}
                <div className="text-center mb-4 relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 backdrop-blur-sm mb-3 shadow-lg">
                    <span className="text-4xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">{week}</span>
                  </div>
                  <div className="text-xl font-bold text-white uppercase tracking-wider">
                    Week {week}
                  </div>
                </div>
                
                {/* Days of Week - Clear and Visible */}
                <div className="flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 backdrop-blur-sm shadow-md">
                  {[
                    { short: 'M', full: 'Mon' },
                    { short: 'T', full: 'Tue' },
                    { short: 'W', full: 'Wed' },
                    { short: 'T', full: 'Thu' },
                    { short: 'F', full: 'Fri' },
                    { short: 'S', full: 'Sat' },
                  ].map((day, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-lg bg-white/10 border border-white/20 min-w-[38px] hover:bg-white/15 transition-colors"
                      title={day.full}
                    >
                      <span className="text-sm font-bold text-white leading-tight">{day.short}</span>
                      <span className="text-[10px] text-white/60 mt-0.5 font-medium hidden sm:block">{day.full.slice(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="space-y-12">
          {/* Web Track */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 via-blue-500/30 to-transparent"></div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="text-xs font-semibold text-blue-400 mb-4 uppercase tracking-wider">
                Web / Here
              </div>
              <div className="grid grid-cols-4 gap-6">
                {weeks.map((week) => {
                  const phase = webPhases.find((p) => p.week === week);
                  if (!phase) return <div key={week}></div>;
                  return (
                    <PhaseCard
                      key={phase.id}
                      phase={phase}
                      isSelected={selectedPhase === phase.id}
                      onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* iOS Track */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500/50 via-purple-500/30 to-transparent"></div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500"></div>
              <div className="text-xs font-semibold text-purple-400 mb-4 uppercase tracking-wider">
                iOS
              </div>
              <div className="grid grid-cols-4 gap-6">
                {weeks.map((week) => {
                  const phasesInWeek = iosPhases.filter((p) => p.week === week);
                  if (phasesInWeek.length === 0) return <div key={week}></div>;
                  return (
                    <div key={week} className="space-y-4">
                      {phasesInWeek.map((phase) => (
                        <PhaseCard
                          key={phase.id}
                          phase={phase}
                          isSelected={selectedPhase === phase.id}
                          onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Section - Week 4 */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 gap-6">
            <DeploymentCard
              title="Live / TestFlight"
              subtitle="iOS Testing"
              color="#f59e0b"
              icon="🧪"
            />
            <DeploymentCard
              title="Live Live + CEO"
              subtitle="Production Launch"
              color="#10b981"
              icon="🚀"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface PhaseCardProps {
  phase: Phase;
  isSelected: boolean;
  onClick: () => void;
}

const PhaseCard = ({ phase, isSelected, onClick }: PhaseCardProps) => {
  const statusColors = {
    completed: 'bg-green-500/20 border-green-500/50',
    active: 'bg-blue-500/20 border-blue-500/50',
    upcoming: 'bg-gray-500/20 border-gray-500/50',
  };

  return (
    <div
      onClick={onClick}
      className={`
        group cursor-pointer transition-all duration-300
        ${isSelected ? 'scale-105' : 'hover:scale-[1.02]'}
      `}
    >
      <div
        className={`
          relative p-6 rounded-2xl border backdrop-blur-sm
          transition-all duration-300
          ${statusColors[phase.status]}
          ${isSelected ? 'ring-2 ring-offset-2 ring-offset-[#0a0a0a] ring-white/20' : ''}
          group-hover:border-opacity-70
        `}
        style={{
          borderColor: phase.color + '80',
          backgroundColor: phase.color + '10',
        }}
      >
        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: phase.color }}
          ></div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">{phase.title}</h3>
          {phase.subtitle && (
            <p className="text-sm text-gray-400">{phase.subtitle}</p>
          )}
        </div>

        {/* Special styling for QA */}
        {phase.id === 'qa' && (
          <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl font-bold"
            style={{
              borderColor: phase.color,
              backgroundColor: phase.color + '20',
              color: phase.color,
            }}
          >
            Q
          </div>
        )}

        {/* Pattern overlay for decision/completion */}
        {(phase.id === 'decision' || phase.id === 'completion') && (
          <div
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                ${phase.color} 10px,
                ${phase.color} 20px
              )`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

interface DeploymentCardProps {
  title: string;
  subtitle: string;
  color: string;
  icon: string;
}

const DeploymentCard = ({ title, subtitle, color, icon }: DeploymentCardProps) => {
  return (
    <div
      className="group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer"
      style={{
        borderColor: color + '50',
        backgroundColor: color + '10',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{subtitle}</p>
      
      {/* Arrow indicator */}
      <div className="absolute bottom-6 right-6 text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
        →
      </div>
    </div>
  );
};
