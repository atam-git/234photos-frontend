'use client'

import { useState } from 'react'
import { Heart, Download, Plus, Search } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { MY_LIKED_ASSETS } from '@/lib/mock'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import type { Asset, ModalState } from '@/types'
import Link from 'next/link'

export default function LikedPage() {
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [likedAssets, setLikedAssets] = useState<Set<string>>(new Set(MY_LIKED_ASSETS.map(a => a.id)))
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = MY_LIKED_ASSETS.filter(asset => 
    likedAssets.has(asset.id) && 
    asset.alt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleLike = (assetId: string) => {
    setLikedAssets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(assetId)) {
        newSet.delete(assetId)
      } else {
        newSet.add(assetId)
      }
      return newSet
    })
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-extrabold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Liked assets
        </h1>
        <p className="text-[13px] text-[#888] mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {likedAssets.size} {likedAssets.size === 1 ? 'asset' : 'assets'} you&apos;ve saved as favourites
        </p>
      </div>

      {likedAssets.size === 0 ? (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-10 h-10 text-[#DDDDDD] mb-4" />
          <p className="text-[15px] font-semibold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No liked assets yet
          </p>
          <p className="text-[13px] text-[#888] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Heart any asset while browsing to save it here
          </p>
          <Link href="/search"
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Browse assets
          </Link>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search liked assets..."
              className="w-full h-[42px] pl-10 pr-4 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#111] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-16 text-center">
              <Search className="w-10 h-10 text-[#DDDDDD] mb-4" />
              <p className="text-[15px] font-semibold text-[#111] mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No results found
              </p>
              <p className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
              {filtered.map((asset) => (
                <div key={asset.id} className="relative group rounded-xl overflow-hidden bg-[#E8E8E8] break-inside-avoid mb-3">
                  <button 
                    onClick={() => setModal({ type: 'preview', asset })}
                    className="w-full relative z-10">
                    <img src={asset.src} alt={asset.alt} className="w-full h-auto block transition-transform duration-300 group-hover:scale-105" />
                  </button>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20" />
                  
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setModal({ type: 'download', asset })
                      }}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
                      title="Download">
                      <Download className="w-3.5 h-3.5 text-[#111]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setModal({ type: 'board', asset })
                      }}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
                      title="Save to board">
                      <Plus className="w-3.5 h-3.5 text-[#111]" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(asset.id)
                      }}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors pointer-events-auto"
                      title="Unlike">
                      <Heart className="w-3.5 h-3.5 fill-[#EE2B24] text-[#EE2B24]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {modal.type === 'preview' && (
        <QuickPreviewModal 
          asset={modal.asset} 
          assets={filtered}
          onClose={() => setModal({ type: 'none' })}
          onDownload={(asset) => setModal({ type: 'download', asset })}
          onSaveToBoard={(asset) => setModal({ type: 'board', asset })}
          onAuthRequired={() => {}}
        />
      )}
      {modal.type === 'download' && (
        <DownloadModal
          asset={modal.asset}
          onClose={() => setModal({ type: 'none' })}
          onConfirm={() => setModal({ type: 'none' })}
        />
      )}
      {modal.type === 'board' && (
        <SaveToBoardModal
          asset={modal.asset}
          onClose={() => setModal({ type: 'none' })}
        />
      )}
    </div>
  )
}
