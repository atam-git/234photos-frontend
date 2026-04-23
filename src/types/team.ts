import { UserProfile } from './user'
import { SubscriptionPlan } from './transaction'

export interface Team {
  id: string
  name: string
  slug: string
  ownerId: string
  members: TeamMember[]
  subscription: SubscriptionPlan
  credits: number
  createdAt: string
}

export interface TeamMember {
  userId: string
  user: UserProfile
  role: 'owner' | 'admin' | 'member' | 'viewer'
  permissions: string[]
  joinedAt: string
}
