import type { Asset } from './asset'
import type { LicenseType } from './asset'

export type ModalState =
  | { type: 'none' }
  | { type: 'preview'; asset: Asset }
  | { type: 'download'; asset: Asset }
  | { type: 'board'; asset: Asset }
  | { type: 'share' }
  | { type: 'collaborators' }
  | { type: 'auth'; defaultTab?: 'login' | 'signup' }
  | { type: 'custom'; name: string; data?: any }

export interface SortOption {
  value: string
  label: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export type BillingPeriod = 'monthly' | 'annual'

export type SignupStep = 'account' | 'contributor'

export type ApplicationStep = 'form' | 'uploading' | 'success'

export type UploadStep = 'drop' | 'uploading' | 'tagging' | 'done'

export type StatusFilter = 'all' | 'live' | 'pending' | 'rejected'

export type MyAssetsTab = 'assets' | 'collections'

export type ProfileTab = 'portfolio' | 'collections'

export type LicenseFilter = 'all' | 'standard' | 'enhanced'

export type FeedFilter = 'latest' | 'popular' | 'featured' | 'foryou'
export type DiscoverCategory = 'all' | 'nature' | 'urban' | 'people' | 'business' | 'food' | 'tech' | 'fashion'

export interface DownloadOptions {
  license: LicenseType
  format: 'jpg' | 'png' | 'webp'
  size: 'small' | 'medium' | 'original'
}

export type PaymentMethodOption = 'bank' | 'paypal'
