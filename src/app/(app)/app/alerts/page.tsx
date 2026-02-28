'use client';

import { useState } from 'react';
import { Bell, Plus, Hash, Mail, Globe, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { AlertRuleModal } from '@/components/features/AlertRuleModal';
import appData from '@/data/app.json';
import { formatRelativeTime } from '@/lib/formatters';

const channelConfig: Record<string, { icon: React.ReactNode; variant: 'info' | 'success' | 'warning' | 'default' }> = {
  slack: { icon: <Hash className="h-3 w-3" />, variant: 'info' },
  email: { icon: <Mail className="h-3 w-3" />, variant: 'success' },
  webhook: { icon: <Globe className="h-3 w-3" />, variant: 'warning' },
};

export default function AlertsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    appData.alertRules.forEach((rule) => {
      map[rule.id] = rule.enabled;
    });
    return map;
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
            Alert Rules
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure alert rules to monitor your automations and receive notifications.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Alert Rule
        </Button>
      </div>

      {/* Alert Rule Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {appData.alertRules.map((rule) => {
          const isEnabled = enabledMap[rule.id] ?? rule.enabled;
          const channel = channelConfig[rule.channel] ?? { icon: <Bell className="h-3 w-3" />, variant: 'default' as const };

          return (
            <Card key={rule.id} hover>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {rule.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {rule.condition}
                    </p>
                  </div>
                </div>
                <Toggle
                  enabled={isEnabled}
                  onChange={(val) => handleToggle(rule.id, val)}
                  label={`Toggle ${rule.name}`}
                />
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Threshold</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {rule.threshold}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Channel</span>
                  <Badge variant={channel.variant}>
                    <span className="flex items-center gap-1">
                      {channel.icon}
                      {rule.channel.charAt(0).toUpperCase() + rule.channel.slice(1)}
                    </span>
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Last triggered</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {rule.lastTriggered
                      ? formatRelativeTime(rule.lastTriggered)
                      : 'Never'}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Alert Rule Modal */}
      <AlertRuleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
