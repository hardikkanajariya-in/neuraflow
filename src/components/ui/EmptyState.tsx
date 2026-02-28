import { cn } from '@/lib/utils';
import { Button } from './Button';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon ? (
        <div className="mb-4 text-gray-300 dark:text-gray-600">{icon}</div>
      ) : (
        <svg
          className="mb-4 h-24 w-24 text-gray-200 dark:text-gray-700"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <rect x="15" y="20" width="70" height="55" rx="8" stroke="currentColor" strokeWidth="2" />
          <path d="M15 35h70" stroke="currentColor" strokeWidth="2" />
          <circle cx="25" cy="27.5" r="2.5" fill="currentColor" />
          <circle cx="33" cy="27.5" r="2.5" fill="currentColor" />
          <circle cx="41" cy="27.5" r="2.5" fill="currentColor" />
          <rect x="30" y="45" width="40" height="4" rx="2" fill="currentColor" opacity="0.3" />
          <rect x="35" y="55" width="30" height="4" rx="2" fill="currentColor" opacity="0.2" />
        </svg>
      )}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100 font-display">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {action && (
        <Button onClick={action.onClick} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}
