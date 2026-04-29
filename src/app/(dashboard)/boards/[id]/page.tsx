'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Share2, MoreHorizontal, Download, Heart, Trash2, Edit2, Users } from 'lucide-react'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { ShareBoardModal } from '@/components/shared/Modals/ShareBoardModal'
import { ManageCollaboratorsModal } from '@/components/shared/Modals/ManageCollaboratorsModal'
import { RenameBoardModal } from '@/components/shared/Modals/RenameBoardModal'
import { ConfirmModal } from '@/components/shared/Modals/ConfirmModal'
import type { Asset, ModalState } from '@/types'
import Link from 'next/link'
import { useBoard, useBoardAssets, useDeleteBoard, useRemoveAssetFromBoard, useUpdateBoard } from '@/hooks/useBoards'
import { useLikeAsset, useUnlikeAsset, useIsLiked } from '@/hooks/useLikes'
import { useAuthStore } from '@/stores/authStore'

// Separate component to properly use hooks
interface BoardAssetCardProps {
  asset: Asset
  onPreview: () => void
  onDownload: () => void
  onToggleLike: (assetId: string, isLiked: boolean) => void
  onRemove: (assetId: string, assetName: string) => void
}

function BoardAssetCard({ asset, onPreview, onDownload, onToggleLike, onRemove }: BoardAssetCardProps) {
  const { data: isLiked } = useIsLiked(asset.id)

  return (
    <div className="group relative">
      <button 
        onClick={onPreview}
        className="block aspect-square rounded-xl overflow-hidden bg-[#F5F5F5] w-full relative z-10">
        <img 
          src={asset.src} 
          alt={asset.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </button>

      {/* Hover actions */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 pointer-events-none z-20">
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onDownload()
          }}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
          title="Download">
          <Download className="w-4 h-4 text-[#111]" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onToggleLike(asset.id, isLiked || false)
          }}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
          title="Like">
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#EE2B24] text-[#EE2B24]' : 'text-[#111]'}`} />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onRemove(asset.id, asset.title)
          }}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
          title="Remove from board">
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  )
}

