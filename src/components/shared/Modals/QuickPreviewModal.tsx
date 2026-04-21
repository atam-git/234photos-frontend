'use client'

import { X, ChevronLeft, ChevronRight, Download, Plus, Heart, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { ModalBackdrop } from './ModalBackdrop'
import { Asset } from '@/components/features/search/AssetCard'
import { getContributorAvatar, getContributorUsername } from '@/lib/mock/contributors'

interface QuickPreviewModalProps {
  asset: Asset
  assets: Asset[]
  onClose: () => void
  onDownload: (asset: Asset) => void
  onSaveToBoard: (asset: Asset) => void
  onAuthRequired: () => void
}

export function QuickPreviewModal({
  asset: initialAsset,
  assets,
  onClose,
  onDownload,
  onSaveToBoard,
  onAuthRequired,
}: QuickPreviewModalProps) {
  const [currentIndex, setCurrentIndex] = useState(assets.findIndex((a) => a.id === initialAsset.id))
  const [liked, setLiked] = useState(false)
  const asset = assets[currentIndex] ?? initialAsset
  const avatar = getContributorAvatar(asset.contributor)
  const username = getContributorUsername(asset.contributor)

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1))
  const goNext = () => setCurrentIndex((i) => Math.min(assets.length - 1, i + 1))

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < assets.length - 1

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full max-w-[1100px] mx-4 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] max-h-[700px]">

        {/* Left: image — fixed, image fills it */}
        <div className="relative bg-[#111] flex items-center justify-center flex-1 min-w-0 overflow-hidden">
          <img
            src={asset.src}
            alt={asset.alt}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="text-white/20 text-[22px] font-bold tracking-widest rotate-[-30deg] uppercase">
              234photos
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {asset.isAI && (
              <span className="bg-black/80 text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded">AI</span>
            )}
            {asset.isEditorial && (
              <span className="bg-black/80 text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded">Editorial</span>
            )}
            {asset.isFree && (
              <span className="bg-[#EE2B24] text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded">Free</span>
            )}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Prev */}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            {currentIndex + 1} / {assets.length}
          </div>
        </div>

        {/* Right: info panel */}
        <div className="w-full md:w-[280px] shrink-0 flex flex-col overflow-y-auto scrollbar-slim">

          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-[#F0F0F0]">
            <h3
              className="text-[15px] font-bold text-[#111] leading-snug mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {asset.alt}
            </h3>
            <a
              href={`/profile/${username}`}
              className="flex items-center gap-2 group"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-[#EE2B24] shrink-0">
                {avatar ? (
                  <img src={avatar} alt={asset.contributor} className="w-full h-full object-cover" />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-white text-[9px] font-bold">
                    {asset.contributor[0]}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-[#666] group-hover:text-[#EE2B24] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                by <span className="font-semibold text-[#111] group-hover:text-[#EE2B24]">{asset.contributor}</span>
              </p>
            </a>
          </div>

          {/* Metadata */}
          <div className="px-5 py-4 border-b border-[#F0F0F0] flex flex-col gap-2">
            {asset.resolution && (
              <div className="flex justify-between text-[12.5px]">
                <span className="text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>Resolution</span>
                <span className="text-[#111] font-semibold" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>{asset.resolution}</span>
              </div>
            )}
            <div className="flex justify-between text-[12.5px]">
              <span className="text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>License</span>
              <span className="text-[#111] font-semibold" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>Standard</span>
            </div>
            <div className="flex justify-between text-[12.5px]">
              <span className="text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>Type</span>
              <span className="text-[#111] font-semibold" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>Photo</span>
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 py-4 flex flex-col gap-2.5 mt-auto">
            <button
              onClick={() => onDownload(asset)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => onSaveToBoard(asset)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-[#D0D0D0] text-[#111] text-[13px] font-medium rounded-full hover:border-[#999] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Plus className="w-3.5 h-3.5" />
                Board
              </button>
              <button
                onClick={() => { onAuthRequired(); setLiked(!liked) }}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  liked ? 'border-[#EE2B24] bg-[#FFF0F0]' : 'border-[#D0D0D0] hover:border-[#999]'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-[#EE2B24] text-[#EE2B24]' : 'text-[#444]'}`} />
              </button>
            </div>

            <a
              href={`/assets/${asset.id}`}
              className="flex items-center justify-center gap-1.5 text-[12.5px] text-[#666] hover:text-[#111] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View full details
            </a>
          </div>
        </div>
      </div>
    </ModalBackdrop>
  )
}
