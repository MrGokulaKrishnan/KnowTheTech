import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4" role="status" aria-label="Loading content">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-xl border-2 border-sky-500/20" />
        <div className="absolute inset-0 rounded-xl border-2 border-sky-400 border-t-transparent animate-spin" />
      </div>
      <span className="text-xs font-mono text-sky-300 uppercase tracking-widest animate-pulse">
        Loading Ecosystem...
      </span>
    </div>
  );
};
