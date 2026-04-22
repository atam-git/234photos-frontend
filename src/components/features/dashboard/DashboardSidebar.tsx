'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Download, LayoutGrid, Heart, BarChart2,
  ImageIcon, Upload, DollarSign, Settings,
  ChevronRight, X
} from 'lucide-react'
import { MockUser } from '@/lib/mock/user'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  contributorOnly?: boolean
}

const NAV_ITEMS: NavItem[] = [
  // Buyer
  { label: 'Downloads', href: '/dashboard/downloads', icon: Download },
  { label: 'Boards', href: '/dashboard/boards', icon: LayoutGrid },
  { label: 'Liked', href: '/dashboard/liked', icon: Heart },
  // Contributor (unlocked)
  { label: 'Overview', href: '/dashboard/overview', icon: BarChart2, contributorOnly: true },
  { label: 'My Assets', href: '/dashboard/my-assets', icon: ImageIcon, contributorOnly: true },
  { label: 'Earnings', href: '/dashboard/earnings', icon: DollarSign, contributorOnly: true },
  // Shared
  { label: 'Account', href: '/dashboard/account', icon: Settings },
]

interface DashboardSidebarProps {
  user: MockUser
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function DashboardSidebar({ user, mobileOpen, onMobileClose }: DashboardSidebarProps) {
  const pathname = usePathname()
  const isContributor = user.role === 'contributor' && user.isContributorApproved

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.contributorOnly || isContributor
  )

  const buyerItems = visibleItems.filter((i) => !['Overview', 'My Assets', 'Earnings'].includes(i.label) && i.label !== 'Account')
  const contributorItems = visibleItems.filter((i) => ['Overview', 'My Assets', 'Earnings'].includes(i.label))
  const sharedItems = visibleItems.filter((i) => i.label === 'Account')

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onMobileClose} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-[240px] bg-white border-r border-[#F0F0F0] z-50 flex flex-col
        transition-transform duration-300
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo + close (mobile) */}
        <div className="flex items-center justify-between px-5 h-[60px] border-b border-[#F0F0F0] shrink-0">
          <Link href="/" className="flex items-center">
            <img src="/logo3.jpeg" alt="234photos" className="h-[30px] w-auto" />
          </Link>
          <button onClick={onMobileClose} className="lg:hidden p-1 rounded-lg hover:bg-[#F5F5F7]">
            <X className="w-4 h-4 text-[#444]" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-[#F0F0F0] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#EE2B24] shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-white text-[12px] font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#111] truncate"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {user.name}
              </p>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-[0.5px] px-1.5 py-0.5 rounded ${
                  isContributor ? 'bg-[#FFF0F0] text-[#EE2B24]' : 'bg-[#F0F0F0] text-[#666]'
                }`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {isContributor ? 'Contributor' : 'Buyer'}
                </span>
                <span className="text-[11px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {user.credits} credits
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">

          {/* Buyer section */}
          <div className="mb-1">
            <p className="text-[10px] font-bold text-[#BBBBBB] uppercase tracking-[0.8px] px-2 mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              My Library
            </p>
            {buyerItems.map((item) => (
              <NavLink key={item.href} item={item} active={pathname === item.href} />
            ))}
          </div>

          {/* Contributor section */}
          {isContributor && contributorItems.length > 0 && (
            <div className="mt-4 mb-1">
              <p className="text-[10px] font-bold text-[#BBBBBB] uppercase tracking-[0.8px] px-2 mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Contributor
              </p>
              {contributorItems.map((item) => (
                <NavLink key={item.href} item={item} active={pathname === item.href} />
              ))}
            </div>
          )}

          {/* Become contributor CTA */}
          {!isContributor && (
            <div className="mt-4 mx-1 p-3 bg-[#FFF5F5] rounded-xl border border-[#FFCCC9]">
              <p className="text-[12px] font-bold text-[#111] mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Earn from your photos
              </p>
              <p className="text-[11px] text-[#666] mb-2 leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Apply to become a contributor and start earning royalties.
              </p>
              <Link href="/contribute"
                className="flex items-center gap-1 text-[11.5px] font-semibold text-[#EE2B24] hover:underline"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Apply now <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* Upload shortcut for contributors */}
          {isContributor && (
            <div className="mt-4 px-1">
              <Link href="/upload"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#EE2B24] text-white text-[13px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Upload className="w-4 h-4" />
                Upload assets
              </Link>
            </div>
          )}
        </nav>

        {/* Account at bottom */}
        <div className="px-3 py-3 border-t border-[#F0F0F0] shrink-0">
          {sharedItems.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} />
          ))}
        </div>
      </aside>
    </>
  )
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors mb-0.5 ${
        active
          ? 'bg-[#FFF0F0] text-[#EE2B24] font-semibold'
          : 'text-[#444] hover:bg-[#F5F5F7] hover:text-[#111]'
      }`}
      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
    >
      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#EE2B24]' : 'text-[#888]'}`} />
      {item.label}
    </Link>
  )
}
