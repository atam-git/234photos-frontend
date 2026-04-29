import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { boardsApi, toFrontendAssets, type CreateBoardPayload, type UpdateBoardPayload } from '@/lib/api'

/**
 * Hook to fetch user's boards.
 * 
 * @example
 * ```tsx
 * const { data: boards, isLoading } = useBoards()
 * ```
 */
export function useBoards() {
  return useQuery({
    queryKey: ['boards'],
    queryFn: () => boardsApi.getBoards(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to fetch a single board.
 * 
 * @example
 * ```tsx
 * const { data: board } = useBoard(boardId)
 * ```
 */
export function useBoard(boardId: string) {
  return useQuery({
    queryKey: ['boards', boardId],
    queryFn: () => boardsApi.getBoard(boardId),
    enabled: !!boardId,
    staleTime: 2 * 60 * 1000,
  })
}

/**
 * Hook to fetch assets in a board.
 * 
 * @example
 * ```tsx
 * const { data } = useBoardAssets(boardId, 1, 50)
 * ```
 */
export function useBoardAssets(boardId: string, page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ['boards', boardId, 'assets', page, limit],
    queryFn: async () => {
      const response = await boardsApi.getBoardAssets(boardId, page, limit)
      return {
        data: toFrontendAssets(response.data),
        meta: response.meta,
      }
    },
    enabled: !!boardId,
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

/**
 * Hook to create a board.
 * 
 * @example
 * ```tsx
 * const { mutate: createBoard } = useCreateBoard()
 * createBoard({ name: 'My Board' })
 * ```
 */
export function useCreateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBoardPayload) => boardsApi.createBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

/**
 * Hook to update a board.
 * 
 * @example
 * ```tsx
 * const { mutate: updateBoard } = useUpdateBoard()
 * updateBoard({ boardId: 'board-123', data: { name: 'New Name' } })
 * ```
 */
export function useUpdateBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ boardId, data }: { boardId: string; data: UpdateBoardPayload }) =>
      boardsApi.updateBoard(boardId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId] })
    },
  })
}

/**
 * Hook to delete a board.
 * 
 * @example
 * ```tsx
 * const { mutate: deleteBoard } = useDeleteBoard()
 * deleteBoard(boardId)
 * ```
 */
export function useDeleteBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (boardId: string) => boardsApi.deleteBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}

/**
 * Hook to add asset to board.
 * 
 * @example
 * ```tsx
 * const { mutate: addToBoard } = useAddAssetToBoard()
 * addToBoard({ boardId: 'board-123', assetId: 'asset-456' })
 * ```
 */
export function useAddAssetToBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ boardId, assetId }: { boardId: string; assetId: string }) =>
      boardsApi.addAssetToBoard(boardId, assetId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId, 'assets'] })
    },
  })
}

/**
 * Hook to remove asset from board.
 * 
 * @example
 * ```tsx
 * const { mutate: removeFromBoard } = useRemoveAssetFromBoard()
 * removeFromBoard({ boardId: 'board-123', assetId: 'asset-456' })
 * ```
 */
export function useRemoveAssetFromBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ boardId, assetId }: { boardId: string; assetId: string }) =>
      boardsApi.removeAssetFromBoard(boardId, assetId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId, 'assets'] })
    },
  })
}

/**
 * Hook to share a board (generate share link).
 * 
 * @example
 * ```tsx
 * const { mutate: shareBoard } = useShareBoard()
 * shareBoard(boardId)
 * ```
 */
export function useShareBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (boardId: string) => boardsApi.shareBoard(boardId),
    onSuccess: (_, boardId) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['boards', boardId] })
    },
  })
}

/**
 * Hook to unshare a board (remove share link).
 * 
 * @example
 * ```tsx
 * const { mutate: unshareBoard } = useUnshareBoard()
 * unshareBoard(boardId)
 * ```
 */
export function useUnshareBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (boardId: string) => boardsApi.unshareBoard(boardId),
    onSuccess: (_, boardId) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['boards', boardId] })
    },
  })
}

/**
 * Hook to fetch a shared board (public).
 * 
 * @example
 * ```tsx
 * const { data: board } = useSharedBoard(shareToken)
 * ```
 */
export function useSharedBoard(shareToken: string) {
  return useQuery({
    queryKey: ['sharedBoard', shareToken],
    queryFn: () => boardsApi.getSharedBoard(shareToken),
    enabled: !!shareToken,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to fetch assets in a shared board (public).
 * 
 * @example
 * ```tsx
 * const { data } = useSharedBoardAssets(shareToken, 1)
 * ```
 */
export function useSharedBoardAssets(shareToken: string, page: number = 1) {
  return useQuery({
    queryKey: ['sharedBoardAssets', shareToken, page],
    queryFn: async () => {
      const response = await boardsApi.getSharedBoardAssets(shareToken, page)
      return {
        data: toFrontendAssets(response.data),
        meta: response.meta,
      }
    },
    enabled: !!shareToken,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to add a collaborator to a board.
 * 
 * @example
 * ```tsx
 * const { mutate: addCollaborator } = useAddCollaborator()
 * addCollaborator({ boardId: 'board-123', emailOrUsername: 'user@example.com' })
 * ```
 */
export function useAddCollaborator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ boardId, emailOrUsername }: { boardId: string; emailOrUsername: string }) =>
      boardsApi.addCollaborator(boardId, emailOrUsername),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId, 'collaborators'] })
    },
  })
}

/**
 * Hook to remove a collaborator from a board.
 * 
 * @example
 * ```tsx
 * const { mutate: removeCollaborator } = useRemoveCollaborator()
 * removeCollaborator({ boardId: 'board-123', userId: 'user-456' })
 * ```
 */
export function useRemoveCollaborator() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ boardId, userId }: { boardId: string; userId: string }) =>
      boardsApi.removeCollaborator(boardId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId] })
      queryClient.invalidateQueries({ queryKey: ['boards', variables.boardId, 'collaborators'] })
    },
  })
}

/**
 * Hook to get board collaborators.
 * 
 * @example
 * ```tsx
 * const { data: collaborators } = useCollaborators(boardId)
 * ```
 */
export function useCollaborators(boardId: string) {
  return useQuery({
    queryKey: ['boards', boardId, 'collaborators'],
    queryFn: () => boardsApi.getCollaborators(boardId),
    enabled: !!boardId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

/**
 * Hook to join a shared board via share link.
 * 
 * @example
 * ```tsx
 * const { mutate: joinBoard } = useJoinSharedBoard()
 * joinBoard(shareToken)
 * ```
 */
export function useJoinSharedBoard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (shareToken: string) => boardsApi.joinSharedBoard(shareToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] })
    },
  })
}
