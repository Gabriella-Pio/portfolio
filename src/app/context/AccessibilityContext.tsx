import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AccessibilityPreferences, Theme, defaultAccessibilityPreferences } from '@/app/types/accessibility';

type AccessibilityContextValue = {
  theme: Theme;
  preferences: AccessibilityPreferences;
  toggleTheme: () => void;
  updatePreference: <K extends keyof AccessibilityPreferences>(key: K, value: AccessibilityPreferences[K]) => void;
  setPreferences: React.Dispatch<React.SetStateAction<AccessibilityPreferences>>;
};

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-preferences';

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultAccessibilityPreferences);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        theme?: Theme;
        preferences?: AccessibilityPreferences;
      };

      if (parsed.theme) {
        setTheme(parsed.theme);
      }

      if (parsed.preferences) {
        setPreferences(parsed.preferences);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, preferences }));
  }, [theme, preferences]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const updatePreference = useCallback(<K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo<AccessibilityContextValue>(() => ({
    theme,
    preferences,
    toggleTheme,
    updatePreference,
    setPreferences,
  }), [theme, preferences, toggleTheme, updatePreference]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }

  return context;
};
