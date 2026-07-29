import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './ui/Button/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside recruitZaa App:', error, errorInfo);

    const message = error?.message || '';
    const isPreloadError =
      message.includes('Unable to preload CSS') ||
      message.includes('Failed to fetch dynamically imported module') ||
      message.includes('Importing a module script failed');

    if (isPreloadError) {
      const reloadKey = 'recruitzaa_boundary_preload';
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();

      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem(reloadKey, now.toString());
        window.location.reload();
      }
    }
  }

  public handleReset = () => {
    sessionStorage.clear();
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const isPreloadError =
        this.state.error?.message?.includes('Unable to preload CSS') ||
        this.state.error?.message?.includes('Failed to fetch dynamically imported module');

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-8 space-y-6">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-[#c14f16] rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold">!</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {isPreloadError ? 'Workspace View Reload Required' : 'Application Error'}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {isPreloadError
                  ? 'Assets were updated or loaded through a proxy wrapper (e.g. Pastel). Click below to refresh.'
                  : 'An unexpected error occurred while loading this workspace page view.'}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-left overflow-x-auto max-h-40 border border-slate-100 dark:border-slate-800">
              <code className="text-sm text-red-650 font-mono block break-all whitespace-pre-wrap">
                {this.state.error?.message || 'Unknown runtime error'}
              </code>
            </div>
            <Button onClick={this.handleReset} className="w-full">
              {isPreloadError ? 'Reload Fresh Workspace' : 'Reset Application Console'}
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
