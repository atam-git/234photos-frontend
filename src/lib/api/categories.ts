import { api } from './client'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  displayOrder: number
  thumbnailUrl: string | null
  _count: {
    assets: number
  }
}

/**
 * Get all active categories
 */
export async function getCategories(limit?: number): Promise<Category[]> {
  const params = limit ? `?limit=${limit}` : ''
  return api.get<Category[]>(`/categories${params}`)
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
  return api.get<Category>(`/categories/${slug}`)
}

export const categoriesApi = {
  list: getCategories,
  getBySlug: getCategoryBySlug,
}
