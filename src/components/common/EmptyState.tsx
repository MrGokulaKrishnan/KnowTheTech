import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { GradientButton } from '../ui/GradientButton';
import { GlassCard } from '../ui/GlassCard';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No products found",
  description = "Try adjusting your search query or selecting another category filter.",
  onReset,
  resetText = "Clear filters",
}) => {
  return (
    <GlassCard className="p-12 text-center max-w-lg mx-auto my-12 border-dashed border-white/15">
      <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-7 h-7" />
      </div>
      <h3 className="font-display font-bold text-lg text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
        {description}
      </p>
      {onReset && (
        <GradientButton
          variant="secondary"
          size="sm"
          onClick={onReset}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          {resetText}
        </GradientButton>
      )}
    </GlassCard>
  );
};
