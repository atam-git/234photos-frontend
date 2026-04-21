import { Asset } from '@/components/features/search/AssetCard'
import { MOCK_ASSETS } from './searchAssets'

export interface AssetDetail extends Asset {
  title: string
  description: string
  tags: string[]
  category: string
  dimensions: string
  fileSize: string
  fileType: string
  dateAdded: string
  contributor: string
  contributorCountry: string
  contributorAssets: number
  contributorDownloads: string
}

export const MOCK_ASSET_DETAILS: Record<string, AssetDetail> = {
  '1': {
    id: '1',
    src: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&q=90',
    alt: 'African businesswoman in modern Lagos office',
    title: 'African Businesswoman — Lagos Office',
    description: 'Professional African businesswoman working in a modern Lagos office environment. Ideal for fintech, corporate, and business campaigns targeting African markets.',
    tags: ['business', 'nigeria', 'lagos', 'woman', 'corporate', 'fintech', 'professional', 'office', 'africa', 'entrepreneur'],
    category: 'Business',
    dimensions: '5760 × 3840px',
    fileSize: '8.4 MB',
    fileType: 'JPEG',
    dateAdded: 'March 12, 2026',
    resolution: '4K',
    contributor: 'Amara Osei',
    contributorCountry: '🇳🇬 Nigeria',
    contributorAssets: 1240,
    contributorDownloads: '48K',
    isFree: false,
  },
}

export function getAssetDetail(id: string): AssetDetail {
  return (
    MOCK_ASSET_DETAILS[id] ?? {
      ...MOCK_ASSETS.find((a) => a.id === id) ?? MOCK_ASSETS[0],
      title: MOCK_ASSETS.find((a) => a.id === id)?.alt ?? 'African Stock Photo',
      description: 'High-quality authentic African stock photography for creators and brands worldwide.',
      tags: ['africa', 'photography', 'stock', 'authentic', 'creative'],
      category: 'Photography',
      dimensions: '3840 × 2560px',
      fileSize: '5.2 MB',
      fileType: 'JPEG',
      dateAdded: 'April 1, 2026',
      contributorCountry: '🌍 Africa',
      contributorAssets: 320,
      contributorDownloads: '12K',
    }
  )
}

export function getSimilarAssets(currentId: string): Asset[] {
  return MOCK_ASSETS.filter((a) => a.id !== currentId).slice(0, 10)
}

export function getContributorAssets(contributor: string, currentId: string): Asset[] {
  return MOCK_ASSETS.filter((a) => a.id !== currentId).slice(0, 8)
}
