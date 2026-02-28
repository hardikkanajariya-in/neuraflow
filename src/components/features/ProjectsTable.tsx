'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoreHorizontal, ExternalLink, Pause, Trash2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Dropdown } from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDebounce } from '@/hooks/useDebounce';
import appData from '@/data/app.json';

const statusMap: Record<string, 'success' | 'warning' | 'error' | 'default' | 'info'> = {
  active: 'success',
  paused: 'warning',
  error: 'error',
  draft: 'default',
  archived: 'info',
};

export function ProjectsTable() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = appData.projects.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 min-h-[44px]"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Try adjusting your search or create a new project."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Project</th>
                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 md:table-cell">Status</th>
                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">Runs</th>
                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 lg:table-cell">Success</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filtered.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <td className="px-6 py-4">
                    <Link href={`/app/projects/${project.id}`} className="group">
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {project.name}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {project.description}
                      </p>
                    </Link>
                  </td>
                  <td className="hidden px-6 py-4 md:table-cell">
                    <Badge variant={statusMap[project.status] || 'default'}>
                      {project.status}
                    </Badge>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-gray-600 dark:text-gray-400 lg:table-cell">
                    {project.metrics.totalRuns.toLocaleString()}
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-gray-600 dark:text-gray-400 lg:table-cell">
                    {project.metrics.successRate}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown
                      align="right"
                      trigger={
                        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      }
                      items={[
                        { label: 'View Details', onClick: () => {}, icon: <ExternalLink className="h-4 w-4" /> },
                        { label: 'Pause Project', onClick: () => {}, icon: <Pause className="h-4 w-4" /> },
                        { label: 'Delete', onClick: () => {}, icon: <Trash2 className="h-4 w-4" />, danger: true },
                      ]}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
