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
    { rank: 1, name: 'Chioma Okafor', country: '🇳🇬', earnings: 4544000, downloads: 342, change: 0 },
    { rank: 2, name: 'Kwame Mensah', country: '🇬🇭', earnings: 4240000, downloads: 318, change: 2 },
    { rank: 3, name: 'Amara Nwosu', country: '🇳🇬', earnings: 3872000, downloads: 291, change: -1 },
    { rank: 4, name: 'Fatima Hassan', country: '🇳🇬', earnings: 3488000, downloads: 262, change: 1 },
    { rank: 5, name: 'Kofi Asante', country: '🇬🇭', earnings: 3120000, downloads: 234, change: -2 },
  ],
  month: [
    { rank: 1, name: 'Chioma Okafor', country: '🇳🇬', earnings: 19840000, downloads: 1489, change: 0 },
    { rank: 2, name: 'Amara Nwosu', country: '🇳🇬', earnings: 17920000, downloads: 1344, change: 1 },
    { rank: 3, name: 'Kwame Mensah', country: '🇬🇭', earnings: 17280000, downloads: 1296, change: -1 },
    { rank: 4, name: 'Fatima Hassan', country: '🇳🇬', earnings: 15360000, downloads: 1152, change: 0 },
    { rank: 5, name: 'Kofi Asante', country: '🇬🇭', earnings: 14240000, downloads: 1068, change: 2 },
  ],
  allTime: [
    { rank: 1, name: 'Chioma Okafor', country: '🇳🇬', earnings: 232000000, downloads: 17400, change: 0 },
    { rank: 2, name: 'Amara Nwosu', country: '🇳🇬', earnings: 211200000, downloads: 15840, change: 0 },
    { rank: 3, name: 'Kwame Mensah', country: '🇬🇭', earnings: 204800000, downloads: 15360, change: 0 },
    { rank: 4, name: 'Fatima Hassan', country: '🇳🇬', earnings: 188800000, downloads: 14160, change: 1 },
    { rank: 5, name: 'Kofi Asante', country: '🇬🇭', earnings: 179200000, downloads: 13440, change: -1 },
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
    score: 19840000,
    earnings: 19840000,
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
    score: 17600000,
    earnings: 17600000,
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
    score: 14240000,
    earnings: 14240000,
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
    score: 7520000,
    earnings: 7520000,
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
    score: 10240000,
    earnings: 10240000,
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
    score: 8960000,
    earnings: 8960000,
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
    score: 8320000,
    earnings: 8320000,
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
    score: 6080000,
    earnings: 6080000,
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
    score: 10880000,
    earnings: 10880000,
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
    score: 6560000,
    earnings: 6560000,
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
