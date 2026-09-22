import '@testing-library/jest-dom';

// Mock i18next so components that use useTranslation() work in tests
// without needing the full i18n initialization
vi.mock('react-i18next', () => ({
  useTranslation: (ns?: string) => ({
    t: (key: string, options?: Record<string, unknown>) => {
      // Return a readable string: "namespace:key" or just "key"
      const prefix = ns ? `${ns}:` : '';
      if (options && typeof options === 'object') {
        // Handle interpolation (e.g. "Total Records: {{count}}")
        return Object.entries(options).reduce(
          (str, [k, v]) => str.replace(`{{${k}}}`, String(v)),
          `${prefix}${key}`
        );
      }
      return `${prefix}${key}`;
    },
    i18n: {
      language: 'en',
      changeLanguage: vi.fn().mockResolvedValue(undefined),
    },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

// Mock ResizeObserver (used by cmdk, not available in jsdom)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock scrollIntoView (used by cmdk to scroll selected items into view)
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock window.matchMedia (not available in jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-color-scheme: dark'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
