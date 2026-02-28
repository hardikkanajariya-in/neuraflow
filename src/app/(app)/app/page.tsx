'use client';

import { Play, CheckCircle, Clock, Workflow, AlertCircle, Loader2, Pause } from 'lucide-react';
import { KPICard } from '@/components/features/KPICard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import appData from '@/data/app.json';
import { formatRelativeTime } from '@/lib/formatters';

const iconMap: Record<string, React.ReactNode> = {
  Play: <Play className="h-5 w-5" />,
  CheckCircle: <CheckCircle className="h-5 w-5" />,
  Clock: <Clock className="h-5 w-5" />,
  Workflow: <Workflow className="h-5 w-5" />,
};

const trendMap: Record<string, 'up' | 'down' | 'flat'> = {
  positive: 'up',
  negative: 'down',
  neutral: 'flat',
};

const statusVariant: Record<string, 'success' | 'error' | 'warning' | 'info' | 'default'> = {
  success: 'success',
  failed: 'error',
  running: 'info',
  queued: 'default',
};

const statusIcon: Record<string, React.ReactNode> = {
  success: <CheckCircle className="h-3.5 w-3.5" />,
  failed: <AlertCircle className="h-3.5 w-3.5" />,
  running: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
  queued: <Pause className="h-3.5 w-3.5" />,
};

const notifVariant: Record<string, 'error' | 'success' | 'warning' | 'info'> = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info',
};

export default function DashboardPage() {
  const recentRuns = appData.runs.slice(0, 5);
  const recentNotifications = appData.notifications.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {appData.user.name}. Here&apos;s what&apos;s happening with your automations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {appData.metrics.map((metric, index) => (
          <KPICard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            trend={trendMap[metric.changeType] ?? 'flat'}
            period="vs last month"
            index={index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Runs */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
              Recent Runs
            </h2>
            <a
              href="/app/runs"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                    Automation
                  </th>
                  <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                    Duration
                  </th>
                  <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                    Progress
                  </th>
                  <th className="pb-3 text-right font-medium text-gray-500 dark:text-gray-400">
                    Started
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentRuns.map((run) => (
                  <tr key={run.id} className="group">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {run.automationName}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={statusVariant[run.status] ?? 'default'}>
                        <span className="flex items-center gap-1">
                          {statusIcon[run.status]}
                          {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                      {run.duration}
                    </td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                      {run.stepsCompleted}/{run.totalSteps} steps
                    </td>
                    <td className="py-3 text-right text-gray-500 dark:text-gray-400">
                      {formatRelativeTime(run.startedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
              Activity
            </h2>
          </div>
          <div className="space-y-4">
            {recentNotifications.map((notif) => (
              <div key={notif.id} className="flex gap-3">
                <div className="mt-0.5">
                  <Badge variant={notifVariant[notif.type] ?? 'default'} className="h-6 w-6 justify-center rounded-full p-0">
                    {notif.type === 'error' && <AlertCircle className="h-3 w-3" />}
                    {notif.type === 'success' && <CheckCircle className="h-3 w-3" />}
                    {notif.type === 'warning' && <AlertCircle className="h-3 w-3" />}
                    {notif.type === 'info' && <Clock className="h-3 w-3" />}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {notif.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {notif.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {formatRelativeTime(notif.timestamp)}
                  </p>
                </div>
                {!notif.read && (
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
