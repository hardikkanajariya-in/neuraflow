'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'rounded-lg p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900',
        'dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        'min-h-[44px] min-w-[44px] flex items-center justify-center',
        className
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
