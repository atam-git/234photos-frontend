'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { MasonryGrid } from '@/components/features/search/MasonryGrid'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import type { Asset, ModalState } from '@/types'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/client'

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  // Fetch collection data from API
  const { data: collection, isLoading, error } = useQuery({
    queryKey: ['collections', slug],
    queryFn: async () => {
      return api.get<any>(`/collections/${slug}`)
    },
    enabled: !!slug,
  })

  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const closeModal = () => setModal({ type: 'none' })

  const results = collection?.assets || []

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        
        {/* Hero skeleton */}
        <div className="relative h-[220px] md:h-[280px] overflow-hidden bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.6s_infinite] [background-size:200%_100%]" />
          <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-6 pb-8">
            <div className="max-w-[1280px] mx-auto w-full">
              <div className="h-4 bg-white/20 rounded w-48 mb-4" />
              <div className="h-9 bg-white/30 rounded w-64 mb-2" />
              <div className="h-4 bg-white/20 rounded w-40" />
            </div>
          </div>
        </div>

        {/* Grid skeleton */}
        <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-6 py-6">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-[10px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="break-inside-avoid mb-[10px] animate-pulse">
                <div 
                  className="w-full bg-gray-200 rounded-xl"
                  style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1' }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_infinite] [background-size:200%_100%]" />
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // Error state
  if (error || !collection) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-4xl text-red-500">⚠️</div>
            <p className="text-[#666]">Collection not found</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Collection hero banner */}
      <div className="relative h-[220px] md:h-[280px] overflow-hidden">
        <img 
          src={collection.coverImage || collection.thumbnails?.[0] || '/placeholder-collection.jpg'} 
          alt={collection.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-6 pb-8">
          <div className="max-w-[1280px] mx-auto w-full">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Collections', href: '/collections' }, { label: collection.name }]} />
            <h1 className="text-white text-[28px] md:text-[36px] font-extrabold mt-2 mb-1 tracking-[-0.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {collection.name}
            </h1>
            <p className="text-white/75 text-[14px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {collection.description} · <span className="font-semibold">{collection.assetCount} assets</span>
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-6 py-6">
        <MasonryGrid
          assets={results}
          onAssetClick={(asset) => setModal({ type: 'preview', asset })}
          onDownload={(asset) => setModal({ type: 'download', asset })}
          onSaveToBoard={(asset) => isLoggedIn ? setModal({ type: 'board', asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
          onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
        />
      </main>

      <Footer />

      {modal.type === 'preview' && <QuickPreviewModal asset={modal.asset} assets={results} onClose={closeModal} onDownload={(a) => setModal({ type: 'download', asset: a })} onSaveToBoard={(a) => isLoggedIn ? setModal({ type: 'board', asset: a }) : setModal({ type: 'auth', defaultTab: 'login' })} onAuthRequired={() => setModal({ type: 'auth' })} />}
      {modal.type === 'download' && <DownloadModal asset={modal.asset} onClose={closeModal} onConfirm={closeModal} />}
      {modal.type === 'board' && <SaveToBoardModal asset={modal.asset} onClose={closeModal} />}
      {modal.type === 'auth' && <AuthModal onClose={closeModal} defaultTab={modal.defaultTab} />}
    </div>
  )
}
