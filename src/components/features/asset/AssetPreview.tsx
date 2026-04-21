'use client'

import { useState } from 'react'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface AssetPreviewProps {
  src: string
  alt: string
  isAI?: boolean
  isEditorial?: boolean
}

export function AssetPreview({ src, alt, isAI, isEditorial }: AssetPreviewProps) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <div className="relative bg-[#F5F5F7] rounded-2xl overflow-hidden select-none">
      {/* Image container */}
      <div
        className={`relative overflow-hidden cursor-zoom-in transition-all duration-300 ${zoomed ? 'cursor-zoom-out' : ''}`}
        onClick={() => setZoomed(!zoomed)}
        style={{ minHeight: 400 }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto block transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
        />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-black/10 text-[28px] font-bold tracking-widest rotate-[-30deg] uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            234photos
          </span>
        </div>

        {/* Zoom hint — only on first load */}
        {!zoomed && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5" />
            Click to zoom
          </div>
        )}
      </div>

      {/* Badges top-left */}
      <div className="absolute top-3 left-3 flex gap-1.5">
        {isAI && (
          <span className="bg-black/75 text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded">
            AI Generated
          </span>
        )}
        {isEditorial && (
          <span className="bg-black/75 text-white text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded">
            Editorial
          </span>
        )}
      </div>

      {/* Zoom controls bottom-right */}
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        <button
          onClick={(e) => { e.stopPropagation(); setZoomed(false) }}
          className={`w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center transition-colors ${!zoomed ? 'opacity-40 pointer-events-none' : ''}`}
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4 text-[#444]" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setZoomed(true) }}
          className={`w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center transition-colors ${zoomed ? 'opacity-40 pointer-events-none' : ''}`}
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4 text-[#444]" />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center transition-colors"
          aria-label="Fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-[#444]" />
        </button>
      </div>
    </div>
  )
}
