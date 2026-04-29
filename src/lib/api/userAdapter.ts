import type { User } from '@/types'
import type { BackendUser } from './auth'

/**
 * Adapt backend user to frontend User type
 * 
 * After type alignment (Section 2), backend now returns all fields
 * that frontend expects, so this is now a simple pass-through.
 * 
 * Backend UserResponseDto provides:
 * - role (normalized to lowercase)
 * - countryFlag (computed from country)
 * - joinedYear (computed from createdAt)
 * - isContributor (correct field name)
 * - emailVerified
 * - contributorTier (normalized to lowercase)
 */
export function toFrontendUser(b: BackendUser): User {
  // Backend response already matches frontend type after alignment!
  return b as User
}
