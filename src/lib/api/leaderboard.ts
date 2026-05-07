import { api } from './client'

export interface LeaderboardEntry {
  rank: number
  name: string
  username: string
  avatar: string | null
  country: string
  earnings: number // in kobo
  downloads: number
  change: number
  isCurrentUser?: boolean
}

export interface LeaderboardResponse {
  period: 'week' | 'month' | 'allTime'
  entries: LeaderboardEntry[]
  currentUserRank?: number
  currentUserEntry?: LeaderboardEntry
}

/**
 * Get leaderboard for a specific period
 */
export async function getLeaderboard(
  period: 'week' | 'month' | 'allTime' = 'month',
  limit: number = 50
): Promise<LeaderboardResponse> {
  return api.get<LeaderboardResponse>('/leaderboard', {
    query: { period, limit },
  })
}
