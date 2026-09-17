import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle, 
  Layers, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { SEOHead } from '@/components/seo/SEOHead';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { ProductCard } from '@/components/products/ProductCard';
import { PageTransition } from '@/components/common/PageTransition';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <PageTransition>
        <SEOHead
          title="Product Not Found"
          description="The requested application could not be found in the KnowTheTech ecosystem."
          noIndex
        />
        <div className="min-h-[70vh] pt-32 pb-20 flex items-center justify-center px-4">
          <GlassCard className="p-8 sm:p-12 max-w-lg text-center border-amber-500/30">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="font-display font-bold text-2xl text-white mb-3">
              Application Not Found
            </h1>
            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-8">
              The product slug <code className="text-sky-300 font-mono">"{slug}"</code> does not exist in the KnowTheTech registry.
            </p>
            <GradientButton
              to="/products"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Browse All Products
            </GradientButton>
          </GlassCard>
        </div>
      </PageTransition>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug, 3);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.description,
    "applicationCategory": product.category,
    "operatingSystem": "Web Browser",
    "url": product.url,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Gokulakrishnan K",
      "url": "https://gokulakrishnank.web.app/"
    }
  };

  return (
    <PageTransition>
      <SEOHead
        title={product.seo.title.replace(' | KnowTheTech', '')}
        description={product.seo.description}
        keywords={product.seo.keywords}
        canonical={`https://knowthetech.web.app/products/${product.slug}`}
      />
      <JsonLd data={softwareSchema} id={`schema-${product.slug}`} />

      <article className="pt-32 pb-24 md:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-sky-400 font-semibold">{product.name}</span>
          </nav>

          {/* Product Hero Header */}
          <div className="relative mb-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-12 border-b border-white/10">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <Badge status={product.status}>{product.status}</Badge>
                  <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
                  {product.name}
                </h1>

                <p className="text-lg sm:text-xl text-sky-200/90 font-medium">
                  {product.tagline}
                </p>

                <p className="text-base text-slate-300 leading-relaxed font-sans pt-1">
                  {product.description}
                </p>
              </div>

              {/* Action Box */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <GradientButton
                  href={product.url}
                  external
                  size="lg"
                  iconRight={<ExternalLink className="w-4 h-4" />}
                >
                  Launch {product.name}
                </GradientButton>

                <GradientButton
                  to="/products"
                  variant="secondary"
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back to Products
                </GradientButton>
              </div>
            </div>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <GlassCard className="p-8 border-rose-500/20 bg-gradient-to-b from-rose-950/10 to-transparent">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Current Landscape & Friction
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {product.problem}
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-emerald-500/20 bg-gradient-to-b from-emerald-950/10 to-transparent">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                How {product.name} Solves It
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {product.solution}
              </p>
            </GlassCard>
          </div>

          {/* Core Features */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <span>Key Capabilities & Features</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, idx) => (
                <GlassCard key={idx} className="p-6 border-white/10 hover:border-sky-500/30">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-4">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-slate-200 font-sans leading-relaxed">
                    {feature}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Technology & Architecture Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Tech Stack */}
            <GlassCard className="p-8 border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-4">
                <Code2 className="w-4 h-4" />
                <span>Technology Stack</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4">
                Built With Modern Web Standards
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.technologies.map((tech) => (
                  <Badge key={tech} variant="tech" size="md">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="mt-6 text-xs text-slate-400 leading-relaxed font-sans">
                Each technology was selected for fast runtime rendering, minimal bundle overhead, and reliable cross-browser execution.
              </p>
            </GlassCard>

            {/* Architecture Highlights */}
            <GlassCard className="p-8 border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
                <Layers className="w-4 h-4" />
                <span>Architecture Highlights</span>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-4">
                Implementation Blueprint
              </h3>
              <ul className="space-y-3">
                {product.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Launch CTA Strip */}
          <GlassCard className="p-8 sm:p-12 mb-20 border-sky-400/40 bg-gradient-to-r from-[#0B2A4A]/50 via-[#06152E]/80 to-[#0B2A4A]/50 text-center shadow-glow-electric">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Ready to experience {product.name}?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Explore the live application directly in your browser with zero sign-up friction.
            </p>
            <GradientButton
              href={product.url}
              external
              size="lg"
              iconRight={<ExternalLink className="w-4 h-4" />}
            >
              Open {product.name}
            </GradientButton>
          </GlassCard>

          {/* Related Ecosystem Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                    Ecosystem Connectivity
                  </span>
                  <h2 className="text-2xl font-display font-bold text-white mt-1">
                    Related Applications
                  </h2>
                </div>
                <Link
                  to="/products"
                  className="text-xs font-mono text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1"
                >
                  <span>All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PageTransition>
  );
};
