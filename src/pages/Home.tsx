import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { PRODUCTS, getFeaturedProducts } from '@/data/products';
import { TECHNOLOGIES } from '@/data/technologies';
import { ProductCategory } from '@/types/product';
import { SEOHead } from '@/components/seo/SEOHead';
import { JsonLd } from '@/components/seo/JsonLd';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientButton } from '@/components/ui/GradientButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter } from '@/components/products/ProductFilter';
import { EcosystemGraph } from '@/components/ecosystem/EcosystemGraph';
import { EcosystemMobileTree } from '@/components/ecosystem/EcosystemMobileTree';
import { PageTransition } from '@/components/common/PageTransition';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const featuredProducts = getFeaturedProducts();

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.categories.includes(selectedCategory));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": SITE_CONFIG.description,
    "creator": {
      "@type": "Person",
      "name": SITE_CONFIG.author.name,
      "url": SITE_CONFIG.author.portfolioUrl,
    }
  };

  return (
    <PageTransition>
      <SEOHead
        title="One Ecosystem. Multiple Ideas. Built with Technology."
        description="KnowTheTech is the central technology ecosystem unifying developer tools, learning platforms, career applications, and technology experiments built by Gokulakrishnan K."
      />
      <JsonLd data={websiteSchema} id="home-website-schema" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Ecosystem Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-sky-300 text-xs font-mono mb-8 backdrop-blur-md shadow-glass-sm animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span className="tracking-widest uppercase font-semibold">KnowTheTech Product Ecosystem</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              One Ecosystem.{' '}
              <span className="text-gradient-cyan block sm:inline">
                Multiple Ideas.
              </span>{' '}
              Built with Technology.
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto mb-10">
              KnowTheTech is an evolving ecosystem of digital products, developer tools, learning platforms, career applications, and technology experiments built by Gokulakrishnan K.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GradientButton
                to="/products"
                size="lg"
                iconRight={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Explore Products
              </GradientButton>

              <GradientButton
                to="/ecosystem"
                variant="secondary"
                size="lg"
                icon={<Layers className="w-4 h-4 text-sky-400" />}
                className="w-full sm:w-auto"
              >
                Explore the Ecosystem
              </GradientButton>
            </div>
          </div>

          {/* Interactive Ecosystem Visualization */}
          <div className="mt-20">
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                Visual Ecosystem Network
              </span>
              <h2 className="text-2xl font-display font-bold text-white mt-1">
                Connected Product Architecture
              </h2>
            </div>

            <EcosystemGraph />
            <EcosystemMobileTree />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Curated Lineup"
            title="Featured Applications"
            description="Focused web applications engineered to solve concrete problems across learning, career intelligence, and document productivity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <GradientButton
              to="/products"
              variant="secondary"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Browse All 6 Products
            </GradientButton>
          </div>
        </div>
      </section>

      {/* All Products with Dynamic Category Filter */}
      <section className="py-20 border-t border-white/10 bg-[#01040f]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Full Suite"
            title="The KnowTheTech Ecosystem"
            description="A collection of focused products designed to solve different problems across learning, careers, productivity, and developer workflows."
          />

          <ProductFilter
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Built with Modern Technology */}
      <section className="py-20 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Engineering Stack"
            title="Built with Modern Technology"
            description="Built using production-proven web technologies, strictly typed foundations, and client-centric architecture."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["Frontend", "UI & Animation", "Platform & Web APIs", "Developer Tools"] as const).map((cat) => (
              <GlassCard key={cat} className="p-6 border-white/10">
                <div className="flex items-center gap-2.5 mb-4 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  <Code2 className="w-4 h-4" />
                  <span>{cat}</span>
                </div>
                <ul className="space-y-3">
                  {TECHNOLOGIES.filter(t => t.category === cat).map((tech) => (
                    <li key={tech.name} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <div className="font-display font-semibold text-sm text-white">
                        {tech.name}
                      </div>
                      <div className="text-xs text-slate-400 font-sans mt-0.5">
                        {tech.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why KnowTheTech / Product Philosophy */}
      <section className="py-20 border-t border-white/10 bg-[#01040f]/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Core Philosophy"
            title="Why KnowTheTech Exists"
            description="Our approach to building and publishing digital tools centers on tangible utility, respect for privacy, and engineering honesty."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Tangible Problem Solving
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Each product is built to address real developer and user friction — whether making algorithms visual, inspecting resumes with clear heuristics, or viewing markdown cleanly.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Client-First Privacy
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Wherever possible, computation and document analysis occur directly within the browser using Web APIs and Web Workers, safeguarding sensitive personal data with zero server storage.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Continuous Experimentation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                KnowTheTech serves as a living laboratory for testing modern web patterns, exploring interactive visualizations, and executing end-to-end product architecture.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Creator Spotlight */}
      <section className="py-20 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GlassCard className="p-8 sm:p-12 border-sky-400/30 bg-gradient-to-r from-[#06152E]/70 via-[#0B2A4A]/40 to-[#06152E]/70 shadow-glow-electric">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>The Builder Behind The Ecosystem</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                  Built by {SITE_CONFIG.author.name}
                </h2>

                <p className="text-base text-slate-300 font-sans leading-relaxed">
                  {SITE_CONFIG.author.bio}
                </p>

                <p className="text-xs text-sky-300/80 font-mono">
                  {SITE_CONFIG.author.role}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                <GradientButton
                  to="/author"
                  iconRight={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Read Builder Profile
                </GradientButton>

                <GradientButton
                  href={SITE_CONFIG.author.portfolioUrl}
                  external
                  variant="secondary"
                  iconRight={<ExternalLink className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Visit Portfolio
                </GradientButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 border-t border-white/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Explore the KnowTheTech Ecosystem
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-base">
            {SITE_CONFIG.secondaryConcept}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GradientButton to="/products" size="lg">
              Explore Products
            </GradientButton>
            <GradientButton to="/ecosystem" variant="secondary" size="lg">
              View Network Graph
            </GradientButton>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
