import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Globe, Sparkles } from 'lucide-react';

export interface AdminErrorBoundaryProps {
  children: ReactNode;
  onClose?: () => void;
}

export interface AdminErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AdminErrorBoundary extends Component<AdminErrorBoundaryProps, AdminErrorBoundaryState> {
  constructor(props: AdminErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): AdminErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CRITICAL: AdminErrorBoundary caught rendering exception:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleResetStorage = () => {
    if (confirm('Are you sure you want to reset CMS storage to default settings? This will clear local cache.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  private handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 bg-[#FAF9F6] flex items-center justify-center p-4 font-sans">
          <div className="bg-white border border-rose-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-neutral-950">Admin Dashboard Exception Detected</h2>
                <p className="text-xs text-neutral-600">
                  A rendering or data execution error occurred inside the CMS dashboard.
                </p>
              </div>
            </div>

            {/* Error Message Box */}
            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 text-xs font-mono space-y-2 text-rose-950 overflow-x-auto">
              <div className="font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Error: {this.state.error?.message || 'Unknown Rendering Fault'}</span>
              </div>
              {this.state.errorInfo?.componentStack && (
                <pre className="text-[10px] text-neutral-600 max-h-36 overflow-y-auto whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={this.handleReload}
                  className="orixnal-gradient-bg text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Dashboard</span>
                </button>

                <button
                  onClick={this.handleResetStorage}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs px-4 py-2.5 rounded-xl border border-neutral-300 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4 text-rose-600" />
                  <span>Reset CMS Storage</span>
                </button>
              </div>

              {this.props.onClose && (
                <button
                  onClick={this.props.onClose}
                  className="text-xs font-bold text-neutral-600 hover:text-neutral-900 underline flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Close Admin Overlay</span>
                </button>
              )}
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
