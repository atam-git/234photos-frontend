import type { Asset, AssetDetail } from '@/types'
import { MOCK_ASSETS } from './assets'

export const MOCK_ASSET_DETAILS: Record<string, Partial<AssetDetail>> = {
  'ast_001': {
    id: 'ast_001',
    src: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1200&q=90',
    alt: 'African businesswoman in modern Lagos office',
    title: 'African Businesswoman — Lagos Office',
    description: 'Professional African businesswoman working in a modern Lagos office environment. Ideal for fintech, corporate, and business campaigns targeting African markets.',
    tags: ['business', 'nigeria', 'lagos', 'woman', 'corporate', 'fintech', 'professional', 'office', 'africa', 'entrepreneur'],
    category: 'Business',
    dimensions: '5760 × 3840px',
    fileSize: '8.4 MB',
    fileType: 'image',
    mimeType: 'image/jpeg',
    dateAdded: 'March 12, 2026',
    resolution: '4K',
    aspectRatio: 1.5,
    contributor: 'Amara Osei',
    contributorCountry: '🇳🇬 Nigeria',
    contributorAssets: 1240,
    contributorDownloads: '48K',
    isFree: false,
    modelRelease: true,
    propertyRelease: false,
    colors: ['#2C3E50', '#E8DCC8', '#8B7355', '#F5F5F5', '#1A1A1A'],
  },
  'ast_video_001': {
    id: 'ast_video_001',
    src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=90',
    alt: 'Lagos city timelapse at sunset',
    title: 'Lagos City Timelapse — Sunset',
    description: 'Beautiful timelapse of Lagos cityscape during golden hour. Perfect for travel, tourism, and urban development content.',
    tags: ['lagos', 'nigeria', 'city', 'timelapse', 'sunset', 'urban', 'africa', 'skyline'],
    category: 'Urban',
    dimensions: '3840 × 2160px',
    fileSize: '124 MB',
    fileType: 'video',
    mimeType: 'video/mp4',
    dateAdded: 'April 10, 2026',
    resolution: '4K',
    aspectRatio: 1.78,
    duration: 45,
    fps: 30,
    contributor: 'Tunde Bakare',
    contributorCountry: '🇳🇬 Nigeria',
    contributorAssets: 560,
    contributorDownloads: '19K',
    isFree: false,
    modelRelease: false,
    propertyRelease: true,
    colors: ['#FF6B35', '#F7931E', '#4A90E2', '#2C3E50', '#FDB813'],
  },
}

export function getAssetDetail(id: string): Partial<AssetDetail> {
  return (
    MOCK_ASSET_DETAILS[id] ?? {
      ...MOCK_ASSETS.find((a) => a.id === id) ?? MOCK_ASSETS[0],
      title: MOCK_ASSETS.find((a) => a.id === id)?.title ?? 'African Stock Photo',
      description: 'High-quality authentic African stock photography for creators and brands worldwide.',
      tags: ['africa', 'photography', 'stock', 'authentic', 'creative'],
      category: 'Photography',
      dimensions: '3840 × 2560px',
      fileSize: '5.2 MB',
      fileType: 'image',
      mimeType: 'image/jpeg',
      dateAdded: 'April 1, 2026',
      aspectRatio: 1.5,
      contributorCountry: '🌍 Africa',
      contributorAssets: 320,
      contributorDownloads: '12K',
      modelRelease: Math.random() > 0.5,
      propertyRelease: Math.random() > 0.7,
      colors: ['#8B4513', '#D2691E', '#F4A460', '#2F4F4F', '#FAEBD7'],
    }
  )
}

export function getSimilarAssets(currentId: string): Asset[] {
  return MOCK_ASSETS.filter((a) => a.id !== currentId).slice(0, 10)
}

export function getContributorAssets(contributor: string, currentId: string): Asset[] {
  return MOCK_ASSETS.filter((a) => a.id !== currentId).slice(0, 8)
}
