import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'green' | 'blue' | 'red' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'orange', className }: BadgeProps) {
  const variants = {
    orange: 'bg-brand-orange/20 text-brand-orange border-brand-orange/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    gray: 'bg-white/10 text-white/60 border-white/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
