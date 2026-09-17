import React from 'react';
import { Layers, Network, Zap } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { EcosystemGraph } from '@/components/ecosystem/EcosystemGraph';
import { EcosystemMobileTree } from '@/components/ecosystem/EcosystemMobileTree';
import { PageTransition } from '@/components/common/PageTransition';

export const Ecosystem: React.FC = () => {
  const ecosystemSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KnowTheTech Product Ecosystem Architecture",
    "description": "Visual architecture of the KnowTheTech technology ecosystem and connected web products.",
    "url": "https://knowthetech.web.app/ecosystem",
  };

  return (
    <PageTransition>
      <SEOHead
        title="Ecosystem Network & Product Graph"
        description="Explore the connected network architecture of KnowTheTech. Discover how each independent product connects to the core technology hub."
        canonical="https://knowthetech.web.app/ecosystem"
      />
      <JsonLd data={ecosystemSchema} id="ecosystem-schema" />

      <div className="pt-32 pb-24 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Network Topology"
            title="The Connected Ecosystem"
            description="KnowTheTech acts as the central technology umbrella, linking focused applications across education, developer tooling, document processing, and career AI."
          />

          {/* Interactive Network Graph & Mobile Fallback */}
          <div className="mb-20">
            <EcosystemGraph />
            <EcosystemMobileTree />
          </div>

          {/* Network Architecture Principles */}
          <div className="pt-8 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                Ecosystem Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                How The Nodes Coexist
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard className="p-8 border-white/10">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  Decoupled Deployments
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Every product runs independently on dedicated infrastructure with its own lifecycle, ensuring updates to one app never impact the availability of others.
                </p>
              </GlassCard>

              <GlassCard className="p-8 border-white/10">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  Shared Design System
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Products adopt consistent design tokens, glass aesthetics, and typography patterns so users experience an intuitive, cohesive ecosystem feel.
                </p>
              </GlassCard>

              <GlassCard className="p-8 border-white/10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">
                  Continuous Scalability
                </h3>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  The ecosystem registry is architected to seamlessly welcome Product #7, #8, and beyond through standardized metadata and plug-and-play routing.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
