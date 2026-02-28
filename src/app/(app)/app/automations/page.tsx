'use client';

import { useState } from 'react';
import { Workflow, Play, Clock, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { Drawer } from '@/components/ui/Drawer';
import { Input } from '@/components/ui/Input';
import { AutomationBuilder } from '@/components/features/AutomationBuilder';
import appData from '@/data/app.json';
import { formatRelativeTime, formatNumber } from '@/lib/formatters';

function getProjectName(projectId: string): string {
  const project = appData.projects.find((p) => p.id === projectId);
  return project?.name ?? 'Unknown Project';
}

function toBuilderFormat(auto: (typeof appData.automations)[0]) {
  return {
    id: auto.id,
    name: auto.name,
    projectId: auto.projectId,
    trigger: {
      type: auto.trigger.label,
      config: { configuration: auto.trigger.config },
    },
    conditions: auto.conditions.map((c) => ({
      field: c.label,
      operator: 'matches',
      value: c.config,
    })),
    actions: auto.actions.map((a) => ({
      type: a.label,
      config: { details: a.config },
    })),
    enabled: auto.enabled,
    lastRun: auto.lastRunAt,
    runCount: auto.runCount,
  };
}

export default function AutomationsPage() {
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    appData.automations.forEach((a) => {
      map[a.id] = a.enabled;
    });
    return map;
  });

  const [selectedAutoId, setSelectedAutoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedAuto = appData.automations.find((a) => a.id === selectedAutoId);

  const filteredAutomations = appData.automations.filter((auto) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      auto.name.toLowerCase().includes(q) ||
      auto.description.toLowerCase().includes(q) ||
      getProjectName(auto.projectId).toLowerCase().includes(q)
    );
  });

  const handleToggle = (id: string, enabled: boolean) => {
    setEnabledMap((prev) => ({ ...prev, [id]: enabled }));
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
            Automations
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage all your automation workflows.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:focus:border-brand-400 min-h-[44px]"
          />
        </div>
      </div>

      {/* Automation Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAutomations.map((auto) => {
          const isEnabled = enabledMap[auto.id] ?? auto.enabled;
          return (
            <Card key={auto.id} hover className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <button
                  onClick={() => setSelectedAutoId(auto.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {auto.name}
                  </h3>
                </button>
                <Toggle
                  enabled={isEnabled}
                  onChange={(val) => handleToggle(auto.id, val)}
                  label={`Toggle ${auto.name}`}
                />
              </div>

              <button
                onClick={() => setSelectedAutoId(auto.id)}
                className="mt-2 text-left"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {auto.description}
                </p>
              </button>

              <div className="mt-4 flex items-center gap-2">
                <Badge variant="info">{getProjectName(auto.projectId)}</Badge>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Workflow className="h-3.5 w-3.5" />
                    {auto.trigger.label}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Play className="h-3.5 w-3.5" />
                  {formatNumber(auto.runCount)} runs
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatRelativeTime(auto.lastRunAt)}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAutomations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Workflow className="h-12 w-12 text-gray-300 dark:text-gray-600" />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            No automations found matching your search.
          </p>
        </div>
      )}

      {/* Automation Builder Drawer */}
      <Drawer
        isOpen={selectedAutoId !== null}
        onClose={() => setSelectedAutoId(null)}
        title="Automation Details"
        className="w-[480px]"
      >
        {selectedAuto && (
          <AutomationBuilder automation={toBuilderFormat(selectedAuto)} />
        )}
      </Drawer>
    </div>
  );
}
