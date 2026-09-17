import React from 'react';
import { ExternalLink, Code2, Cpu, Lightbulb } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { PRODUCTS } from '@/data/products';
import { SEOHead } from '@/components/seo/SEOHead';
import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { PageTransition } from '@/components/common/PageTransition';

export const Author: React.FC = () => {
  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": SITE_CONFIG.author.name,
    "url": SITE_CONFIG.author.portfolioUrl,
    "jobTitle": "Technology Builder & Full-Stack Engineer",
    "description": SITE_CONFIG.author.bio,
    "sameAs": [
      SITE_CONFIG.author.portfolioUrl,
      "https://github.com/Gokulakrishnan-K"
    ]
  };

  return (
    <PageTransition>
      <SEOHead
        title="Built by Gokulakrishnan K"
        description="Gokulakrishnan K — Creator, Developer, and Technology Builder behind the KnowTheTech digital product ecosystem."
        canonical="https://knowthetech.web.app/author"
      />
      <JsonLd data={authorSchema} id="author-schema" />

      <div className="pt-32 pb-24 md:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Creator"
            title={`Built by ${SITE_CONFIG.author.name}`}
            description={SITE_CONFIG.author.role}
          />

          {/* Builder Profile Card */}
          <div className="max-w-4xl mx-auto mb-16">
            <GlassCard className="p-8 sm:p-12 border-sky-400/30 bg-gradient-to-r from-[#06152E]/80 via-[#0B2A4A]/50 to-[#06152E]/80 shadow-glow-electric">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {SITE_CONFIG.author.name}
                  </h2>
                  <p className="text-sky-300 font-mono text-xs uppercase tracking-wider mt-1">
                    {SITE_CONFIG.author.role}
                  </p>
                </div>

                <GradientButton
                  href={SITE_CONFIG.author.portfolioUrl}
                  external
                  size="md"
                  iconRight={<ExternalLink className="w-4 h-4" />}
                >
                  Visit Portfolio
                </GradientButton>
              </div>

              <div className="pt-6 space-y-4">
                <p className="text-base text-slate-200 font-sans leading-relaxed">
                  I build web products with an engineering-first mindset. My work focuses on crafting real digital tools that solve tangible problems — turning abstract computer science concepts into interactive simulations, empowering developers with full-stack learning roadmaps, and providing private, browser-based career utilities.
                </p>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  KnowTheTech is the unified home for these experiments. Rather than letting applications sit as isolated side projects, they form a cohesive, continuously evolving product ecosystem.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Focus Areas & Interests */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Core Interests
              </h3>
              <ul className="space-y-2 text-sm text-slate-300 font-sans">
                <li>• Interactive Educational Platforms & DSA Visualizers</li>
                <li>• Client-Side Document & PDF Processing</li>
                <li>• AI-Enhanced Career Workflows & Resume Intelligence</li>
                <li>• Modern Frontend Systems & Fluid Motion Design</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Builder Mindset
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                Prioritize shipping useful software over speculative planning. Test in real browsers, design for actual humans, respect user privacy, and never stop refining details.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Engineering Standard
              </h3>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                Strict TypeScript, accessible markup, lightweight bundles, zero unnecessary dependencies, and fast load times. Quality is built into the architecture.
              </p>
            </GlassCard>
          </div>

          {/* Published Ecosystem Products */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-white mb-6 text-center">
              Applications Engineered Under KnowTheTech
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCTS.map((prod) => (
                <GlassCard key={prod.id} className="p-5 border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-white text-base">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-sky-400 font-mono mt-0.5">
                      {prod.category}
                    </p>
                  </div>
                  <a
                    href={prod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label={`Open ${prod.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
