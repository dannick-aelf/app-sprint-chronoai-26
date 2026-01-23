/**
 * Main TimelineBoard component
 * 
 * TERMINAL CLI LAYOUT: Card-based day rectangles
 * - Each day is a card with icon, numbered title, description, and footer
 * - Terminal CLI aesthetic
 * - No overlapping elements
 */

import { useState, useEffect, useRef } from 'react';
import type { TimelineBoardProps, Phase, Milestone } from '../../types';
import { TechnologyBadge } from '../TechnologyBadge/TechnologyBadge';
import { MilestoneMarker } from '../milestones/MilestoneMarker';
import { Code, Sparkles, Layers, PenTool, ClipboardList, Building2 } from 'lucide-react';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

// Role definitions with icons
const ROLES = {
  'vibecoder': { Icon: Sparkles, label: 'VIBECODER', color: '#33ff00' },
  'frontend-dev': { Icon: Code, label: 'FRONTEND DEV', color: '#33ff00' },
  'backend-dev': { Icon: Layers, label: 'BACKEND DEV', color: '#33ff00' },
  'design-lead': { Icon: PenTool, label: 'DESIGN LEAD', color: '#33ff00' },
  'product-lead': { Icon: ClipboardList, label: 'PRODUCT LEAD', color: '#33ff00' },
  'business-director': { Icon: Building2, label: 'BUSINESS DIRECTOR', color: '#33ff00' },
};

// Get roles for a specific week and day
const getRolesForDay = (week: number, day: number): string[] => {
  const roles: string[] = [];
  
  // Week 1: Monday to Friday - Vibecoder
  if (week === 1 && day >= 1 && day <= 5) {
    roles.push('vibecoder');
  }
  
  // Week 2: Monday and Wednesday - Vibecoder
  if (week === 2 && (day === 1 || day === 3)) {
    roles.push('vibecoder');
  }
  
  // Week 3
  if (week === 3) {
    // Monday, Tuesday, Thursday, Friday - Frontend Dev (exclude Wednesday)
    if ((day >= 1 && day <= 2) || (day >= 4 && day <= 5)) {
      roles.push('frontend-dev');
    }
    // Monday to Friday - Design Lead
    if (day >= 1 && day <= 5) {
      roles.push('design-lead');
    }
    // Wednesday, Thursday, Friday - Product Lead
    if (day >= 3 && day <= 5) {
      roles.push('product-lead');
    }
    // Wednesday, Thursday, Friday - Business Director
    if (day >= 3 && day <= 5) {
      roles.push('business-director');
    }
  }
  
  // Week 4: Monday to Friday - Frontend Dev, Backend Dev, Design Lead, Product Lead, and Business Director
  if (week === 4 && day >= 1 && day <= 5) {
    roles.push('frontend-dev');
    roles.push('backend-dev');
    roles.push('design-lead');
    roles.push('product-lead');
    roles.push('business-director');
  }
  
  return roles;
};

