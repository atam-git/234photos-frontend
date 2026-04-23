'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { SEARCH_MEDIA_TABS } from '@/lib/mock'

interface SearchBarProps {
  initialQuery?: string
  initialType?: string
}

export function SearchBar({ initialQuery = '', initialType = 'Photos' }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState(initialType)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    const params = new URLSearchParams({ q: query.trim() })
    if (activeTab !== 'Photos') params.set('type', activeTab.toLowerCase())
    router.push(`/search?${params.toString()}`)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (query.trim()) {
      const params = new URLSearchParams({ q: query.trim() })
      if (tab !== 'Photos') params.set('type', tab.toLowerCase())
      router.push(`/search?${params.toString()}`)
    }
  }

  return (
    <div className="bg-white border-b border-[#F0F0F0] px-5 md:px-8 lg:px-10 py-3">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-2">
        {/* Search input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center h-[50px] w-full rounded-full bg-white shadow-[0_0_0_1.5px_#E8E8E8] overflow-hidden hover:shadow-[0_0_0_1.5px_#BBBBBB] transition-shadow"
        >
          {/* Camera icon */}
          <button
            type="button"
            aria-label="Search by image"
            className="flex items-center justify-center w-12 h-full flex-shrink-0 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M15.8333 4.1665H4.16667C3.24619 4.1665 2.5 4.9127 2.5 5.83317V14.1665C2.5 15.087 3.24619 15.8332 4.16667 15.8332H15.8333C16.7538 15.8332 17.5 15.087 17.5 14.1665V5.83317C17.5 4.9127 16.7538 4.1665 15.8333 4.1665Z" stroke="#BBBBBB" strokeWidth="1.5" />
              <path d="M9.99992 12.9168C11.6107 12.9168 12.9166 11.611 12.9166 10.0002C12.9166 8.38933 11.6107 7.0835 9.99992 7.0835C8.38909 7.0835 7.08325 8.38933 7.08325 10.0002C7.08325 11.611 8.38909 12.9168 9.99992 12.9168Z" stroke="#BBBBBB" strokeWidth="1.5" />
              <path d="M7.5 4.16667L8.75 2.5H11.25L12.5 4.16667" stroke="#BBBBBB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="w-px h-[18px] bg-[#E8E8E8] flex-shrink-0" />

          {/* Input */}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search African business, fashion, events…"
            className="flex-1 h-full px-4 bg-transparent border-none outline-none text-[14.5px] text-[#111] placeholder-[#BBB] min-w-0"
            autoComplete="off"
          />

          {/* Submit */}
          <div className="flex-shrink-0 pr-[5px]">
            <button
              type="submit"
              className="flex items-center gap-[6px] h-10 px-5 bg-[#EE2B24] rounded-full hover:bg-[#d42520] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 19 19" fill="none">
                <path d="M8.63633 15.1137C12.2136 15.1137 15.1136 12.2138 15.1136 8.63645C15.1136 5.05915 12.2136 2.15918 8.63633 2.15918C5.05903 2.15918 2.15906 5.05915 2.15906 8.63645C2.15906 12.2138 5.05903 15.1137 8.63633 15.1137Z" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M17.2727 17.2726L13.3864 13.3862" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
              <span
                className="text-white text-[13.5px] font-semibold hidden sm:inline"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Search
              </span>
            </button>
          </div>
        </form>

        {/* Media type tabs */}
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
          {SEARCH_MEDIA_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 py-[5px] rounded-lg text-[12.5px] whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-[#F0F0F0] text-[#111] font-semibold'
                  : 'text-[#888] font-medium hover:text-[#444] hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
