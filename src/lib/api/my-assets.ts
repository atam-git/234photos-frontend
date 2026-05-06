import { api } from './client'

export interface MyAssetWithStats {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  watermarkedUrl: string
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | 'DRAFT'
  uploadedAt: string
  downloads: number
  views: number
  earnings: number // in kobo
  rejectionReason?: string
  category: {
    id: string
    name: string
    slug: string
  }
  tags: Array<{
    id: string
    name: string
  }>
}

export interface MyAssetsResponse {
  data: MyAssetWithStats[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const myAssetsApi = {
  /**
   * Get current contributor's assets with stats
   */
  getMyAssets: (page: number = 1, limit: number = 50, status?: 'APPROVED' | 'PENDING' | 'REJECTED' | 'DRAFT') => {
    const params: any = { page, limit }
    if (status) params.status = status
    return api.get<MyAssetsResponse>('/assets/my', { query: params })
  },
}
