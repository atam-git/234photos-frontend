import { UserProfile } from './user'

export interface Comment {
  id: string
  assetId: string
  userId: string
  user: UserProfile
  content: string
  parentId?: string
  likes: number
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  assetId: string
  userId: string
  user: UserProfile
  rating: number
  comment?: string
  helpful: number
  createdAt: string
}

export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: string
}
