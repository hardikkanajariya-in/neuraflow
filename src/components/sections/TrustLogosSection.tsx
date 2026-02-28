'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import marketingData from '@/data/marketing.json';

export function TrustLogosSection() {
  return (
    <section className="relative border-y border-gray-100 bg-gray-50/80 py-12 dark:border-gray-800/50 dark:bg-gray-950/80 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 sm:mb-10"
        >
          Trusted by innovative teams worldwide
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12 md:gap-x-14"
        >
          {marketingData.trustLogos.map((logo) => (
            <div
              key={logo.name}
              className="text-base font-bold text-gray-400 transition-colors duration-200 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 sm:text-lg"
            >
              {logo.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
