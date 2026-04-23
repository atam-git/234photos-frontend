export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp: string
}

export interface AssetAnalytics {
  assetId: string
  period: 'day' | 'week' | 'month' | 'year' | 'all'
  views: number
  downloads: number
  likes: number
  earnings: number
  viewsByCountry: { country: string; count: number }[]
  downloadsByLicense: { license: string; count: number }[]
  earningsOverTime: { date: string; amount: number }[]
}

export interface ContributorAnalytics {
  contributorId: string
  period: 'day' | 'week' | 'month' | 'year' | 'all'
  totalEarnings: number
  totalDownloads: number
  totalViews: number
  topAssets: { assetId: string; earnings: number; downloads: number }[]
  earningsOverTime: { date: string; amount: number }[]
  downloadsByCategory: { category: string; count: number }[]
}

export interface DashboardStat {
  label: string
  value: string
  change: string
  up: boolean
  icon: string
}
