/**
 * Dashboard stats for contributors
 */
export interface DashboardStats {
  earningsThisMonth: number
  earningsChange: number // percentage
  downloadsThisMonth: number
  downloadsChange: number // percentage
  totalViews: number
  viewsChange: number // percentage
  leaderboardRank: number
  rankChange: number // position change
}

/**
 * Platform-wide statistics
 */
export interface PlatformStats {
  totalAssets: number
  totalContributors: number
  totalDownloads: number
  totalEarnings: number
}
