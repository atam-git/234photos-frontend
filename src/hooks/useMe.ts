import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/lib/api'
import { toFrontendUser } from '@/lib/api/userAdapter'
import type { User } from '@/types'

/**
 * Hook to fetch the current authenticated user from the API.
 * 
 * This provides fresh user data from the server, unlike the authStore
 * which may have stale data. Use this when you need to display or edit
 * the current user's profile.
 * 
 * @example
 * ```tsx
 * function ProfilePage() {
 *   const { data: user, isLoading, error } = useMe()
 *   
 *   if (isLoading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error.message}</div>
 *   
 *   return <div>Welcome, {user.name}!</div>
 * }
 * ```
 */
export function useMe() {
  return useQuery<User, Error>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const backendUser = await authApi.me()
      return toFrontendUser(backendUser)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}
