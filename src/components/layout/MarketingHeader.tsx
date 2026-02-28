'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/Button';
import siteData from '@/data/site.json';

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { direction, scrollY } = useScrollDirection();
  const pathname = usePathname();
  const isScrolled = scrollY > 20;

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: direction === 'down' && scrollY > 400 ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 shadow-sm backdrop-blur-xl dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group" aria-label="NeuraFlow home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-neon-purple">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display text-gray-900 dark:text-white">
              {siteData.brandName}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {siteData.navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/app" className="hidden md:block">
              <Button size="sm">Launch App</Button>
            </Link>
            <button
              className="rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {siteData.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 min-h-[44px]"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/app" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-2">Launch App</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
