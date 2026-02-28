'use client';

import { motion } from 'framer-motion';
import { Brain, Workflow, Shield, Zap, BarChart3, Plug, GitBranch, Globe } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import { cn } from '@/lib/utils';
import marketingData from '@/data/marketing.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain, Workflow, Shield, Zap, BarChart3, Plug, GitBranch, Globe,
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent dark:via-brand-950/10" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div variants={fadeUp} className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600 dark:border-brand-800/40 dark:bg-brand-950/30 dark:text-brand-400">
            Capabilities
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl text-balance">
            Everything you need to automate at scale
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base text-gray-500 dark:text-gray-400 sm:text-lg leading-relaxed">
            From simple task automation to complex multi-step AI workflows, NeuraFlow provides the tools and intelligence to handle it all.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
        >
          {marketingData.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Brain;
            const isLarge = index < 2;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className={cn(
                  'group relative rounded-2xl border border-gray-200/80 bg-white p-6 transition-all duration-300 sm:p-7',
                  'hover:shadow-xl hover:shadow-gray-900/[0.06] hover:-translate-y-1 hover:border-gray-300/80',
                  'dark:border-gray-800/80 dark:bg-gray-900/80 dark:hover:border-gray-700/80 dark:hover:shadow-black/20',
                  isLarge && 'lg:col-span-2'
                )}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-50/0 to-neon-purple/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-brand-50/40 group-hover:to-neon-purple/5 dark:group-hover:from-brand-950/20 dark:group-hover:to-neon-purple/5" aria-hidden="true" />

                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all duration-300 group-hover:bg-brand-100 group-hover:ring-brand-200 group-hover:shadow-md group-hover:shadow-brand-500/10 dark:bg-brand-900/30 dark:text-brand-400 dark:ring-brand-800/50 dark:group-hover:bg-brand-900/50 sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
