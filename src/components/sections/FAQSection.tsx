'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp, stagger } from '@/lib/motion';
import marketingData from '@/data/marketing.json';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-gray-50/50 dark:bg-gray-950/30">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-14 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600 dark:border-brand-800/40 dark:bg-brand-950/30 dark:text-brand-400">
            FAQ
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Frequently asked questions
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-3"
        >
          {marketingData.faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className={cn(
                  'rounded-xl border bg-white transition-all duration-200 dark:bg-gray-900/80',
                  isOpen
                    ? 'border-brand-200/50 shadow-md shadow-brand-500/5 dark:border-brand-800/30'
                    : 'border-gray-200/80 hover:border-gray-300/80 dark:border-gray-800/80 dark:hover:border-gray-700/80'
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left min-h-[56px]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white pr-4 sm:text-base">
                    {item.question}
                  </span>
                  <span className={cn(
                    'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200',
                    isOpen
                      ? 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                  )}>
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
