import React, { useEffect, useCallback } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const applyTheme = useCallback(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme-mode', 'light');
  }, []);

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [applyTheme]);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'theme-mode') {
        applyTheme();
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [applyTheme]);

  return <>{children}</>;
};

export default ThemeProvider;
