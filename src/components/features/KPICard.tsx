'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { fadeUp } from '@/lib/motion';

interface KPICardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
  period: string;
  index?: number;
}

const trendConfig = {
  up: { icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  down: { icon: TrendingDown, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/30' },
  flat: { icon: Minus, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' },
};

export function KPICard({ label, value, change, trend, period, index = 0 }: KPICardProps) {
  const { icon: TrendIcon, color, bg } = trendConfig[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card hover>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white font-display">{value}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', bg, color)}>
            <TrendIcon className="h-3 w-3" />
            {change}
          </span>
          <span className="text-xs text-gray-400">{period}</span>
        </div>
      </Card>
    </motion.div>
  );
}
