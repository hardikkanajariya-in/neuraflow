'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import { unsplashUrl } from '@/lib/constants';
import marketingData from '@/data/marketing.json';

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const testimonials = marketingData.testimonials;

  const next = useCallback(() => {
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative py-24 sm:py-32 bg-gray-50/80 dark:bg-gray-950/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-brand-200/50 to-transparent dark:via-brand-800/30" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4 inline-flex items-center rounded-full border border-brand-200/60 bg-brand-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-600 dark:border-brand-800/40 dark:bg-brand-950/30 dark:text-brand-400">
            Testimonials
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Loved by teams worldwide
          </motion.h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="rounded-2xl border border-gray-200/80 bg-white p-8 shadow-lg shadow-gray-900/[0.04] dark:border-gray-800/80 dark:bg-gray-900/90 md:p-12"
            >
              <Quote className="mb-6 h-10 w-10 text-brand-200 dark:text-brand-800/60" />

              <blockquote className="mb-8 text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-200 md:text-xl lg:text-2xl lg:leading-relaxed">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <Image
                    src={unsplashUrl(testimonials[active].avatarId, 96, 96)}
                    alt={testimonials[active].name}
                    width={52}
                    height={52}
                    className="rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonials[active].name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonials[active].role}, {testimonials[active].company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 sm:ml-auto">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-xl border border-gray-200 bg-white p-3 text-gray-400 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 bg-brand-600 dark:bg-brand-400'
                      : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="rounded-xl border border-gray-200 bg-white p-3 text-gray-400 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
