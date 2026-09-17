import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
  placeholder?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  value,
  onChange,
  resultCount,
  totalCount,
  placeholder = "Search products by name, tech, or problem...",
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          icon={<Search className="w-4 h-4 text-sky-400" />}
          className="pr-10 py-3 bg-[#06152E]/60 border-white/10 focus:border-sky-400 text-sm shadow-glass-sm"
          aria-label="Search products"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {resultCount !== undefined && totalCount !== undefined && (
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
          <span>
            {value.trim() ? (
              <>Showing <strong className="text-sky-300 font-semibold">{resultCount}</strong> of {totalCount} products</>
            ) : (
              <>All <strong className="text-sky-300 font-semibold">{totalCount}</strong> ecosystem products</>
            )}
          </span>
          {value.trim() && (
            <button
              onClick={() => onChange('')}
              className="text-sky-400 hover:underline cursor-pointer"
            >
              Reset filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};
