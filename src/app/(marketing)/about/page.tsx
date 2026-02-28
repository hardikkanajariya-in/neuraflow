import type { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles, Users, Globe, Award } from 'lucide-react';
import { unsplashUrl, PHOTO_IDS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the team behind NeuraFlow and our mission to democratize AI workflow automation.',
};

const values = [
  { icon: Sparkles, title: 'Innovation First', description: 'We push the boundaries of what\'s possible with AI automation, never settling for good enough.' },
  { icon: Users, title: 'Customer Obsessed', description: 'Every feature we build starts with understanding our users\' real-world challenges and workflows.' },
  { icon: Globe, title: 'Global by Default', description: 'Built for teams everywhere — multi-region deployment, locale support, and global edge infrastructure.' },
  { icon: Award, title: 'Quality & Reliability', description: '99.9% uptime isn\'t a marketing promise, it\'s our engineering standard. Every line of code is tested.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl font-display">
            Building the future of
            <span className="gradient-text"> workflow automation</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            NeuraFlow was founded on a simple belief: AI should make work easier, not more complicated. We&apos;re building the tools that help teams automate intelligently.
          </p>
        </div>

        {/* Office image */}
        <div className="mb-20 overflow-hidden rounded-3xl">
          <Image
            src={unsplashUrl(PHOTO_IDS.office, 1200, 500)}
            alt="NeuraFlow office"
            width={1200}
            height={500}
            className="w-full object-cover"
          />
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-12 font-display">Our Values</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white font-display">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-neon-purple p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-8 font-display">NeuraFlow by the Numbers</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <p className="text-4xl font-bold font-display">50K+</p>
              <p className="mt-1 text-sm text-white/70">Active workflows</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-display">2.5M+</p>
              <p className="mt-1 text-sm text-white/70">Daily tasks</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-display">150+</p>
              <p className="mt-1 text-sm text-white/70">Countries</p>
            </div>
            <div>
              <p className="text-4xl font-bold font-display">99.9%</p>
              <p className="mt-1 text-sm text-white/70">Uptime</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mt-20 text-center" id="careers">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-display">Join Our Team</h2>
          <p className="mx-auto max-w-xl text-gray-600 dark:text-gray-400 mb-8">
            We&apos;re always looking for talented people who are passionate about AI and automation. Check out our open positions.
          </p>
          <div className="rounded-2xl border border-gray-200 bg-white p-12 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">No open positions at this time. Check back soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
