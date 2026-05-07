'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collectionsApi, type Collection } from '@/lib/api/collections'

export function Collections() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await collectionsApi.getFeatured()
        setCollections(data)
      } catch (error) {
        console.error('Failed to fetch featured collections:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCollections()
  }, [])

  return (
    <section className="bg-white py-12">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[22px] md:text-2xl font-bold text-[#191B26] leading-snug">
            Curated African collections
          </h2>
          <Link
            href="/collections"
            className="text-[#EE2B24] text-sm font-semibold hover:underline whitespace-nowrap shrink-0 ml-4"
          >
            Browse all collections →
          </Link>
        </div>

        {/* Collection Cards */}
        {isLoading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="block">
                <div className="h-[180px] rounded-xl bg-gray-200 animate-pulse mb-3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        ) : collections.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No featured collections available</p>
          </div>
        ) : (
          /* Collection Cards */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group block"
              >
                {/* Mosaic image grid */}
                <div className="flex gap-1 h-[180px] rounded-xl overflow-hidden mb-3 bg-gray-100">
                  {col.thumbnails.length >= 3 ? (
                    <>
                      {/* Large image — left */}
                      <div className="flex-[3] relative overflow-hidden">
                        <img
                          src={col.thumbnails[0]}
                          alt={col.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      {/* Two stacked images — right */}
                      <div className="flex-[2] flex flex-col gap-1">
                        <div className="flex-1 relative overflow-hidden">
                          <img
                            src={col.thumbnails[1]}
                            alt={col.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 relative overflow-hidden">
                          <img
                            src={col.thumbnails[2]}
                            alt={col.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </>
                  ) : col.thumbnails.length > 0 ? (
                    /* Single image fallback */
                    <div className="w-full relative overflow-hidden">
                      <img
                        src={col.thumbnails[0]}
                        alt={col.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    /* Empty state */
                    <div className="w-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <span className="text-gray-400 text-4xl">📁</span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <h3 className="text-[14px] font-semibold text-[#191B26] leading-snug mb-0.5 group-hover:text-[#EE2B24] transition-colors line-clamp-2">
                  {col.name}
                </h3>
                <p className="text-[13px] text-[#999]">
                  {col.assetCount.toLocaleString()} {col.assetCount === 1 ? 'image' : 'images'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
