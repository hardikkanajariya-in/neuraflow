import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-brand-600 dark:text-brand-400 font-display">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white font-display">
          Page not found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-brand-700 active:bg-brand-800 hover:shadow-md min-h-[44px]"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
