import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("Unhandled UI error:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6">
          <div className="max-w-md text-center">
            <p className="font-display text-2xl font-bold text-brand-deep">Something went wrong.</p>
            <p className="mt-3 text-sm text-brand-slate">Please reload the page. If the issue persists, contact our team.</p>
            <button
              onClick={() => window.location.reload()}
              data-testid="error-reload-button"
              className="mt-8 inline-flex h-11 items-center bg-brand-blue px-6 text-sm font-semibold text-white hover:bg-brand-deep"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
