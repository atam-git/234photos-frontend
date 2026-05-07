'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api/client'

const FILTER_TABS = ['All', 'Photos', 'Videos', 'Vectors']

interface TrendingAsset {
  id: string
  title: string
  thumbnailUrl: string
  previewUrl: string
}

export function TrendingContent() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [assets, setAssets] = useState<TrendingAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true)
      try {
        // Fetch trending assets (sorted by views/popularity)
        const response = await api.get<any>('/assets', {
          query: {
            sortBy: 'popular',
            limit: 12,
            page: 1,
          }
        })
        
        const assetsData = response?.data || []
        setAssets(assetsData.slice(0, 12))
      } catch (error) {
        console.error('Failed to fetch trending assets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrending()
  }, [])

  // Grid layout classes for masonry effect
  const getGridClasses = (index: number) => {
    // Desktop layout (4 columns, varied heights)
    const desktopClasses = [
      'lg:row-span-2 lg:col-span-2', // 0: Large (2x2)
      'lg:row-span-1 lg:col-span-1', // 1: Small
      'lg:row-span-1 lg:col-span-1', // 2: Small
      'lg:row-span-2 lg:col-span-1', // 3: Tall
      'lg:row-span-1 lg:col-span-1', // 4: Small
      'lg:row-span-2 lg:col-span-1', // 5: Tall
      'lg:row-span-1 lg:col-span-1', // 6: Small
      'lg:row-span-1 lg:col-span-1', // 7: Small
      'lg:row-span-1 lg:col-span-2', // 8: Wide
      'lg:row-span-1 lg:col-span-1', // 9: Small
      'lg:row-span-1 lg:col-span-1', // 10: Small
      'lg:row-span-1 lg:col-span-2', // 11: Wide
    ]
    
    return desktopClasses[index] || 'lg:row-span-1 lg:col-span-1'
  }

  return (
    <section className="bg-[#F5F5F7] py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between items-baseline w-full">
            <h2
              className="text-[#111] text-[22px] font-bold leading-[33px] tracking-[-0.3px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Trending African content
            </h2>
            <a
              href="/search?sortBy=popular"
              className="text-[#EE2B24] text-[13px] font-semibold leading-[19.5px] hover:underline whitespace-nowrap"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              See all →
            </a>
          </div>

          {/* Filter Tabs - Disabled for now since we only support Photos */}
          <div className="flex flex-wrap gap-1.5">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => tab === 'All' || tab === 'Photos' ? setActiveFilter(tab) : null}
                disabled={tab !== 'All' && tab !== 'Photos'}
                className={`px-3.5 py-[5px] rounded-full border text-[13px] leading-[19.5px] transition-colors ${
                  activeFilter === tab
                    ? 'bg-[#111] border-[#111] text-white font-semibold'
                    : tab === 'All' || tab === 'Photos'
                    ? 'border-[#DDD] text-[#666] font-medium hover:border-[#999] hover:text-[#444] cursor-pointer'
                    : 'border-[#DDD] text-[#CCC] font-medium cursor-not-allowed'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {tab}
                {tab !== 'All' && tab !== 'Photos' && (
                  <span className="ml-1.5 text-[9px] px-1 py-0.5 rounded bg-gray-100 text-gray-400 font-bold uppercase">Soon</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        {isLoading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] lg:grid-rows-[210px_210px_210px_210px_210px]">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-[14px] bg-gray-200 animate-pulse ${getGridClasses(i)} ${
                  i === 0 ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-square lg:aspect-auto'
                }`}
              />
            ))}
          </div>
        ) : assets.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No trending content available</p>
          </div>
        ) : (
          /* Image Grid */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] lg:grid-rows-[210px_210px_210px_210px_210px]">
            {assets.map((asset, index) => (
              <a
                key={asset.id}
                href={`/asset/${asset.id}`}
                className={`block relative overflow-hidden rounded-[14px] bg-[#E0E0E0] group ${getGridClasses(index)} ${
                  index === 0 ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-square lg:aspect-auto'
                }`}
              >
                <img
                  src={asset.previewUrl || asset.thumbnailUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                {/* Label on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-white text-[11px] font-semibold drop-shadow line-clamp-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {asset.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
