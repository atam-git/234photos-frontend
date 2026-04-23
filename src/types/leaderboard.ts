export interface ContributorLeaderboard {
  period: 'day' | 'week' | 'month' | 'all'
  region?: string
  category?: string
  entries: LeaderboardEntry[]
  userRank?: LeaderboardEntry
}

export interface LeaderboardEntry {
  rank: number
  contributorId: string
  contributor: {
    id: string
    name: string
    username: string
    avatar?: string
    country: string
    countryFlag: string
  }
  score: number
  earnings?: number
  downloads?: number
  uploads?: number
  rankChange: number
  badge?: string
}
