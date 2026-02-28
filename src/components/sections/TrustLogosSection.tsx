'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import marketingData from '@/data/marketing.json';

export function TrustLogosSection() {
  return (
    <section className="border-y border-gray-200 bg-gray-50/50 py-12 dark:border-gray-800 dark:bg-gray-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-8 text-center text-sm font-medium text-gray-400 dark:text-gray-500"
        >
          Trusted by innovative teams worldwide
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {marketingData.trustLogos.map((logo) => (
            <div
              key={logo.name}
              className="text-lg font-semibold text-gray-300 dark:text-gray-600 transition-colors hover:text-gray-500 dark:hover:text-gray-400 font-display"
            >
              {logo.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
