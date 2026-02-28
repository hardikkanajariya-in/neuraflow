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
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
            Capabilities
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl font-display">
            Everything you need to automate at scale
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            From simple task automation to complex multi-step AI workflows, NeuraFlow provides the tools and intelligence to handle it all.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {marketingData.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Brain;
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className={cn(
                  'group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300',
                  'hover:shadow-lg hover:-translate-y-1',
                  'dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700',
                  index < 2 && 'lg:col-span-2'
                )}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 transition-colors group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white font-display">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
