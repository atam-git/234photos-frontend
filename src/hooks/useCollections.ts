import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/client'
import type { Collection } from '@/types'

/**
 * Hook to fetch a user's public collections by username.
 * 
 * @example
 * ```tsx
 * const { data: collections, isLoading } = useUserCollections('john-doe')
 * ```
 */
export function useUserCollections(username: string) {
  return useQuery<Collection[], Error>({
    queryKey: ['users', username, 'collections'],
    queryFn: async () => {
      return api.get<Collection[]>(`/users/${username}/collections`)
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
