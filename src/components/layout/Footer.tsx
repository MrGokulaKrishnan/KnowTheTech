import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { PRODUCTS } from '@/data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#01040f] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-sky-500/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand overview */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg w-fit">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-sky-400/20 group-hover:border-sky-400/50 transition-all">
                  <img
                    src="/brand/logo.png"
                    alt="KnowTheTech Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-display font-bold text-xl text-white">KnowTheTech</span>
                  <p className="text-xs text-sky-400/80 font-mono tracking-wider">PRODUCT ECOSYSTEM</p>
                </div>
              </Link>

              <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-sm">
                {SITE_CONFIG.concept}
              </p>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-sm">
                A unified network of developer tools, interactive learning platforms, career applications, and experimental web software.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE_CONFIG.author.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-sky-300 border border-white/10 transition-colors"
                aria-label="Creator Portfolio"
                title="Gokulakrishnan K Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Gokulakrishnan-K"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <Link
                to="/ecosystem"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-sky-300 border border-white/10 transition-colors"
                aria-label="Ecosystem Network"
                title="Ecosystem Network Graph"
              >
                <Code2 className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Col 3: Products */}
          <div>
            <h3 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/products/${product.slug}`}
                    className="text-slate-400 hover:text-sky-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Explore */}
          <div>
            <h3 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="text-slate-400 hover:text-sky-300 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/ecosystem" className="text-slate-400 hover:text-sky-300 transition-colors">
                  Ecosystem Graph
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-sky-300 transition-colors">
                  About KnowTheTech
                </Link>
              </li>
              <li>
                <Link to="/author" className="text-slate-400 hover:text-sky-300 transition-colors">
                  Author Profile
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-sky-300 transition-colors">
                  Contact & Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Creator */}
          <div>
            <h3 className="font-display font-semibold text-sm text-white uppercase tracking-wider mb-4">
              Creator
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-slate-300 font-medium">{SITE_CONFIG.author.name}</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {SITE_CONFIG.author.role}
              </p>
              <a
                href={SITE_CONFIG.author.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors pt-1 group"
              >
                <span>Visit Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: Copyright & Policy note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {SITE_CONFIG.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-600">•</span>
            <span className="font-mono text-[11px] text-slate-500">
              One ecosystem. Multiple ideas. Built with technology.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
