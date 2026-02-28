import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import siteData from '@/data/site.json';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-gray-200/80 bg-gray-50/80 dark:border-gray-800/50 dark:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-neon-purple shadow-md shadow-brand-500/25">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {siteData.brandName}
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
              {siteData.tagline}
            </p>
            <div className="flex gap-1">
              {siteData.socials.map((s) => {
                const Icon = socialIcons[s.icon.toLowerCase()] || Github;
                return (
                  <a
                    key={s.platform}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label={s.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link groups */}
          {siteData.footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-gray-900 dark:text-white">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-200/80 pt-8 dark:border-gray-800/50 md:flex-row">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {siteData.brandName}. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Created by{' '}
            <a
              href={siteData.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              {siteData.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
