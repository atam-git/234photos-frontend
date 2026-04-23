export interface SearchFilters {
  type?: string
  orientation?: 'landscape' | 'portrait' | 'square'
  license?: string
  price?: string
  dateAdded?: string
  aiContent?: string
  color?: string
  contributors?: string[]
  resolution?: string[]
  modelRelease?: boolean
  propertyRelease?: boolean
  sort?: string
  q?: string
  page?: number
  limit?: number
}

export interface SearchResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  facets?: SearchFacets
}

export interface SearchFacets {
  categories: { name: string; count: number }[]
  fileTypes: { name: string; count: number }[]
  licenses: { name: string; count: number }[]
  contributors: { name: string; count: number }[]
}

export interface AutocompleteSuggestion {
  text: string
  type: 'query' | 'tag' | 'contributor' | 'category'
  count?: number
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  key: string
  label: string
  type: 'checkbox' | 'radio' | 'range' | 'color'
  options: FilterOption[]
}

/** Alias used by filter UI components */
export type ActiveFilters = SearchFilters
