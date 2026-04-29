import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { likesApi, toFrontendAssets } from '@/lib/api'

/**
 * Hook to fetch user's liked assets with pagination.
 * 
 * @example
 * ```tsx
 * const { data, isLoading } = useLikedAssets(1, 50)
 * ```
 */
export function useLikedAssets(page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ['likes', page, limit],
    queryFn: async () => {
      const response = await likesApi.getLikedAssets(page, limit)
      return {
        data: toFrontendAssets(response.data),
        meta: response.meta,
      }
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

/**
 * Hook to like an asset.
 * 
 * @example
 * ```tsx
 * const { mutate: like } = useLikeAsset()
 * like(assetId)
 * ```
 */
export function useLikeAsset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (assetId: string) => likesApi.likeAsset(assetId),
    onSuccess: () => {
      // Invalidate likes queries to refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })
}

/**
 * Hook to unlike an asset.
 * 
 * @example
 * ```tsx
 * const { mutate: unlike } = useUnlikeAsset()
 * unlike(assetId)
 * ```
 */
export function useUnlikeAsset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (assetId: string) => likesApi.unlikeAsset(assetId),
    onSuccess: () => {
      // Invalidate likes queries to refetch
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
  })
}

/**
 * Hook to check if an asset is liked.
 * 
 * @example
 * ```tsx
 * const { data: isLiked } = useIsLiked(assetId)
 * ```
 */
export function useIsLiked(assetId: string) {
  return useQuery({
    queryKey: ['likes', 'check', assetId],
    queryFn: async () => {
      const response = await likesApi.checkLiked(assetId)
      return response.liked
    },
    enabled: !!assetId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
