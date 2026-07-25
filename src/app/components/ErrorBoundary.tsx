import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /**
   * Optional fallback UI. If not provided, a default styled screen is shown.
   */
  fallback?: React.ReactNode;
}

/**
 * ErrorBoundary catches runtime errors in the component tree and prevents
 * the entire application from crashing with a blank screen.
 *
 * Must be a class component — React does not support error boundaries in
 * functional components (getDerivedStateFromError / componentDidCatch are
 * class-only lifecycle methods).
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // In production, this is where you would send the error to a monitoring
    // service (e.g. Sentry, Datadog). For now, log to console.
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-main, #0B0C15)',
            color: 'var(--text-primary, #FFFFFF)',
            fontFamily: 'monospace',
            padding: '2rem',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              width: '100%',
              border: '1px solid var(--border-color, #2D2E3A)',
              borderRadius: '12px',
              padding: '2rem',
              background: 'var(--bg-surface, #151621)',
              boxShadow: '0 0 40px -15px var(--accent-glow, rgba(0, 240, 255, 0.3))',
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--accent-primary, #00F0FF), transparent)',
              }}
            />

            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: 'var(--accent-primary, #00F0FF)',
                marginBottom: '1rem',
              }}
            >
              SYSTEM_ERROR // RUNTIME_EXCEPTION
            </p>

            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: 'var(--text-primary, #FFFFFF)',
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary, #9CA3AF)',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              An unexpected error occurred. The error has been logged.
            </p>

            {this.state.error && (
              <pre
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-secondary, #9CA3AF)',
                  background: 'var(--bg-main, #0B0C15)',
                  border: '1px solid var(--border-color, #2D2E3A)',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  marginBottom: '1.5rem',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {this.state.error.message}
              </pre>
            )}

            <button
              onClick={this.handleReset}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                border: '1px solid var(--accent-primary, #00F0FF)',
                background: 'transparent',
                color: 'var(--accent-primary, #00F0FF)',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--accent-primary-10, rgba(0,240,255,0.1))';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              RETRY
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
