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
  // Search index hits use a flattened shape that omits some fields the
  // /assets endpoint returns (src, alt, contributor, stats, prices, …).
  // Coerce both shapes into the frontend Asset.
  const raw = backendAsset as any

  const src =
    raw.src ||
    raw.previewUrl ||
    raw.watermarkedUrl ||
    raw.thumbnailUrl ||
    raw.originalUrl ||
    ''

  const alt = raw.alt || raw.title || raw.description || ''

  const contributor = raw.contributor || raw.contributorName || ''

  const stats = raw.stats ?? {
    views: raw.views ?? 0,
    downloads: raw.downloads ?? 0,
    likes: raw.likes ?? 0,
    earnings: raw.earnings ?? 0,
  }

  const prices = raw.prices ?? {
    standard: raw.priceStandard ?? 0,
    enhanced: raw.priceEnhanced ?? 0,
    editorial: raw.priceEditorial ?? 0,
  }

  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    slug: raw.slug,
    alt,
    src,
    thumbnailUrl: raw.thumbnailUrl,
    previewUrl: raw.previewUrl,
    watermarkedUrl: raw.watermarkedUrl,
    originalUrl: raw.originalUrl,
    fileType: raw.fileType as Asset['fileType'],
    mimeType: raw.mimeType,
    fileSize: raw.fileSize,
    dimensions: raw.dimensions,
    width: raw.width,
    height: raw.height,
    aspectRatio: raw.aspectRatio,
    resolution: raw.resolution as Asset['resolution'],
    orientation: raw.orientation as Asset['orientation'],
    duration: raw.duration,
    fps: raw.fps,
    category: raw.category,
    tags: raw.tags,
    colors: raw.colors,
    contributor,
    contributorId: raw.contributorId,
    contributorAvatar: raw.contributorAvatar,
    contributorCountry: raw.contributorCountry,
    contributorAssets: raw.contributorAssets,
    contributorDownloads: raw.contributorDownloads,
    license: raw.license as Asset['license'],
    isEditorial: raw.isEditorial,
    isAI: raw.isAI,
    isFree: raw.isFree,
    modelRelease: raw.modelRelease,
    propertyRelease: raw.propertyRelease,
    hasPeople: raw.hasPeople,
    location: raw.location ?? undefined,
    assetCountry: raw.assetCountry ?? raw.country ?? undefined,
    prices,
    stats,
    status: raw.status as Asset['status'],
    rejectionReason: raw.rejectionReason ?? undefined,
    uploadedAt: raw.uploadedAt,
    approvedAt: raw.approvedAt ?? undefined,
    updatedAt: raw.updatedAt,
  }
}

/**
 * Transform array of backend assets to frontend format
 */
export function toFrontendAssets(backendAssets: BackendAsset[]): Asset[] {
  return backendAssets.map(toFrontendAsset)
}
