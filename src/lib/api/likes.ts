import { api } from './client'
import type { BackendAsset, PaginatedAssets } from './assets'

export interface LikeResponse {
  success: boolean
  message: string
  liked: boolean
}

export interface LikeCheckResponse {
  liked: boolean
}

/**
 * Get user's liked assets
 */
export async function getLikedAssets(page: number = 1, limit: number = 50): Promise<PaginatedAssets> {
  return api.get<PaginatedAssets>(`/likes?page=${page}&limit=${limit}`)
}

/**
 * Like an asset
 */
export async function likeAsset(assetId: string): Promise<LikeResponse> {
  return api.post<LikeResponse>(`/likes/${assetId}`)
}

/**
 * Unlike an asset
 */
export async function unlikeAsset(assetId: string): Promise<LikeResponse> {
  return api.delete<LikeResponse>(`/likes/${assetId}`)
}

/**
 * Check if asset is liked
 */
export async function checkLiked(assetId: string): Promise<LikeCheckResponse> {
  return api.get<LikeCheckResponse>(`/likes/${assetId}/check`)
}

export const likesApi = {
  getLikedAssets,
  likeAsset,
  unlikeAsset,
  checkLiked,
}
