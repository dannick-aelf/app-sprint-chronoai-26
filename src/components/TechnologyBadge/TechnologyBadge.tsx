/**
 * TechnologyBadge component
 * 
 * Terminal CLI style: |HTML| or |REACT NATIVE|
 */

interface TechnologyBadgeProps {
  /** Technology type */
  technology: 'html' | 'react-native';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

const TECHNOLOGY_CONFIG = {
  html: {
    label: 'HTML',
    color: '#33ff00',
  },
  'react-native': {
    label: 'REACT NATIVE',
    color: '#33ff00',
  },
};

const SIZE_CLASSES = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const TechnologyBadge = ({ technology, size = 'sm' }: TechnologyBadgeProps) => {
  const config = TECHNOLOGY_CONFIG[technology];
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div
      className={`
        inline-flex items-center border
        ${sizeClass}
        font-mono uppercase tracking-wider
      `}
      style={{
        borderColor: config.color,
        color: config.color,
        backgroundColor: 'transparent',
      }}
      title={`Technology: ${config.label}`}
    >
      |{config.label}|
    </div>
  );
};
