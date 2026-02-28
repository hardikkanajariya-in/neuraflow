'use client';

import { useState } from 'react';
import { Search, Bell, Menu, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { Avatar } from '@/components/ui/Avatar';
import { useCommandPalette } from '@/providers/CommandPaletteProvider';
import appData from '@/data/app.json';
import { PHOTO_IDS } from '@/lib/constants';

export function AppTopbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { open } = useCommandPalette();
  const unreadCount = appData.notifications.filter((n: { read: boolean }) => !n.read).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search trigger */}
        <button
          onClick={open}
          className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 min-h-[44px] min-w-[200px]"
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <span className="ml-auto flex items-center gap-0.5 rounded-md bg-gray-200 px-1.5 py-0.5 text-xs dark:bg-gray-700">
            <Command className="h-3 w-3" /> K
          </span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900 z-50">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <div className="max-h-64 space-y-2 overflow-y-auto">
                {appData.notifications.slice(0, 5).map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      'rounded-lg p-3 text-sm',
                      notif.read
                        ? 'text-gray-500 dark:text-gray-400'
                        : 'bg-brand-50 text-gray-900 dark:bg-brand-900/20 dark:text-white'
                    )}
                  >
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-3 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
          <Avatar photoId={PHOTO_IDS.team3} name={appData.user.name} size="sm" />
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{appData.user.name}</p>
            <p className="text-xs text-gray-500">{appData.user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
