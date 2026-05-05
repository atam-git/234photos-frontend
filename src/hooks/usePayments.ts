import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { paymentsApi } from '@/lib/api/payments'

/**
 * Hook to fetch credit packages
 */
export function useCreditPackages() {
  return useQuery({
    queryKey: ['creditPackages'],
    queryFn: () => paymentsApi.getPackages(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to initialize payment
 */
export function useInitializePayment() {
  return useMutation({
    mutationFn: (packageId: string) => paymentsApi.initializePayment(packageId),
  })
}

/**
 * Hook to verify payment
 */
export function useVerifyPayment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (reference: string) => paymentsApi.verifyPayment(reference),
    onSuccess: () => {
      // Invalidate credits balance and transactions
      queryClient.invalidateQueries({ queryKey: ['creditsBalance'] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

/**
 * Hook to fetch transaction history
 */
export function useTransactions(page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ['transactions', page, limit],
    queryFn: () => paymentsApi.getTransactions(page, limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to fetch single transaction
 */
export function useTransaction(id: string) {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => paymentsApi.getTransaction(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook to fetch credits balance
 */
export function useCreditsBalance() {
  return useQuery({
    queryKey: ['creditsBalance'],
    queryFn: () => paymentsApi.getCreditsBalance(),
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}
