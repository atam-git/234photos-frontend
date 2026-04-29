import { ContributorSummary } from './user'

export type LicenseType = 'standard' | 'enhanced' | 'editorial'

export type AssetFileType = 'image' | 'video' | 'vector' | 'illustration' | 'audio' | '3d'

export type AssetStatus = 'pending' | 'approved' | 'rejected' | 'archived'

export type AssetResolution = 'SD' | 'HD' | '4K' | '8K' | 'vector'

export interface Asset {
  id: string
  title: string
  description?: string
  slug: string  // Now provided by backend

  // Media URLs
  src: string  // Backend provides this
  alt: string  // Now provided by backend
  thumbnailUrl: string
  previewUrl: string
  watermarkedUrl: string
  originalUrl?: string

  // Metadata
  fileType: AssetFileType
  mimeType: string
  fileSize: string  // Backend formats this
  dimensions: string  // Backend formats this
  width: number  // NEW - Separate field
  height: number  // NEW - Separate field
  aspectRatio?: number
  resolution?: AssetResolution  // Now provided by backend
  orientation?: 'landscape' | 'portrait' | 'square' | 'panoramic'  // NEW
  duration?: number
  fps?: number
  uploadedAt: string  // RENAMED from dateAdded

  // Classification
  category: string  // Backend flattens this
  tags: string[]  // Backend flattens this
  colors?: string[]
  hasPeople?: boolean  // NEW
  location?: string  // NEW
  assetCountry?: string  // NEW

  // Licensing
  license: LicenseType
  isEditorial: boolean
  isAI: boolean
  isFree: boolean
  modelRelease?: boolean
  propertyRelease?: boolean

  // Pricing
  prices: AssetPrices  // Backend nests this

  // Contributor
  contributor: string  // Backend flattens this
  contributorId: string
  contributorAvatar?: string
  contributorCountry?: string
  contributorAssets?: number
  contributorDownloads?: string
  contributorCollections?: number

  // Stats
  stats: AssetStats  // Backend nests this

  // Status
  status: AssetStatus
  rejectionReason?: string

  // Timestamps
  approvedAt?: string  // RENAMED from publishedAt
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
