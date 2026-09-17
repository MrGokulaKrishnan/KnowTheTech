import React from 'react';
import { Terminal, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { SEOHead } from '@/components/seo/SEOHead';
import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { PageTransition } from '@/components/common/PageTransition';

export const About: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": SITE_CONFIG.description,
    "founder": {
      "@type": "Person",
      "name": SITE_CONFIG.author.name,
      "url": SITE_CONFIG.author.portfolioUrl,
    }
  };

  return (
    <PageTransition>
      <SEOHead
        title="About KnowTheTech"
        description="Learn about the origins, architecture, and technology philosophy powering the KnowTheTech digital product ecosystem."
        canonical="https://knowthetech.web.app/about"
      />
      <JsonLd data={organizationSchema} id="about-schema" />

      <div className="pt-32 pb-24 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Ecosystem Overview"
            title="About KnowTheTech"
            description="One ecosystem. Multiple ideas. Built with technology."
          />

          {/* Mission Narrative */}
          <div className="max-w-4xl mx-auto mb-16">
            <GlassCard className="p-8 sm:p-12 border-white/10 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                What is KnowTheTech?
              </h2>
              <p className="text-base text-slate-300 font-sans leading-relaxed">
                KnowTheTech is an evolving ecosystem for building, experimenting with, and connecting independent technology products. Rather than treating web tools as isolated one-off utilities or disposable student exercises, KnowTheTech establishes a cohesive brand identity and technical standard across every application.
              </p>
              <p className="text-base text-slate-300 font-sans leading-relaxed">
                Created by Gokulakrishnan K, the ecosystem spans multiple essential domains: Java backend education, interactive algorithm visualizers, privacy-first document formatters, resume intelligence scoring, job discovery workflows, and distraction-free developer markdown tools.
              </p>
            </GlassCard>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Product Philosophy
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                Build products that solve genuine friction. Keep interfaces clean, responsive, and uncluttered. Avoid unnecessary accounts or sign-up walls where client execution can deliver immediate results.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Technology Philosophy
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                Leverage modern web standards: React, TypeScript, Tailwind CSS, and Web APIs. Write strict, maintainable code with clear modular boundaries and complete accessibility considerations.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Future Direction
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                As new web capabilities and developer challenges emerge, the KnowTheTech registry will steadily expand with new specialized tools, enhanced visualizers, and interconnected workflows.
              </p>
            </GlassCard>
          </div>

          {/* CTA Box */}
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard className="p-8 sm:p-12 border-sky-400/30 bg-gradient-to-r from-[#06152E]/80 to-[#0B2A4A]/50">
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                Discover the Products
              </h3>
              <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
                Inspect each of the six active web applications currently deployed under the KnowTheTech umbrella.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GradientButton to="/products" iconRight={<ArrowRight className="w-4 h-4" />}>
                  Explore Products
                </GradientButton>
                <GradientButton to="/author" variant="secondary">
                  Meet the Builder
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
