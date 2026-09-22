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
    '--bg-main':           theme === 'dark' ? '#0B0C15'                    : '#EAE7E2',
    '--bg-surface':        theme === 'dark' ? '#151621'                    : '#F5F3EF',
    '--border-color':      theme === 'dark' ? '#2D2E3A'                    : '#D8D4CC',
    '--text-primary':      theme === 'dark' ? '#FFFFFF'                    : '#0F172A',
    '--text-secondary':    theme === 'dark' ? '#9CA3AF'                    : '#64748B',
    '--accent-primary':    theme === 'dark' ? '#00F0FF'                    : '#1D4ED8',
    '--accent-secondary':  theme === 'dark' ? '#00FF94'                    : '#059669',
    '--accent-glow':       theme === 'dark' ? 'rgba(0, 240, 255, 0.3)'    : 'rgba(29, 78, 216, 0.22)',
    '--grid-color':        theme === 'dark' ? 'rgba(255,255,255,0.03)'    : 'rgba(15, 23, 42, 0.045)',
    '--grid-major-color':  theme === 'dark' ? 'rgba(255,255,255,0.08)'    : 'rgba(15, 23, 42, 0.08)',
    '--vignette-color':    theme === 'dark' ? 'rgba(0,0,0,1)'             : 'rgba(15, 23, 42, 0.14)',
    '--shadow-surface':    theme === 'dark'
      ? '0 0 40px -20px var(--accent-glow)'
      : '0 18px 50px -24px rgba(15, 23, 42, 0.22), 0 6px 16px -8px rgba(15, 23, 42, 0.08)',
    '--shadow-hover':      theme === 'dark'
      ? '0 0 30px -10px var(--accent-glow)'
      : '0 22px 44px -20px rgba(15, 23, 42, 0.2), 0 0 32px -12px var(--accent-glow)',
    '--shadow-header':     theme === 'dark'
      ? 'none'
      : '0 10px 28px -18px rgba(15, 23, 42, 0.18)',
  }), [theme]);

  // High-contrast overrides (layered on top of base tokens)
  const contrastStyles = useMemo(() => preferences.highContrast ? ({
    '--bg-main':          theme === 'dark' ? '#000000'                    : '#FFFFFF',
    '--bg-surface':       theme === 'dark' ? '#000000'                    : '#FFFFFF',
    '--border-color':     theme === 'dark' ? '#FFFFFF'                    : '#0F172A',
    '--text-primary':     theme === 'dark' ? '#FFFFFF'                    : '#000000',
    '--text-secondary':   theme === 'dark' ? '#E5E7EB'                    : '#1E293B',
    '--accent-primary':   theme === 'dark' ? '#FFD166'                    : '#1E3A8A',
    '--accent-secondary': theme === 'dark' ? '#7DD3FC'                    : '#0F766E',
    '--accent-glow':      theme === 'dark' ? 'rgba(255, 209, 102, 0.35)' : 'transparent',
    '--grid-color':       theme === 'dark' ? 'rgba(255,255,255,0.22)'    : 'rgba(15, 23, 42, 0.22)',
    '--grid-major-color': theme === 'dark' ? 'rgba(255,255,255,0.38)'    : 'rgba(15, 23, 42, 0.38)',
    '--shadow-surface':   'none',
    '--shadow-hover':     'none',
    '--shadow-header':    'none',
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
