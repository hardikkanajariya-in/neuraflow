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
          className="relative overflow-hidden rounded-3xl p-10 text-center text-white sm:p-14 md:p-20"
          style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 30%, #6d28d9 60%, #a855f7 100%)',
          }}
        >
          {/* Background decorations */}
          <div className="noise-overlay absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-neon-cyan/10 blur-3xl" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-neon-purple/10 blur-[100px]" aria-hidden="true" />

          <div className="relative">
            <motion.div variants={fadeUp} className="mb-8 inline-flex items-center justify-center">
              <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm ring-1 ring-white/20">
                <Sparkles className="h-8 w-8" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to automate
              <br className="hidden sm:block" />
              your workflow?
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:mt-6 sm:text-lg leading-relaxed">
              Join thousands of teams building smarter automations with NeuraFlow. Start free, no credit card required.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/app">
                <Button
                  size="lg"
                  className="bg-white text-brand-700 hover:bg-gray-100 gap-2.5 min-w-[200px] font-semibold shadow-xl shadow-black/15"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/25 text-white hover:bg-white/10 min-w-[200px] font-semibold"
                >
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
