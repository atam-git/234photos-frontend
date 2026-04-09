'use client'

import Link from 'next/link'
import { Search, ChevronDown, X, Upload, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
  const [exploreOpen, setExploreOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-[100] bg-white transition-all duration-200 ${isScrolled ? 'border-b border-[rgba(0,0,0,0.1)]' : ''}`}>
      <div className="flex items-center justify-between px-5 h-16 max-w-[1920px] mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="234photos">
            <div className="hidden md:block">
              <img 
                src="/logo3.jpeg" 
                alt="234photos" 
                className="h-[50px] w-auto"
              />
            </div>
            <div className="md:hidden">
              <img 
                src="/logo.jpeg" 
                alt="234photos" 
                className="h-10 w-auto"
              />
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[800px] mx-5">
          <form className="w-full flex items-center bg-[#f5f5f5] rounded-3xl px-4 py-2">
            <button type="submit" className="p-2" aria-label="Search 234photos">
              <Search className="w-6 h-6 text-gray-600" />
            </button>
            <input
              type="search"
              placeholder="Search 234photos"
              className="flex-1 mx-3 bg-transparent border-none outline-none text-base text-[#191b26]"
              autoComplete="off"
            />
            <button type="button" className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-[#191b26]">
              <span>All images</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          {/* Explore Dropdown - Desktop Only */}
          <div className="hidden md:block relative">
            <button
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#191b26] hover:bg-gray-50 rounded transition-colors"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <span>Explore</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Log in - Desktop Only */}
          <button className="hidden md:block px-4 py-2 text-sm font-medium text-[#191b26] hover:bg-gray-50 rounded transition-colors">
            Log in
          </button>

          {/* Join */}
          <button className="px-4 py-2 text-sm font-medium text-[#191b26] border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Join
          </button>

          {/* Upload - Desktop Only */}
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#cb0001] text-white rounded text-sm font-medium hover:bg-[#b00001] transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>

          {/* Mobile Menu - Mobile Only */}
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6 text-[#191b26]" />
          </button>
        </div>
      </div>
    </header>
  )
}
