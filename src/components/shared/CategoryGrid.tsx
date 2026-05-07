'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { categoriesApi, type Category } from '@/lib/api/categories'

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch top 12 categories with assets
        const data = await categoriesApi.list(12)
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section className="bg-white py-16 px-5 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <h2
            className="text-[#1A1A1A] text-[22px] font-extrabold leading-[33px] tracking-[-0.3px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Explore African content by category
          </h2>
          <a
            href="/search"
            className="text-[#EE2B24] text-[13px] font-semibold leading-[19.5px] whitespace-nowrap hover:underline"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            See all categories →
          </a>
        </div>

        {/* Category Grid */}
        {isLoading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[10px]">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="relative block rounded-xl overflow-hidden aspect-[4/3] bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : categories.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No categories available</p>
          </div>
        ) : (
          /* Category Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[10px]">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/search?category=${category.slug}`}
                className="relative block rounded-xl overflow-hidden aspect-[4/3] group shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] bg-[#1A1A1A]"
              >
                {/* Image */}
                {category.thumbnailUrl ? (
                  <img
                    src={category.thumbnailUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-white text-4xl opacity-50">{category.icon || '📁'}</span>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/18 to-black/65" />

                {/* Label */}
                <span
                  className="absolute bottom-0 left-0 w-full px-[10px] py-[9px] text-white text-[12px] font-bold leading-[15.6px] tracking-[0.1px]"
                  style={{
                    fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif',
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {category.name}
                </span>

                {/* Asset count badge */}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full">
                  <span className="text-white text-[10px] font-semibold">
                    {category._count.assets.toLocaleString()}
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
