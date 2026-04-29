import { useQuery } from '@tanstack/react-query'
import { usersApi } from '@/lib/api/users'
import { toFrontendUser } from '@/lib/api/userAdapter'
import type { User } from '@/types'

/**
 * Hook to fetch a user profile by username.
 * 
 * @example
 * ```tsx
 * const { data: user, isLoading } = useUser('john-doe')
 * ```
 */
export function useUser(username: string) {
  return useQuery<User, Error>({
    queryKey: ['users', username],
    queryFn: async () => {
      const backendUser = await usersApi.getByUsername(username)
      return toFrontendUser(backendUser)
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
