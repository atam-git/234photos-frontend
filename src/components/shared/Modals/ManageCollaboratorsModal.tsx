'use client'

import { useState } from 'react'
import { X, Mail, UserPlus, Trash2, Users, Crown, Link2, Check } from 'lucide-react'
import { useCollaborators, useAddCollaborator, useRemoveCollaborator } from '@/hooks/useBoards'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/components/ui/toast-provider'
import { ConfirmModal } from './ConfirmModal'

interface ManageCollaboratorsModalProps {
  boardId: string
  boardName: string
  boardOwnerId: string
  boardOwnerName?: string
  boardOwnerUsername?: string
  boardOwnerAvatar?: string
  boardShareLink?: string
  onClose: () => void
}

export function ManageCollaboratorsModal({ 
  boardId, 
  boardName, 
  boardOwnerId,
  boardOwnerName,
  boardOwnerUsername,
  boardOwnerAvatar,
  boardShareLink,
  onClose 
}: ManageCollaboratorsModalProps) {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [copied, setCopied] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{ type: 'remove' | 'leave'; userId: string; userName: string } | null>(null)
  const currentUser = useAuthStore((state) => state.user)
  const { showToast } = useToast()

  // Fetch collaborators
  const { data: collaborators = [], isLoading } = useCollaborators(boardId)
  const { mutate: addCollaborator, isPending: isAdding } = useAddCollaborator()
  const { mutate: removeCollaborator, isPending: isRemoving } = useRemoveCollaborator()

  const isOwner = currentUser?.id === boardOwnerId

  const handleCopyLink = () => {
    if (boardShareLink) {
      const fullUrl = `${window.location.origin}/boards/shared/${boardShareLink}`
      navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailOrUsername.trim()) return

    addCollaborator(
      { boardId, emailOrUsername: emailOrUsername.trim() },
      {
        onSuccess: () => {
          setEmailOrUsername('')
        },
        onError: (error: any) => {
          showToast('error', error.response?.data?.message || 'Failed to add collaborator')
        },
      }
    )
  }

  const handleRemove = (userId: string, userName: string) => {
    setConfirmAction({ type: 'remove', userId, userName })
  }

  const handleLeave = () => {
    setConfirmAction({ type: 'leave', userId: currentUser!.id, userName: 'yourself' })
  }

  const executeConfirmAction = () => {
    if (!confirmAction) return

    removeCollaborator({ boardId, userId: confirmAction.userId }, {
      onSuccess: () => {
        if (confirmAction.type === 'leave') {
          onClose()
          window.location.href = '/boards'
        }
      },
    })

    setConfirmAction(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-[520px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <div>
            <h2 className="text-[16px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Manage Collaborators
            </h2>
            <p className="text-[12px] text-[#888] mt-0.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {boardName}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F7] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex flex-col gap-5">
            {/* Copy link button - show if board is shared */}
            {boardShareLink && (
              <div className="p-4 bg-[#F8F8F8] rounded-xl">
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Link2 className="w-3.5 h-3.5 inline mr-1" />
                  Share Link
                </label>
                <button
                  onClick={handleCopyLink}
                  className="w-full h-[40px] bg-white border border-[#D0D0D0] rounded-lg text-[13px] font-medium text-[#111] hover:bg-[#F5F5F7] transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Copy share link
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Invite form - only show if user is owner */}
            {isOwner && (
              <form onSubmit={handleInvite} className="p-4 bg-[#F8F8F8] rounded-xl">
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <UserPlus className="w-3.5 h-3.5 inline mr-1" />
                  Invite People
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="email@example.com or username"
                    disabled={isAdding}
                    className="flex-1 h-[40px] px-3 border border-[#D0D0D0] rounded-lg text-[13px] text-[#111] outline-none focus:border-[#111] transition-colors bg-white disabled:opacity-50"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!emailOrUsername.trim() || isAdding}
                  className="w-full h-[36px] bg-[#EE2B24] text-white text-[13px] font-semibold rounded-lg hover:bg-[#d42520] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Mail className="w-4 h-4" />
                  {isAdding ? 'Adding...' : 'Add Collaborator'}
                </button>
              </form>
            )}

            {/* Collaborators list */}
            <div>
              <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                People with access ({1 + collaborators.length})
              </label>
              
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-6 h-6 border-2 border-[#EE2B24] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {/* Board Owner */}
                  <div className="flex items-center gap-3 p-3 bg-[#FFF9F8] border border-[#FFE5E0] rounded-xl">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E8E8E8] shrink-0">
                      {boardOwnerAvatar ? (
                        <img src={boardOwnerAvatar} alt={boardOwnerName || 'Owner'} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#EE2B24] flex items-center justify-center">
                          <span className="text-white text-[14px] font-bold">
                            {(boardOwnerName || 'O').split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#111] truncate"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {boardOwnerName || 'Board Owner'}
                        {currentUser?.id === boardOwnerId && (
                          <span className="text-[#888] font-normal"> (You)</span>
                        )}
                      </p>
                      <p className="text-[11.5px] text-[#888] truncate"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {boardOwnerUsername ? `@${boardOwnerUsername}` : 'Owner'}
                      </p>
                    </div>

                    {/* Owner badge */}
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#EE2B24] rounded text-[11px] font-medium text-white"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      <Crown className="w-3 h-3" />
                      Owner
                    </div>
                  </div>

                  {/* Collaborators */}
                  {collaborators.length === 0 ? (
                    <div className="text-center py-6">
                      <Users className="w-10 h-10 text-[#BBBBBB] mx-auto mb-2" />
                      <p className="text-[12px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        No collaborators yet
                      </p>
                    </div>
                  ) : (
                    collaborators.map((collaborator: any) => (
                      <div key={collaborator.userId} className="flex items-center gap-3 p-3 bg-white border border-[#F0F0F0] rounded-xl hover:border-[#D0D0D0] transition-colors">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E8E8E8] shrink-0">
                          {collaborator.avatar ? (
                            <img src={collaborator.avatar} alt={collaborator.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#EE2B24] flex items-center justify-center">
                              <span className="text-white text-[14px] font-bold">
                                {collaborator.name.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[#111] truncate"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {collaborator.name}
                            {currentUser?.id === collaborator.userId && (
                              <span className="text-[#888] font-normal"> (You)</span>
                            )}
                          </p>
                          <p className="text-[11.5px] text-[#888] truncate"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            @{collaborator.username}
                          </p>
                        </div>

                        {/* Role badge */}
                        <div className="px-2 py-1 bg-[#F0F0F0] rounded text-[11px] font-medium text-[#666]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          Can edit
                        </div>

                        {/* Remove button - only show if current user is owner */}
                        {isOwner && (
                          <button
                            onClick={() => handleRemove(collaborator.userId, collaborator.name)}
                            disabled={isRemoving}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50"
                            title="Remove">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 bg-[#F8F8F8] rounded-xl">
              <p className="text-[12px] text-[#666] leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                💡 Collaborators can add and remove assets from this board. The board will appear in their boards list.
              </p>
            </div>

            {/* Leave board button - only for collaborators (not owner) */}
            {!isOwner && (
              <button
                onClick={handleLeave}
                disabled={isRemoving}
                className="w-full h-[40px] border border-red-200 text-red-600 text-[13px] font-semibold rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Trash2 className="w-4 h-4" />
                Leave board
              </button>
            )}
          </div>
        </div>

        {/* Confirm Modal */}
        {confirmAction && (
          <ConfirmModal
            title={confirmAction.type === 'remove' ? 'Remove Collaborator' : 'Leave Board'}
            message={
              confirmAction.type === 'remove'
                ? `Remove ${confirmAction.userName} from this board?`
                : 'Leave this board? You will lose access to it.'
            }
            confirmText={confirmAction.type === 'remove' ? 'Remove' : 'Leave'}
            variant="danger"
            onConfirm={executeConfirmAction}
            onCancel={() => setConfirmAction(null)}
          />
        )}
      </div>
    </div>
  )
}


