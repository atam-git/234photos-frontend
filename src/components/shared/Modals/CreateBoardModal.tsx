'use client'

import { useState } from 'react'
import { X, Lock, Users } from 'lucide-react'
import type { Board } from '@/types'

interface CreateBoardModalProps {
  onClose: () => void
}

export function CreateBoardModal({ onClose }: CreateBoardModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<Board['type']>('private')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Create board
    console.log('Create board:', { name, description, type })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-[420px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[16px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Create Board
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#F5F5F7] transition-colors">
            <X className="w-5 h-5 text-[#888]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Board Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Campaign Assets"
              required
              autoFocus
              className="w-full h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[14px] text-[#111] outline-none focus:border-[#111] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this board for?"
              rows={2}
              className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[14px] text-[#111] outline-none focus:border-[#111] transition-colors resize-none"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Privacy
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors hover:bg-[#F8F8F8]"
                style={{ borderColor: type === 'private' ? '#111' : '#E0E0E0' }}>
                <input
                  type="radio"
                  checked={type === 'private'}
                  onChange={() => setType('private')}
                  className="mt-0.5 w-4 h-4 text-[#111] focus:ring-[#111]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-[#888]" />
                    <span className="text-[14px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Private
                    </span>
                  </div>
                  <p className="text-[12px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Only you can see this board
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors hover:bg-[#F8F8F8]"
                style={{ borderColor: type === 'shared' ? '#111' : '#E0E0E0' }}>
                <input
                  type="radio"
                  checked={type === 'shared'}
                  onChange={() => setType('shared')}
                  className="mt-0.5 w-4 h-4 text-[#111] focus:ring-[#111]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-[#888]" />
                    <span className="text-[14px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Shared
                    </span>
                  </div>
                  <p className="text-[12px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Invite others to collaborate
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 border border-[#D0D0D0] text-[#111] text-[14px] font-semibold rounded-full hover:border-[#999] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-5 py-3 bg-[#111] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
