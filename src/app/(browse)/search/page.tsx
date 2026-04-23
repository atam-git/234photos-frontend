'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useState, Suspense } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Header } from '@/components/shared/Header'
import { FilterSidebar } from '@/components/features/search/FilterSidebar'
import { FilterBottomSheet } from '@/components/features/search/FilterBottomSheet'
import { ActiveFilterChips, ActiveFilters } from '@/components/features/search/ActiveFilterChips'
import { SortDropdown } from '@/components/features/search/SortDropdown'
import { MasonryGrid } from '@/components/features/search/MasonryGrid'
import { ZeroResultState } from '@/components/features/search/ZeroResultState'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { MEDIA_TABS } from '@/lib/mock/marketing'
import type { Asset, ModalState } from '@/types'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import { useAuthStore } from '@/stores/authStore'


export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  )
}

function SearchPageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const query = searchParams.get('q') ?? ''
  const typeParam = searchParams.get('type') ?? ''

  const [activeTab, setActiveTab] = useState(
    typeParam ? typeParam.charAt(0).toUpperCase() + typeParam.slice(1) : 'Photos'
  )
  const [filters, setFilters] = useState<ActiveFilters>({
    type: typeParam || undefined,
    orientation: (searchParams.get('orientation') as 'landscape' | 'portrait' | 'square' | null) ?? undefined,
    license: searchParams.get('license') ?? undefined,
    price: searchParams.get('price') ?? undefined,
    dateAdded: searchParams.get('dateAdded') ?? undefined,
    aiContent: searchParams.get('aiContent') ?? undefined,
  })
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'relevance')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const handleFilterChange = useCallback(
    (key: keyof ActiveFilters, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    }, []
  )
  const handleClearAll = useCallback(() => setFilters({}), [])
  const handleSortChange = useCallback((value: string) => setSort(value), [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    const params = new URLSearchParams(searchParams.toString())
    if (tab === 'Photos') params.delete('type')
    else params.set('type', tab.toLowerCase())
    router.push(`/search?${params.toString()}`)
  }

  const results = query
    ? MOCK_ASSETS.filter((a) => {
        if (filters.price === 'free' && !a.isFree) return false
        if (filters.aiContent === 'ai' && !a.isAI) return false
        if (filters.aiContent === 'human' && a.isAI) return false
        if (filters.license === 'editorial' && !a.isEditorial) return false
        return true
      })
    : MOCK_ASSETS

  const activeFilterCount = Object.values(filters).filter(Boolean).length
  const closeModal = () => setModal({ type: 'none' })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        variant="search"
        initialQuery={query}
      />

      {/* Media type tabs */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-[#F0F0F0] px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto flex items-center gap-0.5 overflow-x-auto scrollbar-hide py-2">
          {MEDIA_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3.5 py-[6px] rounded-lg text-[13px] whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-[#111] text-white font-semibold'
                  : 'text-[#555] font-medium hover:text-[#111] hover:bg-[#F0F0F0]'
              }`}
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-6 py-5">

        {/* Controls bar */}
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
            <ActiveFilterChips
              filters={filters}
              resultCount={results.length}
              query={query}
              onRemove={(key) => handleFilterChange(key, undefined)}
              onClearAll={handleClearAll}
            />
          </div>
          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>

        {/* Body */}
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(true)}
          />
          <div className="flex-1 min-w-0">
            {results.length === 0 ? (
              <ZeroResultState query={query} />
            ) : (
              <MasonryGrid
                assets={results}
                onAssetClick={(asset) => setModal({ type: 'preview', asset })}
                onDownload={(asset) => setModal({ type: 'download', asset })}
                onSaveToBoard={(asset) => isLoggedIn ? setModal({ type: 'board', asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
                onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
              />
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {modal.type === 'preview' && (
        <QuickPreviewModal
          asset={modal.asset}
          assets={results}
          onClose={closeModal}
          onDownload={(asset) => setModal({ type: 'download', asset })}
          onSaveToBoard={(asset) => isLoggedIn ? setModal({ type: 'board', asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
          onAuthRequired={() => setModal({ type: 'auth' })}
        />
      )}

      {modal.type === 'download' && (
        <DownloadModal
          asset={modal.asset}
          onClose={closeModal}
          onConfirm={(options) => {
            console.log('Download:', modal.asset.id, options)
            closeModal()
          }}
        />
      )}

      {modal.type === 'board' && (
        <SaveToBoardModal
          asset={modal.asset}
          onClose={closeModal}
        />
      )}

      {modal.type === 'auth' && (
        <AuthModal onClose={closeModal} defaultTab={modal.defaultTab} />
      )}
    </div>
  )
}
