/**
 * Mock data for boards/collections management
 */

export const MOCK_BOARDS = [
  { 
    id: '1', 
    name: 'Campaign Q3 2024', 
    description: 'Assets for our Q3 marketing campaign across all channels', 
    count: 24,
    assetCount: 24,
    type: 'shared' as const, 
    collaborators: 3, 
    shareLink: 'https://234photos.com/boards/shared/abc123',
    updatedAt: '2026-04-20T15:30:00Z',
    thumbnails: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
      'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=400&q=80',
    ]
  },
  { 
    id: '2', 
    name: 'Brand Assets', 
    description: 'Official brand photography and graphics', 
    count: 12,
    assetCount: 12,
    type: 'private' as const,
    updatedAt: '2026-04-18T12:00:00Z',
    thumbnails: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&q=80',
    ]
  },
  { 
    id: '3', 
    name: 'Inspiration', 
    count: 47,
    assetCount: 47,
    type: 'private' as const,
    updatedAt: '2026-04-15T09:20:00Z',
    thumbnails: [
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80',
    ]
  },
  { 
    id: '4', 
    name: 'Team Collection', 
    description: 'Shared team resources and references', 
    count: 8,
    assetCount: 8,
    type: 'team' as const, 
    collaborators: 5, 
    shareLink: 'https://234photos.com/boards/shared/xyz789',
    updatedAt: '2026-04-22T11:45:00Z',
    thumbnails: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80',
    ]
  },
]

// Notification types for preferences page
export const NOTIFICATION_TYPES = [
  { key: 'downloads' as const, label: 'Downloads', desc: 'When someone downloads your assets' },
  { key: 'likes' as const, label: 'Likes', desc: 'When someone likes your assets' },
  { key: 'comments' as const, label: 'Comments', desc: 'When someone comments on your assets' },
  { key: 'follows' as const, label: 'Follows', desc: 'When someone follows you' },
  { key: 'earnings' as const, label: 'Earnings', desc: 'Earning updates and payout notifications' },
  { key: 'system' as const, label: 'System', desc: 'Important updates and announcements' },
]

// Collection metadata for marketing collection pages
export const COLLECTION_META: Record<string, { title: string; desc: string; cover: string }> = {
  'african-entrepreneurs': { 
    title: 'African Entrepreneurs', 
    desc: 'Business leaders, founders and innovators across the continent.', 
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80' 
  },
  'pan-african-festivals': { 
    title: 'Pan-African Festivals', 
    desc: 'Celebrations, carnivals and cultural events from Lagos to Cape Town.', 
    cover: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1400&q=80' 
  },
  'modern-african-cities': { 
    title: 'Modern African Cities', 
    desc: 'Skylines, streets and architecture of Africa\'s fastest-growing cities.', 
    cover: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1400&q=80' 
  },
  'african-street-style': { 
    title: 'African Street Style', 
    desc: 'Fashion-forward looks from Accra, Nairobi, Lagos and beyond.', 
    cover: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1400&q=80' 
  },
  'heritage-culture': { 
    title: 'Heritage & Culture', 
    desc: 'Traditional ceremonies, art, crafts and cultural heritage across Africa.', 
    cover: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=1400&q=80' 
  },
}
