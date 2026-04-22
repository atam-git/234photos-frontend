'use client'

import Link from 'next/link'
import { ChevronDown, Menu, X, Grid2X2, LayoutDashboard, LogOut } from 'lucide-react'
import { useState, useEffect, useRef, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'Editorial', href: '/editorial' },
  { label: 'Pricing', href: '/pricing' },
]

interface HeaderProps {
  variant?: 'default' | 'search'
  initialQuery?: string
  onAuthClick?: (tab?: 'login' | 'signup') => void
}

export function Header({ variant = 'default', initialQuery = '', onAuthClick }: HeaderProps) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [browseOpen, setBrowseOpen] = useState(false)
  const [query, setQuery] = useState(initialQuery)
  const browseRef = useRef<HTMLDivElement>(null)
  const { isLoggedIn, user, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (browseRef.current && !browseRef.current.contains(e.target as Node)) {
        setBrowseOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header
      className={`sticky top-0 z-[100] bg-white transition-all duration-200 ${
        isScrolled ? 'shadow-sm border-b border-black/10' : 'border-b border-[#F0F0F0]'
      }`}
    >
      <div className="relative flex items-center px-4 md:px-6 h-[60px] max-w-[1440px] mx-auto">

        {/* Logo — left */}
        <Link href="/" aria-label="234photos" className="flex-shrink-0">
          <img src="/logo/234final1black.png" alt="234photos" className="h-[34px] w-auto hidden md:block" />
          <img src="/logo/234final1black.png" alt="234photos" className="h-8 w-auto md:hidden" />
        </Link>

        {variant === 'search' ? (
          /* Search variant: search bar takes remaining space, no centering needed */
          <div className="flex items-center gap-3 flex-1 ml-3">
            {/* Inline search bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 flex items-center h-[38px] rounded-full bg-white border border-[#C0C0C0] hover:border-[#999] focus-within:border-[#999] transition-colors overflow-hidden"
            >
              <button
                type="button"
                aria-label="Search by image"
                className="flex items-center justify-center w-10 h-full flex-shrink-0 hover:bg-gray-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8333 4.1665H4.16667C3.24619 4.1665 2.5 4.9127 2.5 5.83317V14.1665C2.5 15.087 3.24619 15.8332 4.16667 15.8332H15.8333C16.7538 15.8332 17.5 15.087 17.5 14.1665V5.83317C17.5 4.9127 16.7538 4.1665 15.8333 4.1665Z" stroke="#BBBBBB" strokeWidth="1.5" />
                  <path d="M9.99992 12.9168C11.6107 12.9168 12.9166 11.611 12.9166 10.0002C12.9166 8.38933 11.6107 7.0835 9.99992 7.0835C8.38909 7.0835 7.08325 8.38933 7.08325 10.0002C7.08325 11.611 8.38909 12.9168 9.99992 12.9168Z" stroke="#BBBBBB" strokeWidth="1.5" />
                  <path d="M7.5 4.16667L8.75 2.5H11.25L12.5 4.16667" stroke="#BBBBBB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="w-px h-[16px] bg-[#E8E8E8] flex-shrink-0" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search African business, fashion, events…"
                className="flex-1 h-full px-3 bg-transparent border-none outline-none text-[13.5px] text-[#111] placeholder-[#999] min-w-0"
                autoComplete="off"
              />
              <div className="flex-shrink-0 pr-[3px]">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 h-[30px] px-4 bg-[#EE2B24] rounded-full hover:bg-[#d42520] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 19 19" fill="none">
                    <path d="M8.63633 15.1137C12.2136 15.1137 15.1136 12.2138 15.1136 8.63645C15.1136 5.05915 12.2136 2.15918 8.63633 2.15918C5.05903 2.15918 2.15906 5.05915 2.15906 8.63645C2.15906 12.2138 5.05903 15.1137 8.63633 15.1137Z" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
                    <path d="M17.2727 17.2726L13.3864 13.3862" stroke="white" strokeWidth="1.9" strokeLinecap="round" />
                  </svg>
                  <span
                    className="text-white text-[12.5px] font-semibold hidden sm:inline"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Search
                  </span>
                </button>
              </div>
            </form>

            {/* Browse dropdown */}
            <div className="relative hidden md:block shrink-0" ref={browseRef}>
              <button
                onClick={() => setBrowseOpen(!browseOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-[7px] rounded-full text-[13px] font-medium transition-colors ${
                  browseOpen ? 'bg-[#F0F0F0] text-[#111]' : 'text-[#444] hover:bg-[#F5F5F7] hover:text-[#111]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Grid2X2 className="w-3.5 h-3.5" />
                Browse
                <ChevronDown className={`w-3.5 h-3.5 text-[#888] transition-transform duration-200 ${browseOpen ? 'rotate-180' : ''}`} />
              </button>

              {browseOpen && (
                <div className="absolute right-0 top-full mt-2 w-[180px] bg-white border border-[#E8E8E8] rounded-xl shadow-lg z-50 py-1.5 overflow-hidden">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setBrowseOpen(false)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-[#111] font-medium hover:bg-[#F5F5F7] transition-colors"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Default: nav absolutely centered */
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-[3px] px-3 py-2 text-[13.5px] font-medium text-[#111] hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 ml-auto">
          <Link
            href="/contribute"
            className="px-4 py-[7px] text-[13.5px] font-semibold text-[#EE2B24] hover:text-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Contribute →
          </Link>

          {isLoggedIn && user ? (
            <>
              <Link
                href="/dashboard"
                className="w-9 h-9 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:border-[#999] transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4 text-[#444]" />
              </Link>
              {/* Avatar */}
              <Link href="/account" className="shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EE2B24] ring-2 ring-[#F0F0F0]">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-white text-[11px] font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-[7px] text-[13.5px] font-medium text-[#111] border border-[#D0D0D0] rounded-full hover:bg-gray-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-5 py-[7px] text-[13.5px] font-semibold text-white bg-[#111] rounded-full hover:bg-[#333] transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#111]" /> : <Menu className="w-5 h-5 text-[#111]" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-1">
          {variant === 'search' && (
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="flex items-center h-[42px] rounded-full border border-[#E0E0E0] overflow-hidden">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="flex-1 h-full px-4 bg-transparent border-none outline-none text-[14px] text-[#111] placeholder-[#BBB]"
                />
                <button type="submit" className="h-full px-4 bg-[#EE2B24] text-white text-[13px] font-semibold">
                  Go
                </button>
              </div>
            </form>
          )}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#111] hover:bg-gray-50 rounded-lg transition-colors w-full"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
            {isLoggedIn && user ? (
              <>
                <Link href="/overview" className="w-full px-4 py-2.5 text-sm font-medium text-[#111] border border-[#D0D0D0] rounded-full hover:bg-gray-50 transition-colors text-center">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full px-4 py-2.5 text-sm font-medium text-[#111] border border-[#D0D0D0] rounded-full hover:bg-gray-50 transition-colors text-center"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#111] rounded-full hover:bg-[#333] transition-colors text-center"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
