// Theme types and utilities
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface IThemeConfig {
  mode: ThemeMode;
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
}

export const getThemePreference = (): ThemeMode => {
  const stored = localStorage.getItem('theme-mode') as ThemeMode;
  return stored || 'auto';
};

export const setThemePreference = (mode: ThemeMode): void => {
  localStorage.setItem('theme-mode', mode);
};
