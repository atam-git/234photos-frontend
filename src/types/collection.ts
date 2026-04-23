import { Asset } from './asset'
import { UserProfile } from './user'

export interface Collection {
  id: string
  name: string
  description?: string
  slug: string
  contributorId: string
  assetIds: string[]
  assets?: Asset[]
  thumbnails: string[]
  assetCount: number
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface Board {
  id: string
  name: string
  description?: string
  userId: string
  assetIds: string[]
  assets?: Asset[]
  thumbnails: string[]
  assetCount: number
  type: 'private' | 'shared' | 'team'
  collaborators?: BoardCollaborator[]
  shareLink?: string
  updatedAt: string
  createdAt: string
}

export interface BoardCollaborator {
  userId: string
  user: UserProfile
  role: 'viewer' | 'editor' | 'admin'
  addedAt: string
}
