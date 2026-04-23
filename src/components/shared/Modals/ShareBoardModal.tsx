'use client'

import { useState } from 'react'
import { X, Copy, Check, Mail } from 'lucide-react'

interface ShareBoardModalProps {
  boardName: string
  shareLink?: string
  onClose: () => void
}

export function ShareBoardModal({ boardName, shareLink, onClose }: ShareBoardModalProps) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  
  const link = shareLink || `https://234photos.com/boards/shared/${Math.random().toString(36).substring(7)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Invite:', email)
    setEmail('')
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
          {/* Copy link */}
          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Share Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={link}
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

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E0E0E0]" />
            <span className="text-[12px] text-[#888] uppercase tracking-[0.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Or
            </span>
            <div className="flex-1 h-px bg-[#E0E0E0]" />
          </div>

          {/* Invite by email */}
          <form onSubmit={handleInvite}>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Invite by Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                className="flex-1 h-[44px] px-4 border border-[#D0D0D0] rounded-xl text-[14px] text-[#111] outline-none focus:border-[#111] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
              <button
                type="submit"
                disabled={!email.trim()}
                className="px-4 py-2 bg-[#EE2B24] text-white text-[13px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Mail className="w-4 h-4" />
                Invite
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="p-3 bg-[#F8F8F8] rounded-xl">
            <p className="text-[12px] text-[#666] leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Anyone with the link can view and collaborate on this board
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
