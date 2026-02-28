'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fadeUp, stagger } from '@/lib/motion';
import { PHOTO_IDS, unsplashUrl } from '@/lib/constants';
import marketingData from '@/data/marketing.json';

const hero = marketingData.hero;

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="hero-gradient absolute inset-0" aria-hidden="true" />
      <div className="noise-overlay absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm text-brand-700 dark:border-brand-800 dark:bg-brand-950/50 dark:text-brand-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Now with AI Decision Engine v2
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl font-display"
          >
            <span className="gradient-text">{hero.title}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href={hero.cta.href}>
              <Button size="lg" className="gap-2 min-w-[200px]">
                {hero.cta.text}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={hero.secondaryCta.href}>
              <Button variant="outline" size="lg" className="gap-2 min-w-[200px]">
                <Play className="h-4 w-4" />
                {hero.secondaryCta.text}
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={fadeUp}
            className="relative mt-16 mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/50 p-2 shadow-2xl backdrop-blur dark:border-gray-800 dark:bg-gray-900/50">
              <Image
                src={unsplashUrl(PHOTO_IDS.dashboard, 1200, 675)}
                alt="NeuraFlow dashboard preview"
                width={1200}
                height={675}
                className="rounded-xl"
                priority
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-brand-500/20 via-neon-purple/20 to-neon-cyan/20 blur-3xl" aria-hidden="true" />
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white font-display">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
