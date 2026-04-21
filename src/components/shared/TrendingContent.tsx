'use client'

import { useState } from 'react'

const filterTabs = ['All', 'Photos', 'Vectors', 'Illustrations', 'Footage']

const trendingImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Lagos Tech Hub',
    // Desktop: rows 1-2, cols 1-2 (large feature)
    desktopClass: 'lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2',
    // Mobile: span 2 cols
    mobileClass: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    alt: 'African Fashion Show',
    desktopClass: 'lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    alt: 'African Street Food',
    desktopClass: 'lg:col-start-4 lg:col-span-1 lg:row-start-1 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?auto=format&fit=crop&w=600&q=80',
    alt: 'African Textiles and Fabrics',
    desktopClass: 'lg:col-start-3 lg:col-span-1 lg:row-start-2 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80',
    alt: 'African City Street',
    desktopClass: 'lg:col-start-4 lg:col-span-1 lg:row-start-2 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    alt: 'African Women in Traditional Attire',
    desktopClass: 'lg:col-start-1 lg:col-span-1 lg:row-start-3 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80',
    alt: 'African Festival and Concert',
    desktopClass: 'lg:col-start-2 lg:col-span-1 lg:row-start-3 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
    alt: 'African Business Woman',
    desktopClass: 'lg:col-start-3 lg:col-span-1 lg:row-start-3 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
    alt: 'African Business Meeting',
    desktopClass: 'lg:col-start-4 lg:col-span-1 lg:row-start-3 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
    alt: 'Jollof Rice',
    desktopClass: 'lg:col-start-1 lg:col-span-2 lg:row-start-4 lg:row-span-1',
    mobileClass: 'col-span-2',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80',
    alt: 'African City Aerial View',
    desktopClass: 'lg:col-start-3 lg:col-span-1 lg:row-start-4 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    alt: 'African Leaders Group Photo',
    desktopClass: 'lg:col-start-4 lg:col-span-1 lg:row-start-4 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    alt: 'African City Skyline at Dusk',
    desktopClass: 'lg:col-start-1 lg:col-span-1 lg:row-start-5 lg:row-span-1',
    mobileClass: 'col-span-1',
  },
]

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
            {filterTabs.map((tab) => (
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
          {trendingImages.map((image) => (
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
