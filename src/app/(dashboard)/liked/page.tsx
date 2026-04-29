'use client'

import { useState } from 'react'
import { Heart, Download, Plus, Search } from 'lucide-react'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import type { Asset, ModalState } from '@/types'
import Link from 'next/link'
import { useLikedAssets, useUnlikeAsset } from '@/hooks/useLikes'

export default function LikedPage() {
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  // Fetch liked assets from API
  const { data: likedData, isLoading, error } = useLikedAssets(page, 50)
  const { mutate: unlike } = useUnlikeAsset()

  const assets = likedData?.data || []
  const meta = likedData?.meta

  // Filter by search query
  const filtered = assets.filter(asset => 
    asset.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUnlike = (assetId: string) => {
    unlike(assetId)
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
          {meta?.total || 0} {meta?.total === 1 ? 'asset' : 'assets'} you&apos;ve saved as favourites
        </p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mb-4 text-4xl">⏳</div>
            <p className="text-[#666]">Loading liked assets...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mb-4 text-4xl text-red-500">⚠️</div>
            <p className="text-[#666]">Failed to load liked assets</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && assets.length === 0 && (
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
          <Link href="/discover"
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Browse assets
          </Link>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && assets.length > 0 && (
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
                        handleUnlike(asset.id)
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

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-[#E0E0E0] rounded-lg text-[13px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5] transition-colors"
              >
                Previous
              </button>
              <span className="text-[13px] text-[#666]">
                Page {page} of {meta.totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="px-4 py-2 bg-white border border-[#E0E0E0] rounded-lg text-[13px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5] transition-colors"
              >
                Next
              </button>
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
