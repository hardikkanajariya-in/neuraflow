'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/motion';
import { unsplashUrl } from '@/lib/constants';
import marketingData from '@/data/marketing.json';

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const testimonials = marketingData.testimonials;

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3">
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl font-display">
            Loved by teams worldwide
          </motion.h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12"
            >
              <Quote className="mb-6 h-10 w-10 text-brand-200 dark:text-brand-800" />

              <blockquote className="mb-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed md:text-xl">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <Image
                  src={unsplashUrl(testimonials[active].avatarId, 96, 96)}
                  alt={testimonials[active].name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[active].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[active].role}, {testimonials[active].company}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5">
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
              className="rounded-xl border border-gray-200 p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    i === active ? 'w-8 bg-brand-600' : 'w-2.5 bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="rounded-xl border border-gray-200 p-3 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
