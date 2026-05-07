import { api } from './client'

export interface BadgeProgress {
  emoji: string
  label: string
  earned: boolean
  progress?: number
  unlockedAt?: string
}

/**
 * Get user's badges with progress
 */
export async function getUserBadges(): Promise<BadgeProgress[]> {
  return api.get<BadgeProgress[]>('/badges')
}
