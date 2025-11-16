import { useEffect, useMemo, useState } from 'react';
import { createAppTheme, type Mode } from '@/theme/theme';

const STORAGE_KEY = 'theme-mode';

const getSystemMode = (): Mode =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

export function useThemeMode() {
  const [mode, setMode] = useState<Mode>(() => {
    const persisted = window.localStorage.getItem(STORAGE_KEY) as Mode | null;
    return persisted ?? getSystemMode();
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setMode(media.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', mode);
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggle = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const resetToSystem = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setMode(getSystemMode());
  };

  return { theme, mode, setMode, toggle, resetToSystem } as const;
}

