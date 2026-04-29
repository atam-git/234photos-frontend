import type { Asset } from '@/types'
import type { BackendAsset } from './assets'

/**
 * Transform backend asset to frontend format.
 * 
 * After Section 3 alignment, backend already does most transformations:
 * - Flattens category, tags, contributor
 * - Nests prices and stats
 * - Formats fileSize and dimensions
 * - Computes resolution and orientation
 * - Normalizes enums to lowercase
 * - Converts prices from kobo to NGN
 * 
 * Frontend just needs to map field names.
 */
export function toFrontendAsset(backendAsset: BackendAsset): Asset {
  return {
    id: backendAsset.id,
    title: backendAsset.title,
    description: backendAsset.description,
    slug: backendAsset.slug,
    alt: backendAsset.alt,
    src: backendAsset.src,
    thumbnailUrl: backendAsset.thumbnailUrl,
    previewUrl: backendAsset.previewUrl,
    watermarkedUrl: backendAsset.watermarkedUrl,
    originalUrl: backendAsset.originalUrl,
    fileType: backendAsset.fileType as Asset['fileType'],
    mimeType: backendAsset.mimeType,
    fileSize: backendAsset.fileSize,
    dimensions: backendAsset.dimensions,
    width: backendAsset.width,
    height: backendAsset.height,
    aspectRatio: backendAsset.aspectRatio,
    resolution: backendAsset.resolution as Asset['resolution'],
    orientation: backendAsset.orientation as Asset['orientation'],
    duration: backendAsset.duration,
    fps: backendAsset.fps,
    category: backendAsset.category,
    tags: backendAsset.tags,
    colors: backendAsset.colors,
    contributor: backendAsset.contributor,
    contributorId: backendAsset.contributorId,
    contributorAvatar: backendAsset.contributorAvatar,
    contributorCountry: backendAsset.contributorCountry,
    contributorAssets: backendAsset.contributorAssets,
    contributorDownloads: backendAsset.contributorDownloads,
    license: backendAsset.license as Asset['license'],
    isEditorial: backendAsset.isEditorial,
    isAI: backendAsset.isAI,
    isFree: backendAsset.isFree,
    modelRelease: backendAsset.modelRelease,
    propertyRelease: backendAsset.propertyRelease,
    hasPeople: backendAsset.hasPeople,
    location: backendAsset.location ?? undefined,
    assetCountry: backendAsset.assetCountry ?? undefined,
    prices: backendAsset.prices,
    stats: backendAsset.stats,
    status: backendAsset.status as Asset['status'],
    rejectionReason: backendAsset.rejectionReason ?? undefined,
    uploadedAt: backendAsset.uploadedAt,
    approvedAt: backendAsset.approvedAt ?? undefined,
    updatedAt: backendAsset.updatedAt,
  }
}

/**
 * Transform array of backend assets to frontend format
 */
export function toFrontendAssets(backendAssets: BackendAsset[]): Asset[] {
  return backendAssets.map(toFrontendAsset)
}
