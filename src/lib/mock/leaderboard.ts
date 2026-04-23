import { ContributorLeaderboard, LeaderboardEntry } from '@/types'

/**
 * Comprehensive mock leaderboard data
 * Leaderboard ranks contributors by performance (earnings, downloads, etc.)
 */

// ---------------------------------------------------------------------------
// Leaderboard Data for Modal (simplified format)
// ---------------------------------------------------------------------------

export const LEADERBOARD_DATA = {
  week: [
    { rank: 1, name: 'Chioma Okafor', country: '🇳🇬', earnings: 2840, downloads: 342, change: 0 },
    { rank: 2, name: 'Kwame Mensah', country: '🇬🇭', earnings: 2650, downloads: 318, change: 2 },
    { rank: 3, name: 'Amara Nwosu', country: '🇳🇬', earnings: 2420, downloads: 291, change: -1 },
    { rank: 4, name: 'Fatima Hassan', country: '🇳🇬', earnings: 2180, downloads: 262, change: 1 },
    { rank: 5, name: 'Kofi Asante', country: '🇬🇭', earnings: 1950, downloads: 234, change: -2 },
  ],
  month: [
    { rank: 1, name: 'Chioma Okafor', country: '🇳🇬', earnings: 12400, downloads: 1489, change: 0 },
    { rank: 2, name: 'Amara Nwosu', country: '🇳🇬', earnings: 11200, downloads: 1344, change: 1 },
    { rank: 3, name: 'Kwame Mensah', country: '🇬🇭', earnings: 10800, downloads: 1296, change: -1 },
    { rank: 4, name: 'Fatima Hassan', country: '🇳🇬', earnings: 9600, downloads: 1152, change: 0 },
    { rank: 5, name: 'Kofi Asante', country: '🇬🇭', earnings: 8900, downloads: 1068, change: 2 },
  ],
  allTime: [
    { rank: 1, name: 'Chioma Okafor', country: '🇳🇬', earnings: 145000, downloads: 17400, change: 0 },
    { rank: 2, name: 'Amara Nwosu', country: '🇳🇬', earnings: 132000, downloads: 15840, change: 0 },
    { rank: 3, name: 'Kwame Mensah', country: '🇬🇭', earnings: 128000, downloads: 15360, change: 0 },
    { rank: 4, name: 'Fatima Hassan', country: '🇳🇬', earnings: 118000, downloads: 14160, change: 1 },
    { rank: 5, name: 'Kofi Asante', country: '🇬🇭', earnings: 112000, downloads: 13440, change: -1 },
  ]
}

// ---------------------------------------------------------------------------
// Leaderboard Entries
// ---------------------------------------------------------------------------

const MOCK_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    contributorId: 'usr_100',
    contributor: {
      id: 'usr_100',
      name: 'Amara Osei',
      username: 'amara-osei',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
      country: 'Nigeria',
      countryFlag: '🇳🇬',
    },
    score: 12400,
    earnings: 12400,
    downloads: 48000,
    uploads: 1240,
    rankChange: 0, // No change
    badge: '🏆 Top Contributor',
  },
  {
    rank: 2,
    contributorId: 'usr_103',
    contributor: {
      id: 'usr_103',
      name: 'Kwame Asante',
      username: 'kwame-asante',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      country: 'Ghana',
      countryFlag: '🇬🇭',
    },
    score: 11000,
    earnings: 11000,
    downloads: 41000,
    uploads: 1100,
    rankChange: 1, // Moved up 1
    badge: '🔥 Rising Star',
  },
  {
    rank: 3,
    contributorId: 'usr_101',
    contributor: {
      id: 'usr_101',
      name: 'Chidi Nwosu',
      username: 'chidi-nwosu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      country: 'Nigeria',
      countryFlag: '🇳🇬',
    },
    score: 8900,
    earnings: 8900,
    downloads: 32000,
    uploads: 890,
    rankChange: -1, // Moved down 1
  },
  {
    rank: 4,
    contributorId: 'usr_107',
    contributor: {
      id: 'usr_107',
      name: 'Kofi Mensah',
      username: 'kofi-mensah',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      country: 'Ghana',
      countryFlag: '🇬🇭',
    },
    score: 4700,
    earnings: 4700,
    downloads: 15000,
    uploads: 470,
    rankChange: 2, // Moved up 2
    badge: '🔥 Rising Star',
  },
  {
    rank: 5,
    contributorId: 'usr_102',
    contributor: {
      id: 'usr_102',
      name: 'Fatima Diallo',
      username: 'fatima-diallo',
      avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
      country: 'Senegal',
      countryFlag: '🇸🇳',
    },
    score: 6400,
    earnings: 6400,
    downloads: 21000,
    uploads: 640,
    rankChange: -1, // Moved down 1
  },
  {
    rank: 6,
    contributorId: 'usr_104',
    contributor: {
      id: 'usr_104',
      name: 'Tunde Bakare',
      username: 'tunde-bakare',
      avatar: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&q=80',
      country: 'Nigeria',
      countryFlag: '🇳🇬',
    },
    score: 5600,
    earnings: 5600,
    downloads: 19000,
    uploads: 560,
    rankChange: 0,
  },
  {
    rank: 7,
    contributorId: 'usr_106',
    contributor: {
      id: 'usr_106',
      name: 'Nkechi Obi',
      username: 'nkechi-obi',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
      country: 'Nigeria',
      countryFlag: '🇳🇬',
    },
    score: 5200,
    earnings: 5200,
    downloads: 17000,
    uploads: 520,
    rankChange: 1, // Moved up 1
  },
  {
    rank: 8,
    contributorId: 'usr_105',
    contributor: {
      id: 'usr_105',
      name: 'Ngozi Adeyemi',
      username: 'ngozi-adeyemi',
      avatar: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=200&q=80',
      country: 'Nigeria',
      countryFlag: '🇳🇬',
    },
    score: 3800,
    earnings: 3800,
    downloads: 11000,
    uploads: 380,
    rankChange: -2, // Moved down 2
  },
  {
    rank: 9,
    contributorId: 'usr_002',
    contributor: {
      id: 'usr_002',
      name: 'Adaeze Okafor',
      username: 'adaeze-okafor',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
      country: 'Nigeria',
      countryFlag: '🇳🇬',
    },
    score: 6800,
    earnings: 6800,
    downloads: 24000,
    uploads: 680,
    rankChange: 3, // Moved up 3
    badge: '🔥 Rising Star',
  },
  {
    rank: 10,
    contributorId: 'usr_108',
    contributor: {
      id: 'usr_108',
      name: 'Emeka Eze',
      username: 'emeka-eze',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      country: 'Nigeria',
      countryFlag: '🇳🇬',
    },
    score: 4100,
    earnings: 4100,
    downloads: 13000,
    uploads: 410,
    rankChange: -1, // Moved down 1
  },
]

