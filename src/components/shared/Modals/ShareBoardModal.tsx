'use client'

import { useState, useEffect } from 'react'
import { X, Copy, Check, Globe, Lock } from 'lucide-react'
import { useShareBoard, useUnshareBoard } from '@/hooks/useBoards'

interface ShareBoardModalProps {
  boardId: string
  boardName: string
  isShared: boolean
  shareLink?: string
  onClose: () => void
}

export function ShareBoardModal({ boardId, boardName, isShared: initialIsShared, shareLink: initialShareLink, onClose }: ShareBoardModalProps) {
  const [copied, setCopied] = useState(false)
  const [isShared, setIsShared] = useState(initialIsShared)
  const [shareToken, setShareToken] = useState(initialShareLink || '')
  
  const { mutate: shareBoard, isPending: isSharing } = useShareBoard()
  const { mutate: unshareBoard, isPending: isUnsharing } = useUnshareBoard()

  const shareUrl = shareToken ? `${window.location.origin}/boards/shared/${shareToken}` : ''

  const handleShare = () => {
    shareBoard(boardId, {
      onSuccess: (board) => {
        setIsShared(true)
        setShareToken(board.shareLink || '')
      },
      onError: (error) => {
        console.error('Share error:', error)
      },
    })
  }

  const handleUnshare = () => {
    if (confirm('Remove share link? Anyone with the link will lose access.')) {
      unshareBoard(boardId, {
        onSuccess: () => {
          setIsShared(false)
          setShareToken('')
        },
        onError: (error) => {
          console.error('Unshare error:', error)
        },
      })
    }
  }

  const handleCopy = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-[480px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[16px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Share "{boardName}"
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F7] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-5">
          {!isShared ? (
            <>
              {/* Not shared state */}
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#F8F8F8] flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#888]" />
                </div>
                <h3 className="text-[15px] font-bold text-[#111] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  This board is private
                </h3>
                <p className="text-[13px] text-[#666] mb-6 max-w-[320px] mx-auto"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Generate a share link to let others view this board
                </p>
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="px-6 py-2.5 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Globe className="w-4 h-4" />
                  {isSharing ? 'Generating...' : 'Generate Share Link'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Shared state */}
              <div>
                <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Share Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[13px] text-[#666] bg-[#F8F8F8]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-[#111] text-white text-[13px] font-semibold rounded-xl hover:bg-[#333] transition-colors flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 bg-[#F8F8F8] rounded-xl">
                <p className="text-[12px] text-[#666] leading-relaxed"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <Globe className="w-3.5 h-3.5 inline mr-1" />
                  Anyone with this link can view this board
                </p>
              </div>

              {/* Remove share link */}
              <button
                onClick={handleUnshare}
                disabled={isUnsharing}
                className="text-[13px] font-medium text-[#EE2B24] hover:text-[#d42520] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {isUnsharing ? 'Removing...' : 'Remove share link'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
