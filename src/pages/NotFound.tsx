import React from 'react';
import { Compass, Home, HelpCircle } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { PageTransition } from '@/components/common/PageTransition';

export const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <SEOHead
        title="404 — Route Not Found"
        description="The requested page does not exist in the KnowTheTech ecosystem."
        noIndex
      />

      <div className="min-h-[80vh] pt-32 pb-24 flex items-center justify-center px-4">
        <GlassCard className="p-8 sm:p-14 max-w-lg text-center border-sky-500/30 shadow-glow-electric relative overflow-hidden">
          {/* Subtle watermarked 404 background */}
          <div className="absolute -right-8 -bottom-10 text-9xl font-display font-black text-white/[0.03] select-none pointer-events-none">
            404
          </div>

          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-sky-400 flex items-center justify-center mx-auto mb-6 shadow-glass-sm">
            <HelpCircle className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold block mb-2">
            Status 404
          </span>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3 tracking-tight">
            This route doesn't exist.
          </h1>

          <p className="text-sm text-slate-300 font-sans leading-relaxed mb-8 max-w-sm mx-auto">
            The destination you requested may have moved or is not registered within the KnowTheTech network.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <GradientButton
              to="/"
              icon={<Home className="w-4 h-4" />}
            >
              Back Home
            </GradientButton>

            <GradientButton
              to="/products"
              variant="secondary"
              icon={<Compass className="w-4 h-4" />}
            >
              Explore Products
            </GradientButton>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
};
