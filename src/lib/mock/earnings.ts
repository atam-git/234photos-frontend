import type { Withdrawal } from '@/types'
import { MOCK_ASSETS } from './searchAssets'

export const EARNINGS_WITHDRAWALS: Withdrawal[] = [
  { 
    id: '1', 
    contributorId: 'contributor-1',
    amount: 2500, 
    currency: 'USD',
    method: 'bank', 
    status: 'completed', 
    requestedAt: '2026-03-15T10:00:00Z', 
    processedAt: '2026-03-17T14:30:00Z' 
  },
  { 
    id: '2', 
    contributorId: 'contributor-1',
    amount: 1800, 
    currency: 'USD',
    method: 'paypal', 
    status: 'completed', 
    requestedAt: '2026-02-10T09:00:00Z', 
    processedAt: '2026-02-11T10:15:00Z' 
  },
  { 
    id: '3', 
    contributorId: 'contributor-1',
    amount: 950, 
    currency: 'USD',
    method: 'mobile_money', 
    status: 'processing', 
    requestedAt: '2026-04-20T15:30:00Z' 
  },
  { 
    id: '4', 
    contributorId: 'contributor-1',
    amount: 1200, 
    currency: 'USD',
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
  earnings: (Math.random() * 150).toFixed(0),
  type: (i % 3 === 0 ? 'enhanced' : 'standard') as 'enhanced' | 'standard',
  amount: (Math.random() * 15 + 2).toFixed(2),
  date: ['Apr 18', 'Apr 17', 'Apr 15', 'Apr 14', 'Apr 12', 'Apr 10', 'Apr 8', 'Apr 5'][i],
  customer: 'Anonymous customer',
  earningStatus: (i % 3 === 0 ? 'pending' : i % 5 === 0 ? 'paid' : 'available') as 'pending' | 'available' | 'paid',
  availableAt: new Date(Date.now() + (30 - i * 3) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  paidAt: i % 5 === 0 ? new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : undefined,
}))
