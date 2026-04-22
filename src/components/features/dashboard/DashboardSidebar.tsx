'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Download, LayoutGrid, Heart, BarChart2,
  ImageIcon, Upload, DollarSign, Settings,
  ChevronRight, X, Compass, LogOut, HelpCircle, CreditCard
} from 'lucide-react'
import { MockUser } from '@/lib/mock/user'
import { useAuthStore } from '@/stores/authStore'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  contributorOnly?: boolean
}

const NAV_ITEMS: NavItem[] = [
  // Buyer
  { label: 'Downloads', href: '/downloads', icon: Download },
  { label: 'Boards', href: '/boards', icon: LayoutGrid },
  { label: 'Liked', href: '/liked', icon: Heart },
  { label: 'Discover', href: '/discover', icon: Compass },
  // Contributor (unlocked)
  { label: 'Dashboard', href: '/dashboard', icon: BarChart2, contributorOnly: true },
  { label: 'My Assets', href: '/my-assets', icon: ImageIcon, contributorOnly: true },
  { label: 'Earnings', href: '/earnings', icon: DollarSign, contributorOnly: true },
  // Shared
  { label: 'Billing', href: '/billing', icon: CreditCard },
  { label: 'Support', href: '/support', icon: HelpCircle },
]

interface DashboardSidebarProps {
  user: MockUser
  mobileOpen?: boolean
  onMobileClose?: () => void
  onOpenContributorModal?: () => void
}

export function DashboardSidebar({ user, mobileOpen, onMobileClose, onOpenContributorModal }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const isContributor = user.role === 'contributor' && user.isContributorApproved

  const handleLogout = () => {
    logout()
    // Small delay to ensure state is cleared before navigation
    setTimeout(() => {
      router.push('/')
    }, 100)
  }

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.contributorOnly || isContributor
  )

  const buyerItems = visibleItems.filter((i) => !['Dashboard', 'My Assets', 'Earnings'].includes(i.label) && !['Billing', 'Support'].includes(i.label))
  const contributorItems = visibleItems.filter((i) => ['Dashboard', 'My Assets', 'Earnings'].includes(i.label))
  const sharedItems = visibleItems.filter((i) => ['Billing', 'Support'].includes(i.label))

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
        lg:translate-x-0
      `}>
        {/* Logo + close (mobile) */}
        <div className="flex items-center justify-between px-5 h-[60px] border-b border-[#F0F0F0] shrink-0">
          <Link href="/" className="flex items-center">
            <img src="/logo/234final1black.png" alt="234photos" className="h-[30px] w-auto" />
          </Link>
          <button onClick={onMobileClose} className="lg:hidden p-1 rounded-lg hover:bg-[#F5F5F7]">
            <X className="w-4 h-4 text-[#444]" />
          </button>
        </div>

        {/* User info - Now clickable */}
        <div className="px-4 py-4 border-b border-[#FFE5E5] shrink-0 relative bg-gradient-to-br from-[#FFF5F5] via-[#FFF8F8] to-[#FFFAFA]">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 hover:bg-[#F5F5F7] rounded-lg p-2 -m-2 transition-colors"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#EE2B24] shrink-0 ring-2 ring-white shadow-sm">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="w-full h-full flex items-center justify-center text-white text-[13px] font-bold" style="font-family: var(--font-jakarta), Plus Jakarta Sans, sans-serif">${user.name.split(' ').map(n => n[0]).join('')}</span>`
                    }
                  }}
                />
              ) : (
                <span 
                  className="w-full h-full flex items-center justify-center text-white text-[13px] font-bold"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-[14px] font-bold text-[#111] truncate mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {user.name}
              </p>
              <div className="flex flex-col gap-1">
                <span className={`text-[10.5px] font-bold uppercase tracking-[0.5px] px-1.5 py-0.5 rounded self-start ${
                  isContributor ? 'bg-[#FFF0F0] text-[#EE2B24]' : 'bg-[#F0F0F0] text-[#666]'
                }`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {isContributor ? 'Contributor' : 'Buyer'}
                </span>
                <span className="text-[11.5px] text-[#888] pl-[2px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {user.credits >= 1000 ? `${(user.credits / 1000).toFixed(1)}K` : user.credits} credits
                </span>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-[#888] transition-transform ${showProfileMenu ? 'rotate-90' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute left-4 right-4 top-full mt-2 bg-white rounded-xl shadow-lg border border-[#F0F0F0] py-2 z-50">
              {isContributor && (
                <Link
                  href={`/profile/${user.username}`}
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  <Settings className="w-[17px] h-[17px] shrink-0 text-[#888]" />
                  View Profile
                </Link>
              )}
              <Link
                href="/account"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] font-medium text-[#444] hover:bg-[#F5F5F7] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <Settings className="w-[17px] h-[17px] shrink-0 text-[#888]" />
                Account Settings
              </Link>
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  handleLogout()
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] font-medium text-[#888] hover:bg-[#FFF0F0] hover:text-[#EE2B24] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                <LogOut className="w-[17px] h-[17px] shrink-0" />
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">

          {/* Buyer section */}
          <div className="mb-1">
            <p className="text-[10.5px] font-bold text-[#BBBBBB] uppercase tracking-[0.8px] px-2 mb-1.5"
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
              <p className="text-[10.5px] font-bold text-[#BBBBBB] uppercase tracking-[0.8px] px-2 mb-1.5"
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
              <p className="text-[13px] font-bold text-[#111] mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Earn from your photos
              </p>
              <p className="text-[11.5px] text-[#666] mb-2.5 leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Apply to become a contributor and start earning royalties.
              </p>
              <button
                onClick={onOpenContributorModal}
                className="flex items-center gap-1 text-[12px] font-semibold text-[#EE2B24] hover:underline"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Apply now <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Upload shortcut for contributors */}
          {isContributor && (
            <div className="mt-4 px-1">
              <Link href="/my-assets/upload"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Upload className="w-4 h-4" />
                Upload assets
              </Link>
            </div>
          )}
        </nav>

        {/* Bottom section - Only shared items (Billing, Support) */}
        <div className="px-3 py-3 border-t border-[#F0F0F0] shrink-0 space-y-1">
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
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors mb-0.5 ${
        active
          ? 'bg-[#FFF0F0] text-[#EE2B24] font-semibold'
          : 'text-[#444] hover:bg-[#F5F5F7] hover:text-[#111]'
      }`}
      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
    >
      <Icon className={`w-[17px] h-[17px] shrink-0 ${active ? 'text-[#EE2B24]' : 'text-[#888]'}`} />
      {item.label}
    </Link>
  )
}
