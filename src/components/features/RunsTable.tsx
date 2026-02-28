'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, Clock, Ban, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useDebounce } from '@/hooks/useDebounce';
import { formatRelativeTime, formatDuration } from '@/lib/formatters';
import appData from '@/data/app.json';

const statusConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; variant: 'success' | 'error' | 'warning' | 'info' | 'default' }> = {
  success: { icon: CheckCircle, variant: 'success' },
  failed: { icon: XCircle, variant: 'error' },
  running: { icon: Loader2, variant: 'info' },
  queued: { icon: Clock, variant: 'warning' },
  cancelled: { icon: Ban, variant: 'default' },
};

export function RunsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const debouncedSearch = useDebounce(search, 300);

  const runs = appData.runs.filter((run) => {
    const matchesSearch = run.automationName.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || run.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['all', 'success', 'failed', 'running', 'queued', 'cancelled'];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search runs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white min-h-[44px]"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors whitespace-nowrap min-h-[44px]',
                statusFilter === status
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {runs.length === 0 ? (
        <EmptyState
          title="No runs found"
          description="No runs match your current filters."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Automation</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Duration</th>
                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Steps</th>
                <th className="hidden px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Started</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {runs.map((run, index) => {
                const config = statusConfig[run.status] || statusConfig.success;
                const StatusIcon = config.icon;
                return (
                  <motion.tr
                    key={run.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{run.automationName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{run.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={config.variant}>
                        <StatusIcon className={cn('mr-1 h-3 w-3', run.status === 'running' && 'animate-spin')} />
                        {run.status}
                      </Badge>
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                      {run.duration || '—'}
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-500 lg:table-cell">
                      {run.stepsCompleted}/{run.totalSteps}
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                      {formatRelativeTime(run.startedAt)}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
