import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { AccessibilityProvider, useAccessibility } from '@/app/context/AccessibilityContext';

// Wrapper that provides the context to the hook under test
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AccessibilityProvider>{children}</AccessibilityProvider>
);

describe('AccessibilityContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // ─── Theme ────────────────────────────────────────────────────────────────

  describe('theme', () => {
    it('initializes with dark theme by default', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(result.current.theme).toBe('dark');
    });

    it('toggles theme from dark to light', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });

    it('toggles theme from light back to dark', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => { result.current.toggleTheme(); }); // dark → light
      act(() => { result.current.toggleTheme(); }); // light → dark

      expect(result.current.theme).toBe('dark');
    });
  });

  // ─── Preferences ──────────────────────────────────────────────────────────

  describe('preferences', () => {
    it('initializes with all preferences set to their defaults', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });
      const { preferences } = result.current;

      expect(preferences.highContrast).toBe(false);
      expect(preferences.reduceMotion).toBe(false);
      expect(preferences.simplifiedMode).toBe(false);
      expect(preferences.keyboardFocus).toBe(false);
      expect(preferences.fontScale).toBe(1);
    });

    it('updates highContrast preference', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updatePreference('highContrast', true);
      });

      expect(result.current.preferences.highContrast).toBe(true);
    });

    it('updates fontScale preference', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updatePreference('fontScale', 1.2);
      });

      expect(result.current.preferences.fontScale).toBe(1.2);
    });

    it('updates one preference without affecting others', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => {
        result.current.updatePreference('reduceMotion', true);
      });

      expect(result.current.preferences.reduceMotion).toBe(true);
      expect(result.current.preferences.highContrast).toBe(false);
      expect(result.current.preferences.simplifiedMode).toBe(false);
    });
  });

  // ─── localStorage persistence ──────────────────────────────────────────────

  describe('localStorage persistence', () => {
    it('persists theme to localStorage after toggle', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => { result.current.toggleTheme(); });

      const saved = JSON.parse(localStorage.getItem('portfolio-preferences') ?? '{}');
      expect(saved.theme).toBe('light');
    });

    it('persists preferences to localStorage after update', () => {
      const { result } = renderHook(() => useAccessibility(), { wrapper });

      act(() => { result.current.updatePreference('highContrast', true); });

      const saved = JSON.parse(localStorage.getItem('portfolio-preferences') ?? '{}');
      expect(saved.preferences?.highContrast).toBe(true);
    });

    it('restores saved theme from localStorage on mount', () => {
      // Pre-seed localStorage before the hook mounts
      localStorage.setItem(
        'portfolio-preferences',
        JSON.stringify({ theme: 'light', preferences: {} })
      );

      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(result.current.theme).toBe('light');
    });

    it('restores saved preferences from localStorage on mount', () => {
      localStorage.setItem(
        'portfolio-preferences',
        JSON.stringify({
          theme: 'dark',
          preferences: { highContrast: true, reduceMotion: false, simplifiedMode: false, keyboardFocus: false, fontScale: 1.1 },
        })
      );

      const { result } = renderHook(() => useAccessibility(), { wrapper });
      expect(result.current.preferences.highContrast).toBe(true);
      expect(result.current.preferences.fontScale).toBe(1.1);
    });

    it('clears corrupted localStorage data gracefully', () => {
      localStorage.setItem('portfolio-preferences', 'NOT_VALID_JSON{{{');

      // Should not throw — invalid JSON is caught and removed
      expect(() => {
        renderHook(() => useAccessibility(), { wrapper });
      }).not.toThrow();

      // The corrupted string should be gone — value is either null or valid JSON
      const stored = localStorage.getItem('portfolio-preferences');
      if (stored !== null) {
        expect(() => JSON.parse(stored)).not.toThrow();
      }
    });
  });

  // ─── Hook guard ───────────────────────────────────────────────────────────

  describe('useAccessibility guard', () => {
    it('throws when used outside AccessibilityProvider', () => {
      // Suppress the expected React error output in test logs
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAccessibility());
      }).toThrow('useAccessibility must be used within an AccessibilityProvider');

      consoleSpy.mockRestore();
    });
  });
});
