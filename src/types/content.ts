export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  source?: string
  author: ArticleAuthor
  tags: string[]
  date: string
  publishedAt: string
  updatedAt: string
  readTime: string
  featured?: boolean
}

export interface ArticleAuthor {
  name: string
  avatar: string
  bio?: string
}

export interface EditorialStory {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  assets: any[] // Will be Asset[] when populated
  author: any // Will be ContributorSummary when populated
  publishedAt: string
  featured: boolean
}

export interface FeaturedCollection {
  id: string
  name: string
  description: string
  slug: string
  coverImage: string
  assets: any[] // Will be Asset[] when populated
  assetCount: number
  curator?: string
  featured: boolean
  createdAt: string
}

export interface Campaign {
  id: string
  name: string
  description: string
  slug: string
  coverImage: string
  startDate: string
  endDate: string
  bonusRate: number
  categories?: string[]
  featured: boolean
  active: boolean
}
