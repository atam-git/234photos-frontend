'use client'

import { useState } from 'react'
import { Plus, Lock, Users, MoreHorizontal, Trash2, Edit2, Share2, FolderOpen, LogOut } from 'lucide-react'
import { CreateBoardModal } from '@/components/shared/Modals/CreateBoardModal'
import { ConfirmModal } from '@/components/shared/Modals/ConfirmModal'
import { RenameBoardModal } from '@/components/shared/Modals/RenameBoardModal'
import { ShareBoardModal } from '@/components/shared/Modals/ShareBoardModal'
import Link from 'next/link'
import { useBoards, useDeleteBoard, useRemoveCollaborator, useUpdateBoard } from '@/hooks/useBoards'
import { useAuthStore } from '@/stores/authStore'

export default function BoardsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<{ type: 'delete' | 'leave'; boardId: string; boardName: string } | null>(null)
  const [renameTarget, setRenameTarget] = useState<{ id: string; name: string } | null>(null)
  const [shareTarget, setShareTarget] = useState<{ id: string; name: string; isPublic: boolean; shareLink?: string | null } | null>(null)

  // Fetch boards from API
  const { data: boards = [], isLoading, error } = useBoards()
  const { mutate: deleteBoard } = useDeleteBoard()
  const { mutate: removeCollaborator } = useRemoveCollaborator()
  const { mutate: updateBoard } = useUpdateBoard()
  const currentUser = useAuthStore((state) => state.user)

  const handleRenameBoard = (boardId: string, newName: string) => {
    updateBoard({ boardId, data: { name: newName } })
  }

  const handleDeleteBoard = (boardId: string, boardName: string) => {
    setConfirmAction({ type: 'delete', boardId, boardName })
    setActiveMenu(null)
  }

  const handleLeaveBoard = (boardId: string, boardName: string) => {
    setConfirmAction({ type: 'leave', boardId, boardName })
    setActiveMenu(null)
  }

  const executeConfirmAction = () => {
    if (!confirmAction) return

    if (confirmAction.type === 'delete') {
      deleteBoard(confirmAction.boardId)
    } else if (confirmAction.type === 'leave') {
      removeCollaborator({ boardId: confirmAction.boardId, userId: currentUser!.id })
    }

    setConfirmAction(null)
  }

  // Loading state
  if (isLoading) {
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden animate-pulse">
              <div className="h-[140px] bg-gray-200" />
              <div className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
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
        </div>
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[15px] font-semibold text-[#EE2B24] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Failed to load boards
          </p>
          <p className="text-[13px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    )
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
      {boards.length === 0 ? (
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
            {boards.map((board) => {
              const isOwner = currentUser && board.userId === currentUser.id
              
              return (
                <div key={board.id} className="relative">
                  <Link href={`/boards/${board.id}`} className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden group hover:shadow-md transition-shadow cursor-pointer block">
                    {/* Mosaic thumbnails */}
                    {board.thumbnails.length > 0 ? (
                      <div className="flex gap-0.5 h-[140px]">
                        <div className="flex-[2] overflow-hidden">
                          <img src={board.thumbnails[0]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        {board.thumbnails.length > 1 && (
                          <div className="flex-1 flex flex-col gap-0.5">
                            <div className="flex-1 overflow-hidden">
                              <img src={board.thumbnails[1]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            {board.thumbnails.length > 2 && (
                              <div className="flex-1 overflow-hidden">
                                <img src={board.thumbnails[2]} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-[140px] bg-gray-100 flex items-center justify-center">
                        <FolderOpen className="w-12 h-12 text-gray-300" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {!board.isPublic && <Lock className="w-3 h-3 text-[#888]" />}
                          {board.isPublic && <Users className="w-3 h-3 text-[#888]" />}
                          <p className="text-[13.5px] font-bold text-[#111]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {board.name}
                          </p>
                        </div>
                        <p className="text-[11.5px] text-[#888]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {board.assetCount} assets · Updated {new Date(board.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
                        {/* Rename - only for owner */}
                        {isOwner && (
                          <button
                            onClick={() => {
                              setActiveMenu(null)
                              setRenameTarget({ id: board.id, name: board.name })
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors rounded-lg mx-1"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif', width: 'calc(100% - 8px)' }}>
                            <Edit2 className="w-4 h-4" />
                            Rename
                          </button>
                        )}
                        {/* Share - for everyone if not public */}
                        {isOwner && (
                          <button
                            onClick={() => {
                              setActiveMenu(null)
                              setShareTarget({
                                id: board.id,
                                name: board.name,
                                isPublic: board.isPublic,
                                shareLink: board.shareLink,
                              })
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors rounded-lg mx-1"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif', width: 'calc(100% - 8px)' }}>
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                        )}
                        {/* Delete - only for owner */}
                        {isOwner ? (
                          <>
                            <div className="h-px bg-[#F0F0F0] my-1" />
                            <button
                              onClick={() => handleDeleteBoard(board.id, board.name)}
                              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#EE2B24] hover:bg-[#FFF0F0] transition-colors rounded-lg mx-1"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif', width: 'calc(100% - 8px)' }}>
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </>
                        ) : (
                          /* Leave board - only for collaborators */
                          <>
                            <div className="h-px bg-[#F0F0F0] my-1" />
                            <button
                              onClick={() => handleLeaveBoard(board.id, board.name)}
                              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-[#EE2B24] hover:bg-[#FFF0F0] transition-colors rounded-lg mx-1"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif', width: 'calc(100% - 8px)' }}>
                              <LogOut className="w-4 h-4" />
                              Leave board
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Create Board Modal */}
      {showCreateModal && (
        <CreateBoardModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* Confirm Modal */}
      {confirmAction && (
        <ConfirmModal
          title={confirmAction.type === 'delete' ? 'Delete Board' : 'Leave Board'}
          message={
            confirmAction.type === 'delete'
              ? `Delete "${confirmAction.boardName}"? This cannot be undone and all assets will be removed from the board.`
              : `Leave "${confirmAction.boardName}"? You will lose access to it.`
          }
          confirmText={confirmAction.type === 'delete' ? 'Delete' : 'Leave'}
          variant="danger"
          onConfirm={executeConfirmAction}
          onCancel={() => setConfirmAction(null)}
        />
      )}

      {/* Rename Board Modal */}
      {renameTarget && (
        <RenameBoardModal
          boardId={renameTarget.id}
          currentName={renameTarget.name}
          onClose={() => setRenameTarget(null)}
          onRename={handleRenameBoard}
        />
      )}

      {/* Share Board Modal */}
      {shareTarget && (
        <ShareBoardModal
          boardId={shareTarget.id}
          boardName={shareTarget.name}
          isShared={shareTarget.isPublic}
          shareLink={shareTarget.shareLink || undefined}
          onClose={() => setShareTarget(null)}
        />
      )}
    </div>
  )
}
