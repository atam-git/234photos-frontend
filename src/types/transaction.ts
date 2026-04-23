import { Asset } from './asset'

export interface Download {
  id: string
  userId: string
  assetId: string
  asset: Asset
  licenseType: 'standard' | 'enhanced' | 'editorial'
  format: string
  size: string
  creditsCost: number
  downloadUrl: string
  downloadedAt: string
  expiresAt?: string
  licenseUrl?: string
}

export interface Transaction {
  id: string
  userId: string
  type: 'credit_purchase' | 'download' | 'subscription' | 'refund' | 'payout'
  amount: number
  currency: string
  credits?: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  description: string
  date: string
  asset?: string
  customer?: string
  metadata?: Record<string, any>
  createdAt: string
}

export interface CreditPackage {
  id: string
  name: string
  credits: number
  price: number
  currency: string
  discount?: number
  popular?: boolean
  save?: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  billingPeriod: 'monthly' | 'annual'
  features: string[]
  creditsPerMonth: number
  downloadLimit?: number
  popular?: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'paypal' | 'mobile_money'
  last4?: string
  brand?: string
  expiry?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  createdAt: string
}

export interface Earning {
  id: string
  contributorId: string
  assetId: string
  asset?: Asset
  downloadId: string
  amount: number
  currency: string
  status: 'pending' | 'available' | 'paid'
  earnedAt: string
  availableAt?: string
  paidAt?: string
}

export interface Withdrawal {
  id: string
  contributorId: string
  amount: number
  currency: string
  method: 'bank' | 'paypal' | 'mobile_money'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  requestedAt: string
  processedAt?: string
  failureReason?: string
}
