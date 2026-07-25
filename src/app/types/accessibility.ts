export type Theme = 'dark' | 'light';

export type AccessibilityPreferences = {
  highContrast: boolean;
  reduceMotion: boolean;
  simplifiedMode: boolean;
  keyboardFocus: boolean;
  fontScale: number;
};

export const defaultAccessibilityPreferences: AccessibilityPreferences = {
  highContrast: false,
  reduceMotion: false,
  simplifiedMode: false,
  keyboardFocus: false,
  fontScale: 1,
};
