import 'react';

declare module 'react' {
  interface CSSProperties {
    /**
     * Allow CSS custom properties (CSS variables) in inline styles.
     * e.g. style={{ '--my-var': 'value' }}
     */
    [key: `--${string}`]: string | number | undefined;
  }
}
