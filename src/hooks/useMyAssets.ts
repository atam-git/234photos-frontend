import { useQuery } from '@tanstack/react-query'
import { myAssetsApi } from '@/lib/api/my-assets'

/**
 * Hook to fetch contributor's assets with stats
 */
export function useMyAssets(page: number = 1, limit: number = 50, status?: 'APPROVED' | 'PENDING' | 'REJECTED' | 'DRAFT') {
  return useQuery({
    queryKey: ['my-assets', page, limit, status],
    queryFn: () => myAssetsApi.getMyAssets(page, limit, status),
    staleTime: 2 * 60 * 1000, // 2 minutes
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
  })
}
