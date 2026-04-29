import { useQuery } from '@tanstack/react-query'
import { assetsApi, toFrontendAssets, type AssetFilters } from '@/lib/api'
import type { Asset } from '@/types'

/**
 * Hook to fetch paginated assets with optional filters.
 * 
 * @example
 * ```tsx
 * // Get all assets
 * const { data, isLoading } = useAssets()
 * 
 * // Filter by category
 * const { data } = useAssets({ category: 'nature' })
 * 
 * // Filter by contributor
 * const { data } = useAssets({ contributorId: 'user-123' })
 * 
 * // Pagination
 * const { data } = useAssets({ page: 2, limit: 20 })
 * ```
 */
export function useAssets(filters: AssetFilters = {}) {
  return useQuery({
    queryKey: ['assets', filters],
    queryFn: async () => {
      const response = await assetsApi.list(filters)
      return {
        data: toFrontendAssets(response.data),
        meta: response.meta,
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to fetch a single asset by ID.
 * 
 * @example
 * ```tsx
 * const { data: asset, isLoading } = useAsset('asset-123')
 * ```
 */
export function useAsset(id: string) {
  return useQuery({
    queryKey: ['assets', id],
    queryFn: async () => {
      const backendAsset = await assetsApi.getById(id)
      return toFrontendAssets([backendAsset])[0]
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook to fetch similar assets.
 * 
 * @example
 * ```tsx
 * const { data: similarAssets } = useSimilarAssets('asset-123', 12)
 * ```
 */
export function useSimilarAssets(id: string, limit: number = 12) {
  return useQuery({
    queryKey: ['assets', id, 'similar', limit],
    queryFn: async () => {
      const backendAssets = await assetsApi.getSimilar(id, limit)
      return toFrontendAssets(backendAssets)
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
