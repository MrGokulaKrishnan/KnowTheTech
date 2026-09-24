import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Binary, 
  FileText, 
  Sparkles, 
  Briefcase, 
  BookOpen, 
  ExternalLink, 
  ArrowRight,
  Mouse,
  RefreshCw,
  LucideIcon
} from 'lucide-react';
import { Product } from '@/types/product';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { GradientButton } from '../ui/GradientButton';

const ICON_MAP: Record<string, LucideIcon> = {
  Mouse,
  RefreshCw,
  FileText,
  Sparkles,
  Briefcase,
  BookOpen,
  Binary,
  GraduationCap,
};

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const IconComponent = ICON_MAP[product.icon] || FileText;

  return (
    <GlassCard
      hoverEffect
      glow
      className="p-6 flex flex-col justify-between group h-full border-white/10 hover:border-sky-500/30 relative"
    >
      <div>
        {/* Header: Icon, Status Badge & Product Number */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:text-sky-300 transition-all shadow-glass-sm">
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-2">
            <Badge status={product.status}>
              {product.status}
            </Badge>

            {/* Product Number Badge (e.g., 01 / 08) */}
            <span className="product-number-badge px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wider">
              {product.number} / 08
            </span>
          </div>
        </div>

        {/* Category & Title */}
        <div className="mb-2">
          <span className="text-[11px] font-mono text-sky-400/90 uppercase tracking-wider block mb-1">
            {product.category}
          </span>
          <h3 className="font-display font-bold text-xl text-white group-hover:text-sky-300 transition-colors">
            <Link to={`/products/${product.slug}`} className="focus:outline-none focus:underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6 font-sans">
          {product.description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {product.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="tech" size="sm">
              {tech}
            </Badge>
          ))}
          {product.technologies.length > 4 && (
            <span className="text-[11px] font-mono text-slate-400 self-center">
              +{product.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3 mt-auto">
        <Link
          to={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors group/link"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>

        <GradientButton
          href={product.url}
          external
          size="sm"
          variant="secondary"
          iconRight={<ExternalLink className="w-3.5 h-3.5" />}
          aria-label={`Open ${product.name} in a new tab`}
        >
          Visit
        </GradientButton>
      </div>
    </GlassCard>
  );
};
