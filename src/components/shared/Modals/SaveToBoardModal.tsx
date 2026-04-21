'use client'

import { X, Plus, Check, Lock, Users } from 'lucide-react'
import { useState } from 'react'
import { ModalBackdrop } from './ModalBackdrop'
import { Asset } from '@/components/features/search/AssetCard'

interface Board {
  id: string
  name: string
  count: number
  type: 'private' | 'shared' | 'team'
  thumbnail?: string
}

const MOCK_BOARDS: Board[] = [
  { id: '1', name: 'Campaign Q3 2024', count: 24, type: 'shared', thumbnail: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=80&q=80' },
  { id: '2', name: 'Brand Assets', count: 12, type: 'private', thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=80&q=80' },
  { id: '3', name: 'Inspiration', count: 47, type: 'private', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80' },
  { id: '4', name: 'Team Collection', count: 8, type: 'team', thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=80&q=80' },
]

interface SaveToBoardModalProps {
  asset: Asset
  onClose: () => void
}

export function SaveToBoardModal({ asset, onClose }: SaveToBoardModalProps) {
  const [saved, setSaved] = useState<string[]>([])
  const [creating, setCreating] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')

  const toggleBoard = (id: string) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  const handleCreate = () => {
    if (!newBoardName.trim()) return
    setCreating(false)
    setNewBoardName('')
  }

  const BoardIcon = ({ type }: { type: Board['type'] }) => {
    if (type === 'private') return <Lock className="w-3 h-3 text-[#888]" />
    if (type === 'shared') return <Users className="w-3 h-3 text-[#888]" />
    return <Users className="w-3 h-3 text-[#EE2B24]" />
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full max-w-[400px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

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
          <img src={asset.src} alt={asset.alt} className="w-10 h-10 rounded-lg object-cover" />
          <p className="text-[12.5px] font-medium text-[#444] line-clamp-1" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {asset.alt}
          </p>
        </div>

        {/* Board list */}
        <div className="max-h-[280px] overflow-y-auto">
          {MOCK_BOARDS.map((board) => {
            const isSaved = saved.includes(board.id)
            return (
              <button
                key={board.id}
                onClick={() => toggleBoard(board.id)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#F5F5F7] transition-colors text-left"
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                  {board.thumbnail && (
                    <img src={board.thumbnail} alt={board.name} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-[#111] truncate" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {board.name}
                    </span>
                    <BoardIcon type={board.type} />
                  </div>
                  <span className="text-[11.5px] text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {board.count} assets
                  </span>
                </div>

                {/* Check */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSaved ? 'bg-[#EE2B24] border-[#EE2B24]' : 'border-[#D0D0D0]'
                }`}>
                  {isSaved && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            )
          })}
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
                className="flex-1 h-9 px-3 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors"
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreate() }}
              />
              <button
                onClick={handleCreate}
                className="px-3 py-1.5 bg-[#111] text-white text-[12.5px] font-semibold rounded-lg hover:bg-[#333] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Create
              </button>
              <button
                onClick={() => setCreating(false)}
                className="px-3 py-1.5 text-[#666] text-[12.5px] font-medium hover:text-[#111] transition-colors"
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

        {/* Done */}
        {saved.length > 0 && (
          <div className="px-5 pb-4">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Done · Saved to {saved.length} board{saved.length > 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </ModalBackdrop>
  )
}
