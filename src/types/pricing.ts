import { BillingPeriod } from './ui'

export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  currency: string
  badge?: string
  cta: string
  ctaVariant: 'outline' | 'red' | 'dark'
  href: string
  features: PricingFeature[]
  limits: PricingLimits
  popular?: boolean
}

export interface PricingFeature {
  name: string
  included: boolean
  value?: string
}

export interface PricingLimits {
  downloads?: number
  credits?: number
  teamMembers?: number
  storage?: number
}

export interface PricingFAQ {
  question: string
  answer: string
}
