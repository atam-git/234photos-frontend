'use client'

import { X, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface DeleteAccountModalProps {
  userName: string
  onClose: () => void
  onConfirm: () => void
}

export function DeleteAccountModal({ userName, onClose, onConfirm }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const isValid = confirmText === 'DELETE'

  const handleDelete = async () => {
    if (!isValid) return
    setDeleting(true)
    // Simulate deletion
    await new Promise(resolve => setTimeout(resolve, 2000))
    onConfirm()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-100 bg-red-50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-[16px] font-bold text-red-900"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Delete Account
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
          <div className="mb-6">
            <p className="text-[14px] text-[#111] mb-4 leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Are you sure you want to delete your account, <strong>{userName}</strong>?
            </p>
            
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
              <p className="text-[13px] text-red-900 font-semibold mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                This action cannot be undone. This will permanently:
              </p>
              <ul className="text-[12px] text-red-800 space-y-1.5 ml-4"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <li>• Delete your profile and all personal data</li>
                <li>• Remove all your uploaded assets</li>
                <li>• Cancel your subscription and forfeit remaining credits</li>
                <li>• Delete your collections and boards</li>
                <li>• Remove your download history</li>
              </ul>
            </div>

            <p className="text-[13px] text-[#666] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              To confirm, type <strong className="text-[#111]">DELETE</strong> in the box below:
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-[#D0D0D0] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#F8F8F8] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={!isValid || deleting}
              className="flex-1 py-3 bg-red-600 text-white text-[14px] font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {deleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
