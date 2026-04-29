'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface RenameBoardModalProps {
  boardId: string
  currentName: string
  onClose: () => void
  onRename: (boardId: string, newName: string) => void
}

export function RenameBoardModal({ boardId, currentName, onClose, onRename }: RenameBoardModalProps) {
  const [name, setName] = useState(currentName)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || name === currentName) return

    setIsSubmitting(true)
    try {
      await onRename(boardId, name.trim())
      onClose()
    } catch (error) {
      console.error('Failed to rename board:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-[420px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[16px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Rename Board
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F7] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-[13px] font-medium text-[#444] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Board name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter board name"
              autoFocus
              disabled={isSubmitting}
              className="w-full h-[44px] px-4 border border-[#D0D0D0] rounded-lg text-[14px] text-[#111] outline-none focus:border-[#111] transition-colors disabled:opacity-50"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 h-[44px] border border-[#D0D0D0] text-[#111] text-[14px] font-semibold rounded-lg hover:bg-[#F5F5F7] transition-colors disabled:opacity-50"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || name === currentName || isSubmitting}
              className="flex-1 h-[44px] bg-[#EE2B24] text-white text-[14px] font-semibold rounded-lg hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {isSubmitting ? 'Renaming...' : 'Rename'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
