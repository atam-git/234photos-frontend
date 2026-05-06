'use client'

import { CheckCircle, X } from 'lucide-react'

interface ProfileUpdateSuccessModalProps {
  onClose: () => void
}

export function ProfileUpdateSuccessModal({ onClose }: ProfileUpdateSuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-[16px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Profile Updated
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <p className="text-[14px] text-[#666] text-center mb-6 leading-relaxed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Your profile has been updated successfully!
          </p>

          {/* Action */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#111] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
