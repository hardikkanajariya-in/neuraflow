import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  glass?: boolean;
  hover?: boolean;
}

export function Card({ className, children, glass, hover }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900',
        glass && 'bg-white/80 backdrop-blur-xl dark:bg-white/5',
        hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
}
