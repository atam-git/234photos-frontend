'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Search, Star, Flame, TrendingUp, Clock } from 'lucide-react'
import { AssetCard } from '@/components/features/search/AssetCard'
import type { Asset, ModalState, DiscoverCategory } from '@/types'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { useAuthStore } from '@/stores/authStore'
import { useAssets } from '@/hooks/useAssets'
import { useCategories } from '@/hooks/useCategories'
import { useLikeAsset, useUnlikeAsset } from '@/hooks/useLikes'

export default function DiscoverPage() {
  const router = useRouter()
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [category, setCategory] = useState<DiscoverCategory>('all')
  const [view, setView] = useState<'foryou' | 'following'>('foryou')
  const [followingFilter, setFollowingFilter] = useState<'latest' | 'popular' | 'featured'>('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [allAssets, setAllAssets] = useState<Asset[]>([])
  const [hasAppendedPage, setHasAppendedPage] = useState<number>(0)
  const [likedAssets, setLikedAssets] = useState<Set<string>>(new Set())
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const closeModal = () => setModal({ type: 'none' })
  const observerTarget = useRef<HTMLDivElement>(null)

  // Like/unlike mutations
  const { mutate: like } = useLikeAsset()
  const { mutate: unlike } = useUnlikeAsset()

  // Fetch categories from API
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()

  // Fetch assets from API
  const { data: assetsData, isLoading, error } = useAssets({ 
    page, 
    limit: view === 'following' ? 12 : 50, // Smaller limit for following feed
    category: view === 'foryou' && category !== 'all' ? category : undefined,
    sortBy: view === 'foryou' && category === 'all' ? 'popular' : 'newest',
    feed: view === 'following' ? 'following' : undefined,
    feedFilter: view === 'following' ? followingFilter : undefined,
  })

  const assets = assetsData?.data || []
  const meta = assetsData?.meta

  // Use allAssets if populated, otherwise fall back to current page assets (handles cache)
  const displayAssets = allAssets.length > 0 ? allAssets : assets

  // Append new assets when page changes
  useEffect(() => {
    if (assets.length > 0 && page !== hasAppendedPage) {
      setAllAssets(prev => {
        // Avoid duplicates
        const newAssets = assets.filter(a => !prev.some(p => p.id === a.id))
        return [...prev, ...newAssets]
      })
      
      setHasAppendedPage(page)
    }
  }, [assets, page, hasAppendedPage, allAssets.length])

  // Reset assets when category, view, or following filter changes
  useEffect(() => {
    setAllAssets([])
    setPage(1)
    setHasAppendedPage(0)
  }, [category, view, followingFilter])

  // Infinite scroll observer
  useEffect(() => {
    const currentTarget = observerTarget.current
    if (!currentTarget || !meta) return

    const hasMorePages = page < meta.totalPages
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
  }, [isLoading, meta, page, allAssets.length])

  // Group assets by contributor for following feed
  const groupedByContributor = displayAssets.reduce((acc, asset) => {
    const contributorName = asset.contributor
    const contributorUsername = asset.contributorId // Use contributorId as fallback for username
    
    if (!acc[contributorName]) {
      acc[contributorName] = {
        contributor: {
          name: contributorName,
          username: contributorUsername,
          avatar: asset.contributorAvatar,
        },
        assets: [],
      }
    }
    acc[contributorName].assets.push(asset)
    return acc
  }, {} as Record<string, { contributor: { name: string; username: string; avatar?: string }; assets: Asset[] }>)

  const contributorGroups = Object.values(groupedByContributor)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleAssetClick = (asset: Asset) => {
    setModal({ type: 'preview', asset })
  }

  const handleDownload = (asset: Asset) => {
    if (!isLoggedIn) {
      setModal({ type: 'auth', defaultTab: 'login' })
      return
    }
    setModal({ type: 'download', asset })
  }

  const handleSaveToBoard = (asset: Asset) => {
    if (!isLoggedIn) {
      setModal({ type: 'auth', defaultTab: 'login' })
      return
    }
    setModal({ type: 'board', asset })
  }

  const handleLike = (asset: Asset) => {
    if (!isLoggedIn) {
      setModal({ type: 'auth', defaultTab: 'login' })
      return
    }

    // Toggle like state optimistically
    const isLiked = likedAssets.has(asset.id)
    
    if (isLiked) {
      // Unlike
      setLikedAssets(prev => {
        const newSet = new Set(prev)
        newSet.delete(asset.id)
        return newSet
      })
      unlike(asset.id)
    } else {
      // Like
      setLikedAssets(prev => new Set(prev).add(asset.id))
      like(asset.id)
    }
  }

  return (
    <div className="w-full">
      {/* Main tabs: For You vs Following - at the very top */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setView('foryou')}
          className={`relative px-6 py-3 text-[15px] font-bold transition-all rounded-xl ${
            view === 'foryou'
              ? 'bg-[#EE2B24] text-white shadow-lg shadow-[#EE2B24]/30 scale-105'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5] border border-[#E0E0E0]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            For You
          </span>
        </button>
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setModal({ type: 'auth', defaultTab: 'login' })
              return
            }
            setView('following')
          }}
          className={`relative px-6 py-3 text-[15px] font-bold transition-all rounded-xl ${
            view === 'following'
              ? 'bg-[#EE2B24] text-white shadow-lg shadow-[#EE2B24]/30 scale-105'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5] border border-[#E0E0E0]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Following
          </span>
        </button>
      </div>

      {/* For You tab content */}
      {view === 'foryou' && (
        <>
          {/* Hero Header with Search - only in For You tab */}
          <div className="relative mb-8 -mx-4 md:-mx-6 px-4 md:px-6 py-8 bg-gradient-to-br from-[#FFF5F5] via-[#FFF8F8] to-[#FFFAFA] border-b border-[#FFE5E5]">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#EE2B24]" />
                <h1
                  className="text-[32px] font-extrabold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Discover Amazing Content
                </h1>
                <Sparkles className="w-5 h-5 text-[#EE2B24]" />
              </div>
              <p
                className="text-[15px] text-[#666] mb-6"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Explore trending photos, follow talented creators, and find inspiration
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for photos, contributors, or collections..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-[#F0F0F0] rounded-2xl text-[14px] text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all shadow-sm hover:shadow-md"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
              </form>
            </div>
          </div>
          {/* Category section */}
          <div className="mb-8 overflow-visible">
            <h3
              className="text-[18px] font-bold text-[#111] mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <Flame className="w-5 h-5 text-[#EE2B24]" />
              Browse by Category
            </h3>
        
        {categoriesLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-[#FFE5E5] border-t-[#EE2B24] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative py-4 overflow-visible">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1 pt-1">
              {/* All category */}
              <button
                onClick={() => {
                  setCategory('all')
                  setPage(1)
                }}
                className={`flex-shrink-0 group relative overflow-hidden p-3 rounded-xl text-center transition-all hover:scale-105 min-w-[100px] ${
                  category === 'all'
                    ? 'bg-gradient-to-br from-[#EE2B24] to-[#d42520] text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-[#F0F0F0] hover:border-[#EE2B24] hover:shadow-lg'
                }`}
              >
                <div className="text-2xl mb-1">✨</div>
                <div
                  className={`text-[11px] font-bold ${
                    category === 'all' ? 'text-white' : 'text-[#111] group-hover:text-[#EE2B24]'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  All
                </div>
              </button>

              {/* Dynamic categories from API */}
              {categoriesData?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategory(cat.slug as DiscoverCategory)
                    setPage(1)
                  }}
                  className={`flex-shrink-0 group relative overflow-hidden p-3 rounded-xl text-center transition-all hover:scale-105 min-w-[100px] ${
                    category === cat.slug
                      ? 'bg-gradient-to-br from-[#EE2B24] to-[#d42520] text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-[#F0F0F0] hover:border-[#EE2B24] hover:shadow-lg'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon || '📷'}</div>
                  <div
                    className={`text-[11px] font-bold whitespace-nowrap ${
                      category === cat.slug ? 'text-white' : 'text-[#111] group-hover:text-[#EE2B24]'
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {cat.name}
                  </div>
                  {cat._count.assets > 0 && (
                    <div className={`text-[9px] mt-0.5 ${category === cat.slug ? 'text-white/80' : 'text-gray-500'}`}>
                      {cat._count.assets}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trending section header */}
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-[18px] font-bold text-[#111] flex items-center gap-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          <TrendingUp className="w-5 h-5 text-[#EE2B24]" />
          {category === 'all' ? 'All Photos' : `${category.charAt(0).toUpperCase() + category.slice(1)} Photos`}
        </h3>
      </div>

      {/* Loading state - initial load only */}
      {isLoading && allAssets.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mb-4 text-4xl">⏳</div>
            <p className="text-[#666]">Loading photos...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mb-4 text-4xl text-red-500">⚠️</div>
            <p className="text-[#666]">Failed to load photos</p>
            <p className="text-[13px] text-red-500 mt-2">{error.message}</p>
          </div>
        </div>
      )}

      {/* Assets grid */}
      {!error && displayAssets.length > 0 && (
        <>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-[10px]">
            {displayAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                isLiked={likedAssets.has(asset.id)}
                onClick={handleAssetClick}
                onDownload={handleDownload}
                onSaveToBoard={handleSaveToBoard}
                onLike={handleLike}
              />
            ))}
          </div>

          {/* Infinite scroll trigger - hidden but functional */}
          <div 
            ref={observerTarget} 
            className="mt-8 flex items-center justify-center py-4"
          >
            {!meta ? (
              <div className="flex items-center gap-2 text-[#999]">
                <div className="w-4 h-4 border-2 border-[#FFE5E5] border-t-[#EE2B24] rounded-full animate-spin" />
                <span className="text-[12px]">Loading...</span>
              </div>
            ) : page < meta.totalPages ? (
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

          {/* Empty state — only when the API actually returned zero assets.
              Without the `assets.length === 0` guard, navigating back to the page
              briefly shows "No photos found" because react-query returns cached
              data immediately while local `allAssets` hasn't been re-populated yet. */}
          {!isLoading && !error && assets.length === 0 && allAssets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[15px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No photos found
              </p>
              <p className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Try selecting a different category
              </p>
            </div>
          )}
        </>
      )}

      {/* Following tab content */}
      {view === 'following' && (
        <>
          {/* Filter tabs */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F0F0F0]">
            <div className="flex gap-2">
              <button
                onClick={() => setFollowingFilter('latest')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  followingFilter === 'latest'
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Clock className="w-3.5 h-3.5" />
                Latest
              </button>
              <button
                onClick={() => setFollowingFilter('popular')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  followingFilter === 'popular'
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Popular
              </button>
              <button
                onClick={() => setFollowingFilter('featured')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  followingFilter === 'featured'
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </button>
            </div>
          </div>

          {/* Loading state - initial load only */}
          {isLoading && allAssets.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="mb-4 text-4xl">⏳</div>
                <p className="text-[#666]">Loading photos...</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="mb-4 text-4xl text-red-500">⚠️</div>
                <p className="text-[#666]">Failed to load photos</p>
                <p className="text-[13px] text-red-500 mt-2">{error.message}</p>
              </div>
            </div>
          )}

          {/* Grouped by contributor */}
          {!error && contributorGroups.length > 0 && (
            <>
              <div className="space-y-10">
                {contributorGroups.map((group, idx) => {
                  const initials = group.contributor.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()

                  return (
                    <div key={idx}>
                      {/* Contributor header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => router.push(`/profile/${group.contributor.username || group.contributor.name}`)}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#EE2B24] flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm">
                            {group.contributor.avatar ? (
                              <img
                                src={group.contributor.avatar}
                                alt={group.contributor.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span
                                className="text-white text-[13px] font-bold"
                                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                              >
                                {initials}
                              </span>
                            )}
                          </div>
                          <div>
                            <p
                              className="text-[14px] font-bold text-[#111] group-hover:text-[#EE2B24] transition-colors"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                            >
                              {group.contributor.name}
                            </p>
                            <p
                              className="text-[12px] text-[#888]"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                            >
                              {group.assets[0]?.contributorAssets || 0} assets · {group.assets[0]?.contributorCollections || 0} collections
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => router.push(`/profile/${group.contributor.username || group.contributor.name}`)}
                          className="text-[12.5px] font-semibold text-[#EE2B24] hover:underline"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          View all
                        </button>
                      </div>

                      {/* Assets grid - show only 4 assets */}
                      <div className="columns-2 md:columns-4 gap-[10px]">
                        {group.assets.slice(0, 4).map((asset) => (
                          <AssetCard
                            key={asset.id}
                            asset={asset}
                            isLiked={likedAssets.has(asset.id)}
                            onClick={handleAssetClick}
                            onDownload={handleDownload}
                            onSaveToBoard={handleSaveToBoard}
                            onLike={handleLike}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Infinite scroll trigger */}
              <div 
                ref={observerTarget} 
                className="mt-8 flex items-center justify-center py-4"
              >
                {!meta ? (
                  <div className="flex items-center gap-2 text-[#999]">
                    <div className="w-4 h-4 border-2 border-[#FFE5E5] border-t-[#EE2B24] rounded-full animate-spin" />
                    <span className="text-[12px]">Loading...</span>
                  </div>
                ) : page < meta.totalPages ? (
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

          {/* Empty state - not following anyone */}
          {!isLoading && !error && assets.length === 0 && allAssets.length === 0 && (
            <div className="text-center py-16">
              <div className="mb-6">
                <Star className="w-16 h-16 text-[#EE2B24] mx-auto mb-4" />
                <h3 className="text-[20px] font-bold text-[#111] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  No Posts Yet
                </h3>
                <p className="text-[14px] text-[#666] max-w-md mx-auto"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Start following contributors to see their latest uploads here. Discover talented creators and build your personalized feed!
                </p>
              </div>
              <button
                onClick={() => router.push('/search')}
                className="px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Discover Contributors
              </button>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {modal.type === 'preview' && (
        <QuickPreviewModal
          asset={modal.asset}
          assets={displayAssets}
          onClose={closeModal}
          onDownload={handleDownload}
          onSaveToBoard={handleSaveToBoard}
          onAuthRequired={() => setModal({ type: 'auth', defaultTab: 'login' })}
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
        <SaveToBoardModal asset={modal.asset} onClose={closeModal} />
      )}
      {modal.type === 'auth' && (
        <AuthModal onClose={closeModal} defaultTab={modal.defaultTab} />
      )}
    </div>
  )
}
