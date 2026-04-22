'use client'

import { useState } from 'react'
import { X, Lock, Globe } from 'lucide-react'

interface CreateCollectionModalProps {
  selectedAssets?: string[]
  onClose: () => void
}

export function CreateCollectionModal({ selectedAssets = [], onClose }: CreateCollectionModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Create collection with selectedAssets
    console.log('Create collection:', { name, description, isPublic, assetIds: selectedAssets })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-[480px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[16px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Create Collection
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
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lagos Street Photography"
              required
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
              placeholder="Describe this collection..."
              rows={3}
              className="w-full px-4 py-3 border border-[#D0D0D0] rounded-xl text-[14px] text-[#111] outline-none focus:border-[#111] transition-colors resize-none"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Visibility
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors hover:bg-[#F8F8F8]"
                style={{ borderColor: isPublic ? '#EE2B24' : '#E0E0E0' }}>
                <input
                  type="radio"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="mt-0.5 w-4 h-4 text-[#EE2B24] focus:ring-[#EE2B24]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-[#EE2B24]" />
                    <span className="text-[14px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Public
                    </span>
                  </div>
                  <p className="text-[12px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Visible on your public profile. Great for showcasing your best work.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 rounded-xl cursor-pointer transition-colors hover:bg-[#F8F8F8]"
                style={{ borderColor: !isPublic ? '#EE2B24' : '#E0E0E0' }}>
                <input
                  type="radio"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="mt-0.5 w-4 h-4 text-[#EE2B24] focus:ring-[#EE2B24]"
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
                    Only visible to you. Use for organizing work in progress.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {selectedAssets.length > 0 && (
            <div className="p-3 bg-[#F8F8F8] rounded-xl">
              <p className="text-[12px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {selectedAssets.length} asset{selectedAssets.length > 1 ? 's' : ''} will be added to this collection
              </p>
            </div>
          )}

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
              className="flex-1 px-5 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Create Collection
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
