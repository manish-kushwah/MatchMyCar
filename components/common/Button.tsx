import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800': variant === 'primary',
          'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300': variant === 'secondary',
          'border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700': variant === 'outline',
          'bg-transparent hover:bg-slate-50 text-slate-600': variant === 'text',
        },
        {
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
