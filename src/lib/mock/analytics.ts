import { AssetAnalytics, ContributorAnalytics, DashboardStats, PlatformStats } from '@/types'

/**
 * Comprehensive mock analytics data
 */

// ---------------------------------------------------------------------------
// Dashboard Stats (for contributor dashboard)
// ---------------------------------------------------------------------------

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  earningsThisMonth: 1240,
  earningsChange: 12.5, // +12.5% from last month
  downloadsThisMonth: 342,
  downloadsChange: 8.3, // +8.3% from last month
  totalViews: 12450,
  viewsChange: -2.1, // -2.1% from last month
  leaderboardRank: 12,
  rankChange: 3, // Moved up 3 positions
}

// ---------------------------------------------------------------------------
// Platform Stats (for homepage/marketing)
// ---------------------------------------------------------------------------

export const MOCK_PLATFORM_STATS: PlatformStats = {
  totalAssets: 2400000,
  totalContributors: 125000,
  totalDownloads: 48000000,
  totalEarnings: 12400000,
}

// ---------------------------------------------------------------------------
// Asset Analytics (detailed analytics for a specific asset)
// ---------------------------------------------------------------------------

export const MOCK_ASSET_ANALYTICS: AssetAnalytics = {
  assetId: 'ast_001',
  period: 'month',
  views: 12450,
  downloads: 342,
  likes: 89,
  earnings: 3420,
  viewsByCountry: [
    { country: 'United States', count: 3240 },
    { country: 'United Kingdom', count: 2180 },
    { country: 'Nigeria', count: 1890 },
    { country: 'South Africa', count: 1560 },
    { country: 'Kenya', count: 1120 },
    { country: 'Canada', count: 980 },
    { country: 'Germany', count: 720 },
    { country: 'France', count: 560 },
    { country: 'Ghana', count: 420 },
    { country: 'Others', count: 780 },
  ],
  downloadsByLicense: [
    { license: 'standard', count: 256 },
    { license: 'enhanced', count: 68 },
    { license: 'editorial', count: 18 },
  ],
  earningsOverTime: [
    { date: '2026-03-24', amount: 120 },
    { date: '2026-03-25', amount: 95 },
    { date: '2026-03-26', amount: 140 },
    { date: '2026-03-27', amount: 110 },
    { date: '2026-03-28', amount: 85 },
    { date: '2026-03-29', amount: 130 },
    { date: '2026-03-30', amount: 105 },
    { date: '2026-03-31', amount: 125 },
    { date: '2026-04-01', amount: 145 },
    { date: '2026-04-02', amount: 115 },
    { date: '2026-04-03', amount: 135 },
    { date: '2026-04-04', amount: 100 },
    { date: '2026-04-05', amount: 120 },
    { date: '2026-04-06', amount: 155 },
    { date: '2026-04-07', amount: 125 },
    { date: '2026-04-08', amount: 140 },
    { date: '2026-04-09', amount: 110 },
    { date: '2026-04-10', amount: 130 },
    { date: '2026-04-11', amount: 145 },
    { date: '2026-04-12', amount: 120 },
    { date: '2026-04-13', amount: 135 },
    { date: '2026-04-14', amount: 115 },
    { date: '2026-04-15', amount: 150 },
    { date: '2026-04-16', amount: 125 },
    { date: '2026-04-17', amount: 140 },
    { date: '2026-04-18', amount: 110 },
    { date: '2026-04-19', amount: 130 },
    { date: '2026-04-20', amount: 145 },
    { date: '2026-04-21', amount: 120 },
    { date: '2026-04-22', amount: 135 },
  ],
}

// ---------------------------------------------------------------------------
// Contributor Analytics (overall contributor performance)
// ---------------------------------------------------------------------------

export const MOCK_CONTRIBUTOR_ANALYTICS: ContributorAnalytics = {
  contributorId: 'usr_contributor_001',
  period: 'month',
  totalEarnings: 6800,
  totalDownloads: 24000,
  totalViews: 156000,
  topAssets: [
    { assetId: 'ast_001', earnings: 3420, downloads: 342 },
    { assetId: 'ast_002', earnings: 2560, downloads: 256 },
    { assetId: 'ast_009', earnings: 1780, downloads: 178 },
    { assetId: 'ast_004', earnings: 1890, downloads: 189 },
    { assetId: 'ast_005', earnings: 2670, downloads: 267 },
  ],
  earningsOverTime: [
    { date: '2026-03-24', amount: 245 },
    { date: '2026-03-25', amount: 198 },
    { date: '2026-03-26', amount: 267 },
    { date: '2026-03-27', amount: 223 },
    { date: '2026-03-28', amount: 189 },
    { date: '2026-03-29', amount: 256 },
    { date: '2026-03-30', amount: 212 },
    { date: '2026-03-31', amount: 234 },
    { date: '2026-04-01', amount: 278 },
    { date: '2026-04-02', amount: 223 },
    { date: '2026-04-03', amount: 267 },
    { date: '2026-04-04', amount: 201 },
    { date: '2026-04-05', amount: 245 },
    { date: '2026-04-06', amount: 289 },
    { date: '2026-04-07', amount: 234 },
    { date: '2026-04-08', amount: 267 },
    { date: '2026-04-09', amount: 212 },
    { date: '2026-04-10', amount: 256 },
    { date: '2026-04-11', amount: 278 },
    { date: '2026-04-12', amount: 223 },
    { date: '2026-04-13', amount: 267 },
    { date: '2026-04-14', amount: 234 },
    { date: '2026-04-15', amount: 289 },
    { date: '2026-04-16', amount: 245 },
    { date: '2026-04-17', amount: 267 },
    { date: '2026-04-18', amount: 212 },
    { date: '2026-04-19', amount: 256 },
    { date: '2026-04-20', amount: 278 },
    { date: '2026-04-21', amount: 223 },
    { date: '2026-04-22', amount: 267 },
  ],
  downloadsByCategory: [
    { category: 'Business', count: 8920 },
    { category: 'Lifestyle', count: 6540 },
    { category: 'Corporate', count: 4780 },
    { category: 'Portrait', count: 2340 },
    { category: 'Urban', count: 1420 },
  ],
}

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getAssetAnalytics(assetId: string, period: 'day' | 'week' | 'month' | 'year' | 'all' = 'month'): AssetAnalytics {
  // In a real app, this would fetch from API based on assetId and period
  return {
    ...MOCK_ASSET_ANALYTICS,
    assetId,
    period,
  }
}

export function getContributorAnalytics(contributorId: string, period: 'day' | 'week' | 'month' | 'year' | 'all' = 'month'): ContributorAnalytics {
  // In a real app, this would fetch from API based on contributorId and period
  return {
    ...MOCK_CONTRIBUTOR_ANALYTICS,
    contributorId,
    period,
  }
}

export function getDashboardStats(contributorId: string): DashboardStats {
  // In a real app, this would fetch from API based on contributorId
  return MOCK_DASHBOARD_STATS
}

export function getPlatformStats(): PlatformStats {
  return MOCK_PLATFORM_STATS
}
