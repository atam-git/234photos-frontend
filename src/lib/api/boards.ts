import { api } from './client'
import type { BackendAsset, PaginatedAssets } from './assets'

export interface Board {
  id: string
  name: string
  description: string | null
  userId: string
  isPublic: boolean
  shareLink?: string
  assetCount: number
  thumbnails: string[]
  owner?: {
    id: string
    name: string
    username: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateBoardPayload {
  name: string
  description?: string
  isPublic?: boolean
}

export interface UpdateBoardPayload {
  name?: string
  description?: string
  isPublic?: boolean
}

export interface BoardActionResponse {
  success: boolean
  message: string
  added?: boolean
  removed?: boolean
}

/**
 * Get user's boards
 */
export async function getBoards(): Promise<Board[]> {
  return api.get<Board[]>('/boards')
}

/**
 * Get single board by ID
 */
export async function getBoard(boardId: string): Promise<Board> {
  return api.get<Board>(`/boards/${boardId}`)
}

/**
 * Get assets in a board
 */
export async function getBoardAssets(boardId: string, page: number = 1, limit: number = 50): Promise<PaginatedAssets> {
  return api.get<PaginatedAssets>(`/boards/${boardId}/assets?page=${page}&limit=${limit}`)
}

/**
 * Create a new board
 */
export async function createBoard(data: CreateBoardPayload): Promise<Board> {
  return api.post<Board>('/boards', data)
}

/**
 * Update a board
 */
export async function updateBoard(boardId: string, data: UpdateBoardPayload): Promise<Board> {
  return api.patch<Board>(`/boards/${boardId}`, data)
}

/**
 * Delete a board
 */
export async function deleteBoard(boardId: string): Promise<{ success: boolean; message: string }> {
  return api.delete(`/boards/${boardId}`)
}

/**
 * Add asset to board
 */
export async function addAssetToBoard(boardId: string, assetId: string): Promise<BoardActionResponse> {
  return api.post<BoardActionResponse>(`/boards/${boardId}/assets`, { assetId })
}

/**
 * Remove asset from board
 */
export async function removeAssetFromBoard(boardId: string, assetId: string): Promise<BoardActionResponse> {
  return api.delete<BoardActionResponse>(`/boards/${boardId}/assets/${assetId}`)
}

/**
 * Share a board (generate share link)
 */
export async function shareBoard(boardId: string): Promise<Board> {
  return api.post<Board>(`/boards/${boardId}/share`)
}

/**
 * Unshare a board (remove share link)
 */
export async function unshareBoard(boardId: string): Promise<Board> {
  return api.post<Board>(`/boards/${boardId}/unshare`)
}

/**
 * Get shared board by token (public)
 */
export async function getSharedBoard(shareToken: string): Promise<Board & { owner: { id: string; name: string; username: string; avatar?: string } }> {
  return api.get(`/boards/shared/${shareToken}`)
}

/**
 * Get assets in shared board (public)
 */
export async function getSharedBoardAssets(shareToken: string, page: number = 1, limit: number = 50): Promise<PaginatedAssets> {
  return api.get<PaginatedAssets>(`/boards/shared/${shareToken}/assets?page=${page}&limit=${limit}`)
}

/**
 * Add collaborator to board
 */
export async function addCollaborator(boardId: string, emailOrUsername: string): Promise<{ success: boolean; message: string; user?: any }> {
  const isEmail = emailOrUsername.includes('@')
  return api.post(`/boards/${boardId}/collaborators`, 
    isEmail ? { email: emailOrUsername } : { username: emailOrUsername }
  )
}

/**
 * Remove collaborator from board
 */
export async function removeCollaborator(boardId: string, userId: string): Promise<{ success: boolean; message: string }> {
  return api.delete(`/boards/${boardId}/collaborators/${userId}`)
}

/**
 * Get board collaborators
 */
export async function getCollaborators(boardId: string): Promise<any[]> {
  return api.get(`/boards/${boardId}/collaborators`)
}

/**
 * Join shared board via share link (adds user as collaborator)
 */
export async function joinSharedBoard(shareToken: string): Promise<{ success: boolean; message: string; boardId: string; alreadyMember: boolean }> {
  return api.post(`/boards/shared/${shareToken}/join`)
}

export const boardsApi = {
  getBoards,
  getBoard,
  getBoardAssets,
  createBoard,
  updateBoard,
  deleteBoard,
  addAssetToBoard,
  removeAssetFromBoard,
  shareBoard,
  unshareBoard,
  getSharedBoard,
  getSharedBoardAssets,
  addCollaborator,
  removeCollaborator,
  getCollaborators,
  joinSharedBoard,
}
