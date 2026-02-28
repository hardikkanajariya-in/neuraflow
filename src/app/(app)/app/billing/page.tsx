'use client';

import { Check, Sparkles, CreditCard, Download, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import billingData from '@/data/billing.json';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/formatters';

const statusVariant: Record<string, 'success' | 'default' | 'warning' | 'error'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'error',
};

function usageVariant(used: number, limit: number): 'default' | 'success' | 'warning' | 'danger' {
  const pct = (used / limit) * 100;
  if (pct >= 90) return 'danger';
  if (pct >= 70) return 'warning';
  return 'default';
}

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display sm:text-3xl">
          Billing
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your subscription plan, usage, and billing history.
        </p>
      </div>

      {/* Plans */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white font-display">
          Plans
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {billingData.plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                'relative flex flex-col',
                plan.current && 'ring-2 ring-brand-500 border-brand-500 dark:border-brand-400'
              )}
            >
              {plan.badge && (
                <Badge variant="brand" className="absolute -top-2.5 right-4">
                  {plan.badge}
                </Badge>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white font-display">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="mb-6 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.current ? (
                <Button variant="secondary" disabled className="w-full">
                  Current Plan
                </Button>
              ) : (
                <Button
                  variant={plan.id === 'enterprise' ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.price === 0 ? 'Downgrade' : 'Upgrade'}
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Usage */}
      <Card>
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
            Current Usage
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {billingData.usage.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatNumber(item.used)} / {formatNumber(item.limit)} {item.unit}
                </span>
              </div>
              <Progress
                value={item.used}
                max={item.limit}
                variant={usageVariant(item.used, item.limit)}
                showLabel
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Invoices */}
      <Card>
        <div className="mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-display">
            Billing History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Description
                </th>
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="pb-3 text-right font-medium text-gray-500 dark:text-gray-400">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {billingData.invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="py-3 pr-4 text-gray-900 dark:text-white whitespace-nowrap">
                    {invoice.date}
                  </td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                    {invoice.description}
                  </td>
                  <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {invoice.amount}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={statusVariant[invoice.status] ?? 'default'}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
                      aria-label={`Download invoice ${invoice.id}`}
                    >
                      <Download className="h-4 w-4" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
