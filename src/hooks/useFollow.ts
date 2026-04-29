import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/client'

/**
 * Hook to check if current user is following a contributor
 */
export function useIsFollowing(username: string) {
  return useQuery<{ isFollowing: boolean }, Error>({
    queryKey: ['users', username, 'is-following'],
    queryFn: async () => {
      return api.get<{ isFollowing: boolean }>(`/users/${username}/is-following`)
    },
    enabled: !!username,
    staleTime: 30 * 1000, // 30 seconds
  })
}

/**
 * Hook to follow a contributor
 */
export function useFollowUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (username: string) => {
      return api.post<{ success: boolean; message: string; isFollowing: boolean }>(
        `/users/${username}/follow`,
        {}
      )
    },
    onSuccess: (_, username) => {
      // Invalidate the is-following query
      queryClient.invalidateQueries({ queryKey: ['users', username, 'is-following'] })
    },
  })
}

/**
 * Hook to unfollow a contributor
 */
export function useUnfollowUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (username: string) => {
      return api.delete<{ success: boolean; message: string; isFollowing: boolean }>(
        `/users/${username}/follow`
      )
    },
    onSuccess: (_, username) => {
      // Invalidate the is-following query
      queryClient.invalidateQueries({ queryKey: ['users', username, 'is-following'] })
    },
  })
}
