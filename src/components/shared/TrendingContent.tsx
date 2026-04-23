'use client'

import { useState } from 'react'
import { TRENDING_FILTER_TABS, TRENDING_IMAGES } from '@/lib/mock'

export function TrendingContent() {
  const [activeFilter, setActiveFilter] = useState('All')

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
              href={`/search?q=trending+african${activeFilter !== 'All' ? `&type=${activeFilter.toLowerCase()}` : ''}`}
              className="text-[#EE2B24] text-[13px] font-semibold leading-[19.5px] hover:underline whitespace-nowrap"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              See all →
            </a>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {TRENDING_FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-[5px] rounded-full border text-[13px] leading-[19.5px] transition-colors ${
                  activeFilter === tab
                    ? 'bg-[#111] border-[#111] text-white font-semibold'
                    : 'border-[#DDD] text-[#666] font-medium hover:border-[#999] hover:text-[#444]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] lg:[grid-template-rows:210px_210px_210px_210px_210px]"
        >
          {TRENDING_IMAGES.map((image) => (
            <a
              key={image.id}
              href={`/search?q=${encodeURIComponent(image.alt)}${activeFilter !== 'All' ? `&type=${activeFilter.toLowerCase()}` : ''}`}
              className={`block relative overflow-hidden rounded-[14px] bg-[#E0E0E0] group
                ${image.desktopClass}
                ${image.mobileClass}
                ${image.id === 1 ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-square lg:aspect-auto'}
              `}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              {/* Label on hover */}
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-white text-[11px] font-semibold drop-shadow"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {image.alt}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
