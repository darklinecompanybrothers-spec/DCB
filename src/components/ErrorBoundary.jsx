import { Component } from 'react';

/**
 * ErrorBoundary — Top-level React error boundary.
 *
 * Catches uncaught render/lifecycle errors in the tree and replaces
 * the blank white crash screen with a branded dark fallback.
 *
 * Intentionally a class component — hooks cannot implement
 * getDerivedStateFromError / componentDidCatch.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[DCB] Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050508',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Brand accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(138,43,226,0.5) 30%, rgba(0,212,255,0.4) 70%, transparent 100%)',
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              background: 'rgba(139,92,246,0.06)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: '1.125rem',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              marginBottom: '0.625rem',
            }}
          >
            Une erreur inattendue s'est produite
          </h1>

          <p
            style={{
              color: 'rgba(163,163,163,0.65)',
              fontSize: '0.8125rem',
              maxWidth: '30ch',
              lineHeight: 1.65,
              marginBottom: '2rem',
            }}
          >
            Notre équipe a été notifiée. Rechargez la page pour continuer.
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.625rem 1.75rem',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.28)',
              borderRadius: '9999px',
              color: 'rgba(168,85,247,0.85)',
              fontSize: '0.6875rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139,92,246,0.18)';
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139,92,246,0.1)';
              e.currentTarget.style.borderColor = 'rgba(139,92,246,0.28)';
            }}
          >
            Recharger la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