// Get day-specific content based on milestones and phase
const getDayContent = (
  week: number,
  day: number,
  phase: Phase | null,
  milestones: Milestone[],
  isDecisionDay: boolean,
  decision: 'sell' | 'kill' | null
): { title: string; description: string[]; footer?: string; callout?: string } => {
  // Week 1 specific content
  if (week === 1) {
    if (day === 1) {
      return {
        title: 'START IDEATION',
        description: ['Work on app concept', 'Create demo prototype'],
      };
    }
    if (day >= 2 && day <= 4) {
      return {
        title: 'BUILDING DEMO',
        description: ['Create vibecoded app concept'],
      };
    }
    if (day === 5) {
      const ceoMilestone = milestones.find(m => m.type === 'ceo-meeting');
      if (ceoMilestone) {
        return {
          title: 'APP SHOWCASE',
          description: ['Share concept with team', 'Present app demo in CEO meeting'],
          footer: '--demo-complete',
        };
      }
    }
  }

  // Week 2 specific content
  if (week === 2) {
    if (day === 1) {
      const broadcastMilestone = milestones.find(m => m.type === 'broadcast');
      if (broadcastMilestone) {
        return {
          title: 'BROADCAST APP',
          description: ['Share with company', 'Begin internal testing'],
          footer: '--broadcast-start',
        };
      }
    }
    if (day === 3) {
      return {
        title: 'INTERNAL TESTING',
        description: ['Company-wide testing', 'Submit product description doc'],
      };
    }
    if ((day >= 2 && day <= 5) && day !== 3) {
      return {
        title: 'INTERNAL TESTING',
        description: ['Company-wide testing'],
      };
    }
  }

  // Week 3 specific content
  if (week === 3) {
    if (day === 1) {
      const surveyStart = milestones.find(m => m.type === 'survey-start');
      if (surveyStart) {
        return {
          title: 'SURVEY LAUNCH',
          description: ['Send feedback survey', 'React Native dev for entire week'],
          footer: '--survey-active',
        };
      }
    }
    if (day === 2) {
      const surveyEnd = milestones.find(m => m.type === 'survey-end');
      if (surveyEnd) {
        return {
          title: 'SURVEY END',
          description: ['Collect survey data', 'Analyze feedback'],
          footer: '--data-collected',
        };
      }
    }
    if (day === 3 && isDecisionDay) {
      return {
        title: 'DECISION MAKING',
        description: ['Analyse feedback', 'Decide sell or kill'],
      };
    }
    if (day === 4 && decision === 'sell') {
      return {
        title: 'PRODUCT PREP',
        description: ['iOS submission', 'Go to market positioning', 'Brand design'],
      };
    }
    if (day === 5 && decision === 'sell') {
      return {
        title: 'IMPROVEMENTS',
        description: ['Finalise features improvements', 'Quick fixes'],
        callout: 'Showcase new vibecoded app from new cycle',
      };
    }
    if (day >= 4 && decision === 'kill') {
      return {
        title: 'DEVELOPMENT STOP',
        description: ['No further work', 'Project terminated'],
      };
    }
  }

  // Week 4 specific content
  if (week === 4) {
    if (day === 1) {
      const testflight = milestones.find(m => m.type === 'testflight');
      if (testflight) {
        return {
          title: 'TESTFLIGHT READY',
          description: ['Team testing begins', 'Bug fixes and polish', 'Market preparation'],
          footer: '--testflight-active',
        };
      }
    }
    if (day >= 2 && day <= 4) {
      return {
        title: 'BUILD & TEST',
        description: ['Market preparation', 'Final testing phase'],
      };
    }
    if (day === 5) {
      const marketLive = milestones.find(m => m.type === 'market-live');
      if (marketLive) {
        return {
          title: 'IOS SUBMISSION',
          description: ['App submitted', 'CEO showcase'],
          footer: '--deployment:complete',
        };
      }
    }
  }

  // Fallback
  if (phase) {
    if (day >= (phase.startDay || 1) && day <= (phase.endDay || 5)) {
      return {
        title: phase.title.toUpperCase(),
        description: [phase.subtitle || 'Active phase'],
      };
    }
  }

  return {
    title: 'IDLE',
    description: ['No activity scheduled'],
  };
};

