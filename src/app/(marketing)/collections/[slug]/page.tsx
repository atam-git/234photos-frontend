'use client'

import { useParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { MasonryGrid } from '@/components/features/search/MasonryGrid'
import { FilterSidebar } from '@/components/features/search/FilterSidebar'
import { FilterBottomSheet } from '@/components/features/search/FilterBottomSheet'
import { ActiveFilterChips, ActiveFilters } from '@/components/features/search/ActiveFilterChips'
import { SortDropdown } from '@/components/features/search/SortDropdown'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { Asset } from '@/components/features/search/AssetCard'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'

const COLLECTION_META: Record<string, { title: string; desc: string; cover: string }> = {
  'african-entrepreneurs': { title: 'African Entrepreneurs', desc: 'Business leaders, founders and innovators across the continent.', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80' },
  'pan-african-festivals': { title: 'Pan-African Festivals', desc: 'Celebrations, carnivals and cultural events from Lagos to Cape Town.', cover: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1400&q=80' },
  'modern-african-cities': { title: 'Modern African Cities', desc: 'Skylines, streets and architecture of Africa\'s fastest-growing cities.', cover: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1400&q=80' },
  'african-street-style': { title: 'African Street Style', desc: 'Fashion-forward looks from Accra, Nairobi, Lagos and beyond.', cover: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1400&q=80' },
  'heritage-culture': { title: 'Heritage & Culture', desc: 'Traditional ceremonies, art, crafts and cultural heritage across Africa.', cover: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=1400&q=80' },
}

type ModalState =
  | { type: 'none' }
  | { type: 'preview'; asset: Asset }
  | { type: 'download'; asset: Asset }
  | { type: 'board'; asset: Asset }
  | { type: 'auth'; defaultTab?: 'login' | 'signup' }

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>()
  const meta = COLLECTION_META[slug] ?? { title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), desc: 'Curated African content.', cover: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1400&q=80' }

  const [filters, setFilters] = useState<ActiveFilters>({})
  const [sort, setSort] = useState('relevance')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const handleFilterChange = useCallback((key: keyof ActiveFilters, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const closeModal = () => setModal({ type: 'none' })
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const results = MOCK_ASSETS.filter((a) => {
    if (filters.price === 'free' && !a.isFree) return false
    if (filters.aiContent === 'ai' && !a.isAI) return false
    if (filters.aiContent === 'human' && a.isAI) return false
    return true
  })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onAuthClick={(tab) => setModal({ type: 'auth', defaultTab: tab })} />

      {/* Collection hero banner */}
      <div className="relative h-[220px] md:h-[280px] overflow-hidden">
        <img src={meta.cover} alt={meta.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-6 pb-8">
          <div className="max-w-[1280px] mx-auto w-full">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Collections', href: '/collections' }, { label: meta.title }]} />
            <h1 className="text-white text-[28px] md:text-[36px] font-extrabold mt-2 mb-1 tracking-[-0.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {meta.title}
            </h1>
            <p className="text-white/75 text-[14px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {meta.desc} · <span className="font-semibold">{results.length} assets</span>
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 md:px-6 py-6">
        {/* Controls */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-0">
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="hidden lg:flex items-center gap-2 px-3.5 py-[7px] border border-[#D0D0D0] rounded-full text-[13px] font-medium text-[#111] bg-white hover:border-[#999] transition-colors shrink-0"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#EE2B24] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            )}
            <FilterBottomSheet filters={filters} onChange={handleFilterChange} activeCount={activeFilterCount} />
            <ActiveFilterChips filters={filters} resultCount={results.length} query="" onRemove={(key) => handleFilterChange(key, undefined)} onClearAll={() => setFilters({})} />
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="flex gap-8">
          <FilterSidebar filters={filters} onChange={handleFilterChange} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(true)} />
          <div className="flex-1 min-w-0">
            <MasonryGrid
              assets={results}
              onAssetClick={(asset) => setModal({ type: 'preview', asset })}
              onDownload={(asset) => setModal({ type: 'download', asset })}
              onSaveToBoard={() => setModal({ type: 'auth', defaultTab: 'login' })}
              onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
            />
          </div>
        </div>
      </main>

      <Footer />

      {modal.type === 'preview' && <QuickPreviewModal asset={modal.asset} assets={results} onClose={closeModal} onDownload={(a) => setModal({ type: 'download', asset: a })} onSaveToBoard={() => setModal({ type: 'auth', defaultTab: 'login' })} onAuthRequired={() => setModal({ type: 'auth' })} />}
      {modal.type === 'download' && <DownloadModal asset={modal.asset} onClose={closeModal} onConfirm={closeModal} />}
      {modal.type === 'board' && <SaveToBoardModal asset={modal.asset} onClose={closeModal} />}
      {modal.type === 'auth' && <AuthModal onClose={closeModal} defaultTab={modal.defaultTab} />}
    </div>
  )
}
