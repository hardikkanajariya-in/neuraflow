import { RunsTable } from '@/components/features/RunsTable';

export default function RunsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
          Runs
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Monitor all automation run executions and their statuses.
        </p>
      </div>

      {/* Runs Table */}
      <RunsTable />
    </div>
  );
}
