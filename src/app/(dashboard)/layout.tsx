'use client'

import { useState } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import Link from 'next/link'
import { DashboardSidebar } from '@/components/features/dashboard/DashboardSidebar'
import { MOCK_USER } from '@/lib/mock/user'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">

      {/* Sidebar */}
      <DashboardSidebar
        user={MOCK_USER}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">

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
            <button className="relative w-9 h-9 rounded-full hover:bg-[#F5F5F7] flex items-center justify-center transition-colors">
              <Bell className="w-4.5 h-4.5 text-[#444]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EE2B24]" />
            </button>

            {/* Avatar */}
            <Link href="/dashboard/account">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EE2B24]">
                {MOCK_USER.avatar ? (
                  <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-white text-[11px] font-bold">
                    {MOCK_USER.name.split(' ').map(n => n[0]).join('')}
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
    </div>
  )
}
