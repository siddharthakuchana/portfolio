import { MetadataRoute } from 'next'
import { portfolioData } from '@/data/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable for URL if available, otherwise use a placeholder
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
