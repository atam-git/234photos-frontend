import { useQuery } from '@tanstack/react-query'
import { getLeaderboard } from '@/lib/api/leaderboard'

/**
 * Hook to fetch leaderboard for a specific period
 */
export function useLeaderboard(period: 'week' | 'month' | 'allTime' = 'month', limit: number = 50) {
  return useQuery({
    queryKey: ['leaderboard', period, limit],
    queryFn: () => getLeaderboard(period, limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