export const TimelineBoard = ({
  cycles,
  config: _config = {},
  phases = [],
  decisionGates = [],
  overlaps = [],
  onPhaseClick: _onPhaseClick,
  onMilestoneClick: _onMilestoneClick,
  onDecisionMade: _onDecisionMade,
}: TimelineBoardProps) => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const weeks = [1, 2, 3, 4];
  const fullText = 'APP SPRINT CHRONOAI 26';
  const typewriterState = useRef({ currentIndex: 0, isDeleting: false });

  // Typewriter effect - looping
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      const state = typewriterState.current;
      
      if (!state.isDeleting && state.currentIndex < fullText.length) {
        // Typing
        setDisplayedText(fullText.slice(0, state.currentIndex + 1));
        state.currentIndex++;
        timeoutId = setTimeout(typeWriter, 100);
      } else if (!state.isDeleting && state.currentIndex === fullText.length) {
        // Finished typing, wait before deleting
        timeoutId = setTimeout(() => {
          state.isDeleting = true;
          typeWriter();
        }, 2000);
      } else if (state.isDeleting && state.currentIndex > 0) {
        // Deleting
        setDisplayedText(fullText.slice(0, state.currentIndex - 1));
        state.currentIndex--;
        timeoutId = setTimeout(typeWriter, 50);
      } else if (state.isDeleting && state.currentIndex === 0) {
        // Finished deleting, wait before typing again
        state.isDeleting = false;
        timeoutId = setTimeout(typeWriter, 500);
      }
    };

    // Start the typewriter effect
    typeWriter();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fullText]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Get phases for the first cycle (main track)
  const mainCycle = cycles[0];
  const mainPhases = phases.filter((p: Phase) => p.appCycleId === mainCycle?.id);
  const mainDecisionGate = decisionGates.find((dg) => dg.appCycleId === mainCycle?.id);


  const getPhaseForWeek = (week: number) => mainPhases.find((p: Phase) => p.week === week);
  
  // Get milestones for a specific day (1 = Monday, 5 = Friday)
  const getMilestonesForDay = (week: number, day: number): Milestone[] => {
    const phase = getPhaseForWeek(week);
    if (!phase || !phase.milestones) return [];
    return phase.milestones.filter(m => m.day === day);
  };

  // Check if day is in phase range
  const isDayInPhase = (week: number, day: number): boolean => {
    const phase = getPhaseForWeek(week);
    if (!phase) return false;
    const startDay = phase.startDay || 1;
    const endDay = phase.endDay || 5;
    return day >= startDay && day <= endDay;
  };

  // Phase labels and colors
  const getPhaseInfo = (week: number) => {
    const info = {
      1: { label: 'IDEATION & APP DEMO', borderColor: '#ff00ff' },
      2: { label: 'INTERNAL TESTING', borderColor: '#00d4ff' },
      3: { label: 'FEEDBACK, DECISION & MARKET PREPARATION', borderColor: '#33ff00' },
      4: { label: 'TESTFLIGHT, FINAL MARKET PREP & iOS SUBMISSION', borderColor: '#ffb000' },
    };
    return info[week as keyof typeof info] || info[1];
  };

  // Overlap indicator - simple text indicator
  const overlapInfo = overlaps.length > 0 ? overlaps[0] : null;

  return (
    <div className="min-h-screen text-terminal-foreground font-mono">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-terminal-primary terminal-text-glow font-mono">
            <span className="terminal-prompt">{displayedText}</span>
            <span className={`inline-block w-2 h-8 bg-terminal-primary ml-2 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </h1>
          <p className="text-terminal-muted text-lg uppercase tracking-wider mt-4 font-mono">
            &gt; 4-week VIBES TO DEVELOPMENT TIMELINE
          </p>
          
          {/* Legend */}
          <div className="mt-6 border-t border-terminal-border pt-6">
            <h3 className="text-base font-bold uppercase tracking-wider text-terminal-primary terminal-text-glow font-mono mb-4">
              LEGEND
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(ROLES).map(([key, role]) => {
                const IconComponent = role.Icon;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: role.color,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <IconComponent 
                        size={12} 
                        style={{ color: role.color }}
                        strokeWidth={2}
                        fill={role.color}
                      />
                    </div>
                    <span className="text-xs text-terminal-foreground font-mono uppercase tracking-wider">
                      {role.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Week Tracks */}
      <div className="space-y-8">
        {weeks.map((week) => {
          const phase = getPhaseForWeek(week);
          if (!phase) return null;

          const phaseInfo = getPhaseInfo(week);
          const isDecisionWeek = week === 3 && mainDecisionGate;
          const hasOverlap = overlapInfo && overlapInfo.overlap.overlapStartWeek === week;

          return (
            <div key={week} className="space-y-4">
              {/* Terminal Window Header */}
              <div className="border border-terminal-border">
                <div 
                  className="terminal-window-header text-lg"
                  style={{ 
                    borderColor: phaseInfo.borderColor, 
                    backgroundColor: phaseInfo.borderColor 
                  }}
                >
                  WEEK {week} &gt; {phaseInfo.label}
                </div>
                
                {/* Technology Tag */}
                {phase.technology && (
                  <div className="px-6 pt-6 pb-0">
                    <TechnologyBadge technology={phase.technology} />
                  </div>
                )}

                {/* Overlap Indicator - Simple text indicator */}
                {hasOverlap && (
                  <div className="px-6 pt-4">
                    <div className="border p-2" style={{ borderColor: '#ff00ff', backgroundColor: 'transparent' }}>
                      <p className="text-xs font-mono uppercase tracking-wider" style={{ color: '#ff00ff' }}>
                        &gt; NEW CYCLE OVERLAP STARTS AT WEEK {overlapInfo.overlap.overlapStartWeek}
                      </p>
                    </div>
                  </div>
                )}

                {/* Day Rectangles - Card-based design */}
                <div className="grid grid-cols-5 gap-4 items-stretch px-6 pt-6 pb-6">
                    {DAYS.map((day, dayIndex) => {
                      const dayNumber = dayIndex + 1; // 1 = Monday, 5 = Friday
                      const isInPhase = isDayInPhase(week, dayNumber);
                      const milestones = getMilestonesForDay(week, dayNumber);
                      const isDecisionDay = isDecisionWeek && mainDecisionGate?.day === dayNumber;
                      const dayContent = getDayContent(
                        week,
                        dayNumber,
                        phase,
                        milestones,
                        isDecisionDay || false,
                        mainDecisionGate?.decision || null
                      );

                      return (
                        <div key={day} className="relative flex flex-col">
                          {/* Day Card - Card-based design */}
                          <div 
                            className={`
                              border p-3 flex flex-col w-full h-full relative day-card-hover
                              ${isInPhase ? '' : 'opacity-40'}
                            `}
                            style={{
                              borderColor: isInPhase ? phaseInfo.borderColor : '#1f521f',
                              borderStyle: isDecisionDay ? 'dashed' : 'solid',
                              borderWidth: '1px',
                              minHeight: '200px',
                              backgroundColor: 'transparent',
                              backgroundImage: (() => {
                                // Week 1 Friday, Week 2 Monday, Week 4 Monday & Friday
                                const shouldShowStripes = 
                                  (week === 1 && dayNumber === 5) ||
                                  (week === 2 && dayNumber === 1) ||
                                  (week === 4 && (dayNumber === 1 || dayNumber === 5)) ||
                                  (isDecisionDay && mainDecisionGate);
                                
                                return shouldShowStripes ? `repeating-linear-gradient(
                                  45deg,
                                  transparent,
                                  transparent 8px,
                                  ${phaseInfo.borderColor}22 8px,
                                  ${phaseInfo.borderColor}22 16px
                                )` : 'none';
                              })(),
                            }}
                          >
                            {/* Day Indicator - Top Left */}
                            <div 
                              className="absolute top-0 left-0 w-12 h-12 border flex items-center justify-center font-mono text-sm font-bold uppercase z-10"
                              style={{
                                borderColor: isInPhase ? phaseInfo.borderColor : '#1f521f',
                                color: isInPhase ? phaseInfo.borderColor : '#1f521f',
                                backgroundColor: 'transparent',
                              }}
                            >
                              {day}
                            </div>
                            
                            {/* Icons - Top Right */}
                            <div className="absolute top-0 right-0 flex items-start gap-1 z-10">
                              {/* Milestone Marker */}
                              {milestones.length > 0 && (
                                <MilestoneMarker milestone={milestones[0]} size="md" />
                              )}
                            </div>
                            
                            {/* Spacer for top row */}
                            <div className="h-12 mb-2"></div>

                            {/* Title - Bright green title */}
                            <div className="mb-2 relative z-10">
                              <div className="text-base font-bold uppercase tracking-wider text-terminal-primary terminal-text-glow font-mono whitespace-pre-line">
                                {dayContent.title}
                              </div>
                            </div>


                            {/* Description - Body text with bullet points */}
                            <div className="flex-1 space-y-0.5 mb-1 relative z-10">
                              {dayContent.description.map((line, idx) => (
                                <p 
                                  key={idx}
                                  className="text-xs text-terminal-foreground font-mono leading-relaxed"
                                >
                                  <span className="text-terminal-primary mr-1">•</span>
                                  {line}
                                </p>
                              ))}
                              
                              {/* Personnel/Roles with icons */}
                              {getRolesForDay(week, dayNumber).length > 0 && (
                                <div className="mt-2 pt-2 border-t" style={{ borderColor: 'rgba(51, 255, 0, 0.2)' }}>
                                  {getRolesForDay(week, dayNumber).map((roleKey, idx) => {
                                    const role = ROLES[roleKey as keyof typeof ROLES];
                                    if (!role) return null;
                                    const IconComponent = role.Icon;
                                    return (
                                      <div 
                                        key={idx}
                                        className="flex items-center gap-2 text-xs text-terminal-foreground font-mono leading-relaxed"
                                      >
                                        <IconComponent 
                                          size={14} 
                                          style={{ color: role.color }}
                                          strokeWidth={2}
                                          fill={role.color}
                                        />
                                        <span>{role.label}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Footer - Command-like text - Inverted video style */}
                            {dayContent.footer && (
                              <div className="mt-auto relative z-10">
                                <div className="bg-terminal-primary text-terminal-bg px-2 py-1 inline-block">
                                  <p className="text-xs font-mono uppercase tracking-wider font-bold whitespace-pre-line">
                                    {dayContent.footer}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Status Indicator - Bottom (if no footer) */}
                            {!dayContent.footer && (
                              <div className="mt-auto relative z-10">
                                {isInPhase ? (
                                  <p className="text-xs text-terminal-primary font-mono uppercase tracking-wider terminal-text-glow">
                                    [ACTIVE]
                                  </p>
                                ) : (
                                  <div className="bg-terminal-primary text-terminal-bg px-2 py-1 inline-block opacity-60">
                                    <p className="text-xs font-mono uppercase tracking-wider font-bold">
                                      [IDLE]
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Decision Result Display - Week 2 Wednesday */}
                  {week === 2 && (
                    <div className="mt-4 grid grid-cols-5 gap-4 px-6 pb-6">
                      <div></div>
                      <div></div>
                      <div className="border p-4" style={{ borderColor: phaseInfo.borderColor, backgroundColor: 'transparent' }}>
                        <p className="text-sm text-terminal-primary font-mono uppercase tracking-wider terminal-text-glow">
                          &gt; PRODUCT DESCRIPTION DOC TO FOLLOW{' '}
                          <a 
                            href="https://aelfblockchain.sg.larksuite.com/docx/HdIJdNMVgoo1Skxk0ZAlZtPJglh?from=from_copylink"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-terminal-secondary transition-colors"
                            style={{ color: 'inherit' }}
                          >
                            [TEMPLATE]
                          </a>
                        </p>
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                  )}

                  {/* Decision Result Display - Week 3 Wednesday */}
                  {week === 3 && (
                    <div className="mt-4 grid grid-cols-5 gap-4 px-6 pb-6">
                      <div></div>
                      <div></div>
                      <div className="border p-4" style={{ borderColor: phaseInfo.borderColor, backgroundColor: 'transparent' }}>
                        <div className="space-y-1">
                          <p className="text-sm text-terminal-primary font-mono uppercase tracking-wider terminal-text-glow">
                            &gt; [SELL] DEVELOPMENT CONTINUES
                          </p>
                          <p className="text-sm text-terminal-error font-mono uppercase tracking-wider">
                            &gt; [KILL] DEVELOPMENT STOPS
                          </p>
                        </div>
                      </div>
                      <div></div>
                      {(() => {
                        const fridayContent = getDayContent(3, 5, phase, [], false, mainDecisionGate?.decision || null);
                        return fridayContent.callout ? (
                          <div className="border p-4" style={{ borderColor: phaseInfo.borderColor, backgroundColor: 'transparent' }}>
                            <p className="text-sm font-mono uppercase tracking-wider" style={{ color: '#ff00ff' }}>
                              &gt; {fridayContent.callout}
                            </p>
                          </div>
                        ) : <div></div>;
                      })()}
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};
