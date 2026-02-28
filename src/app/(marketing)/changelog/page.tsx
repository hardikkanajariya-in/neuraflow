import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import changelogData from '@/data/changelog.json';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'See what\'s new in NeuraFlow. Release notes, improvements, and bug fixes.',
};

const typeBadge: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
  added: 'success',
  improved: 'info',
  fixed: 'warning',
  removed: 'error',
};

export default function ChangelogPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-display">Changelog</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            All the latest updates, improvements, and fixes to NeuraFlow.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 md:left-1/2" aria-hidden="true" />

          <div className="space-y-12">
            {changelogData.entries.map((entry) => (
              <div key={entry.version} className="relative pl-12 md:pl-0">
                {/* Dot */}
                <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-brand-500 bg-white dark:bg-gray-950 md:left-1/2 md:-translate-x-1/2" />

                <div className="md:ml-[55%]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-lg font-bold text-gray-900 dark:text-white font-display">
                      {entry.version}
                    </span>
                    <span className="text-sm text-gray-400">{entry.date}</span>
                  </div>

                  <div className="space-y-3">
                    {entry.changes.map((change, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Badge variant={typeBadge[change.type] || 'default'} className="mt-0.5">
                          {change.type}
                        </Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{change.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
