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
import { MEDIA_TABS } from '@/lib/mock/marketing'
import type { Asset, ModalState } from '@/types'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import { useAuthStore } from '@/stores/authStore'
import { useSearch } from '@/hooks/useSearch'


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
  const colorParam = searchParams.get('color') ?? ''

  const [filters, setFilters] = useState<ActiveFilters>({
    orientation: (searchParams.get('orientation') as 'landscape' | 'portrait' | 'square' | null) ?? undefined,
    license: searchParams.get('license') ?? undefined,
    price: searchParams.get('price') ?? undefined,
    dateAdded: searchParams.get('dateAdded') ?? undefined,
    aiContent: searchParams.get('aiContent') ?? undefined,
    color: colorParam || undefined,
  })
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'relevance')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  // Build search params from filters - only images supported
  const searchApiParams = {
    q: query || undefined,
    page: 1,
    limit: 50,
    sort: sort as any,
    fileType: 'IMAGE' as const, // Only images supported for now
    orientation: filters.orientation,
    color: filters.color,
    license: filters.license?.toUpperCase() as any,
    isFree: filters.price === 'free' ? true : undefined,
    isAI: filters.aiContent === 'ai' ? true : filters.aiContent === 'human' ? false : undefined,
    isEditorial: filters.license === 'editorial' ? true : undefined,
    hasPeople: filters.hasPeople === 'true' ? true : filters.hasPeople === 'false' ? false : undefined,
    modelRelease: filters.modelRelease === 'true' ? true : filters.modelRelease === 'false' ? false : undefined,
    propertyRelease: filters.propertyRelease === 'true' ? true : filters.propertyRelease === 'false' ? false : undefined,
    uploadedAfter: filters.dateAdded ? getDateFromFilter(filters.dateAdded) : undefined,
    category: filters.category,
    minWidth: filters.minWidth,
    minHeight: filters.minHeight,
  }

  // Helper to convert dateAdded filter to ISO date
  function getDateFromFilter(filter: string): string | undefined {
    const now = new Date()
    switch (filter) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      case 'week':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      case 'month':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
      case 'year':
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString()
      default:
        return undefined
    }
  }

  // Fetch search results from API
  const { data: searchData, isLoading, error, isFetching } = useSearch(searchApiParams)
  
  const results = searchData?.hits || []
  const total = searchData?.total || 0
  
  // Show results immediately if we have cached data, even while refetching
  const showResults = results.length > 0
  const showLoading = isLoading && !showResults

  const handleFilterChange = useCallback(
    (key: keyof ActiveFilters, value: string | undefined) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    }, []
  )
  const handleClearAll = useCallback(() => setFilters({}), [])
  const handleSortChange = useCallback((value: string) => setSort(value), [])

  const activeFilterCount = Object.values(filters).filter(Boolean).length
  const closeModal = () => setModal({ type: 'none' })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        variant="search"
        initialQuery={query}
      />

      {/* Media type tabs removed - only images supported */}

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
            {showLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="mb-4 text-4xl text-red-500">⚠️</div>
                  <p className="text-[#666]">Search failed</p>
                  <p className="text-[13px] text-red-500 mt-2">{error.message}</p>
                </div>
              </div>
            ) : results.length === 0 ? (
              <ZeroResultState query={query} />
            ) : (
              <>
                <MasonryGrid
                  assets={results}
                  onAssetClick={(asset) => setModal({ type: 'preview', asset })}
                  onDownload={(asset) => setModal({ type: 'download', asset })}
                  onSaveToBoard={(asset) => isLoggedIn ? setModal({ type: 'board', asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
                  onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
                />
                {isFetching && (
                  <div className="text-center py-4 text-sm text-gray-500">
                    Updating results...
                  </div>
                )}
              </>
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
