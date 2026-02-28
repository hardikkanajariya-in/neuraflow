'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fadeUp, stagger } from '@/lib/motion';

export function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-neon-purple p-12 text-center text-white md:p-20"
        >
          <div className="noise-overlay absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center justify-center">
              <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                <Sparkles className="h-8 w-8" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold sm:text-4xl md:text-5xl font-display">
              Ready to automate your workflow?
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join thousands of teams building smarter automations with NeuraFlow. Start free, no credit card required.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/app">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100 gap-2 min-w-[200px]">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 min-w-[200px]">
                  Read Documentation
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
