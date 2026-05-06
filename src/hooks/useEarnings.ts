import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { earningsApi, type WithdrawalRequest, type AddPayoutMethodRequest } from '@/lib/api/earnings'
import { useToast } from '@/components/ui/toast-provider'

/**
 * Get earnings dashboard stats
 */
export function useEarningsStats() {
  return useQuery({
    queryKey: ['earnings', 'stats'],
    queryFn: () => earningsApi.getStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Get 6-month earnings chart data
 */
export function useEarningsChart() {
  return useQuery({
    queryKey: ['earnings', 'chart'],
    queryFn: () => earningsApi.getChart(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Get earnings transactions with pagination
 */
export function useEarningsTransactions(page: number = 1, limit: number = 50, status?: string) {
  return useQuery({
    queryKey: ['earnings', 'transactions', page, limit, status],
    queryFn: () => earningsApi.getTransactions(page, limit, status),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Get withdrawal history
 */
export function useWithdrawals(page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ['earnings', 'withdrawals', page, limit],
    queryFn: () => earningsApi.getWithdrawals(page, limit),
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Get payout methods
 */
export function usePayoutMethods() {
  return useQuery({
    queryKey: ['earnings', 'payout-methods'],
    queryFn: () => earningsApi.getPayoutMethods(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Request withdrawal mutation
 */
export function useRequestWithdrawal() {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  return useMutation({
    mutationFn: (data: WithdrawalRequest) => earningsApi.requestWithdrawal(data),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['earnings', 'stats'] })
      queryClient.invalidateQueries({ queryKey: ['earnings', 'withdrawals'] })
      
      showToast('success', 'Withdrawal request submitted successfully')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to request withdrawal'
      showToast('error', message)
    },
  })
}

/**
 * Add payout method mutation
 */
export function useAddPayoutMethod() {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  return useMutation({
    mutationFn: (data: AddPayoutMethodRequest) => earningsApi.addPayoutMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['earnings', 'payout-methods'] })
      showToast('success', 'Payout method saved successfully')
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to save payout method'
      showToast('error', message)
    },
  })
}
