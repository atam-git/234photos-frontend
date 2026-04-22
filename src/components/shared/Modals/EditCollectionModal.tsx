'use client'

import { useState } from 'react'
import { X, Globe, Lock } from 'lucide-react'
import { ModalBackdrop } from './ModalBackdrop'

interface EditCollectionModalProps {
  collection: {
    name: string
    description?: string
    isPublic: boolean
  }
  onClose: () => void
  onSave: (data: { name: string; description: string; isPublic: boolean }) => void
}

export function EditCollectionModal({ collection, onClose, onSave }: EditCollectionModalProps) {
  const [name, setName] = useState(collection.name)
  const [description, setDescription] = useState(collection.description || '')
  const [isPublic, setIsPublic] = useState(collection.isPublic)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSave({ name: name.trim(), description: description.trim(), isPublic })
      onClose()
    }
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2
            className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Edit Collection
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-[#666]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label
              className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lagos Street Photography"
              required
              maxLength={60}
              className="w-full h-[42px] px-4 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
            <p
              className="text-[11px] text-[#888] mt-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {name.length}/60 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this collection is about..."
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all resize-none"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
            <p
              className="text-[11px] text-[#888] mt-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {description.length}/200 characters
            </p>
          </div>

          {/* Visibility */}
          <div>
            <label
              className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Visibility
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsPublic(true)}
                className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  isPublic
                    ? 'border-[#EE2B24] bg-[#FFF5F5]'
                    : 'border-[#E0E0E0] bg-white hover:border-[#D0D0D0]'
                }`}
              >
                <Globe className={`w-5 h-5 ${isPublic ? 'text-[#EE2B24]' : 'text-[#888]'}`} />
                <div className="text-left">
                  <p
                    className={`text-[13px] font-semibold ${isPublic ? 'text-[#EE2B24]' : 'text-[#111]'}`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Public
                  </p>
                  <p
                    className="text-[11px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Visible on profile
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsPublic(false)}
                className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  !isPublic
                    ? 'border-[#EE2B24] bg-[#FFF5F5]'
                    : 'border-[#E0E0E0] bg-white hover:border-[#D0D0D0]'
                }`}
              >
                <Lock className={`w-5 h-5 ${!isPublic ? 'text-[#EE2B24]' : 'text-[#888]'}`} />
                <div className="text-left">
                  <p
                    className={`text-[13px] font-semibold ${!isPublic ? 'text-[#EE2B24]' : 'text-[#111]'}`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Private
                  </p>
                  <p
                    className="text-[11px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Only you can see
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  )
}
