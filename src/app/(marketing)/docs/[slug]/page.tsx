import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import docsData from '@/data/docs.json';
import { unsplashUrl, PHOTO_IDS } from '@/lib/constants';
import { notFound } from 'next/navigation';

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return docsData.pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = docsData.pages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

function CalloutIcon({ type }: { type: string }) {
  switch (type) {
    case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'success': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    default: return <Info className="h-5 w-5 text-blue-500" />;
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const page = docsData.pages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/docs"
          className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Docs
        </Link>

        <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {page.category}
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl font-display">
          {page.title}
        </h1>
        <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">{page.description}</p>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {page.blocks.map((block, i) => {
            switch (block.type) {
              case 'heading':
                return (
                  <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-gray-900 dark:text-white font-display">
                    {block.text}
                  </h2>
                );
              case 'paragraph':
                return (
                  <p key={i} className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {block.text}
                  </p>
                );
              case 'code':
                return (
                  <pre key={i} className="mb-6 overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100 dark:bg-gray-800">
                    <code>{block.code}</code>
                  </pre>
                );
              case 'callout':
                return (
                  <div
                    key={i}
                    className="mb-6 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/50"
                  >
                    <CalloutIcon type={block.variant || 'info'} />
                    <p className="text-sm text-blue-800 dark:text-blue-300">{block.text}</p>
                  </div>
                );
              case 'image':
                return (
                  <div key={i} className="my-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                    <Image
                      src={unsplashUrl(block.photoId || PHOTO_IDS.blogDocs, 800, 450)}
                      alt={block.alt || ''}
                      width={800}
                      height={450}
                      className="w-full object-cover"
                    />
                  </div>
                );
              case 'list':
                return (
                  <ul key={i} className="mb-6 space-y-2 pl-6">
                    {(block.items || []).map((item, j) => (
                      <li key={j} className="text-gray-600 dark:text-gray-400 list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
