# VibeCode Structure - Project Constitution

## Project Vision
**VibeCode Structure** is an interactive timeline visualization system designed to map the evolution and structure of vibecode concepts, patterns, and relationships through time.

## Core Principles

### 1. Design Philosophy
- **Dark Mode First**: All interfaces are designed for dark mode as the primary experience
- **Timeline-Centric**: The timeline is the central metaphor for understanding structure and evolution
- **Interactive Resonance**: Every interaction should create a meaningful connection between user and content
- **Vibrational Aesthetics**: Design should reflect the concept that structure emerges from vibrations/patterns

### 2. Technical Architecture

#### Stack Foundation
- **React 19**: Latest React with modern hooks and patterns
- **TypeScript**: Strict type safety for all components
- **Tailwind CSS v4**: Utility-first styling with dark mode support
- **Vite**: Fast development and optimized builds

#### Component Architecture
- **Component-Based**: Modular, reusable components
- **Type-Safe**: Full TypeScript coverage
- **Performance-First**: Optimize for 60fps animations and smooth interactions
- **Accessible**: WCAG 2.1 AA compliance minimum

#### State Management
- **Local State**: Use React hooks for component-level state
- **Props Drilling Prevention**: Context API for shared timeline state
- **Immutable Updates**: Always use immutable patterns for state changes

### 3. UI/UX Standards

#### Dark Mode Palette
- **Background**: Deep dark (#0a0a0a to #1a1a1a)
- **Surface**: Elevated surfaces (#1f1f1f to #2a2a2a)
- **Text Primary**: High contrast (#ffffff to #e5e5e5)
- **Text Secondary**: Medium contrast (#a0a0a0)
- **Accent Colors**: Vibrant but readable in dark mode
- **Borders**: Subtle (#333333 to #404040)

#### Timeline-Specific Guidelines
- **Timeline Axis**: Vertical or horizontal, user-configurable
- **Event Nodes**: Minimum 44x44px touch targets
- **Connections**: Visible lines showing relationships
- **Zoom/Pan**: Smooth interactions for exploring large timelines
- **Time Markers**: Clear, readable time indicators

#### Interaction Patterns
- **Click/Tap**: Select and view details
- **Drag**: Reposition timeline elements (if editable)
- **Scroll**: Navigate through timeline
- **Zoom**: Focus on specific time ranges
- **Hover**: Show preview information (desktop)

### 4. Code Quality Standards

#### TypeScript
- **Strict Mode**: Enabled
- **No `any` Types**: Use proper types or `unknown`
- **Interface Over Type**: Prefer interfaces for object shapes
- **Explicit Returns**: Clear return types for functions

#### Component Structure
```typescript
// Component file structure
imports
types/interfaces
component
export
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `TimelineBoard`)
- **Files**: Match component name
- **Hooks**: camelCase with `use` prefix
- **Types**: PascalCase with descriptive names
- **Constants**: UPPER_SNAKE_CASE

#### File Organization
```
src/
  components/
    Timeline/
      TimelineBoard.tsx
      TimelineEvent.tsx
      TimelineAxis.tsx
      types.ts
  hooks/
    useTimeline.ts
    useDarkMode.ts
  utils/
    timelineHelpers.ts
  App.tsx
  main.tsx
```

### 5. Performance Requirements

#### Rendering
- **Virtual Scrolling**: For timelines with 100+ events
- **Lazy Loading**: Load timeline segments on demand
- **Memoization**: Use React.memo for expensive components
- **Animation**: 60fps using transform/opacity only

#### Bundle Size
- **Initial Load**: < 200KB gzipped
- **Code Splitting**: Route-based and component-based
- **Tree Shaking**: Ensure unused code is eliminated

#### Runtime
- **Time to Interactive**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Smooth Scrolling**: 60fps maintained

### 6. Accessibility Requirements

#### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for text
- **Keyboard Navigation**: Full functionality via keyboard
- **Screen Readers**: Semantic HTML and ARIA labels
- **Focus Indicators**: Visible focus states (2-3px outline)

#### Timeline-Specific Accessibility
- **Event Labels**: Clear, descriptive text
- **Time Announcements**: Screen reader friendly time formats
- **Navigation**: Skip links for timeline sections
- **Alternative Views**: Text-based timeline option

### 7. Security Considerations

#### Data Handling
- **No Sensitive Data**: Timeline data should not contain sensitive information
- **Input Validation**: Sanitize all user inputs
- **XSS Prevention**: Use React's built-in XSS protection

#### Dependencies
- **Regular Updates**: Keep dependencies up to date
- **Vulnerability Scanning**: Regular security audits
- **Minimal Dependencies**: Only include necessary packages

### 8. Development Workflow

#### Git Practices
- **Meaningful Commits**: Clear, descriptive commit messages
- **Feature Branches**: One feature per branch
- **Code Review**: All changes reviewed before merge

#### Testing Strategy
- **Component Tests**: Test interactive components
- **Visual Regression**: Ensure UI consistency
- **Accessibility Tests**: Automated a11y checks

#### Documentation
- **Component Docs**: JSDoc comments for complex components
- **README Updates**: Keep project README current
- **Changelog**: Track significant changes

### 9. Timeline Data Structure

#### Event Model
```typescript
interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: Date | number;
  category?: string;
  color?: string;
  metadata?: Record<string, unknown>;
  connections?: string[]; // IDs of connected events
}
```

#### Timeline Configuration
```typescript
interface TimelineConfig {
  orientation: 'horizontal' | 'vertical';
  timeRange: { start: Date; end: Date };
  zoomLevel: number;
  showConnections: boolean;
  darkMode: boolean;
}
```

### 10. Future Considerations

#### Scalability
- **Large Datasets**: Support 10,000+ events
- **Real-time Updates**: WebSocket support for live timelines
- **Export Options**: PDF, PNG, JSON export
- **Import Options**: Multiple data format support

#### Extensibility
- **Plugin System**: Allow custom event renderers
- **Theme System**: Multiple dark mode variants
- **Custom Layouts**: User-defined timeline layouts

---

## Implementation Priorities

1. **Phase 1**: Core timeline board with dark mode
2. **Phase 2**: Interactive event selection and details
3. **Phase 3**: Zoom and pan functionality
4. **Phase 4**: Event connections and relationships
5. **Phase 5**: Advanced features (export, import, customization)

---

*This constitution serves as the living foundation for all development decisions. It should be updated as the project evolves.*
