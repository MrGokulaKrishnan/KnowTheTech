import React from 'react';
import { ProductCategory } from '@/types/product';
import { CATEGORIES } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductFilterProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  categoryCounts?: Record<string, number>;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="flex items-center justify-start sm:justify-center flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        const count = categoryCounts ? categoryCounts[category] : undefined;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 select-none",
              isActive
                ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] border border-sky-400/40 scale-[1.02]"
                : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
            )}
            aria-pressed={isActive}
          >
            <span>{category}</span>
            {count !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-md font-mono",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-slate-400"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
