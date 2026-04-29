import { useQuery } from '@tanstack/react-query'
import { searchApi, type SearchParams } from '@/lib/api/search'
import { toFrontendAssets } from '@/lib/api/assetAdapter'
import type { Asset } from '@/types'

/**
 * Hook to search assets with filters.
 * 
 * @example
 * ```tsx
 * // Basic search
 * const { data, isLoading } = useSearch({ q: 'sunset' })
 * 
 * // With filters
 * const { data } = useSearch({ 
 *   q: 'beach',
 *   orientation: 'landscape',
 *   isFree: true,
 *   sort: 'downloads:desc'
 * })
 * ```
 */
export function useSearch(params: SearchParams) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: async () => {
      const response = await searchApi.search(params)
      return {
        ...response,
        hits: toFrontendAssets(response.hits),
      }
    },
    enabled: !!params.q || Object.keys(params).length > 1, // Enable if query exists or filters applied
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to get autocomplete suggestions.
 * 
 * @example
 * ```tsx
 * const { data: suggestions } = useAutocomplete('lag', 10)
 * ```
 */
export function useAutocomplete(query: string, limit: number = 10) {
  return useQuery({
    queryKey: ['autocomplete', query, limit],
    queryFn: async () => {
      const response = await searchApi.autocomplete(query, limit)
      return response.suggestions
    },
    enabled: query.length >= 2, // Only search when at least 2 characters
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
