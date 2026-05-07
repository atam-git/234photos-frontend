import { api } from './client'
import type { Asset } from '@/types'

/**
 * Backend asset response (matches AssetResponseDto from backend)
 */
export interface BackendAsset {
  id: string
  title: string
  description?: string
  slug: string
  alt: string
  src: string
  thumbnailUrl: string
  previewUrl: string
  watermarkedUrl: string
  originalUrl?: string
  fileType: string
  mimeType: string
  fileSize: string  // Formatted by backend: "2.5 MB"
  fileExtension?: string
  dimensions: string  // Formatted by backend: "1920x1080"
  width: number
  height: number
  aspectRatio: number
  resolution: string  // Computed by backend: "HD" | "Full HD" | "4K" | "8K"
  orientation: string  // Computed by backend: "landscape" | "portrait" | "square"
  duration?: number  // For videos
  fps?: number  // For videos
  category: string  // Flattened from object
  tags: string[]  // Flattened from AssetTag[]
  colors?: string[]  // Dominant colors
  contributor: string  // Flattened to contributor name
  contributorId: string
  contributorAvatar?: string
  contributorCountry?: string
  contributorAssets?: number
  contributorDownloads?: string
  license: string  // Normalized to lowercase
  isEditorial: boolean
  isAI: boolean
  isFree: boolean
  modelRelease?: boolean
  propertyRelease?: boolean
  hasPeople: boolean
  location?: string | null
  assetCountry?: string | null
  prices: {
    standard: number  // In NGN (converted from kobo)
    enhanced: number
    editorial: number
  }
  stats: {
    views: number
    downloads: number
    likes: number
    earnings: number  // In NGN
  }
  status: string  // Normalized to lowercase
  rejectionReason?: string | null
  uploadedAt: string
  approvedAt?: string | null
  updatedAt: string
  createdAt: string
}

export interface PaginatedAssets {
  data: BackendAsset[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface AssetFilters {
  category?: string
  contributorId?: string
  sortBy?: 'newest' | 'popular' | 'downloads'
  feed?: 'following'
  feedFilter?: 'latest' | 'popular' | 'featured'
  page?: number
  limit?: number
}

export const assetsApi = {
  /**
   * Get platform statistics
   */
  getStats: () =>
    api.get<{
      totalAssets: number
      totalContributors: number
      assetsLast24h: number
      countriesServed: number
    }>('/assets/stats'),

  /**
   * Get contributor statistics for marketing page
   */
  getContributorStats: () =>
    api.get<{
      totalContributors: number
      countriesRepresented: number
      totalEarnings: number // In kobo
      totalAssets: number
    }>('/assets/contributor-stats'),

  /**
   * List assets with optional filters
   */
  list: (filters: AssetFilters = {}) => {
    const params = new URLSearchParams()
    if (filters.category) params.append('category', filters.category)
    if (filters.contributorId) params.append('contributorId', filters.contributorId)
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.feed) params.append('feed', filters.feed)
    if (filters.feedFilter) params.append('feedFilter', filters.feedFilter)
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())
    
    return api.get<PaginatedAssets>(`/assets?${params.toString()}`)
  },

  /**
   * Get single asset by ID
   */
  getById: (id: string) =>
    api.get<BackendAsset>(`/assets/${id}`),

  /**
   * Get similar assets
   */
  getSimilar: (id: string, limit: number = 12) =>
    api.get<BackendAsset[]>(`/assets/${id}/similar?limit=${limit}`),

  /**
   * Search assets by color
   */
  searchByColor: (color: string, page: number = 1, limit: number = 50) =>
    api.get<PaginatedAssets>(`/assets/color/${color}?page=${page}&limit=${limit}`),

  /**
   * Get more assets from contributor
   */
  getMoreFromContributor: (contributorId: string, excludeAssetId?: string, limit: number = 12) => {
    const params = new URLSearchParams()
    if (excludeAssetId) params.append('excludeAssetId', excludeAssetId)
    params.append('limit', limit.toString())
    
    return api.get<BackendAsset[]>(`/assets/contributor/${contributorId}/more?${params.toString()}`)
  },

  /**
   * Create asset after upload completes
   */
  create: (payload: {
    uploadSessionId: string
    title: string
    description?: string
    categoryId: string
    tags?: string[]
    isAI?: boolean
    isEditorial?: boolean
    modelRelease?: boolean
    propertyRelease?: boolean
    isDraft?: boolean
  }) =>
    api.post<BackendAsset>('/assets', payload),

  /**
   * Update asset
   */
  update: (id: string, payload: Partial<{
    title: string
    description?: string
    categoryId: string
    tags?: string[]
    isAI?: boolean
    isEditorial?: boolean
    modelRelease?: boolean
    propertyRelease?: boolean
  }>) =>
    api.patch<BackendAsset>(`/assets/${id}`, payload),

  /**
   * Submit draft for review
   */
  submitDraft: (id: string) =>
    api.patch<BackendAsset>(`/assets/${id}/submit`, {}),

  /**
   * Delete asset
   */
  delete: (id: string) =>
    api.delete<{ success: boolean; message: string }>(`/assets/${id}`),
}
