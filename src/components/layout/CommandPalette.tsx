'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Workflow,
  Play,
  Bell,
  Settings,
  CreditCard,
  Users,
  FileText,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCommandPalette } from '@/providers/CommandPaletteProvider';
import type { CommandItem } from '@/lib/types';

const commands: CommandItem[] = [
  { id: 'dashboard', label: 'Go to Dashboard', icon: 'LayoutDashboard', href: '/app', category: 'Navigation' },
  { id: 'projects', label: 'Go to Projects', icon: 'FolderKanban', href: '/app/projects', category: 'Navigation' },
  { id: 'automations', label: 'Go to Automations', icon: 'Workflow', href: '/app/automations', category: 'Navigation' },
  { id: 'runs', label: 'Go to Runs', icon: 'Play', href: '/app/runs', category: 'Navigation' },
  { id: 'alerts', label: 'Go to Alerts', icon: 'Bell', href: '/app/alerts', category: 'Navigation' },
  { id: 'settings', label: 'Go to Settings', icon: 'Settings', href: '/app/settings', category: 'Navigation' },
  { id: 'billing', label: 'Go to Billing', icon: 'CreditCard', href: '/app/billing', category: 'Navigation' },
  { id: 'team', label: 'Go to Team', icon: 'Users', href: '/app/team', category: 'Navigation' },
  { id: 'docs', label: 'View Documentation', icon: 'FileText', href: '/docs', category: 'Help' },
  { id: 'home', label: 'Go to Marketing Site', icon: 'ArrowRight', href: '/', category: 'Navigation' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FolderKanban,
  Workflow,
  Play,
  Bell,
  Settings,
  CreditCard,
  Users,
  FileText,
  ArrowRight,
};

export function CommandPalette() {
  const { isOpen, close, recentSearches, addRecentSearch } = useCommandPalette();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    return commands.filter((cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function executeCommand(cmd: CommandItem) {
    addRecentSearch(cmd.label);
    close();
    router.push(cmd.href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex]);
      }
    }
  }

  const grouped = filtered.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 overflow-hidden"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 border-0 bg-transparent py-4 text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-white"
              />
              <kbd className="hidden sm:flex rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-400 dark:border-gray-700">
                ESC
              </kbd>
            </div>

            {/* Recent searches */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="border-b border-gray-200 px-2 py-2 dark:border-gray-700">
                <p className="px-3 py-1 text-xs font-semibold text-gray-400">Recent</p>
                {recentSearches.map((search, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(search)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <Clock className="h-4 w-4" />
                    {search}
                  </button>
                ))}
              </div>
            )}

            {/* Results */}
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">No results found.</p>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="px-3 py-1 text-xs font-semibold text-gray-400">{category}</p>
                    {items.map((cmd) => {
                      const globalIndex = filtered.indexOf(cmd);
                      const Icon = (cmd.icon && iconMap[cmd.icon]) || ArrowRight;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => executeCommand(cmd)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                            globalIndex === selectedIndex
                              ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
                              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                          )}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          {cmd.label}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
