import { api } from './client'

export interface DashboardStats {
  availableBalance: number // in kobo
  pendingBalance: number // in kobo
  totalEarnings: number // in kobo
  totalDownloads: number
  avgEarningsPerDownload: number // in kobo
  thisMonthEarnings: number // in kobo
  lastMonthEarnings: number // in kobo
}

export interface TopAsset {
  id: string
  title: string
  thumbnail: string
  downloads: number
  earnings: number
  views: number
}

export interface RecentActivity {
  id: string
  type: 'download' | 'sale' | 'upload' | 'milestone'
  message: string
  timestamp: string
  icon?: string
}

export const dashboardApi = {
  getStats: () =>
    api.get<DashboardStats>('/earnings/stats'),

  getTopAssets: (limit: number = 4) =>
    api.get<TopAsset[]>(`/assets/top?limit=${limit}`),

  getRecentActivity: (limit: number = 5) =>
    api.get<RecentActivity[]>(`/notifications?limit=${limit}`),
}
