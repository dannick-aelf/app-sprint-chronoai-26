# VibeCode Structure - Terminal CLI Design System Specification

## Executive Summary

This specification defines the integration of a **Terminal CLI Design System** into the VibeCode Structure workflow timeline visualization. The system transforms the interface into a brutally functional, high-contrast, authentically retro terminal aesthetic that feels like hacking into a mainframe or configuring a server.

## 1. Design System Integration Overview

### 1.1 Current State
- **Tech Stack**: React 19, TypeScript, Tailwind CSS v4, Vite
- **Current Theme**: Cyberpunk/Glitch with neon effects
- **Components**: TimelineBoard, PhaseCards, Milestones, DecisionGate, OverlapTrack
- **Styling Approach**: Tailwind utility classes with custom CSS

### 1.2 Target State
- **Aesthetic**: Terminal CLI - "Cyber-Industrial, Hacker, System-Level"
- **Visual Language**: Brutally functional, high-contrast, authentically retro
- **Key Features**: 
  - Monospace typography (every character)
  - Terminal green (#33ff00) and amber (#ffb000) color scheme
  - Zero border radius (0px)
  - 1px solid/dashed borders
  - Subtle CRT scanlines
  - Blinking cursor effects
  - Shell metaphors (prompts, commands, status codes)
  - ASCII art and separators

### 1.3 Integration Scope
- **Full UI Transformation**: All components redesigned in Terminal CLI aesthetic
- **Preserve Functionality**: All existing features remain functional
- **Typography Overhaul**: Monospace only, ALL CAPS for headers
- **Layout Strategy**: Grid-based terminal windows (tmux/vim splits feel)
- **Animation System**: Blink, glitch, typing effects

## 2. Design Token System

### 2.1 Color Palette (Dark Mode Only)

**Backgrounds**:
- `background`: `#0a0a0a` (Deep black, not pure OLED to allow scanlines)
- `card`: `#0a0a0a` (Same as background, cards are defined by borders)

**Text**:
- `primary`: `#33ff00` (Classic Terminal Green - primary text)
- `secondary`: `#ffb000` (Amber/Orange - warnings, accents)
- `muted`: `#1f521f` (Dimmed green - borders, inactive text)
- `foreground`: `#33ff00` (Terminal green for body text)

**UI Elements**:
- `border`: `#1f521f` (Dimmed green for borders)
- `accent`: `#33ff00` (Same as primary, for cursors/active states)
- `error`: `#ff3333` (Bright Red for errors)

### 2.2 Typography System

**Font Stack**:
- Primary: `JetBrains Mono`
- Fallback: `Fira Code`, `VT323`, `monospace`

**Typography Rules**:
- **ALL CAPS** for headers and labels
- Lowercase acceptable for "code" or body text, but consistency is key
- Strict modular scale - headers snap to grid sizes
- Monospace only - every single character

**Typography Scale**:
- **H1 (Hero)**: Large, ALL CAPS, terminal green
- **H2 (Section)**: Medium, ALL CAPS
- **H3 (Subsection)**: Small, ALL CAPS
- **Body**: Monospace, terminal green or muted green
- **Code/Commands**: Monospace, lowercase acceptable

### 2.3 Border & Radius System

**Radius**:
- **All elements**: `0px` (absolutely no rounded corners)

**Borders**:
- **Width**: `1px` solid or dashed
- **Color**: `#1f521f` (dimmed green) or `#33ff00` (active)
- **Style**: Solid for most elements, dashed for separators

### 2.4 Shadows & Effects

**Shadows**:
- **No drop shadows** - terminal aesthetic doesn't use shadows

**Text Shadow**:
- **Phosphor Glow**: `text-shadow: 0 0 5px rgba(51, 255, 0, 0.5)`
- Mimics phosphor monitor persistence

**CRT Overlay**:
- Very faint scanline effect
- Pointer-events-none overlay
- Subtle depth without ruining readability

## 3. Component Transformation Specifications

### 3.1 Buttons

**Structure**:
- Text enclosed in brackets: `[ INITIATE ]` or `[ OK ]`
- Or solid block of color with inverted text

**States**:
- **Default**: Black background, green border, green text
- **Hover**: Background fills with primary green, text becomes black (inverted video)
- **Active**: Text shifts 1px down or blinks rapidly

**Implementation**:
```tsx
<button className="border border-terminal-primary bg-terminal-bg text-terminal-primary px-4 py-2 uppercase font-mono">
  [ INITIATE ]
</button>
```

### 3.2 Cards (Windows/Panes)

**Structure**:
- Black box with 1px green border
- Header: Title bar at top: `+--- SYSTEM STATUS ---+` or solid inverted bar
- Content: Padded monospaced text inside

**Implementation**:
```tsx
<div className="border border-terminal-border bg-terminal-bg">
  <div className="border-b border-terminal-border bg-terminal-primary text-terminal-bg px-2 py-1 uppercase font-mono text-sm">
    +--- WEEK 1 - IDEATION ---+
  </div>
  <div className="p-4 font-mono">
    {/* Content */}
  </div>
</div>
```

### 3.3 Inputs

**Style**:
- No box styling
- Prompt prefix: `user@acme:~$` followed by input field
- Blinking block cursor `█` at caret position
- No focus ring, just blinking cursor

### 3.4 TimelineBoard Component

**Header Section**:
- Terminal prompt style: `> VIBECODED X`
- Blinking cursor after text
- ASCII art logo optional
- Status indicators: `[OK]`, `[ACTIVE]`, `[ERR]`

**Week Tracks**:
- Each week is a terminal window/pane
- Title bar: `+--- WEEK N - PHASE ---+`
- Day rectangles: Individual bordered boxes
- No rounded corners anywhere

### 3.5 Phase Cards

**Structure**:
- Terminal window style
- Header bar with inverted colors
- Content in monospace
- Technology tags: `|HTML|` or `|REACT NATIVE|`
- Status indicators: `[COMPLETED]`, `[ACTIVE]`, `[PENDING]`

### 3.6 Milestone Markers

**Style**:
- Terminal-style indicators
- ASCII characters: `*`, `>`, `[OK]`
- Or simple bordered boxes with icons
- Monospace font

### 3.7 Decision Gate

**Structure**:
- Terminal prompt style
- Command format: `> SELL` or `> KILL`
- Status display: `[SELL]` or `[KILL]`
- Inverted video on selection

## 4. Layout Strategy

### 4.1 Grid System

**Terminal Windows**:
- Layout feels like `tmux` or `vim` splits
- Strict grid alignment
- Content aligned to character grid

**Separators**:
- ASCII characters: `----------------` or `================` or `//`
- Dashed borders for visual separation

### 4.2 Responsive Strategy

**Mobile**:
- Windows stack vertically
- Text size remains legible
- Wrap long lines with `\` indicator
- Monospace fonts can be wide, watch for overflow

## 5. Effects & Animation System

### 5.1 Blink Animation

**Cursor Blink**:
```css
@keyframes blink {
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
```

### 5.2 Glitch Effect

**Subtle Text Offset**:
- Occasional subtle text offsets on hover
- Not overwhelming, just a hint

### 5.3 Typing Effect

**Typewriter Animation**:
- Headlines appear character-by-character
- `typing-demo` animation for hero text

## 6. Iconography

**Lucide Icons**:
- Use Lucide icons but style them strictly
- `stroke-width-2` for consistency
- Always terminal green color
- Pixelated or low-fi appearance if possible

## 7. Accessibility

**Contrast**:
- Bright green (#33ff00) on black (#0a0a0a) exceeds WCAG AA requirements
- High visibility is inherent to this style

**Focus**:
- High visibility focus states
- Inverted colors for focus (green bg, black text)
- Blinking cursor indicates focus

## 8. Implementation Phases

### Phase 1: Foundation
- [ ] Update design tokens in CSS
- [ ] Update Tailwind config
- [ ] Update fonts (JetBrains Mono, Fira Code, VT323)
- [ ] Remove all border-radius
- [ ] Update color palette

### Phase 2: Global Styles
- [ ] Update body styles (monospace, terminal green)
- [ ] Add CRT scanline overlay (subtle)
- [ ] Add text glow effect
- [ ] Remove all shadows
- [ ] Update scrollbar styling

### Phase 3: Component Transformation
- [ ] Transform TimelineBoard header (terminal prompt style)
- [ ] Update PhaseCards (terminal window style)
- [ ] Update buttons (bracket style)
- [ ] Update MilestoneMarkers (ASCII style)
- [ ] Update DecisionGate (command prompt style)

### Phase 4: Layout & Typography
- [ ] Convert all text to monospace
- [ ] Convert headers to ALL CAPS
- [ ] Add ASCII separators
- [ ] Update grid layout (terminal windows)

### Phase 5: Effects & Polish
- [ ] Add blinking cursor effects
- [ ] Add typing animations
- [ ] Add subtle glitch effects
- [ ] Test responsive behavior

## 9. Success Criteria

### 9.1 Visual
- ✅ All components transformed to Terminal CLI aesthetic
- ✅ Monospace typography throughout
- ✅ Zero border radius
- ✅ Terminal green color scheme
- ✅ CRT scanlines visible but subtle
- ✅ Shell metaphors (prompts, commands, status codes)

### 9.2 Functional
- ✅ All existing functionality preserved
- ✅ Interactions feel terminal-like
- ✅ Animations smooth and performant
- ✅ Responsive design maintained

### 9.3 Technical
- ✅ Code maintainable and well-organized
- ✅ Performance optimized
- ✅ Accessibility standards met
- ✅ Browser compatibility ensured

---

*This specification serves as the baseline for integrating the Terminal CLI Design System into the VibeCode Structure timeline visualization.*
