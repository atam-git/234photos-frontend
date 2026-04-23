/**
 * Mock data for My Assets pages (contributor dashboard)
 */
import { MOCK_ASSETS } from './searchAssets'

// Augmented assets with contributor-specific data (status, stats, etc.)
export const MY_ASSETS_WITH_STATS = MOCK_ASSETS.map((asset, i) => ({
  ...asset,
  status: (i % 5 === 0 ? 'pending' : i % 7 === 0 ? 'rejected' : 'live') as 'live' | 'pending' | 'rejected',
  uploadedAt: ['Apr 18, 2026', 'Apr 15, 2026', 'Apr 10, 2026', 'Mar 28, 2026'][i % 4],
  downloads: Math.floor(Math.random() * 300),
  views: Math.floor(Math.random() * 3000 + 500),
  earnings: (Math.random() * 150).toFixed(0),
  rejectionReason: i % 7 === 0 ? [
    'Image quality does not meet our standards. Please ensure images are sharp, well-lit, and properly exposed.',
    'Subject matter is too similar to existing content. We look for unique perspectives and compositions.',
    'Technical issues detected: visible noise/grain in the image. Please resubmit with better quality.',
    'Insufficient model release documentation. Commercial use requires proper model releases for recognizable people.',
  ][Math.floor(i / 7) % 4] : undefined,
}))

// Mock collection with augmented assets for collection detail page
export const MOCK_COLLECTION_DETAIL = {
  id: '1',
  name: 'Lagos Street Photography',
  description: 'Authentic street scenes capturing the vibrant energy of Lagos, Nigeria.',
  assetCount: 24,
  isPublic: true,
  createdAt: 'Mar 15, 2026',
  assets: MOCK_ASSETS.slice(0, 12).map((asset, i) => ({
    ...asset,
    status: 'live' as const,
    uploadedAt: ['Apr 18, 2026', 'Apr 15, 2026', 'Apr 10, 2026', 'Mar 28, 2026'][i % 4],
    downloads: Math.floor(Math.random() * 300),
    views: Math.floor(Math.random() * 3000 + 500),
    earnings: (Math.random() * 150).toFixed(0),
  })),
}

// Downloads with license information
export const MY_DOWNLOADS = MOCK_ASSETS.slice(0, 10).map((asset, i) => ({
  ...asset,
  licensedOn: ['Apr 18, 2026', 'Apr 15, 2026', 'Apr 10, 2026', 'Mar 28, 2026', 'Mar 20, 2026',
    'Mar 15, 2026', 'Mar 8, 2026', 'Feb 22, 2026', 'Feb 14, 2026', 'Feb 1, 2026'][i],
  license: (i % 3 === 0 ? 'enhanced' : 'standard') as 'enhanced' | 'standard',
  format: 'JPG',
  size: `${(Math.random() * 8 + 2).toFixed(1)} MB`,
  expiresAt: new Date(Date.now() + (30 - i * 2) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  licenseUrl: `https://234photos.com/licenses/${asset.id}`,
}))

// Liked assets (simple slice)
export const MY_LIKED_ASSETS = MOCK_ASSETS.slice(0, 8)

// Profile collections for public profile pages
export const PROFILE_COLLECTIONS = [
  {
    id: '1',
    name: 'Lagos Street Photography',
    assetCount: 24,
    thumbnails: [
      MOCK_ASSETS[0]?.src, 
      MOCK_ASSETS[1]?.src, 
      MOCK_ASSETS[2]?.src, 
      MOCK_ASSETS[3]?.src
    ].filter(Boolean) as string[],
  },
  {
    id: '2',
    name: 'Best of 2026',
    assetCount: 18,
    thumbnails: [
      MOCK_ASSETS[4]?.src, 
      MOCK_ASSETS[5]?.src, 
      MOCK_ASSETS[6]?.src, 
      MOCK_ASSETS[7]?.src
    ].filter(Boolean) as string[],
  },
  {
    id: '3',
    name: 'Nigerian Business',
    assetCount: 32,
    thumbnails: [
      MOCK_ASSETS[8]?.src, 
      MOCK_ASSETS[9]?.src, 
      MOCK_ASSETS[0]?.src, 
      MOCK_ASSETS[1]?.src
    ].filter(Boolean) as string[],
  },
]
