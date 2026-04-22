'use client'

import { useState } from 'react'
import { Heart, Download, Plus } from 'lucide-react'
import { getContributorAvatar, getContributorUsername } from '@/lib/mock/contributors'

export interface Asset {
  id: string
  src: string
  alt: string
  contributor: string
  resolution?: string
  isAI?: boolean
  isEditorial?: boolean
  isFree?: boolean
  aspectRatio?: number
}

interface AssetCardProps {
  asset: Asset
  onClick?: (asset: Asset) => void
  onDownload?: (asset: Asset) => void
  onSaveToBoard?: (asset: Asset) => void
  onLike?: (asset: Asset) => void
}

export function AssetCard({ asset, onClick, onDownload, onSaveToBoard, onLike }: AssetCardProps) {
  const [liked, setLiked] = useState(false)
  const avatar = getContributorAvatar(asset.contributor)
  const username = getContributorUsername(asset.contributor)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    onLike?.(asset)
  }

  const handleBoard = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSaveToBoard?.(asset)
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDownload?.(asset)
  }

  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-[#E8E8E8] break-inside-avoid mb-[10px]"
      onClick={() => onClick?.(asset)}
    >
      {/* Image */}
      <img
        src={asset.src}
        alt={asset.alt}
        className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />

      {/* Top-left badges */}
      <div className="absolute top-2 left-2 flex gap-1">
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

      {/* Resolution badge */}
      {asset.resolution && (
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
          {asset.resolution}
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      {/* Hover: contributor avatar + name → profile link */}
      <a
        href={`/profile/${username}`}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-2 left-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto z-30"
      >
        <div className="w-5 h-5 rounded-full overflow-hidden bg-[#EE2B24] shrink-0 ring-1 ring-white/50">
          {avatar ? (
            <img src={avatar} alt={asset.contributor} className="w-full h-full object-cover" />
          ) : (
            <span className="w-full h-full flex items-center justify-center text-white text-[8px] font-bold">
              {asset.contributor[0]}
            </span>
          )}
        </div>
        <span
          className="text-white text-[11px] font-semibold drop-shadow hover:underline"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          {asset.contributor}
        </span>
      </a>

      {/* Hover: action buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto z-30">
        <button onClick={handleLike}
          className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow transition-colors"
          aria-label="Save to favourites">
          <Heart className={`w-3.5 h-3.5 transition-colors ${liked ? 'fill-[#EE2B24] text-[#EE2B24]' : 'text-[#444]'}`} />
        </button>
        <button onClick={handleBoard}
          className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow transition-colors"
          aria-label="Add to board">
          <Plus className="w-3.5 h-3.5 text-[#444]" />
        </button>
        <button onClick={handleDownload}
          className="w-7 h-7 rounded-full bg-[#EE2B24] hover:bg-[#d42520] flex items-center justify-center shadow transition-colors"
          aria-label="Download">
          <Download className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  )
}
