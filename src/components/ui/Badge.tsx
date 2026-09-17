import React from 'react';
import { cn } from '@/lib/utils';
import { ProductStatus } from '@/types/product';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'status' | 'outline' | 'tech';
  status?: ProductStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  status,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full tracking-wide',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
  }[size];

  if (variant === 'status' || status) {
    const s = status || (typeof children === 'string' ? children : 'Live');
    const isLive = s.toLowerCase() === 'live';
    const isBeta = s.toLowerCase() === 'beta';

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-mono uppercase font-semibold tracking-wider",
          sizeClasses,
          isLive && "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
          isBeta && "bg-amber-950/60 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
          !isLive && !isBeta && "bg-blue-950/60 text-blue-400 border border-blue-500/30",
          className
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            isLive && "bg-emerald-400 shadow-[0_0_6px_#34d399]",
            isBeta && "bg-amber-400 shadow-[0_0_6px_#fbbf24]",
            !isLive && !isBeta && "bg-blue-400"
          )}
        />
        {children || s}
      </span>
    );
  }

  const variantClasses = {
    default: 'bg-white/5 text-slate-300 border border-white/10 hover:border-white/20 transition-colors',
    outline: 'bg-transparent text-sky-400 border border-sky-500/30 hover:border-sky-400/50',
    tech: 'bg-sky-950/40 text-sky-200 border border-sky-500/20 font-mono text-[11px] hover:border-sky-400/40',
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center font-sans",
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {children}
    </span>
  );
};
