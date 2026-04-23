import type { CreditPackage, Transaction } from '@/types'

export const CREDIT_PACKAGES: CreditPackage[] = [
  { id: 'pkg_001', name: 'Starter', credits: 10, price: 29, currency: 'USD', popular: false },
  { id: 'pkg_002', name: 'Popular', credits: 50, price: 99, currency: 'USD', popular: true, save: '32%' },
  { id: 'pkg_003', name: 'Pro', credits: 100, price: 149, currency: 'USD', popular: false, save: '49%' },
]

export const BILLING_TRANSACTIONS: Partial<Transaction>[] = [
  { 
    id: 'txn_001', 
    date: 'Apr 18, 2026', 
    type: 'credit_purchase', 
    amount: 99, 
    currency: 'USD', 
    credits: 50, 
    status: 'completed', 
    description: 'Credit Purchase', 
    createdAt: '2026-04-18T10:30:00Z',
    metadata: { paymentMethod: 'Visa •••• 4242' }
  },
  { 
    id: 'txn_002', 
    date: 'Apr 15, 2026', 
    type: 'download', 
    amount: -1, 
    currency: 'USD', 
    status: 'completed', 
    description: 'Download', 
    asset: 'Lagos Skyline', 
    createdAt: '2026-04-15T14:20:00Z' 
  },
  { 
    id: 'txn_003', 
    date: 'Apr 10, 2026', 
    type: 'download', 
    amount: -1, 
    currency: 'USD', 
    status: 'completed', 
    description: 'Download', 
    asset: 'Accra Market', 
    createdAt: '2026-04-10T09:15:00Z' 
  },
  { 
    id: 'txn_004', 
    date: 'Mar 28, 2026', 
    type: 'credit_purchase', 
    amount: 29, 
    currency: 'USD', 
    credits: 10, 
    status: 'completed', 
    description: 'Credit Purchase', 
    createdAt: '2026-03-28T16:45:00Z',
    metadata: { paymentMethod: 'Mastercard •••• 5555' }
  },
  { 
    id: 'txn_005', 
    date: 'Mar 20, 2026', 
    type: 'download', 
    amount: -1, 
    currency: 'USD', 
    status: 'completed', 
    description: 'Download', 
    asset: 'Nairobi Office', 
    createdAt: '2026-03-20T11:30:00Z' 
  },
  { 
    id: 'txn_006', 
    date: 'Mar 15, 2026', 
    type: 'credit_purchase', 
    amount: 99, 
    currency: 'USD', 
    credits: 50, 
    status: 'failed', 
    description: 'Credit Purchase', 
    createdAt: '2026-03-15T13:20:00Z',
    metadata: { 
      paymentMethod: 'Visa •••• 4242',
      failureReason: 'Insufficient funds. Please check your account balance and try again.'
    }
  },
  { 
    id: 'txn_007', 
    date: 'Feb 28, 2026', 
    type: 'refund', 
    amount: 29, 
    currency: 'USD', 
    credits: 10, 
    status: 'completed', 
    description: 'Refund', 
    createdAt: '2026-02-28T10:00:00Z',
    metadata: {
      paymentMethod: 'Visa •••• 4242',
      refundReason: 'Requested by customer within 30-day refund period.'
    }
  },
]
