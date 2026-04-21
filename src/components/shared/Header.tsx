'use client'

import Link from 'next/link'
import { ChevronDown, Upload, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[100] bg-white transition-all duration-200 ${
        isScrolled ? 'border-b border-black/10 shadow-sm' : ''
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 h-16 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" aria-label="234photos" className="flex-shrink-0">
          <div className="hidden md:block">
            <img src="/logo3.jpeg" alt="234photos" className="h-[50px] w-auto" />
          </div>
          <div className="md:hidden">
            <img src="/logo.jpeg" alt="234photos" className="h-10 w-auto" />
          </div>
        </Link>

        {/* Desktop Nav Actions */}
        <nav className="hidden md:flex items-center gap-1">
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#444] hover:text-[#111] hover:bg-gray-50 rounded-lg transition-colors">
            Explore
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 text-sm font-medium text-[#444] hover:text-[#111] hover:bg-gray-50 rounded-lg transition-colors">
            Pricing
          </button>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-semibold text-[#111] hover:bg-gray-50 rounded-lg transition-colors">
            Log in
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-[#111] border border-[#ddd] rounded-lg hover:bg-gray-50 transition-colors">
            Join free
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#EE2B24] text-white rounded-lg text-sm font-semibold hover:bg-[#d42520] transition-colors">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-[#111]" />
          ) : (
            <Menu className="w-5 h-5 text-[#111]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-2">
          <button className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#444] hover:bg-gray-50 rounded-lg transition-colors text-left">
            Explore <ChevronDown className="w-4 h-4" />
          </button>
          <button className="px-3 py-2.5 text-sm font-medium text-[#444] hover:bg-gray-50 rounded-lg transition-colors text-left">
            Pricing
          </button>
          <div className="border-t border-gray-100 mt-1 pt-3 flex flex-col gap-2">
            <button className="px-3 py-2.5 text-sm font-semibold text-[#111] hover:bg-gray-50 rounded-lg transition-colors text-left">
              Log in
            </button>
            <button className="px-3 py-2.5 text-sm font-semibold text-[#111] border border-[#ddd] rounded-lg hover:bg-gray-50 transition-colors text-left">
              Join free
            </button>
            <button className="flex items-center gap-2 px-3 py-2.5 bg-[#EE2B24] text-white rounded-lg text-sm font-semibold hover:bg-[#d42520] transition-colors">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
