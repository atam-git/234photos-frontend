import type { Collection } from '@/types'
import { MOCK_ASSETS } from './searchAssets'

export const MOCK_COLLECTIONS: Collection[] = [
  { 
    id: '1', 
    name: 'Lagos Street Photography', 
    description: 'Vibrant street scenes from Lagos, Nigeria',
    slug: 'lagos-street-photography',
    contributorId: 'contributor-1',
    assetIds: MOCK_ASSETS.slice(0, 24).map(a => a.id),
    thumbnails: [MOCK_ASSETS[0].src, MOCK_ASSETS[1].src, MOCK_ASSETS[2].src, MOCK_ASSETS[3].src], 
    assetCount: 24, 
    isPublic: true, 
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-04-20T15:30:00Z'
  },
  { 
    id: '2', 
    name: 'Best of 2026', 
    description: 'My top performing images from 2026',
    slug: 'best-of-2026',
    contributorId: 'contributor-1',
    assetIds: MOCK_ASSETS.slice(4, 22).map(a => a.id),
    thumbnails: [MOCK_ASSETS[4].src, MOCK_ASSETS[5].src, MOCK_ASSETS[6].src, MOCK_ASSETS[7].src], 
    assetCount: 18, 
    isPublic: true, 
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-04-18T12:00:00Z'
  },
  { 
    id: '3', 
    name: 'Work in Progress', 
    description: 'Experimental and upcoming work',
    slug: 'work-in-progress',
    contributorId: 'contributor-1',
    assetIds: MOCK_ASSETS.slice(0, 7).map(a => a.id),
    thumbnails: [MOCK_ASSETS[0]?.src, MOCK_ASSETS[1]?.src, MOCK_ASSETS[2]?.src, MOCK_ASSETS[3]?.src].filter(Boolean) as string[], 
    assetCount: 7, 
    isPublic: false, 
    createdAt: '2026-04-20T14:00:00Z',
    updatedAt: '2026-04-22T09:30:00Z'
  },
]
