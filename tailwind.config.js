/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'VT323', 'monospace'],
        'heading': ['JetBrains Mono', 'Fira Code', 'VT323', 'monospace'],
        'body': ['JetBrains Mono', 'Fira Code', 'VT323', 'monospace'],
        'ui': ['JetBrains Mono', 'Fira Code', 'VT323', 'monospace'],
      },
      colors: {
        'terminal': {
          'bg': 'var(--color-terminal-bg)',
          'card': 'var(--color-terminal-card)',
          'primary': 'var(--color-terminal-primary)',
          'secondary': 'var(--color-terminal-secondary)',
          'muted': 'var(--color-terminal-muted)',
          'foreground': 'var(--color-terminal-foreground)',
          'border': 'var(--color-terminal-border)',
          'accent': 'var(--color-terminal-accent)',
          'error': 'var(--color-terminal-error)',
        },
        // Legacy support
        'cyber': {
          'bg': 'var(--color-terminal-bg)',
          'card': 'var(--color-terminal-card)',
          'muted': 'var(--color-terminal-muted)',
          'foreground': 'var(--color-terminal-foreground)',
          'muted-foreground': 'var(--color-terminal-muted)',
          'accent': 'var(--color-terminal-primary)',
          'accent-secondary': 'var(--color-terminal-secondary)',
          'border': 'var(--color-terminal-border)',
          'destructive': 'var(--color-terminal-error)',
        },
        'dark': {
          'bg': 'var(--color-dark-bg)',
          'surface': 'var(--color-dark-surface)',
          'elevated': 'var(--color-dark-elevated)',
          'border': 'var(--color-dark-border)',
          'text': {
            'primary': 'var(--color-dark-text-primary)',
            'secondary': 'var(--color-dark-text-secondary)',
            'muted': 'var(--color-dark-text-muted)',
          },
        },
      },
      borderRadius: {
        'none': '0px',
      },
      textShadow: {
        'terminal': 'var(--text-shadow-terminal)',
      },
    },
  },
  plugins: [],
}
