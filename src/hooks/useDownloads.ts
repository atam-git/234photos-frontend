import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserDownloads, getDownload, createDownload, getPricing, type GetDownloadsParams, type CreateDownloadDto } from '@/lib/api/downloads'

/**
 * Hook to fetch download pricing configuration
 */
export function usePricing() {
  return useQuery({
    queryKey: ['pricing'],
    queryFn: getPricing,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  })
}

/**
 * Hook to fetch user's downloads with pagination and filters
 */
export function useDownloads(params?: GetDownloadsParams) {
  return useQuery({
    queryKey: ['downloads', params],
    queryFn: () => getUserDownloads(params),
  })
}

/**
 * Hook to fetch a single download by ID
 */
export function useDownload(downloadId: string) {
  return useQuery({
    queryKey: ['download', downloadId],
    queryFn: () => getDownload(downloadId),
    enabled: !!downloadId,
  })
}

/**
 * Hook to create a new download (purchase and download asset)
 */
export function useCreateDownload() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateDownloadDto) => createDownload(dto),
    onSuccess: () => {
      // Invalidate downloads list to refetch
      queryClient.invalidateQueries({ queryKey: ['downloads'] })
    },
  })
}
