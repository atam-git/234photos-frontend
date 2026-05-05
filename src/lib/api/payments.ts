import { api } from './client'

/**
 * Credit Package from backend
 */
export interface CreditPackage {
  id: string
  name: string
  credits: number
  price: number // In kobo
  currency: string
  discount?: number
  popular?: boolean
  save?: string
}

/**
 * Transaction from backend
 */
export interface Transaction {
  id: string
  userId: string
  type: 'CREDIT_PURCHASE' | 'DOWNLOAD' | 'REFUND'
  amount: number // In kobo
  currency: string
  credits?: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  description: string
  metadata?: any
  createdAt: string
  updatedAt: string
}

/**
 * Payment initialization response
 */
export interface PaymentInitResponse {
  status: string
  paymentLink: string
  reference: string
  amount: number
  credits: number
  transactionId: string
}

/**
 * Payment verification response
 */
export interface PaymentVerifyResponse {
  status: string
  message: string
  credits: number
}

/**
 * Transaction history response
 */
export interface TransactionHistoryResponse {
  data: Transaction[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

/**
 * Credits balance response
 */
export interface CreditsBalanceResponse {
  credits: number
  source: 'redis' | 'database'
}

export const paymentsApi = {
  /**
   * Get available credit packages
   */
  getPackages: () => api.get<CreditPackage[]>('/payments/packages'),

  /**
   * Initialize payment for credit purchase
   */
  initializePayment: (packageId: string) =>
    api.post<PaymentInitResponse>('/payments/initialize', { packageId }),

  /**
   * Verify payment after redirect
   */
  verifyPayment: (reference: string) =>
    api.post<PaymentVerifyResponse>('/payments/verify', { reference }),

  /**
   * Get transaction history
   */
  getTransactions: (page: number = 1, limit: number = 50) =>
    api.get<TransactionHistoryResponse>(`/payments/transactions?page=${page}&limit=${limit}`),

  /**
   * Get transaction by ID
   */
  getTransaction: (id: string) => api.get<Transaction>(`/payments/transactions/${id}`),

  /**
   * Get credits balance
   */
  getCreditsBalance: () => api.get<CreditsBalanceResponse>('/payments/credits'),
}
