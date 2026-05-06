import { api } from './client'

export interface EarningsStats {
  availableBalance: number // in kobo
  pendingBalance: number // in kobo
  totalEarnings: number // in kobo
  totalDownloads: number
  avgEarningsPerDownload: number // in kobo
  thisMonthEarnings: number // in kobo
  lastMonthEarnings: number // in kobo
}

export interface EarningsChartData {
  month: string
  earnings: number // in kobo
  downloads: number
}

export interface EarningTransaction {
  id: string
  assetId: string
  asset: {
    id: string
    title: string
    thumbnailUrl: string
    status: string
  }
  amount: number // in kobo
  status: 'PENDING' | 'AVAILABLE' | 'PAID'
  earnedAt: string
  availableAt: string
  paidAt?: string
}

export interface PayoutMethod {
  id: string
  type: 'bank' | 'paypal' | 'mobile_money'
  displayName: string
  bankDetails?: {
    accountNumber: string
    bankName: string
    accountName: string
    bankCode?: string
  }
  paypalEmail?: string
  mobileMoneyDetails?: {
    provider: string
    phoneNumber: string
  }
  isDefault: boolean
  createdAt: string
}

export interface Withdrawal {
  id: string
  amount: number // in kobo
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  payoutMethod: PayoutMethod
  requestedAt: string
  processedAt?: string
  completedAt?: string
  failureReason?: string
}

export interface WithdrawalRequest {
  amount: number // in kobo
  payoutMethodId: string
}

export interface AddPayoutMethodRequest {
  type: 'bank' | 'paypal' | 'mobile_money'
  displayName: string
  bankDetails?: {
    accountNumber: string
    bankName: string
    accountName: string
    bankCode?: string
  }
  paypalEmail?: string
  mobileMoneyDetails?: {
    provider: string
    phoneNumber: string
  }
}

export const earningsApi = {
  /**
   * Get earnings dashboard stats
   */
  getStats: async (): Promise<EarningsStats> => {
    const response = await api.get<EarningsStats>('/earnings/stats')
    return response
  },

  /**
   * Get 6-month earnings chart data
   */
  getChart: async (): Promise<EarningsChartData[]> => {
    const response = await api.get<EarningsChartData[]>('/earnings/chart')
    return response
  },

  /**
   * Get earnings transactions with pagination
   */
  getTransactions: async (
    page: number = 1,
    limit: number = 50,
    status?: string
  ): Promise<{
    data: EarningTransaction[]
    total: number
    page: number
    limit: number
  }> => {
    const query: any = { page, limit }
    if (status) query.status = status

    const response = await api.get<{
      data: EarningTransaction[]
      total: number
      page: number
      limit: number
    }>('/earnings/transactions', { query })
    return response
  },

  /**
   * Request withdrawal
   */
  requestWithdrawal: async (data: WithdrawalRequest): Promise<Withdrawal> => {
    const response = await api.post<Withdrawal>('/earnings/withdraw', data)
    return response
  },

  /**
   * Get withdrawal history
   */
  getWithdrawals: async (
    page: number = 1,
    limit: number = 50
  ): Promise<{
    data: Withdrawal[]
    total: number
    page: number
    limit: number
  }> => {
    const response = await api.get<{
      data: Withdrawal[]
      total: number
      page: number
      limit: number
    }>('/earnings/withdrawals', {
      query: { page, limit }
    })
    return response
  },

  /**
   * Get payout methods
   */
  getPayoutMethods: async (): Promise<PayoutMethod[]> => {
    const response = await api.get<PayoutMethod[]>('/earnings/payout-methods')
    return response
  },

  /**
   * Add payout method
   */
  addPayoutMethod: async (data: AddPayoutMethodRequest): Promise<PayoutMethod> => {
    const response = await api.post<PayoutMethod>('/earnings/payout-methods', data)
    return response
  }
}
