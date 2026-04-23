export type UserRole = 'customer' | 'contributor' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  role: UserRole
  country?: string
  countryFlag?: string
  credits: number
  joinedYear: number
  isContributorApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  bio?: string
  location?: string
  website?: string
  instagram?: string
  twitter?: string
  facebook?: string
  phone?: string
  timezone?: string
  language?: string
}

export interface CustomerProfile extends UserProfile {
  subscriptionPlan?: 'free' | 'basic' | 'pro' | 'enterprise'
  subscriptionStatus?: 'active' | 'cancelled' | 'expired'
  totalDownloads: number
  totalSpent: number
}

export interface ContributorProfile extends UserProfile {
  applicationStatus: 'pending' | 'approved' | 'rejected'
  specialties: string[]
  totalAssets: number
  totalDownloads: number
  totalEarnings: number
  totalViews: number
  availableBalance: number
  pendingBalance: number
  rank?: number
  badges: Badge[]
  payoutMethod?: PayoutMethod
}

export interface ContributorSummary {
  id: string
  name: string
  username: string
  avatar?: string
  country: string
  countryFlag: string
  isVerified: boolean
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

export interface PayoutMethod {
  type: 'bank' | 'paypal' | 'mobile_money'
  details: Record<string, string>
  isDefault: boolean
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface Contributor {
  username: string
  name: string
  avatar: string
  country: string
  countryFlag: string
  bio: string
  totalAssets: number
  totalDownloads: string
  totalEarnings: string
  joinedYear: number
  specialties: string[]
  website?: string
  instagram?: string
  twitter?: string
  facebook?: string
}

export interface ContributorApplication {
  id: string
  userId: string
  status: 'pending' | 'approved' | 'rejected'
  
  // Application data
  bio: string
  specialties: string[]
  portfolioUrl?: string
  instagram?: string
  sampleWorkUrls?: string[] // 3-5 sample images
  
  // Metadata
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string // admin user ID
  rejectionReason?: string
  
  // Auto-approval flag (for demo/testing)
  autoApproved?: boolean
}
