import type { Theme, ThemeConfig } from '$lib/types';

export const themes: Record<Theme, ThemeConfig> = {
  blue: {
    name: 'Ocean Blue',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primary: '#667eea'
  },
  green: {
    name: 'Nature Green',
    gradient: 'linear-gradient(135deg, #41cd52 0%, #00b4db 100%)',
    primary: '#41cd52'
  },
  orange: {
    name: 'Sunset Orange',
    gradient: 'linear-gradient(135deg, #f14e32 0%, #fc6621 100%)',
    primary: '#f14e32'
  },
  purple: {
    name: 'Royal Purple',
    gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)',
    primary: '#8e2de2'
  },
  pink: {
    name: 'Rose Pink',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    primary: '#ff6b6b'
  },
  dark: {
    name: 'Midnight Dark',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    primary: '#34495e'
  }
};

export const applyTheme = (theme: Theme) => {
  const config = themes[theme];
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--primary-gradient', config.gradient);
    document.documentElement.style.setProperty('--primary-color', config.primary);
  }
};