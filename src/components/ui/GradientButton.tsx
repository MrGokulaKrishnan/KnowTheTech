import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  external?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  external = false,
  className,
  disabled = false,
  type = 'button',
  onClick,
  icon,
  iconRight,
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs font-medium gap-1.5 rounded-lg',
    md: 'px-5 py-2.5 text-sm font-semibold gap-2 rounded-xl',
    lg: 'px-7 py-3.5 text-base font-semibold gap-2.5 rounded-xl',
  }[size];

  const variantClasses = {
    primary: 'glossy-button text-white border border-sky-400/20',
    secondary: 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-sky-400/30 backdrop-blur-md transition-all shadow-glass-sm hover:shadow-glass',
    glass: 'bg-sky-950/40 hover:bg-sky-900/50 text-sky-300 hover:text-sky-200 border border-sky-500/20 hover:border-sky-400/40 backdrop-blur-md transition-all',
  }[variant];

  const baseClasses = cn(
    'inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-[#020617] disabled:opacity-50 disabled:cursor-not-allowed select-none',
    sizeClasses,
    variantClasses,
    className
  );

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{iconRight}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn(baseClasses, "group")} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClasses, "group")}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseClasses, "group")}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
