import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      const message = this.state.error?.message || 'An unexpected error occurred.';
      return (
        <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
          <p style={{ color: 'var(--text-primary)' }}>This section failed to render.</p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-tertiary)' }}>{message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
