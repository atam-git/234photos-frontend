import { useQuery } from '@tanstack/react-query'
import { categoriesApi, type Category } from '@/lib/api'

/**
 * Hook to fetch all active categories.
 * 
 * @example
 * ```tsx
 * const { data: categories, isLoading } = useCategories()
 * ```
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list(),
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  })
}

/**
 * Hook to fetch a single category by slug.
 * 
 * @example
 * ```tsx
 * const { data: category } = useCategory('nature')
 * ```
 */
export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['categories', slug],
    queryFn: () => categoriesApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}
