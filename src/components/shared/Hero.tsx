'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api/client'

const tabs = [
  'Photos',        // ✅ Works
  'Videos',        // 🔒 Coming Soon
  'Vectors',       // 🔒 Coming Soon
  'Illustrations', // 🔒 Coming Soon
]

// Currently only Photos are supported
const supportedTabs = ['Photos']

export function Hero() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Photos')
  const [query, setQuery] = useState('')
  const [galleryImages, setGalleryImages] = useState<Array<{ src: string; alt: string; id: string }>>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch featured assets for hero carousel
  useEffect(() => {
    const fetchHeroAssets = async () => {
      try {
        // Fetch featured assets for hero carousel
        const response = await api.get<any>('/assets', {
          query: {
            featured: 'true',
            sortBy: 'popular',
            limit: 12,
            page: 1,
          }
        })
        
        // API returns { data: [...assets], meta: {...} }
        const assets = response?.data || []

        if (assets && assets.length > 0) {
          const processedAssets = assets
            .filter((asset: any) => asset.previewUrl || asset.watermarkedUrl || asset.thumbnailUrl) // Prefer preview/watermarked over thumbnail
            .map((asset: any) => ({
              src: asset.previewUrl || asset.watermarkedUrl || asset.thumbnailUrl, // Use preview (watermarked full-size) for better quality
              alt: asset.title || 'African content',
              id: asset.id,
            }))

          if (processedAssets.length > 0) {
            setGalleryImages(processedAssets)
          }
        }
      } catch (error) {
        console.error('Error fetching featured assets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroAssets()
  }, [])

  const handleTabClick = (tab: string) => {
    // Only allow clicking supported tabs
    if (!supportedTabs.includes(tab)) {
      return
    }
    
    setActiveTab(tab)
    
    // Navigate to search for supported tabs
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (tab !== 'Photos') params.set('type', tab.toLowerCase())
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="bg-white overflow-hidden min-h-[700px] sm:min-h-[750px] md:min-h-[800px]">
      {/* Top Content */}
      <div className="flex flex-col items-center px-6 pt-12 md:pt-16 pb-10 md:pb-12">
        <div className="w-full max-w-[720px] flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-[#111] text-center font-extrabold text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.1] tracking-[-0.03em] mb-5">
            Power your brand with authentic African visuals
          </h1>

          {/* Subtitle */}
          <p className="text-[#666] text-center text-[16px] sm:text-[17px] leading-relaxed mb-10 max-w-[520px]">
            Royalty-free African images, videos and music for creators and brands worldwide.
          </p>

          {/* Tab List */}
          <div className="flex items-center gap-2 flex-wrap justify-center mb-6 w-full">
            {tabs.map((tab) => {
              const isSupported = supportedTabs.includes(tab)
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  disabled={!isSupported}
                  className={`px-4 py-2 rounded-lg text-[14px] font-semibold whitespace-nowrap transition-all relative ${
                    activeTab === tab && isSupported
                      ? 'bg-[#111] text-white shadow-sm'
                      : isSupported
                      ? 'text-[#555] hover:text-[#111] hover:bg-[#F5F5F5] cursor-pointer'
                      : 'text-[#999] cursor-not-allowed opacity-50'
                  }`}
                >
                  {tab}
                  {!isSupported && (
                    <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold uppercase tracking-wider">
                      Soon
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <form
            className="flex items-center h-[60px] w-full rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E8E8E8] overflow-hidden hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)] transition-shadow"
            onSubmit={(e) => {
              e.preventDefault()
              if (!query.trim()) return
              
              // Only search for supported tabs
              if (!supportedTabs.includes(activeTab)) {
                return
              }
              
              const params = new URLSearchParams({ q: query.trim() })
              if (activeTab !== 'Photos') params.set('type', activeTab.toLowerCase())
              router.push(`/search?${params.toString()}`)
            }}
          >
            {/* Camera Icon Button */}
            <button
              type="button"
              aria-label="Search by image"
              className="flex items-center justify-center w-14 h-full flex-shrink-0 hover:bg-gray-50 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8333 4.1665H4.16667C3.24619 4.1665 2.5 4.9127 2.5 5.83317V14.1665C2.5 15.087 3.24619 15.8332 4.16667 15.8332H15.8333C16.7538 15.8332 17.5 15.087 17.5 14.1665V5.83317C17.5 4.9127 16.7538 4.1665 15.8333 4.1665Z" stroke="#999" strokeWidth="1.5"/>
                <path d="M9.99992 12.9168C11.6107 12.9168 12.9166 11.611 12.9166 10.0002C12.9166 8.38933 11.6107 7.0835 9.99992 7.0835C8.38909 7.0835 7.08325 8.38933 7.08325 10.0002C7.08325 11.611 8.38909 12.9168 9.99992 12.9168Z" stroke="#999" strokeWidth="1.5"/>
                <path d="M7.5 4.16667L8.75 2.5H11.25L12.5 4.16667" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Vertical Divider */}
            <div className="w-px h-[24px] bg-[#E0E0E0] flex-shrink-0" />

            {/* Text Input */}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search African business, fashion, events…"
              className="flex-1 h-full px-5 bg-transparent border-none outline-none text-[16px] text-[#111] placeholder-[#999] min-w-0"
              autoComplete="off"
            />

            {/* Search Button */}
            <div className="flex-shrink-0 pr-2">
              <button
                type="submit"
                className="flex items-center gap-2 h-12 px-6 bg-[#EE2B24] rounded-full hover:bg-[#d42520] transition-all hover:shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.63633 15.1137C12.2136 15.1137 15.1136 12.2138 15.1136 8.63645C15.1136 5.05915 12.2136 2.15918 8.63633 2.15918C5.05903 2.15918 2.15906 5.05915 2.15906 8.63645C2.15906 12.2138 5.05903 15.1137 8.63633 15.1137Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M17.2727 17.2726L13.3864 13.3862" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-white text-[15px] font-bold tracking-[0.2px]">Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Gallery Strip — infinite auto-scroll or loading skeletons */}
      <div className="relative h-[292px] sm:h-[320px] md:h-[348px] overflow-hidden bg-white">
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {isLoading ? (
          /* Loading Skeletons */
          <div className="flex items-start gap-[10px] h-full absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[196px] h-[240px] sm:h-[256px] md:h-[272px] rounded-2xl bg-gray-200 animate-pulse mt-4"
              />
            ))}
          </div>
        ) : galleryImages.length === 0 ? (
          /* Empty State */
          <div className="flex items-center justify-center h-full absolute inset-0">
            <div className="text-center px-6">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Featured Assets</h3>
              <p className="text-sm text-gray-500">Featured assets will appear here once added by admins</p>
            </div>
          </div>
        ) : (
          /* Scrolling track — duplicated for seamless loop */
          <div className="flex items-start gap-[10px] h-full animate-marquee hover:pause-marquee absolute inset-0">
            {[...galleryImages, ...galleryImages].map((img, i) => (
              <a
                key={i}
                href={`/search?q=${encodeURIComponent(img.alt)}`}
                className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[196px] h-[240px] sm:h-[256px] md:h-[272px] rounded-2xl overflow-hidden shadow-[0_1px_8px_0_rgba(0,0,0,0.08)] mt-4 group block"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
