'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, stagger } from '@/lib/motion';
import marketingData from '@/data/marketing.json';

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
            Pricing
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl font-display">
            Simple, transparent pricing
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start free, scale as you grow. No hidden fees, no surprises.
          </motion.p>

          {/* Annual/Monthly toggle */}
          <motion.div variants={fadeUp} className="mt-8 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px]',
                !annual ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px]',
                annual ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white' : 'text-gray-500'
              )}
            >
              Annual <span className="text-emerald-600 dark:text-emerald-400 ml-1">(-20%)</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-8 lg:grid-cols-3"
        >
          {marketingData.pricing.map((tier) => {
            const price = annual ? tier.priceAnnual : tier.price;
            return (
              <motion.div
                key={tier.id}
                variants={fadeUp}
                className={cn(
                  'relative rounded-2xl border p-8 transition-all duration-300',
                  tier.highlighted
                    ? 'border-brand-500 bg-white shadow-lg shadow-brand-500/10 dark:border-brand-400 dark:bg-gray-900 scale-[1.02]'
                    : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 hover:shadow-md'
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="brand">{tier.badge}</Badge>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-display">{tier.name}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>

                <div className="mt-6 flex items-baseline">
                  {price === 0 ? (
                    <span className="text-4xl font-bold text-gray-900 dark:text-white font-display">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-gray-900 dark:text-white font-display">${price}</span>
                      <span className="ml-1 text-sm text-gray-500">/month</span>
                    </>
                  )}
                </div>

                <Link href="/app" className="block mt-8">
                  <Button
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </Link>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600 dark:text-brand-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
