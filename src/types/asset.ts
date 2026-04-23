import { ContributorSummary } from './user'

export type LicenseType = 'standard' | 'enhanced' | 'editorial'

export type AssetFileType = 'image' | 'video' | 'vector' | 'illustration' | 'audio' | '3d'

export type AssetStatus = 'pending' | 'approved' | 'rejected' | 'archived'

export type AssetResolution = 'SD' | 'HD' | '4K' | '8K' | 'vector'

export interface Asset {
  id: string
  title: string
  description?: string
  slug: string

  // Media URLs
  src: string
  alt: string
  thumbnailUrl: string
  previewUrl: string
  watermarkedUrl: string
  originalUrl?: string

  // Metadata
  fileType: AssetFileType
  mimeType: string
  fileSize: string
  dimensions: string
  aspectRatio?: number
  resolution?: AssetResolution
  duration?: number
  fps?: number
  dateAdded: string

  // Classification
  category: string
  tags: string[]
  colors?: string[]

  // Licensing
  license: LicenseType
  isEditorial: boolean
  isAI: boolean
  isFree: boolean
  modelRelease?: boolean
  propertyRelease?: boolean

  // Pricing
  prices: AssetPrices

  // Contributor
  contributor: string
  contributorId: string
  contributorAvatar?: string
  contributorCountry?: string
  contributorAssets?: number
  contributorDownloads?: string

  // Stats
  stats: AssetStats

  // Status
  status: AssetStatus
  rejectionReason?: string

  // Timestamps
  uploadedAt: string
  publishedAt?: string
  updatedAt: string
}

export interface AssetPrices {
  standard: number
  enhanced: number
  editorial: number
}

export interface AssetStats {
  views: number
  downloads: number
  likes: number
  earnings: number
  conversionRate?: number
  avgEarningsPerDownload?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  assetCount?: number
}

export interface License {
  type: LicenseType
  name: string
  description: string
  price: number
  features: string[]
  restrictions: string[]
}

export interface AssetUpload {
  file: File
  title: string
  description?: string
  category: string
  tags: string[]
  isAI: boolean
  isEditorial: boolean
  modelRelease: boolean
  propertyRelease: boolean
  resolution: string
}

export interface AssetDetail extends Asset {
  contributorCountry: string
  contributorAssets: number
  contributorDownloads: string
}
