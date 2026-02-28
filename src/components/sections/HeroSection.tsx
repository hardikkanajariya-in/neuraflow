'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fadeUp, stagger } from '@/lib/motion';
import { PHOTO_IDS, unsplashUrl } from '@/lib/constants';
import marketingData from '@/data/marketing.json';

const hero = marketingData.hero;

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12">
      {/* Background effects */}
      <div className="hero-gradient absolute inset-0" aria-hidden="true" />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="noise-overlay absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Animated floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-brand-500/10 blur-[100px] animate-float" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-neon-purple/10 blur-[120px] animate-float animation-delay-200" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-neon-cyan/8 blur-[80px] animate-float animation-delay-400" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-brand-200/60 bg-white/60 px-5 py-2 text-sm font-medium text-brand-700 shadow-sm backdrop-blur-sm dark:border-brand-800/40 dark:bg-brand-950/30 dark:text-brand-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            <Sparkles className="h-3.5 w-3.5" />
            Now with AI Decision Engine v2
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            <span className="text-gray-900 dark:text-white">Automate Any Workflow</span>
            <br />
            <span className="text-gray-900 dark:text-white">with </span>
            <span className="gradient-text">Intelligent AI</span>
            <span className="text-gray-900 dark:text-white"> Agents</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:mt-8 sm:text-lg md:text-xl leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:justify-center"
          >
            <Link href={hero.cta.href}>
              <Button size="lg" className="gap-2.5 min-w-[200px] text-base shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/30 transition-shadow">
                {hero.cta.text}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={hero.secondaryCta.href}>
              <Button variant="outline" size="lg" className="gap-2.5 min-w-[200px] text-base border-gray-300 dark:border-gray-600">
                <Play className="h-4 w-4" />
                {hero.secondaryCta.text}
              </Button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={fadeUp}
            className="relative mt-16 mx-auto max-w-5xl sm:mt-20"
          >
            <div className="gradient-border rounded-2xl">
              <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-1.5 shadow-2xl shadow-brand-600/10 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/70 sm:p-2">
                <Image
                  src={unsplashUrl(PHOTO_IDS.dashboard, 1200, 675)}
                  alt="NeuraFlow dashboard preview"
                  width={1200}
                  height={675}
                  className="rounded-xl"
                  priority
                />
              </div>
            </div>
            {/* Multi-layer glow effect */}
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-brand-500/20 via-neon-purple/15 to-neon-cyan/20 blur-3xl" aria-hidden="true" />
            <div className="absolute -inset-12 -z-20 rounded-3xl bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-purple/10 blur-[60px]" aria-hidden="true" />
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:mt-20 sm:gap-8 md:grid-cols-4"
          >
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-gray-200/60 bg-white/60 px-4 py-5 text-center backdrop-blur-sm transition-all hover:border-brand-200/60 hover:shadow-md dark:border-gray-800/60 dark:bg-white/[0.03] dark:hover:border-brand-800/40 sm:px-6 sm:py-6"
              >
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl gradient-text">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
