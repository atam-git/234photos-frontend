'use client'

import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { collectionsApi, Collection } from '@/lib/api/collections'

export default function CollectionsPage() {
  const { data: collections, isLoading } = useQuery({
    queryKey: ['collections', 'featured'],
    queryFn: () => collectionsApi.getFeatured(),
  })

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#F5F5F7] px-4 md:px-6 py-14">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-[#EE2B24] text-[11px] font-bold uppercase tracking-[1.5px] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Curated Collections
            </p>
            <h1 className="text-[#111] text-[36px] md:text-[44px] font-extrabold leading-[1.1] tracking-[-1px] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Browse African collections
            </h1>
            <p className="text-[#666] text-[15px] leading-relaxed max-w-[520px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Hand-curated sets of authentic African imagery — organised by theme, culture and story.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-4 md:px-6 py-12">
          <div className="max-w-[1280px] mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex gap-1 h-[200px] rounded-2xl overflow-hidden mb-3 bg-gray-200">
                      <div className="flex-[3] bg-gray-300" />
                      <div className="flex-[2] flex flex-col gap-1">
                        <div className="flex-1 bg-gray-300" />
                        <div className="flex-1 bg-gray-300" />
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : collections && collections.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {collections.map((col) => (
                  <CollectionCard key={col.id} collection={col} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-[#666] text-[15px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  No featured collections available yet
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Collection Card Component
function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block"
    >
      {/* Mosaic */}
      <div className="flex gap-1 h-[200px] rounded-2xl overflow-hidden mb-3 bg-gray-100">
        {collection.thumbnails.length >= 3 ? (
          <>
            <div className="flex-[3] relative overflow-hidden">
              <img 
                src={collection.thumbnails[0]} 
                alt={collection.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <div className="flex-[2] flex flex-col gap-1">
              <div className="flex-1 overflow-hidden">
                <img 
                  src={collection.thumbnails[1]} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <img 
                  src={collection.thumbnails[2]} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </div>
          </>
        ) : collection.thumbnails.length === 2 ? (
          <>
            <div className="flex-1 relative overflow-hidden">
              <img 
                src={collection.thumbnails[0]} 
                alt={collection.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img 
                src={collection.thumbnails[1]} 
                alt={collection.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </>
        ) : collection.thumbnails.length === 1 ? (
          <div className="w-full relative overflow-hidden">
            <img 
              src={collection.thumbnails[0]} 
              alt={collection.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="text-[15px] font-bold text-[#111] mb-0.5 group-hover:text-[#EE2B24] transition-colors"
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
        {collection.name}
      </h3>
      <p className="text-[12.5px] text-[#888] mb-1"
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
        {collection.assetCount} {collection.assetCount === 1 ? 'asset' : 'assets'}
      </p>
      {collection.description && (
        <p className="text-[12.5px] text-[#666] leading-snug line-clamp-2"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {collection.description}
        </p>
      )}
    </Link>
  )
}
