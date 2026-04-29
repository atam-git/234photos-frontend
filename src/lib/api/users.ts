import { api } from './client'
import type { BackendUser } from './auth'

/**
 * Backend user profile response (matches UserProfileResponseDto from backend)
 * This is the same as BackendUser but may have additional profile-specific fields
 */
export type BackendUserProfile = BackendUser

export const usersApi = {
  /**
   * Get user profile by username
   */
  getByUsername: (username: string) =>
    api.get<BackendUserProfile>(`/users/${username}`),
}
