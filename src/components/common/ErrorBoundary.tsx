import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientButton } from '../ui/GradientButton';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <GlassCard className="p-8 max-w-md text-center border-rose-500/30 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              An unexpected error occurred while rendering this view. You can return to the ecosystem homepage.
            </p>
            <GradientButton
              onClick={this.handleReset}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Return to Home
            </GradientButton>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
