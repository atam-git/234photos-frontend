import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { collectionsApi, CreateCollectionPayload, UpdateCollectionPayload, Collection } from '@/lib/api/collections'

/**
 * Hook to fetch contributor's collections
 */
export function useMyCollections() {
  return useQuery({
    queryKey: ['collections', 'my'],
    queryFn: () => collectionsApi.getMyCollections(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to fetch collection by ID
 */
export function useCollection(id: string) {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => collectionsApi.getById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to fetch user's public collections (for profile pages)
 */
export function useUserCollections(username: string) {
  return useQuery({
    queryKey: ['collections', 'user', username],
    queryFn: () => collectionsApi.getUserCollections(username),
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook to create a collection
 */
export function useCreateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCollectionPayload) => collectionsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', 'my'] })
    },
  })
}

/**
 * Hook to update a collection
 */
export function useUpdateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCollectionPayload }) =>
      collectionsApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collections', 'my'] })
      queryClient.invalidateQueries({ queryKey: ['collections', variables.id] })
    },
  })
}

/**
 * Hook to delete a collection
 */
export function useDeleteCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => collectionsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', 'my'] })
    },
  })
}

/**
 * Hook to add assets to a collection
 */
export function useAddAssetsToCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, assetIds }: { id: string; assetIds: string[] }) =>
      collectionsApi.addAssets(id, assetIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collections', 'my'] })
      queryClient.invalidateQueries({ queryKey: ['collections', variables.id] })
    },
  })
}

/**
 * Hook to remove assets from a collection
 */
export function useRemoveAssetsFromCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, assetIds }: { id: string; assetIds: string[] }) =>
      collectionsApi.removeAssets(id, assetIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collections', 'my'] })
      queryClient.invalidateQueries({ queryKey: ['collections', variables.id] })
    },
  })
}