export default function BoardDetailPage() {
  const params = useParams()
  const router = useRouter()
  const boardId = params.id as string
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [showMenu, setShowMenu] = useState(false)
  
  // Fetch board and assets
  const { data: board, isLoading: boardLoading, error: boardError } = useBoard(boardId)
  const { data: assetsData, isLoading: assetsLoading } = useBoardAssets(boardId)
  const { mutate: deleteBoard } = useDeleteBoard()
  const { mutate: removeAsset } = useRemoveAssetFromBoard()
  const { mutate: updateBoard } = useUpdateBoard()
  const { mutate: likeAsset } = useLikeAsset()
  const { mutate: unlikeAsset } = useUnlikeAsset()

  // Get current user from auth store
  const currentUser = useAuthStore((state) => state.user)
  const isOwner = board && currentUser && board.userId === currentUser.id

  const handleRenameBoard = (boardId: string, newName: string) => {
    updateBoard({ boardId, data: { name: newName } })
  }

  // Loading state
  if (boardLoading || assetsLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
          <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  // Error or not found
  if (boardError || !board) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">📋</div>
          <h2 className="text-xl font-semibold text-[#111] mb-2">Board not found</h2>
          <Link href="/boards" className="text-[#EE2B24] hover:underline">
            Back to boards
          </Link>
        </div>
      </div>
    )
  }

  const boardAssets = assetsData?.data || []

  const handleRemoveFromBoard = (assetId: string, assetName: string) => {
    setModal({ 
      type: 'confirm', 
      title: 'Remove Asset',
      message: `Remove "${assetName}" from this board?`,
      confirmText: 'Remove',
      variant: 'danger',
      onConfirm: () => {
        removeAsset({ boardId, assetId })
        setModal({ type: 'none' })
      }
    })
  }

  const toggleLike = (assetId: string, isLiked: boolean) => {
    if (isLiked) {
      unlikeAsset(assetId)
    } else {
      likeAsset(assetId)
    }
  }

  const handleDeleteBoard = () => {
    setModal({ 
      type: 'confirm', 
      title: 'Delete Board',
      message: `Delete "${board.name}"? This cannot be undone and all assets will be removed from the board.`,
      confirmText: 'Delete',
      variant: 'danger',
      onConfirm: () => {
        deleteBoard(boardId, {
          onSuccess: () => {
            router.push('/boards')
          },
        })
        setModal({ type: 'none' })
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <Link
          href="/boards"
          className="flex items-center gap-2 text-[#666] hover:text-[#111] mb-4 text-[14px] font-medium transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to boards
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-[22px] font-extrabold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {board.name}
            </h1>
            {board.description && (
              <p className="text-[14px] text-[#666] mt-1 mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {board.description}
              </p>
            )}
            <div className="flex items-center gap-3 text-[13px] text-[#888] mt-2">
              <span style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {board.assetCount} assets
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* Share button - for everyone */}
            <button 
              onClick={() => {
                console.log('Share button clicked, board:', board)
                setModal({ type: 'share' })
              }}
              className="flex items-center gap-2 px-4 py-2 border border-[#D0D0D0] text-[#111] text-[13px] font-medium rounded-full hover:bg-[#F5F5F7] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button 
              onClick={() => {
                console.log('Menu button clicked, showMenu:', showMenu)
                setShowMenu(!showMenu)
              }}
              className="w-9 h-9 rounded-full border border-[#D0D0D0] hover:bg-[#F5F5F7] flex items-center justify-center transition-colors">
              <MoreHorizontal className="w-4 h-4 text-[#666]" />
            </button>

            {/* More menu dropdown */}
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute top-full right-0 mt-2 w-[200px] bg-white rounded-xl shadow-lg border border-[#F0F0F0] py-2 z-50">
                  {/* Rename - only for owner */}
                  {isOwner && (
                    <button
                      onClick={() => {
                        console.log('Rename clicked')
                        setShowMenu(false)
                        setModal({ type: 'rename' })
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors rounded-lg mx-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif', width: 'calc(100% - 8px)' }}>
                      <Edit2 className="w-4 h-4" />
                      Rename
                    </button>
                  )}
                  {/* Collaborators - for everyone */}
                  <button
                    onClick={() => {
                      console.log('Manage Collaborators clicked')
                      setShowMenu(false)
                      setModal({ type: 'collaborators' })
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors whitespace-nowrap rounded-lg mx-1"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif', width: 'calc(100% - 8px)' }}>
                    <Users className="w-4 h-4" />
                    {isOwner ? 'Manage Collaborators' : 'View Collaborators'}
                  </button>
                  {/* Delete - only for owner */}
                  {isOwner && (
                    <>
                      <div className="h-px bg-[#F0F0F0] my-1" />
                      <button
                        onClick={() => {
                          setShowMenu(false)
                          handleDeleteBoard()
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#EE2B24] hover:bg-[#FFF0F0] transition-colors rounded-lg mx-1"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif', width: 'calc(100% - 8px)' }}>
                        <Trash2 className="w-4 h-4" />
                        Delete board
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Assets grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {boardAssets.map((asset) => (
          <BoardAssetCard
            key={asset.id}
            asset={asset}
            onPreview={() => setModal({ type: 'preview', asset })}
            onDownload={() => setModal({ type: 'download', asset })}
            onToggleLike={toggleLike}
            onRemove={handleRemoveFromBoard}
          />
        ))}
      </div>

      {/* Empty state if no assets */}
      {boardAssets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 text-5xl">📋</div>
          <h3 className="text-[18px] font-bold text-[#111] mb-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No assets yet
          </h3>
          <p className="text-[13px] text-[#666] mb-4"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Start adding assets to this board
          </p>
          <Link href="/discover" className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Browse assets
          </Link>
        </div>
      )}

      {/* Modals */}
      {modal.type === 'preview' && modal.asset && (
        <QuickPreviewModal 
          asset={modal.asset} 
          assets={boardAssets}
          onClose={() => setModal({ type: 'none' })}
          onDownload={(asset) => setModal({ type: 'download', asset })}
          onSaveToBoard={() => {}}
          onAuthRequired={() => {}}
        />
      )}
      {modal.type === 'download' && modal.asset && (
        <DownloadModal
          asset={modal.asset}
          onClose={() => setModal({ type: 'none' })}
          onConfirm={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'share' && (
        <ShareBoardModal
          boardId={board.id}
          boardName={board.name}
          isShared={board.isPublic}
          shareLink={board.shareLink || undefined}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'collaborators' && (
        <ManageCollaboratorsModal
          boardId={board.id}
          boardName={board.name}
          boardOwnerId={board.userId}
          boardOwnerName={board.owner?.name}
          boardOwnerUsername={board.owner?.username}
          boardOwnerAvatar={board.owner?.avatar}
          boardShareLink={board.shareLink}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'rename' && (
        <RenameBoardModal
          boardId={board.id}
          currentName={board.name}
          onClose={() => setModal({ type: 'none' })}
          onRename={handleRenameBoard}
        />
      )}
      {modal.type === 'confirm' && (
        <ConfirmModal
          title={modal.title}
          message={modal.message}
          confirmText={modal.confirmText}
          variant={modal.variant}
          onConfirm={modal.onConfirm}
          onCancel={() => setModal({ type: 'none' })}
        />
      )}
    </div>
  )
}
