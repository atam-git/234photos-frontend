import { ContributorSummary } from './user'
import { Asset } from './asset'

export type ActivityType = 'download' | 'like' | 'comment' | 'follow' | 'upload' | 'approval' | 'rejection' | 'earning' | 'trending'

export interface Activity {
  id: string
  type: ActivityType
  userId: string
  assetId?: string
  asset?: Asset
  contributorId?: string
  contributor?: ContributorSummary
  message: string
  metadata?: Record<string, any>
  createdAt: string
}

export interface FeedItem {
  id: string
  contributorId: string
  contributor: ContributorSummary
  contributorAvatar: string
  uploadDate: string
  assets: Asset[]
}
