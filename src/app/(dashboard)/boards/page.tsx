'use client'

import { useState } from 'react'
import { Plus, Lock, Users, MoreHorizontal, Trash2, Edit2, Share2, FolderOpen } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { CreateBoardModal } from '@/components/shared/Modals/CreateBoardModal'
import Link from 'next/link'

const BOARDS = [
  { id: '1', name: 'Campaign Q3 2024', count: 24, type: 'shared' as const, updatedAt: '2 hours ago', thumbnails: MOCK_ASSETS.slice(0, 3).map(a => a.src) },
  { id: '2', name: 'Brand Assets', count: 12, type: 'private' as const, updatedAt: 'Yesterday', thumbnails: MOCK_ASSETS.slice(3, 6).map(a => a.src) },
  { id: '3', name: 'Inspiration', count: 47, type: 'private' as const, updatedAt: '3 days ago', thumbnails: MOCK_ASSETS.slice(6, 9).map(a => a.src) },
  { id: '4', name: 'Team Collection', count: 8, type: 'team' as const, updatedAt: 'Last week', thumbnails: MOCK_ASSETS.slice(9, 12).map(a => a.src) },
]

export default function BoardsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleDeleteBoard = (boardId: string, boardName: string) => {
    if (confirm(`Delete "${boardName}"? This cannot be undone.`)) {
      console.log('Delete board:', boardId)
      setActiveMenu(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Boards
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Organise and share your saved assets
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] text-white text-[13px] font-semibold rounded-full hover:bg-[#333] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          <Plus className="w-4 h-4" /> New board
        </button>
      </div>

      {/* Empty state */}
      {BOARDS.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mb-4">
            <FolderOpen className="w-7 h-7 text-[#BBBBBB]" />
          </div>
          <p className="text-[15px] font-semibold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No boards yet
          </p>
          <p className="text-[13px] text-[#888] mb-6 max-w-[400px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Create boards to organize your saved assets into collections
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Create your first board
          </button>
        </div>
      ) : (
        <>
          {/* Board grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BOARDS.map((board) => (
              <div key={board.id} className="relative">
                <Link href={`/boards/${board.id}`} className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden group hover:shadow-md transition-shadow cursor-pointer block">
                  {/* Mosaic thumbnails */}
                  <div className="flex gap-0.5 h-[140px]">
                    <div className="flex-[2] overflow-hidden">
                      <img src={board.thumbnails[0]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="flex-1 overflow-hidden">
                        <img src={board.thumbnails[1]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <img src={board.thumbnails[2]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {board.type === 'private' && <Lock className="w-3 h-3 text-[#888]" />}
                        {board.type === 'shared' && <Users className="w-3 h-3 text-[#888]" />}
                        {board.type === 'team' && <Users className="w-3 h-3 text-[#EE2B24]" />}
                        <p className="text-[13.5px] font-bold text-[#111]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {board.name}
                        </p>
                      </div>
                      <p className="text-[11.5px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {board.count} assets · Updated {board.updatedAt}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* More menu button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setActiveMenu(activeMenu === board.id ? null : board.id)
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-sm z-10">
                  <MoreHorizontal className="w-4 h-4 text-[#888]" />
                </button>

                {/* Dropdown menu */}
                {activeMenu === board.id && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)} />
                    <div className="absolute top-12 right-3 w-[180px] bg-white rounded-xl shadow-lg border border-[#F0F0F0] py-2 z-50">
                      <button
                        onClick={() => {
                          setActiveMenu(null)
                          // TODO: Open edit modal
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        <Edit2 className="w-4 h-4" />
                        Rename
                      </button>
                      {board.type === 'private' && (
                        <button
                          onClick={() => {
                            setActiveMenu(null)
                            // TODO: Share board
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      )}
                      <div className="h-px bg-[#F0F0F0] my-1" />
                      <button
                        onClick={() => handleDeleteBoard(board.id, board.name)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#EE2B24] hover:bg-[#FFF0F0] transition-colors"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Create Board Modal */}
      {showCreateModal && (
        <CreateBoardModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}
