import { Component, createRef, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './ui/Button/Button';
import { safeSessionStorage } from '../lib/safeStorage';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Single source of truth for "this is a stale-deploy asset error" detection.
// componentDidCatch and render() used to check different string lists, so a
// module-script failure could silently trigger the auto-reload while the
// fallback UI still showed the generic "Application Error" copy.
const PRELOAD_ERROR_SUBSTRINGS = [
  'Unable to preload CSS',
  'Failed to fetch dynamically imported module',
  'Importing a module script failed',
];

const isPreloadErrorMessage = (message: string | undefined) =>
  Boolean(message) && PRELOAD_ERROR_SUBSTRINGS.some((substr) => message!.includes(substr));

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  private headingRef = createRef<HTMLHeadingElement>();

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidMount() {
    // A crash during the very first render never triggers componentDidUpdate
    // (there is no prior successful commit to update from), so the mount
    // hook needs its own check.
    if (this.state.hasError) {
      this.headingRef.current?.focus();
    }
  }

  public componentDidUpdate(_prevProps: Props, prevState: State) {
    // A crash mid-session may happen far from where the user is looking —
    // without an explicit focus move, a screen-reader user gets no signal
    // that anything changed.
    if (!prevState.hasError && this.state.hasError) {
      this.headingRef.current?.focus();
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside recruitZaa App:', error, errorInfo);

    if (isPreloadErrorMessage(error?.message)) {
      const reloadKey = 'recruitzaa_boundary_preload';
      const lastReload = safeSessionStorage.getItem(reloadKey);
      const now = Date.now();

      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        safeSessionStorage.setItem(reloadKey, now.toString());
        window.location.reload();
      }
    }
  }

  public handleReset = () => {
    safeSessionStorage.clear();
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const isPreloadError = isPreloadErrorMessage(this.state.error?.message);

      return (
        <main
          role="alert"
          className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 text-center"
        >
          <div className="max-w-md w-full bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-8 space-y-6">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-[#c14f16] rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold">!</span>
            </div>
            <div className="space-y-2">
              <h1
                ref={this.headingRef}
                tabIndex={-1}
                className="text-lg font-extrabold text-slate-900 dark:text-white outline-none"
              >
                {isPreloadError ? 'Workspace View Reload Required' : 'Application Error'}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {isPreloadError
                  ? "This page's assets were updated since it was loaded. Click below to refresh."
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
        </main>
      );
    }

    return this.props.children;
  }
}
