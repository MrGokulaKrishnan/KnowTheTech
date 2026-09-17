import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

export const EcosystemMobileTree: React.FC = () => {
  return (
    <div className="md:hidden space-y-6">
      {/* Root Node */}
      <GlassCard className="p-6 text-center border-sky-400/40 bg-gradient-to-b from-[#0B2A4A]/40 to-[#06152E]/70 shadow-glow-electric">
        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl overflow-hidden border border-sky-400/40 shadow-lg bg-black flex items-center justify-center">
          <img src="/brand/logo.png" alt="KnowTheTech" className="w-full h-full object-contain" />
        </div>
        <Badge variant="tech" size="sm" className="mb-2">Central Ecosystem Hub</Badge>
        <h3 className="font-display font-bold text-xl text-white">KnowTheTech</h3>
        <p className="text-xs text-slate-300 mt-1">
          One ecosystem. Multiple ideas. Built with technology.
        </p>
      </GlassCard>

      {/* Connected Branches */}
      <div className="relative pl-6 border-l-2 border-dashed border-sky-500/30 space-y-4 ml-4">
        {PRODUCTS.map((product) => (
          <GlassCard key={product.id} className="p-4 border-white/10 hover:border-sky-400/30 relative">
            {/* Branch connector line */}
            <div className="absolute -left-6 top-6 w-6 h-[2px] bg-sky-500/40" />

            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">
                  {product.category}
                </span>
                <h4 className="font-display font-bold text-base text-white">
                  {product.name}
                </h4>
              </div>
              <Badge status={product.status} size="sm">{product.status}</Badge>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <Link
                to={`/products/${product.slug}`}
                className="text-xs text-sky-400 font-semibold inline-flex items-center gap-1"
              >
                <span>Inspect</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
              >
                <span>Live App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
