import { api } from './client'
import type { BackendAsset } from './assets'

/**
 * Search query parameters (matches SearchQueryDto from backend)
 */
export interface SearchParams {
  q?: string  // Search query
  page?: number
  limit?: number
  sort?: 'relevance' | 'downloads:desc' | 'views:desc' | 'likes:desc' | 'uploadedAt:desc' | 'uploadedAt:asc'
  
  // Filters
  fileType?: 'IMAGE' | 'VIDEO' | 'VECTOR'
  license?: 'STANDARD' | 'ENHANCED' | 'EDITORIAL'
  category?: string
  contributorId?: string
  color?: string
  orientation?: 'landscape' | 'portrait' | 'square' | 'panoramic'
  isAI?: boolean
  isEditorial?: boolean
  isFree?: boolean
  modelRelease?: boolean
  propertyRelease?: boolean
  resolution?: string
  hasPeople?: boolean
  minWidth?: number
  minHeight?: number
  uploadedAfter?: string
  excludeTags?: string[]
}

/**
 * Search response (matches SearchResponseDto from backend)
 */
export interface SearchResponse {
  hits: BackendAsset[]
  query: string
  processingTimeMs: number
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
  facets?: any
}

export interface AutocompleteResponse {
  suggestions: string[]
}

export const searchApi = {
  /**
   * Search assets
   */
  search: (params: SearchParams) => {
    const queryParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()))
        } else {
          queryParams.append(key, value.toString())
        }
      }
    })
    
    return api.get<SearchResponse>(`/search?${queryParams.toString()}`)
  },

  /**
   * Get autocomplete suggestions
   */
  autocomplete: (query: string, limit: number = 10) =>
    api.get<AutocompleteResponse>(`/search/autocomplete?query=${encodeURIComponent(query)}&limit=${limit}`),

  /**
   * Get available search facets
   */
  getFacets: () =>
    api.get<any>('/search/facets'),
}
