import { type MetadataRoute } from 'next';
import docsData from '@/data/docs.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://neuraflow.io';

  const staticPages = [
    '', '/pricing', '/docs', '/changelog', '/about', '/contact', '/privacy', '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const docPages = docsData.pages.map((page) => ({
    url: `${baseUrl}/docs/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...docPages];
}
