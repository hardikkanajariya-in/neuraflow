import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import docsData from '@/data/docs.json';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Learn how to build, deploy, and scale intelligent automation workflows with NeuraFlow.',
};

export default function DocsPage() {
  const categories = [...new Set(docsData.pages.map((p) => p.category))];

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-display">Documentation</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about building with NeuraFlow.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => {
            const pages = docsData.pages.filter((p) => p.category === category);
            return (
              <div key={category}>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {category}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/docs/${page.slug}`}
                      className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors font-display">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {page.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                        Read more <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
