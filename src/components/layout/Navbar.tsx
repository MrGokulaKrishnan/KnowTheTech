import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Compass } from 'lucide-react';
import { SITE_CONFIG } from '@/data/site';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { GradientButton } from '../ui/GradientButton';
import { MobileNav } from './MobileNav';

export const Navbar: React.FC = () => {
  const scrollY = useScrollPosition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 20;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg p-1"
            aria-label="KnowTheTech Home"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-lg border border-sky-400/20 group-hover:border-sky-400/50 transition-all group-hover:scale-105 bg-black flex items-center justify-center">
              <img
                src="/brand/logo.png"
                alt="KnowTheTech Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg text-white tracking-tight group-hover:text-sky-300 transition-colors">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[10px] text-sky-400/80 font-mono tracking-wider uppercase -mt-1 hidden sm:block">
                Ecosystem
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md" aria-label="Main Navigation">
            {SITE_CONFIG.navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.2)] border border-sky-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <GradientButton
              to="/products"
              size="sm"
              icon={<Compass className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Explore Products
            </GradientButton>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-label="Open mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
