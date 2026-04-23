'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Share2, MoreHorizontal, Download, Heart, Trash2, Edit2 } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { MOCK_BOARDS } from '@/lib/mock'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { ShareBoardModal } from '@/components/shared/Modals/ShareBoardModal'
import { ManageCollaboratorsModal } from '@/components/shared/Modals/ManageCollaboratorsModal'
import type { Asset, ModalState } from '@/types'
import Link from 'next/link'

export default function BoardDetailPage() {
  const params = useParams()
  const router = useRouter()
  const boardId = params.id as string
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [showMenu, setShowMenu] = useState(false)
  const [likedAssets, setLikedAssets] = useState<Set<string>>(new Set())
  
  const board = MOCK_BOARDS.find(b => b.id === boardId)
  
  if (!board) {
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

  // Mock assets for this board
  const boardAssets = MOCK_ASSETS.slice(0, board.count)

  const handleRemoveFromBoard = (assetId: string, assetName: string) => {
    if (confirm(`Remove "${assetName}" from this board?`)) {
      console.log('Remove asset:', assetId)
    }
  }

  const toggleLike = (assetId: string) => {
    setLikedAssets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(assetId)) {
        newSet.delete(assetId)
      } else {
        newSet.add(assetId)
      }
      return newSet
    })
  }

  const handleDeleteBoard = () => {
    if (confirm(`Delete "${board.name}"? This cannot be undone.`)) {
      console.log('Delete board:', boardId)
      router.push('/boards')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#666] hover:text-[#111] mb-4 text-[14px] font-medium transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to boards
        </button>

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
                {board.count} assets
              </span>
              {board.collaborators && (
                <>
                  <span>•</span>
                  <button
                    onClick={() => setModal({ type: 'collaborators' })}
                    className="hover:text-[#EE2B24] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {board.collaborators} collaborator{board.collaborators > 1 ? 's' : ''}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            {(board.type === 'shared' || board.type === 'team') && (
              <button 
                onClick={() => setModal({ type: 'share' })}
                className="flex items-center gap-2 px-4 py-2 border border-[#D0D0D0] text-[#111] text-[13px] font-medium rounded-full hover:bg-[#F5F5F7] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Share2 className="w-4 h-4" />
                Share
              </button>
            )}
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full border border-[#D0D0D0] hover:bg-[#F5F5F7] flex items-center justify-center transition-colors">
              <MoreHorizontal className="w-4 h-4 text-[#666]" />
            </button>

            {/* More menu dropdown */}
            {showMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                <div className="absolute top-full right-0 mt-2 w-[180px] bg-white rounded-xl shadow-lg border border-[#F0F0F0] py-2 z-50">
                  <button
                    onClick={() => {
                      setShowMenu(false)
                      // TODO: Open rename modal
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Edit2 className="w-4 h-4" />
                    Rename
                  </button>
                  <div className="h-px bg-[#F0F0F0] my-1" />
                  <button
                    onClick={() => {
                      setShowMenu(false)
                      handleDeleteBoard()
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#EE2B24] hover:bg-[#FFF0F0] transition-colors"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Trash2 className="w-4 h-4" />
                    Delete board
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Assets grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {boardAssets.map((asset) => (
          <div key={asset.id} className="group relative">
            <button 
              onClick={() => setModal({ type: 'preview', asset })}
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
                  setModal({ type: 'download', asset })
                }}
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
                title="Download">
                <Download className="w-4 h-4 text-[#111]" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLike(asset.id)
                }}
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
                title="Like">
                <Heart className={`w-4 h-4 ${likedAssets.has(asset.id) ? 'fill-[#EE2B24] text-[#EE2B24]' : 'text-[#111]'}`} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFromBoard(asset.id, asset.alt)
                }}
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
                title="Remove from board">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
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
          <Link href="/search" className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
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
          boardName={board.name}
          shareLink={board.shareLink}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'collaborators' && (
        <ManageCollaboratorsModal
          boardName={board.name}
          collaborators={[]}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
    </div>
  )
}
