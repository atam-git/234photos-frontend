'use client'

import { X, Plus, Check, Lock, Users } from 'lucide-react'
import { useState } from 'react'
import { ModalBackdrop } from './ModalBackdrop'
import type { Asset, AssetDetail } from '@/types'
import { useBoards, useCreateBoard, useAddAssetToBoard, useRemoveAssetFromBoard } from '@/hooks/useBoards'

interface SaveToBoardModalProps {
  asset: Asset | AssetDetail | Partial<AssetDetail>
  onClose: () => void
}

export function SaveToBoardModal({ asset, onClose }: SaveToBoardModalProps) {
  const [creating, setCreating] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')
  const [selectedBoards, setSelectedBoards] = useState<Set<string>>(new Set())
  const [isSaving, setIsSaving] = useState(false)

  // Fetch boards from API
  const { data: boards = [], isLoading } = useBoards()
  const { mutate: createBoard, isPending: isCreating } = useCreateBoard()
  const { mutate: addAsset } = useAddAssetToBoard()
  const { mutate: removeAsset } = useRemoveAssetFromBoard()

  // Check which boards already contain this asset
  // Note: We don't have assetIds in the board list, so we start with empty selection
  const initialBoards = new Set<string>()

  const toggleBoard = (boardId: string) => {
    setSelectedBoards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(boardId)) {
        newSet.delete(boardId)
      } else {
        newSet.add(boardId)
      }
      return newSet
    })
  }

  const handleCreate = () => {
    if (!newBoardName.trim()) return
    
    createBoard(
      {
        name: newBoardName.trim(),
        isPublic: false,
      },
      {
        onSuccess: (newBoard) => {
          // Auto-select the newly created board
          setSelectedBoards(prev => new Set([...prev, newBoard.id]))
          setCreating(false)
          setNewBoardName('')
        },
      }
    )
  }

  const handleSave = async () => {
    if (!asset.id) return
    
    setIsSaving(true)

    // Determine which boards to add to and remove from
    const toAdd = Array.from(selectedBoards).filter(id => !initialBoards.has(id))
    const toRemove = Array.from(initialBoards).filter(id => !selectedBoards.has(id))

    try {
      // Execute all add operations
      for (const boardId of toAdd) {
        await new Promise<void>((resolve, reject) => {
          addAsset(
            { boardId, assetId: asset.id! },
            {
              onSuccess: () => resolve(),
              onError: () => resolve(), // Continue even if one fails
            }
          )
        })
      }

      // Execute all remove operations
      for (const boardId of toRemove) {
        await new Promise<void>((resolve, reject) => {
          removeAsset(
            { boardId, assetId: asset.id! },
            {
              onSuccess: () => resolve(),
              onError: () => resolve(), // Continue even if one fails
            }
          )
        })
      }

      setIsSaving(false)
      onClose()
    } catch (error) {
      console.error('Error saving to boards:', error)
      setIsSaving(false)
    }
  }

  const hasChanges = 
    selectedBoards.size !== initialBoards.size ||
    Array.from(selectedBoards).some(id => !initialBoards.has(id))

  const BoardIcon = ({ isPublic }: { isPublic: boolean }) => {
    if (!isPublic) return <Lock className="w-3 h-3 text-[#888]" />
    return <Users className="w-3 h-3 text-[#888]" />
  }

  // Initialize selected boards on first render
  if (selectedBoards.size === 0 && initialBoards.size > 0) {
    setSelectedBoards(new Set(initialBoards))
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full max-w-[420px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0F0F0]">
          <h2
            className="text-[15px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Save to board
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F7] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-[#444]" />
          </button>
        </div>

        {/* Asset preview */}
        <div className="flex items-center gap-3 px-5 py-3 bg-[#FAFAFA] border-b border-[#F0F0F0]">
          <img src={asset.src || '/placeholder.jpg'} alt={asset.alt || 'Asset'} className="w-10 h-10 rounded-lg object-cover" />
          <p className="text-[12.5px] font-medium text-[#444] line-clamp-1" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {asset.title || asset.alt || 'Untitled Asset'}
          </p>
        </div>

        {/* Board list */}
        <div className="max-h-[320px] overflow-y-auto">
          {isLoading ? (
            <div className="px-5 py-8 text-center">
              <div className="inline-block w-6 h-6 border-2 border-[#EE2B24] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : boards.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-[13px] text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No boards yet. Create one below.
              </p>
            </div>
          ) : (
            boards.map((board) => {
              const isSelected = selectedBoards.has(board.id)
              return (
                <button
                  key={board.id}
                  onClick={() => toggleBoard(board.id)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F7] transition-colors text-left"
                >
                  {/* Thumbnail */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                    {board.thumbnails?.[0] ? (
                      <img src={board.thumbnails[0]} alt={board.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#BBBBBB]">
                        📋
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-semibold text-[#111] truncate" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {board.name}
                      </span>
                      <BoardIcon isPublic={board.isPublic} />
                    </div>
                    <span className="text-[11.5px] text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {board.assetCount} assets
                    </span>
                  </div>

                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-[#EE2B24] border-[#EE2B24]' : 'border-[#D0D0D0]'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Create new board */}
        <div className="border-t border-[#F0F0F0] px-5 py-3">
          {creating ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Board name…"
                autoFocus
                disabled={isCreating}
                className="flex-1 h-9 px-3 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors disabled:opacity-50"
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreate() }}
              />
              <button
                onClick={handleCreate}
                disabled={!newBoardName.trim() || isCreating}
                className="px-3 py-1.5 bg-[#111] text-white text-[12.5px] font-semibold rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
              <button
                onClick={() => {
                  setCreating(false)
                  setNewBoardName('')
                }}
                disabled={isCreating}
                className="px-3 py-1.5 text-[#666] text-[12.5px] font-medium hover:text-[#111] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-2 text-[13px] font-semibold text-[#EE2B24] hover:text-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Create new board
            </button>
          )}
        </div>

        {/* Save button */}
        <div className="px-5 pb-4 pt-2">
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="w-full py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {isSaving ? 'Saving...' : hasChanges ? `Save to ${selectedBoards.size} board${selectedBoards.size !== 1 ? 's' : ''}` : 'No changes'}
          </button>
        </div>
      </div>
    </ModalBackdrop>
  )
}
