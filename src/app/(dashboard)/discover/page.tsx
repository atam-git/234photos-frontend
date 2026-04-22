'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { UserCheck, Clock, TrendingUp, Sparkles, Search, Zap, Star, Flame } from 'lucide-react'
import Link from 'next/link'
import { AssetCard, Asset } from '@/components/features/search/AssetCard'
import { AuthModal } from '@/components/shared/Modals/AuthModal'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import { SaveToBoardModal } from '@/components/shared/Modals/SaveToBoardModal'
import { QuickPreviewModal } from '@/components/shared/Modals/QuickPreviewModal'
import { useAuthStore } from '@/stores/authStore'
import { getContributorUsername } from '@/lib/mock/contributors'

type ModalState =
  | { type: 'none' }
  | { type: 'preview'; asset: Asset }
  | { type: 'download'; asset: Asset }
  | { type: 'board'; asset: Asset }
  | { type: 'auth'; defaultTab?: 'login' | 'signup' }

// Mock feed data - latest uploads from followed contributors
const MOCK_FEED: Array<{
  contributor: string
  contributorAvatar: string
  uploadDate: string
  assets: Asset[]
}> = [
  {
    contributor: 'Sarah Johnson',
    contributorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    uploadDate: '2 hours ago',
    assets: [
      { id: '101', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', alt: 'Mountain landscape', contributor: 'Sarah Johnson', resolution: '6000×4000', aspectRatio: 1.5 },
      { id: '102', src: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6', alt: 'Forest path', contributor: 'Sarah Johnson', resolution: '5472×3648', aspectRatio: 1.5 },
      { id: '103', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', alt: 'Lake view', contributor: 'Sarah Johnson', resolution: '6000×4000', isAI: true, aspectRatio: 1.5 },
    ],
  },
  {
    contributor: 'Michael Chen',
    contributorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    uploadDate: '5 hours ago',
    assets: [
      { id: '201', src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', alt: 'City skyline', contributor: 'Michael Chen', resolution: '5184×3456', aspectRatio: 1.5 },
      { id: '202', src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b', alt: 'Urban street', contributor: 'Michael Chen', resolution: '6000×4000', isFree: true, aspectRatio: 1.5 },
    ],
  },
  {
    contributor: 'Emma Rodriguez',
    contributorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    uploadDate: '1 day ago',
    assets: [
      { id: '301', src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29', alt: 'Beach sunset', contributor: 'Emma Rodriguez', resolution: '5472×3648', aspectRatio: 1.5 },
      { id: '302', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', alt: 'Ocean waves', contributor: 'Emma Rodriguez', resolution: '6000×4000', aspectRatio: 1.5 },
      { id: '303', src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0', alt: 'Tropical beach', contributor: 'Emma Rodriguez', resolution: '5184×3456', isEditorial: true, aspectRatio: 1.5 },
      { id: '304', src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a', alt: 'Coastal rocks', contributor: 'Emma Rodriguez', resolution: '6000×4000', aspectRatio: 1.5 },
    ],
  },
]

const FOLLOWED_CONTRIBUTORS = [
  { name: 'Sarah Johnson', username: 'sarah-johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Michael Chen', username: 'michael-chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Emma Rodriguez', username: 'emma-rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'David Kim', username: 'david-kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
]

type FeedFilter = 'latest' | 'popular' | 'featured' | 'foryou'
type Category = 'all' | 'nature' | 'urban' | 'people' | 'business' | 'food' | 'tech' | 'fashion'

export default function FollowingPage() {
  const router = useRouter()
  const [modal, setModal] = useState<ModalState>({ type: 'none' })
  const [filter, setFilter] = useState<FeedFilter>('latest')
  const [category, setCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleItems, setVisibleItems] = useState(3)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const closeModal = () => setModal({ type: 'none' })

  // Filter feed based on selected filter
  const getFilteredFeed = () => {
    let feed = [...MOCK_FEED]
    
    if (filter === 'popular') {
      // Sort by number of assets (simulating popularity)
      feed.sort((a, b) => b.assets.length - a.assets.length)
    } else if (filter === 'featured') {
      // Show only items with special assets (AI, Editorial, Free)
      feed = feed.filter(item => 
        item.assets.some(a => a.isAI || a.isEditorial || a.isFree)
      )
    }
    // 'latest' is default order
    
    return feed.slice(0, visibleItems)
  }

  // Filter For You content by category
  const getCategoryAssets = () => {
    const allAssets = MOCK_FEED.flatMap(item => item.assets)
    
    if (category === 'all') {
      return allAssets
    }
    
    // Simple category filtering based on asset alt text
    return allAssets.filter(asset => {
      const alt = asset.alt.toLowerCase()
      switch (category) {
        case 'nature': return alt.includes('mountain') || alt.includes('forest') || alt.includes('lake')
        case 'urban': return alt.includes('city') || alt.includes('urban') || alt.includes('street')
        case 'people': return alt.includes('people') || alt.includes('person')
        case 'business': return alt.includes('business') || alt.includes('office')
        case 'food': return alt.includes('food')
        case 'tech': return alt.includes('tech')
        case 'fashion': return alt.includes('fashion')
        default: return true
      }
    })
  }

  const loadMore = () => {
    setVisibleItems(prev => prev + 3)
  }

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
    }
  }

  return (
    <div className="w-full">
      {/* Exciting Hero Header with Search */}
      <div className="relative mb-8 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-8 bg-gradient-to-br from-[#FFF5F5] via-[#FFF8F8] to-[#FFFAFA] border-b border-[#FFE5E5]">
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

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#EE2B24]" />
              <span className="text-[13px] font-semibold text-[#666]">
                <span className="text-[#EE2B24]">2.4K</span> new today
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[#EE2B24]" />
              <span className="text-[13px] font-semibold text-[#666]">
                <span className="text-[#EE2B24]">156</span> trending
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#EE2B24]" />
              <span className="text-[13px] font-semibold text-[#666]">
                <span className="text-[#EE2B24]">{FOLLOWED_CONTRIBUTORS.length}</span> following
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main tabs: Following vs For You - More exciting design */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setFilter('latest')}
          className={`relative px-6 py-3 text-[15px] font-bold transition-all rounded-xl ${
            filter === 'latest' || filter === 'popular' || filter === 'featured'
              ? 'bg-[#EE2B24] text-white shadow-lg shadow-[#EE2B24]/30 scale-105'
              : 'bg-white text-[#666] hover:bg-[#F5F5F5] border border-[#E0E0E0]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          <span className="flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            Following
          </span>
        </button>
        <button
          onClick={() => setFilter('foryou')}
          className={`relative px-6 py-3 text-[15px] font-bold transition-all rounded-xl ${
            filter === 'foryou'
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
      </div>

      {/* Following tab content */}
      {(filter === 'latest' || filter === 'popular' || filter === 'featured') && (
        <>
          {/* Filter tabs + Following list */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F0F0F0]">
            {/* Filter tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('latest')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  filter === 'latest'
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Clock className="w-3.5 h-3.5" />
                Latest
              </button>
              <button
                onClick={() => setFilter('popular')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  filter === 'popular'
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Popular
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                  filter === 'featured'
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </button>
            </div>

            {/* Following count + manage */}
            <Link
              href="#"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#666] hover:text-[#EE2B24] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <UserCheck className="w-4 h-4" />
              {FOLLOWED_CONTRIBUTORS.length} following
            </Link>
          </div>

          {/* Horizontal contributor chips */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {FOLLOWED_CONTRIBUTORS.map((contributor) => {
              const initials = contributor.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()

              return (
                <Link
                  key={contributor.username}
                  href={`/profile/${contributor.username}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E0E0E0] bg-white hover:border-[#EE2B24] hover:bg-[#FFF5F5] transition-colors shrink-0"
                >
                  <div className="w-6 h-6 rounded-full bg-[#EE2B24] flex items-center justify-center overflow-hidden">
                    {contributor.avatar ? (
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span
                        className="text-white text-[10px] font-bold"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        {initials}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[13px] font-semibold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {contributor.name}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Feed */}
          <div className="space-y-10">
            {getFilteredFeed().map((item, idx) => (
              <div key={idx}>
                {/* Contributor header */}
                <div className="flex items-center justify-between mb-4">
                  <Link
                    href={`/profile/${getContributorUsername(item.contributor)}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EE2B24] flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm">
                      {item.contributorAvatar ? (
                        <img
                          src={item.contributorAvatar}
                          alt={item.contributor}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span
                          className="text-white text-[13px] font-bold"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          {item.contributor.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p
                        className="text-[14px] font-bold text-[#111] group-hover:text-[#EE2B24] transition-colors"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        {item.contributor}
                      </p>
                      <p
                        className="text-[12px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                      >
                        Uploaded {item.uploadDate}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={`/profile/${getContributorUsername(item.contributor)}`}
                    className="text-[12.5px] font-semibold text-[#EE2B24] hover:underline"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    View all
                  </Link>
                </div>

                {/* Assets grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-[10px]">
                  {item.assets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      onClick={handleAssetClick}
                      onDownload={handleDownload}
                      onSaveToBoard={handleSaveToBoard}
                      onLike={handleLike}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          {visibleItems < MOCK_FEED.length && (
            <div className="mt-10 text-center">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-[#F5F5F5] text-[#111] text-[13.5px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}

      {/* For You tab content */}
      {filter === 'foryou' && (
        <>
          {/* Exciting category section with emojis */}
          <div className="mb-8">
            <h3
              className="text-[18px] font-bold text-[#111] mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <Flame className="w-5 h-5 text-[#EE2B24]" />
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { name: 'All', emoji: '✨', key: 'all' as Category },
                { name: 'Nature', emoji: '🌿', key: 'nature' as Category },
                { name: 'Urban', emoji: '🏙️', key: 'urban' as Category },
                { name: 'People', emoji: '👥', key: 'people' as Category },
                { name: 'Business', emoji: '💼', key: 'business' as Category },
                { name: 'Food', emoji: '🍽️', key: 'food' as Category },
                { name: 'Tech', emoji: '💻', key: 'tech' as Category },
                { name: 'Fashion', emoji: '👗', key: 'fashion' as Category },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`group relative overflow-hidden p-4 rounded-2xl text-center transition-all hover:scale-105 hover:shadow-xl ${
                    category === cat.key
                      ? 'bg-gradient-to-br from-[#EE2B24] to-[#d42520] text-white shadow-lg'
                      : 'bg-white border-2 border-[#F0F0F0] hover:border-[#EE2B24]'
                  }`}
                >
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <div
                    className={`text-[12px] font-bold ${
                      category === cat.key ? 'text-white' : 'text-[#111] group-hover:text-[#EE2B24]'
                    }`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {cat.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trending section header */}
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-[18px] font-bold text-[#111] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <TrendingUp className="w-5 h-5 text-[#EE2B24]" />
              Trending Now
            </h3>
            <button
              className="text-[13px] font-semibold text-[#EE2B24] hover:underline"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              View all
            </button>
          </div>

          {/* Discover grid - mixed content from all contributors */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-[10px]">
            {getCategoryAssets().map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onClick={handleAssetClick}
                onDownload={handleDownload}
                onSaveToBoard={handleSaveToBoard}
                onLike={handleLike}
              />
            ))}
          </div>

          {/* Empty state if no results */}
          {getCategoryAssets().length === 0 && (
            <div className="text-center py-16">
              <p className="text-[15px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No assets found in this category
              </p>
              <p className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Try selecting a different category
              </p>
            </div>
          )}

          {/* Load more */}
          <div className="mt-10 text-center">
            <button
              className="px-6 py-3 bg-[#F5F5F5] text-[#111] text-[13.5px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Explore more
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      {modal.type === 'preview' && (
        <QuickPreviewModal
          asset={modal.asset}
          assets={filter === 'foryou' ? getCategoryAssets() : getFilteredFeed().flatMap(item => item.assets)}
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
