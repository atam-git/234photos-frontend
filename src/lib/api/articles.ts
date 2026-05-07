import { api } from './client'

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  coverImage: string
  category: string | null
  tags: string[]
  views: number
  readTime: number
  publishedAt: string
  createdAt?: string
  updatedAt?: string
  author: {
    id: string
    name: string
    username: string | null
    avatar: string | null
  }
}

export interface ArticlesResponse {
  articles: Article[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const articlesApi = {
  /**
   * Get featured articles
   */
  getFeatured: (limit?: number) =>
    api.get<Article[]>(`/articles/featured${limit ? `?limit=${limit}` : ''}`),

  /**
   * Get all articles with pagination
   */
  getAll: (params?: { category?: string; limit?: number; page?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.category) queryParams.append('category', params.category)
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.page) queryParams.append('page', params.page.toString())
    
    const queryString = queryParams.toString()
    return api.get<ArticlesResponse>(`/articles${queryString ? `?${queryString}` : ''}`)
  },

  /**
   * Get article by slug
   */
  getBySlug: (slug: string) =>
    api.get<Article>(`/articles/${slug}`),
}
