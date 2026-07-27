import { useMemo, useEffect } from 'react';
import { useAccessibility } from '@/app/context/AccessibilityContext';

// ─────────────────────────────────────────────────────────────────────────────
// useThemeVariables
//
// Computes and applies CSS custom properties to :root based on the current
// theme and accessibility preferences from AccessibilityContext.
//
// This keeps App.tsx free of style computation logic. All CSS variable
// tokens are defined here in one place — easy to extend.
//
// Usage:
//   // Call once at the App root level — no return value needed
//   useThemeVariables();
// ─────────────────────────────────────────────────────────────────────────────

export function useThemeVariables(): void {
  const { theme, preferences } = useAccessibility();

  // Base color tokens per theme
  const themeStyles = useMemo(() => ({
    '--bg-main':           theme === 'dark' ? '#0B0C15'                    : '#F4F6F8',
    '--bg-surface':        theme === 'dark' ? '#151621'                    : '#FFFFFF',
    '--border-color':      theme === 'dark' ? '#2D2E3A'                    : '#E2E8F0',
    '--text-primary':      theme === 'dark' ? '#FFFFFF'                    : '#0F172A',
    '--text-secondary':    theme === 'dark' ? '#9CA3AF'                    : '#64748B',
    '--accent-primary':    theme === 'dark' ? '#00F0FF'                    : '#0055FF',
    '--accent-secondary':  theme === 'dark' ? '#00FF94'                    : '#10B981',
    '--accent-glow':       theme === 'dark' ? 'rgba(0, 240, 255, 0.3)'    : 'rgba(0, 85, 255, 0.15)',
    '--grid-color':        theme === 'dark' ? 'rgba(255,255,255,0.03)'    : 'rgba(15, 23, 42, 0.04)',
    '--grid-major-color':  theme === 'dark' ? 'rgba(255,255,255,0.08)'    : 'rgba(15, 23, 42, 0.08)',
    '--vignette-color':    theme === 'dark' ? 'rgba(0,0,0,1)'             : 'rgba(255,255,255,0)',
  }), [theme]);

  // High-contrast overrides (layered on top of base tokens)
  const contrastStyles = useMemo(() => preferences.highContrast ? ({
    '--bg-main':          theme === 'dark' ? '#000000'                    : '#FFFFFF',
    '--bg-surface':       theme === 'dark' ? '#111111'                    : '#F8FAFC',
    '--border-color':     theme === 'dark' ? '#FFFFFF'                    : '#0F172A',
    '--text-primary':     theme === 'dark' ? '#FFFFFF'                    : '#0F172A',
    '--text-secondary':   theme === 'dark' ? '#E5E7EB'                    : '#334155',
    '--accent-primary':   theme === 'dark' ? '#FFD166'                    : '#0F172A',
    '--accent-secondary': theme === 'dark' ? '#7DD3FC'                    : '#0F172A',
    '--accent-glow':      theme === 'dark' ? 'rgba(255, 209, 102, 0.35)' : 'rgba(15, 23, 42, 0.2)',
    '--grid-color':       theme === 'dark' ? 'rgba(255,255,255,0.1)'     : 'rgba(15, 23, 42, 0.1)',
    '--grid-major-color': theme === 'dark' ? 'rgba(255,255,255,0.18)'    : 'rgba(15, 23, 42, 0.18)',
  }) : {}, [theme, preferences.highContrast]);

  // Final merged token set (contrast overrides theme)
  const rootStyles = useMemo(() => ({
    ...themeStyles,
    ...contrastStyles,
    '--app-font-scale': preferences.fontScale.toString(),
  } as Record<string, string>), [themeStyles, contrastStyles, preferences.fontScale]);

  // Apply all tokens to :root as CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(rootStyles).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.style.fontSize = `${preferences.fontScale}rem`;
  }, [rootStyles, preferences.fontScale]);
}
