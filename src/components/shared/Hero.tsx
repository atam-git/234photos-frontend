'use client'

import { useState } from 'react'

const tabs = ['Photos', 'Vectors', 'Illustrations', 'Footage', 'Music', 'Templates', '3D']

const galleryImages = [
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/d30260fdc1f5fcbb99f11075ad6be6a7ce54da70?width=392',
    alt: 'African woman in traditional attire',
  },
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/216470f26557a6424007673185370da11d96f782?width=392',
    alt: 'African couple in traditional clothing',
  },
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/b5e31fc51e664a3423a9ddf73b6529d00eb49344?width=392',
    alt: 'African musician',
  },
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/af2dfb30b188f7ce60e5834ea70ce0e1d0dddfcc?width=392',
    alt: 'African cuisine jollof rice',
  },
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/fdb39019a4538e8379be7520d23513f7f83acb5f?width=392',
    alt: 'African businessman',
  },
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/9672110b50f751e8766973404ed6449f0d20f354?width=392',
    alt: 'African football player',
  },
  {
    src: 'https://api.builder.io/api/v1/image/assets/TEMP/e46a184cfc26a71604cf609d2584196b5e71c5c1?width=392',
    alt: 'African leopard wildlife',
  },
]

export function Hero() {
  const [activeTab, setActiveTab] = useState('Photos')
  const [query, setQuery] = useState('')

  return (
    <section className="bg-white overflow-hidden">
      {/* Top Content */}
      <div className="flex flex-col items-center px-6 pt-16 md:pt-20 pb-10 md:pb-12">
        <div className="w-full max-w-[680px] flex flex-col items-center">
          {/* Heading */}
          <h1 className="text-[#111] text-center font-semibold text-3xl sm:text-4xl md:text-[54px] leading-[1.1] tracking-[-0.03em] mb-4">
            Power your brand with authentic African visuals
          </h1>

          {/* Subtitle */}
          <p className="text-[#777] text-center text-base leading-relaxed mb-8 max-w-[480px]">
            Royalty-free African images, videos and music for creators and brands worldwide.
          </p>

          {/* Tab List */}
          <div className="flex items-center gap-1 flex-wrap justify-center mb-3 w-full overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-[7px] rounded-lg text-[13.5px] whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-[#F0F0F0] text-[#111] font-semibold'
                    : 'text-[#888] font-medium hover:text-[#444] hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form
            className="flex items-center h-[58px] w-full rounded-full bg-white shadow-[0_2px_0_0_#E8E8E8,0_0_0_1px_#E8E8E8] overflow-hidden"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Camera Icon Button */}
            <button
              type="button"
              aria-label="Search by image"
              className="flex items-center justify-center w-14 h-full flex-shrink-0 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8333 4.1665H4.16667C3.24619 4.1665 2.5 4.9127 2.5 5.83317V14.1665C2.5 15.087 3.24619 15.8332 4.16667 15.8332H15.8333C16.7538 15.8332 17.5 15.087 17.5 14.1665V5.83317C17.5 4.9127 16.7538 4.1665 15.8333 4.1665Z" stroke="#BBBBBB" strokeWidth="1.5"/>
                <path d="M9.99992 12.9168C11.6107 12.9168 12.9166 11.611 12.9166 10.0002C12.9166 8.38933 11.6107 7.0835 9.99992 7.0835C8.38909 7.0835 7.08325 8.38933 7.08325 10.0002C7.08325 11.611 8.38909 12.9168 9.99992 12.9168Z" stroke="#BBBBBB" strokeWidth="1.5"/>
                <path d="M7.5 4.16667L8.75 2.5H11.25L12.5 4.16667" stroke="#BBBBBB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Vertical Divider */}
            <div className="w-px h-[22px] bg-[#E8E8E8] flex-shrink-0" />

            {/* Text Input */}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search African business, fashion, events…"
              className="flex-1 h-full px-4 bg-transparent border-none outline-none text-[15.5px] text-[#111] placeholder-[#BBB] min-w-0"
              autoComplete="off"
            />

            {/* Search Button */}
            <div className="flex-shrink-0 pr-[7px]">
              <button
                type="submit"
                className="flex items-center gap-[7px] h-11 px-[22px] bg-[#EE2B24] rounded-full hover:bg-[#d42520] transition-colors"
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.63633 15.1137C12.2136 15.1137 15.1136 12.2138 15.1136 8.63645C15.1136 5.05915 12.2136 2.15918 8.63633 2.15918C5.05903 2.15918 2.15906 5.05915 2.15906 8.63645C2.15906 12.2138 5.05903 15.1137 8.63633 15.1137Z" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
                  <path d="M17.2727 17.2726L13.3864 13.3862" stroke="white" strokeWidth="1.9" strokeLinecap="round"/>
                </svg>
                <span className="text-white text-[14.5px] font-semibold tracking-[0.1px]">Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Gallery Strip */}
      <div className="relative h-[292px] sm:h-[320px] md:h-[348px]">
        {/* Left fade gradient */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling images */}
        <div className="flex items-start gap-[10px] h-full px-4 overflow-x-auto scrollbar-hide pb-14">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[196px] h-[240px] sm:h-[256px] md:h-[272px] rounded-2xl overflow-hidden shadow-[0_1px_8px_0_rgba(0,0,0,0.08)] mt-4"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
