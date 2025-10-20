export const theme = {
  colors: {
    primary: '#1A73E8',
    primaryHover: '#1557B0',
    secondary: '#F5F7FA',
    text: '#1F1F1F',
    textLight: '#6B7280',
    accent: '#E8EEF5',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    white: '#FFFFFF',
    border: '#E5E7EB',
    background: '#FAFBFC',
  },
  fonts: {
    main: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  borderRadius: '8px',
  borderRadiusLg: '12px',
  borderRadiusFull: '9999px',
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.12)',
    large: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.18)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
};

export type Theme = typeof theme;

