'use client'

import { XCircle, X } from 'lucide-react'

interface ErrorModalProps {
  title?: string
  message: string
  onClose: () => void
}

export function ErrorModal({ title = 'Error', message, onClose }: ErrorModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-100 bg-red-50">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-[16px] font-bold text-red-900"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>

          <p className="text-[14px] text-[#666] text-center mb-6 leading-relaxed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {message}
          </p>

          {/* Action */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-red-600 text-white text-[14px] font-semibold rounded-full hover:bg-red-700 transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
