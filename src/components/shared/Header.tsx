'use client'

import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Images', hasDropdown: true },
  { label: 'Footage', hasDropdown: true },
  { label: 'Music', hasDropdown: true },
  { label: 'Templates', hasDropdown: true },
  { label: 'Pricing', hasDropdown: false },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[100] bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-sm border-b border-black/10' : 'border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 lg:px-10 h-[60px] max-w-[1440px] mx-auto">

        {/* Logo */}
        <Link href="/" aria-label="234photos" className="flex-shrink-0">
          <img src="/logo3.jpeg" alt="234photos" className="h-[38px] w-auto hidden md:block" />
          <img src="/logo.jpeg" alt="234photos" className="h-9 w-auto md:hidden" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 mx-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-[3px] px-3 py-2 text-[13.5px] font-medium text-[#111] hover:bg-gray-100 rounded-md transition-colors"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-[14px] h-[14px] text-[#555]" />}
            </button>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-5 py-[9px] text-[13.5px] font-medium text-[#111] border border-[#D0D0D0] rounded-full hover:bg-gray-50 transition-colors">
            Log in
          </button>
          <button className="px-5 py-[9px] text-[13.5px] font-semibold text-white bg-[#111] rounded-full hover:bg-[#333] transition-colors">
            Sign up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
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
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#111] hover:bg-gray-50 rounded-lg transition-colors text-left w-full"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-4 h-4 text-[#555]" />}
            </button>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
            <button className="w-full px-4 py-2.5 text-sm font-medium text-[#111] border border-[#D0D0D0] rounded-full hover:bg-gray-50 transition-colors">
              Log in
            </button>
            <button className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#111] rounded-full hover:bg-[#333] transition-colors">
              Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
