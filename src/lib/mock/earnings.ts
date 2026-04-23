import type { Withdrawal } from '@/types'
import { MOCK_ASSETS } from './searchAssets'

// Earnings stats for the contributor
// All amounts in kobo (1 Naira = 100 kobo)
export const EARNINGS_STATS = {
  availableBalance: 198000000, // ₦1,980,000 in kobo
  pendingBalance: 72000000, // ₦720,000 in kobo
  totalAllTime: 1984000000, // ₦19,840,000 in kobo
  thisMonth: 198000000, // ₦1,980,000 in kobo
  lastMonth: 168000000, // ₦1,680,000 in kobo
  currency: 'NGN' as const,
}

export const EARNINGS_WITHDRAWALS: Withdrawal[] = [
  { 
    id: '1', 
    contributorId: 'contributor-1',
    amount: 400000000, // ₦4,000,000 in kobo
    currency: 'NGN',
    method: 'bank', 
    status: 'completed', 
    requestedAt: '2026-03-15T10:00:00Z', 
    processedAt: '2026-03-17T14:30:00Z' 
  },
  { 
    id: '2', 
    contributorId: 'contributor-1',
    amount: 288000000, // ₦2,880,000 in kobo
    currency: 'NGN',
    method: 'paypal', 
    status: 'completed', 
    requestedAt: '2026-02-10T09:00:00Z', 
    processedAt: '2026-02-11T10:15:00Z' 
  },
  { 
    id: '3', 
    contributorId: 'contributor-1',
    amount: 152000000, // ₦1,520,000 in kobo
    currency: 'NGN',
    method: 'mobile_money', 
    status: 'processing', 
    requestedAt: '2026-04-20T15:30:00Z' 
  },
  { 
    id: '4', 
    contributorId: 'contributor-1',
    amount: 192000000, // ₦1,920,000 in kobo
    currency: 'NGN',
    method: 'bank', 
    status: 'failed', 
    requestedAt: '2026-01-05T11:00:00Z', 
    failureReason: 'Invalid bank account details' 
  },
]

// Earnings transactions with license and payout info
export const EARNINGS_TRANSACTIONS = MOCK_ASSETS.slice(0, 8).map((asset, i) => ({
  ...asset,
  status: 'live' as const,
  uploadedAt: ['Apr 18, 2026', 'Apr 15, 2026', 'Apr 10, 2026', 'Mar 28, 2026'][i % 4],
  downloads: Math.floor(Math.random() * 300),
  views: Math.floor(Math.random() * 3000 + 500),
  earnings: (Math.random() * 24000000).toFixed(0), // In kobo (₦0 - ₦240,000)
  type: (i % 3 === 0 ? 'enhanced' : 'standard') as 'enhanced' | 'standard',
  amount: Math.floor(Math.random() * 2400000 + 320000), // In kobo (₦3,200 - ₦27,200)
  date: ['Apr 18', 'Apr 17', 'Apr 15', 'Apr 14', 'Apr 12', 'Apr 10', 'Apr 8', 'Apr 5'][i],
  customer: 'Anonymous customer',
  earningStatus: (i % 3 === 0 ? 'pending' : i % 5 === 0 ? 'paid' : 'available') as 'pending' | 'available' | 'paid',
  availableAt: new Date(Date.now() + (30 - i * 3) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  paidAt: i % 5 === 0 ? new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : undefined,
}))
