import { api } from './client'

export interface Collection {
  id: string
  name: string
  description: string | null
  slug: string
  contributorId: string
  thumbnails: string[]
  assetCount: number
  isPublic: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface CollectionAsset {
  id: string
  title: string
  thumbnailUrl: string
  watermarkedUrl: string
  status: string
  downloads: number
  views: number
  position: number
  addedAt: string
}

export interface CollectionDetail extends Collection {
  assets: CollectionAsset[]
}

export interface CreateCollectionPayload {
  name: string
  description?: string
  isPublic?: boolean
  assetIds?: string[]
}

export interface UpdateCollectionPayload {
  name?: string
  description?: string
  isPublic?: boolean
}

export const collectionsApi = {
  /**
   * Create a new collection
   */
  create: (payload: CreateCollectionPayload) =>
    api.post<Collection>('/collections', payload),

  /**
   * Get current contributor's collections
   */
  getMyCollections: () =>
    api.get<Collection[]>('/collections/my'),

  /**
   * Get collection by ID
   */
  getById: (id: string) =>
    api.get<CollectionDetail>(`/collections/${id}`),

  /**
   * Update collection
   */
  update: (id: string, payload: UpdateCollectionPayload) =>
    api.patch<Collection>(`/collections/${id}`, payload),

  /**
   * Delete collection
   */
  delete: (id: string) =>
    api.delete<{ success: boolean }>(`/collections/${id}`),

  /**
   * Add assets to collection
   */
  addAssets: (id: string, assetIds: string[]) =>
    api.post<{ success: boolean }>(`/collections/${id}/assets`, { assetIds }),

  /**
   * Remove assets from collection
   */
  removeAssets: (id: string, assetIds: string[]) =>
    api.delete<{ success: boolean }>(`/collections/${id}/assets`, { assetIds }),
}
