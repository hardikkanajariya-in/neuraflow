import type { Metadata } from 'next';
import legalData from '@/data/legal.json';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the NeuraFlow platform.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white font-display">Terms of Service</h1>
        <p className="mb-10 text-sm text-gray-400">Last updated: March 1, 2026</p>

        <div className="space-y-8">
          {legalData.terms.sections.map((section, i) => (
            <div key={i}>
              <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white font-display">{section.title}</h2>
              <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-sm">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
