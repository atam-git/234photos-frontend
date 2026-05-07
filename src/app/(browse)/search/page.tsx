'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback, useState, Suspense, useEffect, useRef, useMemo } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Header } from '@/components/shared/Header'
import { FilterSidebar } from '@/components/features/search/FilterSidebar'
import { FilterBottomSheet } from '@/components/features/search/FilterBottomSheet'
import { ActiveFilterChips, ActiveFilters } from '@/components/features/search/ActiveFilterChips'
import { SortDropdown } from '@/components/features/search/SortDropdown'
import { MasonryGrid } from '@/components/features/search/MasonryGrid'
import { ZeroResultState } from '@/components/features/search/ZeroResultState'
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
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const query = searchParams.get('q') ?? ''
  const colorParam = searchParams.get('color') ?? ''

  const [filters, setFilters] = useState<ActiveFilters>({
    orientation: (searchParams.get('orientation') as 'landscape' | 'portrait' | 'square' | null) ?? undefined,
    license: searchParams.get('license') ?? undefined,
    price: searchParams.get('price') ?? undefined,
    dateAdded: searchParams.get('dateAdded') ?? undefined,
    color: colorParam || undefined,
  })
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'relevance')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  
  // Infinite scroll state
  const [page, setPage] = useState(1)
  const [allAssets, setAllAssets] = useState<Asset[]>([])
  const [hasAppendedPage, setHasAppendedPage] = useState<number>(0)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Helper to convert dateAdded filter to ISO date - memoized to prevent infinite loop
  const uploadedAfter = useMemo(() => {
    if (!filters.dateAdded) return undefined
    
    const now = new Date()
    
    switch (filters.dateAdded) {
      case '1h':
        return new Date(now.getTime() - 60 * 60 * 1000).toISOString()
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
  }, [filters.dateAdded])

  // Build search params from filters - memoized with individual filter dependencies to prevent infinite loop
  const searchApiParams = useMemo(() => ({
    q: query || undefined,
    page,
    limit: 50,
    sort: sort as any,
    fileType: 'IMAGE' as const,
    orientation: filters.orientation,
    color: filters.color,
    license: filters.license?.toUpperCase() as any,
    isFree: filters.price === 'free' ? true : filters.price === 'paid' ? false : undefined,
    isEditorial: filters.license === 'editorial' ? true : undefined,
    hasPeople: filters.hasPeople === 'with' ? true : filters.hasPeople === 'without' ? false : undefined,
    modelRelease: filters.modelRelease === 'yes' ? true : filters.modelRelease === 'no' ? false : undefined,
    propertyRelease: filters.propertyRelease === 'yes' ? true : filters.propertyRelease === 'no' ? false : undefined,
    uploadedAfter,
    category: filters.category,
    minWidth: filters.minWidth,
    minHeight: filters.minHeight,
  }), [
    query, 
    page, 
    sort, 
    filters.orientation, 
    filters.color, 
    filters.license, 
    filters.price, 
    filters.hasPeople, 
    filters.modelRelease, 
    filters.propertyRelease, 
    filters.category, 
    filters.minWidth, 
    filters.minHeight,
    uploadedAfter
  ])

  // Fetch search results from API
  const { data: searchData, isLoading, error } = useSearch(searchApiParams)

  const results = searchData?.hits || []
  const total = searchData?.total || 0
  const totalPages = searchData?.totalPages || 0
  
  // Use allAssets if populated, otherwise fall back to current page results
  const displayAssets = allAssets.length > 0 ? allAssets : results
  
  // Show results immediately if we have cached data, even while refetching
  const showResults = displayAssets.length > 0
  const showLoading = isLoading && !showResults

  // Append new assets when page changes
  useEffect(() => {
    if (results.length > 0 && page !== hasAppendedPage) {
      setAllAssets(prev => {
        // Avoid duplicates
        const newAssets = results.filter(a => !prev.some(p => p.id === a.id))
        return [...prev, ...newAssets]
      })
      
      setHasAppendedPage(page)
    }
  }, [results, page, hasAppendedPage])

  // Reset assets when filters or query changes
  useEffect(() => {
    setAllAssets([])
    setPage(1)
    setHasAppendedPage(0)
    // Scroll to top when filters or sort changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [query, sort, filters.orientation, filters.license, filters.price, filters.dateAdded, filters.color, filters.hasPeople, filters.modelRelease, filters.propertyRelease, filters.category])

  // Infinite scroll observer
  useEffect(() => {
    const currentTarget = observerTarget.current
    if (!currentTarget) return

    const hasMorePages = page < totalPages
    if (!hasMorePages) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        
        if (entry.isIntersecting && !isLoading) {
          setPage(prev => prev + 1)
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '800px' // Load 800px before reaching the trigger
      }
    )

    observer.observe(currentTarget)

    return () => {
      observer.disconnect()
    }
  }, [isLoading, totalPages, page])

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

      <main className="flex-1 max-w-[1440px] mx-auto w-full">
        {/* Sticky Controls bar */}
        <div className="sticky top-[60px] z-40 bg-white px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
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
                resultCount={total}
                query={query}
                onRemove={(key) => handleFilterChange(key, undefined)}
                onClearAll={handleClearAll}
              />
            </div>
            <SortDropdown value={sort} onChange={handleSortChange} />
          </div>
        </div>

        {/* Body with padding */}
        <div className="px-4 md:px-6 pt-4">
          <div className={`flex ${sidebarCollapsed ? 'gap-0' : 'gap-8'}`}>
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
            ) : displayAssets.length === 0 ? (
              <ZeroResultState query={query} />
            ) : (
              <>
                <MasonryGrid
                  assets={displayAssets}
                  onAssetClick={(asset) => setModal({ type: 'preview', asset })}
                  onDownload={(asset) => setModal({ type: 'download', asset })}
                  onSaveToBoard={(asset) => isLoggedIn ? setModal({ type: 'board', asset }) : setModal({ type: 'auth', defaultTab: 'login' })}
                  onLike={() => setModal({ type: 'auth', defaultTab: 'login' })}
                />
                
                {/* Infinite scroll trigger */}
                <div 
                  ref={observerTarget} 
                  className="mt-8 flex items-center justify-center py-4"
                >
                  {page < totalPages ? (
                    isLoading && (
                      <div className="flex items-center gap-2 text-[#999]">
                        <div className="w-4 h-4 border-2 border-[#FFE5E5] border-t-[#EE2B24] rounded-full animate-spin" />
                        <span className="text-[12px]">Loading more...</span>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-[13px] text-[#999]">🎉 You've seen it all!</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
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
          onConfirm={() => closeModal()}
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
