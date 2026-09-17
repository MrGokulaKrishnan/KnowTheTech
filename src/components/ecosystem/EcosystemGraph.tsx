import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { GradientButton } from '../ui/GradientButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface NodePosition {
  x: number;
  y: number;
}

const CENTER: NodePosition = { x: 450, y: 260 };

const NODE_POSITIONS: Record<string, NodePosition> = {
  knowheretech: { x: 160, y: 110 },
  knowthebinary: { x: 740, y: 110 },
  knowthefile: { x: 800, y: 270 },
  knowyourresume: { x: 730, y: 420 },
  knowyourjob: { x: 170, y: 420 },
  knowthemd: { x: 100, y: 270 },
};

export const EcosystemGraph: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState<string>('knowthebinary');
  const prefersReducedMotion = usePrefersReducedMotion();

  const activeProduct = PRODUCTS.find((p) => p.slug === activeSlug) || PRODUCTS[0];

  return (
    <div className="w-full">
      {/* Interactive Desktop Canvas */}
      <div className="hidden md:block relative w-full aspect-[16/9] max-h-[560px] bg-slate-950/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Subtle grid & atmospheric glow */}
        <div className="absolute inset-0 subtle-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* SVG Connector Lines */}
        <svg
          viewBox="0 0 900 520"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {PRODUCTS.map((product) => {
            const pos = NODE_POSITIONS[product.slug] || { x: 100, y: 100 };
            const isSelected = activeSlug === product.slug;

            return (
              <g key={product.slug}>
                {/* Background path line */}
                <line
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? "#38BDF8" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                  strokeDasharray={isSelected ? "none" : "4 4"}
                  filter={isSelected ? "url(#glow-filter)" : undefined}
                  className="transition-all duration-300"
                />

                {/* Animated pulse dot travelling along the line */}
                {!prefersReducedMotion && (
                  <circle r={isSelected ? "4" : "2.5"} fill="#06B6D4">
                    <animateMotion
                      path={`M ${CENTER.x} ${CENTER.y} L ${pos.x} ${pos.y}`}
                      dur={isSelected ? "2.5s" : "4s"}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Central KnowTheTech Dominant Node */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: `${(CENTER.x / 900) * 100}%`, top: `${(CENTER.y / 520) * 100}%` }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#0B2A4A] to-[#020617] border-2 border-sky-400/60 p-2 shadow-glow-electric backdrop-blur-xl flex flex-col items-center justify-center text-center group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden mb-1 shadow-md border border-white/20">
              <img src="/brand/logo.png" alt="KnowTheTech Master Brand" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-xs text-white tracking-wide">
              KnowTheTech
            </span>
            <span className="text-[9px] font-mono text-sky-300 uppercase tracking-wider">
              Core Hub
            </span>
          </motion.div>
        </div>

        {/* Satellite Product Nodes */}
        {PRODUCTS.map((product) => {
          const pos = NODE_POSITIONS[product.slug] || { x: 100, y: 100 };
          const isSelected = activeSlug === product.slug;

          return (
            <button
              key={product.slug}
              type="button"
              onClick={() => setActiveSlug(product.slug)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-2xl transition-all duration-300 ${
                isSelected ? 'scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
              }`}
              style={{ left: `${(pos.x / 900) * 100}%`, top: `${(pos.y / 520) * 100}%` }}
              aria-label={`Inspect ${product.name}`}
            >
              <div
                className={`w-36 px-3 py-2.5 rounded-xl text-left backdrop-blur-md transition-all ${
                  isSelected
                    ? 'bg-[#0B2A4A]/90 border-2 border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.4)]'
                    : 'bg-[#06152E]/70 border border-white/10 hover:border-sky-400/40'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[9px] font-mono text-sky-400 uppercase tracking-wider truncate">
                    {product.categories[0] || 'App'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="font-display font-semibold text-xs text-white truncate">
                  {product.name}
                </div>
              </div>
            </button>
          );
        })}

        {/* Floating Instruction */}
        <div className="absolute bottom-4 left-6 text-xs text-slate-400 font-mono flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Click any satellite node to inspect ecosystem link</span>
        </div>
      </div>

      {/* Product Detail Inspector Card */}
      {activeProduct && (
        <GlassCard className="mt-6 p-6 sm:p-8 border-sky-500/30 shadow-glass">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <Badge status={activeProduct.status}>{activeProduct.status}</Badge>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  {activeProduct.category}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-white">
                {activeProduct.name}
              </h3>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {activeProduct.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeProduct.technologies.map((tech) => (
                  <Badge key={tech} variant="tech" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex sm:flex-row lg:flex-col gap-3 shrink-0">
              <GradientButton
                to={`/products/${activeProduct.slug}`}
                iconRight={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Full Architecture
              </GradientButton>

              <GradientButton
                href={activeProduct.url}
                external
                variant="secondary"
                iconRight={<ExternalLink className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Launch Application
              </GradientButton>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
