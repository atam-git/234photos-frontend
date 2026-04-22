'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Menu, Bell, Search, Download, Upload, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { DashboardSidebar } from '@/components/features/dashboard/DashboardSidebar'
import { ContributorApplicationModal } from '@/components/shared/Modals/ContributorApplicationModal'
import { useAuthStore } from '@/stores/authStore'

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showContributorModal, setShowContributorModal] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showNotifications])

  // Check if we should open contributor modal from URL
  useEffect(() => {
    const shouldOpenModal = searchParams.get('openContributorModal') === 'true'
    
    // Only open modal if user is not already a contributor
    if (shouldOpenModal && user && !(user.role === 'contributor' && user.isContributorApproved)) {
      setShowContributorModal(true)
    }
    
    // Clean up URL immediately to prevent modal from showing again
    if (shouldOpenModal) {
      const currentPath = window.location.pathname
      window.history.replaceState({}, '', currentPath)
    }
  }, [searchParams, user])

  useEffect(() => {
    if (isHydrated && !isLoggedIn) {
      router.push('/login')
    }
  }, [isHydrated, isLoggedIn, router])

  // Show loading state while hydrating or redirecting
  if (!isHydrated || !isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F8F8]">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔒</div>
          <h2 className="text-xl font-semibold text-[#111] mb-2">Access Restricted</h2>
          <p className="text-[#666]">Please log in to access the dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">

      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onOpenContributorModal={() => setShowContributorModal(true)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[240px]">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#F0F0F0] h-[60px] flex items-center px-4 md:px-6 gap-3">

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F5F5F7] transition-colors"
          >
            <Menu className="w-5 h-5 text-[#444]" />
          </button>

          {/* Search */}
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-2 flex-1 max-w-[360px] h-[36px] px-3 bg-[#F5F5F7] rounded-full text-[13px] text-[#888] hover:bg-[#EBEBEB] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            Search assets…
          </Link>

          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-9 h-9 rounded-full hover:bg-[#F5F5F7] flex items-center justify-center transition-colors">
                <Bell className="w-4.5 h-4.5 text-[#444]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EE2B24]" />
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-2xl shadow-xl border border-[#F0F0F0] overflow-hidden z-50">
                  {/* Header */}
                  <div className="px-5 py-4 border-b border-[#F0F0F0] flex items-center justify-between">
                    <h3 className="text-[15px] font-bold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Notifications
                    </h3>
                    <button className="text-[12px] font-semibold text-[#EE2B24] hover:underline"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Mark all read
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-[400px] overflow-y-auto">
                    {/* New Download */}
                    <Link 
                      href="/downloads"
                      onClick={() => setShowNotifications(false)}
                      className="block px-5 py-3 hover:bg-[#F8F8F8] transition-colors border-b border-[#F8F8F8]">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Download className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-[#111] leading-snug mb-1"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            <span className="font-semibold">Download complete</span> - Lagos Skyline is ready
                          </p>
                          <p className="text-[11px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            2 minutes ago
                          </p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#EE2B24] shrink-0 mt-1" />
                      </div>
                    </Link>

                    {/* New Upload from Followed */}
                    <Link 
                      href="/profile/sarah-johnson"
                      onClick={() => setShowNotifications(false)}
                      className="block px-5 py-3 hover:bg-[#F8F8F8] transition-colors border-b border-[#F8F8F8]">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Upload className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-[#111] leading-snug mb-1"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            <span className="font-semibold">Sarah Johnson</span> uploaded 3 new photos
                          </p>
                          <p className="text-[11px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            1 hour ago
                          </p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#EE2B24] shrink-0 mt-1" />
                      </div>
                    </Link>

                    {/* Credit Purchase */}
                    <Link 
                      href="/billing"
                      onClick={() => setShowNotifications(false)}
                      className="block px-5 py-3 hover:bg-[#F8F8F8] transition-colors border-b border-[#F8F8F8]">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                          <span className="text-[14px]">💳</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-[#111] leading-snug mb-1"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            <span className="font-semibold">50 credits added</span> to your account
                          </p>
                          <p className="text-[11px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            3 hours ago
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* Board Shared */}
                    <Link 
                      href="/boards"
                      onClick={() => setShowNotifications(false)}
                      className="block px-5 py-3 hover:bg-[#F8F8F8] transition-colors border-b border-[#F8F8F8]">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                          <LayoutGrid className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-[#111] leading-snug mb-1"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            <span className="font-semibold">Michael Chen</span> shared a board with you
                          </p>
                          <p className="text-[11px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            Yesterday
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* System Update */}
                    <Link 
                      href="/discover"
                      onClick={() => setShowNotifications(false)}
                      className="block px-5 py-3 hover:bg-[#F8F8F8] transition-colors">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <span className="text-[14px]">🎉</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-[#111] leading-snug mb-1"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            <span className="font-semibold">Welcome to 234photos!</span> Start exploring amazing African imagery
                          </p>
                          <p className="text-[11px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            2 days ago
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 border-t border-[#F0F0F0] text-center">
                    <Link 
                      href="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-[13px] font-semibold text-[#666] hover:text-[#EE2B24] transition-colors"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <Link href="/account">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EE2B24]">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-white text-[11px] font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Contributor Application Modal */}
      {showContributorModal && (
        <ContributorApplicationModal onClose={() => setShowContributorModal(false)} />
      )}
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#F8F8F8]">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <h2 className="text-xl font-semibold text-[#111] mb-2">Loading...</h2>
          <p className="text-[#666]">Please wait</p>
        </div>
      </div>
    }>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </Suspense>
  )
}
