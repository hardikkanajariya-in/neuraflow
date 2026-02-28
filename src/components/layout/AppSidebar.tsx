'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FolderKanban,
  Workflow,
  Play,
  Bell,
  Settings,
  CreditCard,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import appData from '@/data/app.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FolderKanban,
  Workflow,
  Play,
  Bell,
  Settings,
  CreditCard,
  Users,
};

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.2 }}
      className="hidden md:flex flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-800">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-neon-purple">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold font-display text-gray-900 dark:text-white"
          >
            NeuraFlow
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {Object.entries(
          appData.sidebarNav.reduce<Record<string, typeof appData.sidebarNav>>((acc, item) => {
            const section = item.section || 'Main';
            if (!acc[section]) acc[section] = [];
            acc[section].push(item);
            return acc;
          }, {})
        ).map(([section, items]) => (
          <div key={section} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {section}
              </p>
            )}
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 min-h-[44px]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
                      collapsed && 'justify-center px-2'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse button */}
      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-xl p-2.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors min-h-[44px]"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