// ---------------------------------------------------------------------------
// Leaderboards by Period
// ---------------------------------------------------------------------------

export const MOCK_LEADERBOARD_ALL_TIME: ContributorLeaderboard = {
  period: 'all',
  region: 'Global',
  entries: MOCK_LEADERBOARD_ENTRIES,
  userRank: MOCK_LEADERBOARD_ENTRIES[8], // Adaeze Okafor at rank 9
}

export const MOCK_LEADERBOARD_MONTH: ContributorLeaderboard = {
  period: 'month',
  region: 'Global',
  entries: MOCK_LEADERBOARD_ENTRIES.map(entry => ({
    ...entry,
    score: Math.floor(entry.score * 0.15), // ~15% of all-time for this month
    earnings: Math.floor((entry.earnings || 0) * 0.15),
    downloads: Math.floor((entry.downloads || 0) * 0.15),
  })),
  userRank: {
    ...MOCK_LEADERBOARD_ENTRIES[8],
    score: Math.floor(MOCK_LEADERBOARD_ENTRIES[8].score * 0.15),
    earnings: Math.floor((MOCK_LEADERBOARD_ENTRIES[8].earnings || 0) * 0.15),
    downloads: Math.floor((MOCK_LEADERBOARD_ENTRIES[8].downloads || 0) * 0.15),
  },
}

export const MOCK_LEADERBOARD_WEEK: ContributorLeaderboard = {
  period: 'week',
  region: 'Global',
  entries: MOCK_LEADERBOARD_ENTRIES.map(entry => ({
    ...entry,
    score: Math.floor(entry.score * 0.04), // ~4% of all-time for this week
    earnings: Math.floor((entry.earnings || 0) * 0.04),
    downloads: Math.floor((entry.downloads || 0) * 0.04),
  })),
  userRank: {
    ...MOCK_LEADERBOARD_ENTRIES[8],
    score: Math.floor(MOCK_LEADERBOARD_ENTRIES[8].score * 0.04),
    earnings: Math.floor((MOCK_LEADERBOARD_ENTRIES[8].earnings || 0) * 0.04),
    downloads: Math.floor((MOCK_LEADERBOARD_ENTRIES[8].downloads || 0) * 0.04),
  },
}

export const MOCK_LEADERBOARD_NIGERIA: ContributorLeaderboard = {
  period: 'all',
  region: 'Nigeria',
  entries: MOCK_LEADERBOARD_ENTRIES.filter(e => e.contributor.country === 'Nigeria'),
  userRank: MOCK_LEADERBOARD_ENTRIES.filter(e => e.contributor.country === 'Nigeria')[5], // Adaeze in Nigeria leaderboard
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getLeaderboard(
  period: 'day' | 'week' | 'month' | 'all' = 'all',
  region?: string,
  category?: string
): ContributorLeaderboard {
  // In a real app, this would fetch from API based on filters
  if (region === 'Nigeria') {
    return MOCK_LEADERBOARD_NIGERIA
  }
  
  switch (period) {
    case 'week':
      return MOCK_LEADERBOARD_WEEK
    case 'month':
      return MOCK_LEADERBOARD_MONTH
    case 'all':
    default:
      return MOCK_LEADERBOARD_ALL_TIME
  }
}

export function getUserRank(contributorId: string, period: 'day' | 'week' | 'month' | 'all' = 'all'): LeaderboardEntry | undefined {
  const leaderboard = getLeaderboard(period)
  return leaderboard.entries.find(e => e.contributorId === contributorId)
}

export function getTopContributors(limit: number = 10, period: 'day' | 'week' | 'month' | 'all' = 'all'): LeaderboardEntry[] {
  const leaderboard = getLeaderboard(period)
  return leaderboard.entries.slice(0, limit)
}
