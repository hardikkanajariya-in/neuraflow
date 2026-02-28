import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Activity,
  CheckCircle,
  Clock,
  Workflow,
  Users,
  Calendar,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import appData from '@/data/app.json';
import { formatDate, formatNumber, formatRelativeTime } from '@/lib/formatters';

const statusVariant: Record<string, 'success' | 'warning' | 'default' | 'info' | 'error'> = {
  active: 'success',
  paused: 'warning',
  draft: 'default',
  completed: 'info',
};

const teamAvatarMap: Record<string, string> = {};
appData.teamMembers.forEach((tm) => {
  teamAvatarMap[tm.name] = tm.avatarId;
});

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;

  const project = appData.projects.find((p) => p.id === id);
  if (!project) {
    notFound();
  }

  const projectAutomations = appData.automations.filter(
    (a) => a.projectId === project.id
  );

  const projectRuns = appData.runs.filter((r) => r.projectId === project.id);
  const recentRuns = projectRuns.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Back link & header */}
      <div>
        <Link
          href="/app/projects"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
                {project.name}
              </h1>
              <Badge variant={statusVariant[project.status] ?? 'default'}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Runs</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white font-display">
                {formatNumber(project.metrics.totalRuns)}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white font-display">
                {project.metrics.successRate}%
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Duration</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white font-display">
                {project.metrics.avgDuration}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <Workflow className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Automations</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white font-display">
                {project.automationCount}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Automations */}
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white font-display">
            Automations
          </h2>
          {projectAutomations.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No automations created for this project yet.
            </p>
          ) : (
            <div className="space-y-3">
              {projectAutomations.map((auto) => (
                <div
                  key={auto.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {auto.name}
                      </p>
                      <Badge variant={auto.enabled ? 'success' : 'default'}>
                        {auto.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {auto.trigger.label} · {auto.runCount.toLocaleString()} runs
                    </p>
                  </div>
                  <p className="ml-4 text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    Last run {formatRelativeTime(auto.lastRunAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Team & Info */}
        <div className="space-y-6">
          {/* Team Members */}
          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
                Team
              </h2>
            </div>
            <div className="space-y-3">
              {project.teamMembers.map((memberName) => (
                <div key={memberName} className="flex items-center gap-3">
                  <Avatar
                    photoId={teamAvatarMap[memberName]}
                    name={memberName}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {memberName}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Project Info */}
          <Card>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white font-display">
              Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <dt className="text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="ml-auto font-medium text-gray-900 dark:text-white">
                  {formatDate(project.createdAt)}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <dt className="text-gray-500 dark:text-gray-400">Updated</dt>
                <dd className="ml-auto font-medium text-gray-900 dark:text-white">
                  {formatRelativeTime(project.updatedAt)}
                </dd>
              </div>
            </dl>
          </Card>

          {/* Recent Runs */}
          <Card>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white font-display">
              Recent Runs
            </h2>
            {recentRuns.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No runs yet.</p>
            ) : (
              <div className="space-y-2">
                {recentRuns.map((run) => (
                  <div
                    key={run.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          run.status === 'success'
                            ? 'success'
                            : run.status === 'failed'
                            ? 'error'
                            : run.status === 'running'
                            ? 'info'
                            : 'default'
                        }
                      >
                        {run.status}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {run.duration}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatRelativeTime(run.startedAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
