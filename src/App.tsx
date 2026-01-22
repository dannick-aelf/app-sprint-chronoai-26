import { TimelineBoard } from './components/TimelineBoard';
import { generateMockTimelineData } from './data';
import './App.css';

function App() {
  const mockData = generateMockTimelineData();

  // Prepare overlap data
  const overlapData = mockData.overlaps.map(overlap => {
    const overlappingCycle = mockData.cycles.find(c => c.id === overlap.overlappingCycleId);
    const overlappingPhases = mockData.phases.filter(p => p.appCycleId === overlap.overlappingCycleId);
    return {
      cycle: overlappingCycle!,
      phases: overlappingPhases,
      overlap,
    };
  }).filter(o => o.cycle);

  return (
    <TimelineBoard
      cycles={mockData.cycles}
      phases={mockData.phases}
      decisionGates={mockData.decisionGates}
      overlaps={overlapData}
      config={{
        showOverlap: true,
        showTechnologyBadges: true,
        showMilestones: true,
      }}
    />
  );
}

export default App;
