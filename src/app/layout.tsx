import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Syne } from 'next/font/google';
import { Providers } from '@/providers';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { DemoBanner } from '@/components/layout/DemoBanner';
import siteData from '@/data/site.json';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteData.seo.title,
    template: `%s | ${siteData.brandName}`,
  },
  description: siteData.seo.description,
  metadataBase: new URL(siteData.seo.url),
  openGraph: {
    title: siteData.seo.title,
    description: siteData.seo.description,
    url: siteData.seo.url,
    siteName: siteData.brandName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.seo.title,
    description: siteData.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <body
        className="antialiased bg-white text-gray-900 dark:bg-surface-dark dark:text-gray-100"
        style={{
          fontFamily: 'var(--font-body), system-ui, -apple-system, sans-serif',
        }}
      >
        <Providers>
          <DemoBanner />
          <CommandPalette />
          {children}
        </Providers>
      </body>
    </html>
  );
}
