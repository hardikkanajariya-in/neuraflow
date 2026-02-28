'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { fadeUp, stagger } from '@/lib/motion';
import marketingData from '@/data/marketing.json';

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div variants={fadeUp} className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600 dark:border-brand-800/40 dark:bg-brand-950/30 dark:text-brand-400">
            Pricing
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
            Start free, scale as you grow. No hidden fees, no surprises.
          </motion.p>

          {/* Annual/Monthly toggle */}
          <motion.div
            variants={fadeUp}
            className="mt-10 inline-flex items-center gap-1 rounded-full border border-gray-200/80 bg-gray-100/80 p-1 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80"
          >
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 min-h-[44px]',
                !annual
                  ? 'bg-white text-gray-900 shadow-md dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 min-h-[44px]',
                annual
                  ? 'bg-white text-gray-900 shadow-md dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              )}
            >
              Annual{' '}
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                -20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {marketingData.pricing.map((tier) => {
            const price = annual ? tier.priceAnnual : tier.price;
            return (
              <motion.div
                key={tier.id}
                variants={fadeUp}
                className={cn(
                  'relative rounded-2xl border p-8 transition-all duration-300 sm:p-9',
                  tier.highlighted
                    ? 'border-brand-400/50 bg-white shadow-xl shadow-brand-500/10 dark:border-brand-500/30 dark:bg-gray-900 ring-1 ring-brand-400/20 lg:scale-105'
                    : 'border-gray-200/80 bg-white hover:shadow-lg hover:shadow-gray-900/[0.04] hover:border-gray-300/80 dark:border-gray-800/80 dark:bg-gray-900/80 dark:hover:border-gray-700/80'
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-neon-purple px-4 py-1 text-xs font-bold text-white shadow-lg shadow-brand-500/25">
                      <Sparkles className="h-3 w-3" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  {price === 0 ? (
                    <span className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                      Free
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        ${price}
                      </span>
                      <span className="text-sm font-medium text-gray-500">/month</span>
                    </>
                  )}
                </div>

                <Link href="/app" className="block mt-8">
                  <Button
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    className={cn(
                      'w-full font-semibold',
                      tier.highlighted && 'shadow-lg shadow-brand-600/25'
                    )}
                  >
                    {tier.cta}
                  </Button>
                </Link>

                <div className="mt-8 h-px w-full bg-gray-100 dark:bg-gray-800" />

                <ul className="mt-6 space-y-3.5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-900/30">
                        <Check className="h-3 w-3 text-brand-600 dark:text-brand-400" />
                      </div>
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
