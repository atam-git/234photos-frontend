import { useQuery } from '@tanstack/react-query'
import { getUserBadges } from '@/lib/api/badges'

/**
 * Hook to fetch user's badges with progress
 */
export function useBadges() {
  return useQuery({
    queryKey: ['badges'],
    queryFn: getUserBadges,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
