'use client';

import { motion } from 'framer-motion';
import { Zap, GitBranch, Play, ArrowDown, ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, stagger } from '@/lib/motion';

interface AutomationStep {
  type: string;
  config: Record<string, string>;
}

interface AutomationData {
  id: string;
  name: string;
  projectId: string;
  trigger: { type: string; config: Record<string, string> };
  conditions: { field: string; operator: string; value: string }[];
  actions: AutomationStep[];
  enabled: boolean;
  lastRun: string;
  runCount: number;
}

export function AutomationBuilder({ automation }: { automation: AutomationData }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-4"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-display">{automation.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{automation.runCount.toLocaleString()} runs</p>
        </div>
        <Badge variant={automation.enabled ? 'success' : 'default'}>
          {automation.enabled ? 'Active' : 'Disabled'}
        </Badge>
      </motion.div>

      {/* Trigger */}
      <motion.div variants={fadeUp}>
        <Card className="border-l-4 border-l-neon-cyan">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-neon-cyan dark:bg-cyan-900/30">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Trigger</p>
              <p className="font-medium text-gray-900 dark:text-white">{automation.trigger.type}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(automation.trigger.config).map(([key, val]) => (
              <span key={key} className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {key}: {val}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>

      <div className="flex justify-center">
        <ArrowDown className="h-5 w-5 text-gray-300 dark:text-gray-600" />
      </div>

      {/* Conditions */}
      {automation.conditions.length > 0 && (
        <>
          <motion.div variants={fadeUp}>
            <Card className="border-l-4 border-l-amber-400">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-500 dark:bg-amber-900/30">
                  <GitBranch className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Conditions</p>
                </div>
              </div>
              <div className="space-y-2">
                {automation.conditions.map((cond, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{cond.field}</span>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 dark:bg-gray-800">{cond.operator}</span>
                    <span className="text-gray-600 dark:text-gray-400">{cond.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <div className="flex justify-center">
            <ArrowDown className="h-5 w-5 text-gray-300 dark:text-gray-600" />
          </div>
        </>
      )}

      {/* Actions */}
      <motion.div variants={fadeUp} className="space-y-3">
        {automation.actions.map((action, i) => (
          <Card key={i} className="border-l-4 border-l-brand-500">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                <Play className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Action {i + 1}</p>
                <p className="font-medium text-gray-900 dark:text-white">{action.type}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(action.config).map(([key, val]) => (
                <span key={key} className="rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  {key}: {val}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
