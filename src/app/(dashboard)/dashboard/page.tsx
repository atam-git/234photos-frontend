'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { DASHBOARD_BADGES } from '@/lib/mock/dashboard'
import { useAuthStore } from '@/stores/authStore'
import { BadgeDetailsModal } from '@/components/shared/Modals/BadgeDetailsModal'
import { LeaderboardModal } from '@/components/shared/Modals/LeaderboardModal'
import { AssetStatsModal } from '@/components/shared/Modals/AssetStatsModal'
import { ProfileCompletionBanner } from '@/components/shared/ProfileCompletionBanner'
import { useToast } from '@/components/ui/toast-provider'
import { useDashboardStats, useTopAssets, useRecentActivity } from '@/hooks/useDashboard'
import { useProfileCompletion } from '@/hooks/useUsers'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useAuthStore((state) => state.user)
  const { showToast } = useToast()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: topAssets, isLoading: topAssetsLoading } = useTopAssets(4)
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity(5)
  const { data: profileCompletion } = useProfileCompletion()
  
  const isContributor = user?.role === 'contributor' && user?.isContributor
  const isPendingContributor = user?.role === 'contributor' && !user?.isContributor
  const isRejectedContributor = user?.role === 'contributor' && (user as any).applicationStatus === 'rejected'
  
  const [selectedBadge, setSelectedBadge] = useState<typeof DASHBOARD_BADGES[0] | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)

  useEffect(() => {
    // Show welcome message for newly activated contributors
    if (searchParams.get('contributor_activated') === 'true' && isContributor) {
      showToast('success', 'Welcome! Your contributor account is now active. Start uploading to earn!')
      // Remove query param from URL
      router.replace('/dashboard')
    }
  }, [searchParams, isContributor, showToast, router])

  useEffect(() => {
    if (!isContributor && !isPendingContributor && !isRejectedContributor) {
      router.push('/discover?openContributorModal=true')
    }
  }, [isContributor, isPendingContributor, isRejectedContributor, router])

  // Show rejected status banner
  if (isRejectedContributor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-[560px] text-center">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-[22px] font-extrabold text-[#111] mb-3"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Application Not Approved
          </h2>
          <p className="text-[14px] text-[#666] mb-4 leading-relaxed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Thank you for your interest in becoming a contributor. Unfortunately, we're unable to approve your application at this time.
          </p>
          {(user as any).rejectionReason && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl mb-6 text-left">
              <p className="text-[12px] font-bold text-red-900 uppercase tracking-[0.5px] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Reason
              </p>
              <p className="text-[13px] text-red-800 leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {(user as any).rejectionReason}
              </p>
            </div>
          )}
          <div className="p-4 bg-[#F8F8F8] rounded-xl mb-6 text-left">
            <p className="text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              What's Next?
            </p>
            <ul className="text-[13px] text-[#666] leading-relaxed space-y-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              <li>• Review our <a href="/contribute" className="text-[#EE2B24] hover:underline">contributor guidelines</a></li>
              <li>• Improve your portfolio quality and uniqueness</li>
              <li>• You can reapply after 30 days</li>
            </ul>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/discover')}
              className="px-6 py-3 border border-[#D0D0D0] text-[#111] text-[14px] font-semibold rounded-full hover:border-[#999] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Browse Assets
            </button>
            <button
              onClick={() => router.push('/contribute')}
              className="px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show pending status banner
  if (isPendingContributor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-[500px] text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-[22px] font-extrabold text-[#111] mb-3"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Application Under Review
          </h2>
          <p className="text-[14px] text-[#666] mb-2 leading-relaxed"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Thank you for applying to become a contributor! Our team is reviewing your application.
          </p>
          <p className="text-[13px] text-[#888] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            We typically review applications within 2-3 business days. You'll receive an email once your application has been processed.
          </p>
          <button
            onClick={() => router.push('/discover')}
            className="inline-block px-6 py-3 bg-[#111] text-white text-[14px] font-semibold rounded-full hover:bg-[#333] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Browse Assets
          </button>
        </div>
      </div>
    )
  }

  if (!isContributor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔒</div>
          <h2 className="text-xl font-semibold text-[#111] mb-2">Contributor Access Required</h2>
          <p className="text-[#666] mb-4">Apply to become a contributor to access this page</p>
          <button
            onClick={() => router.push('/discover?openContributorModal=true')}
            className="inline-block px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Apply Now
          </button>
        </div>
      </div>
    )
  }

  // Convert kobo to naira for display
  const formatCurrency = (kobo: number) => {
    const naira = kobo / 100
    return `₦${naira.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }

  // Calculate percentage change
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%'
    const change = ((current - previous) / previous) * 100
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
  }

  // Format activity timestamp
  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
  }

  // Map notification type to icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'download': return '⬇️'
      case 'sale': return '💰'
      case 'upload': return '✅'
      case 'milestone': return '🎉'
      default: return '📢'
    }
  }

  // Build dashboard stats from API data
  const dashboardStats = stats ? [
    {
      label: 'Earnings this month',
      value: formatCurrency(stats.thisMonthEarnings),
      change: calculateChange(stats.thisMonthEarnings, stats.lastMonthEarnings),
      up: stats.thisMonthEarnings >= stats.lastMonthEarnings,
      icon: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Downloads this month',
      value: stats.totalDownloads.toLocaleString(),
      change: '+0%', // TODO: Need monthly downloads from API
      up: true,
      icon: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
    {
      label: 'Available balance',
      value: formatCurrency(stats.availableBalance),
      change: formatCurrency(stats.pendingBalance) + ' pending',
      up: true,
      icon: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Leaderboard rank',
      value: '#12', // TODO: Need from API
      change: '+2',
      up: true,
      icon: () => (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ] : []

  return (
    <div className="flex flex-col gap-6">

      {/* Profile completion banner */}
      {profileCompletion && !profileCompletion.isComplete && (
        <ProfileCompletionBanner fields={profileCompletion.fields} />
      )}

      {/* Welcome */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Here's how your portfolio is performing
          </p>
        </div>
        <Link href="/my-assets/upload"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          + Upload new assets
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#F0F0F0] animate-pulse">
              <div className="h-8 w-8 bg-gray-200 rounded-lg mb-3" />
              <div className="h-6 w-16 bg-gray-200 rounded mb-1" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))
        ) : (
          dashboardStats.map((stat) => {
            const Icon = stat.icon
            const getLink = () => {
              if (stat.label === 'Earnings this month') return '/earnings'
              if (stat.label === 'Downloads this month') return '/my-assets'
              if (stat.label === 'Available balance') return '/earnings'
              return null
            }
            const link = getLink()
            
            const content = (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] flex items-center justify-center text-[#EE2B24]">
                    {Icon()}
                  </div>
                  <span className={`flex items-center gap-0.5 text-[12px] font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-[24px] font-extrabold text-[#111] leading-none mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {stat.value}
                </p>
                <p className="text-[12px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {stat.label}
                </p>
              </>
            )

            if (stat.label === 'Leaderboard rank') {
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-5 border border-[#F0F0F0] opacity-50 cursor-not-allowed">
                  {content}
                  <p className="text-[10px] text-[#999] mt-2">Coming soon</p>
                </div>
              )
            }

            if (link) {
              return (
                <Link
                  key={stat.label}
                  href={link}
                  className="bg-white rounded-2xl p-5 border border-[#F0F0F0] hover:border-[#EE2B24] hover:shadow-md transition-all">
                  {content}
                </Link>
              )
            }

            return (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
                {content}
              </div>
            )
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* Top performing assets */}
        <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0F0F0]">
            <h2 className="text-[14px] font-bold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Top performing assets
            </h2>
            <Link href="/my-assets"
              className="text-[12px] text-[#EE2B24] font-semibold hover:underline"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[#F8F8F8]">
            {topAssetsLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 animate-pulse">
                  <div className="w-4 h-4 bg-gray-200 rounded" />
                  <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              ))
            ) : topAssets && topAssets.length > 0 ? (
              topAssets.map((asset, i) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#F8F8F8] transition-colors text-left">
                  <span className="text-[13px] font-bold text-[#BBBBBB] w-4 shrink-0">{i + 1}</span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                    {asset.thumbnail ? (
                      <img src={asset.thumbnail} alt={asset.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#999]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#111] truncate"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {asset.title}
                    </p>
                    <p className="text-[11.5px] text-[#888]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {asset.downloads} downloads
                    </p>
                  </div>
                  <span className="text-[13px] font-bold text-[#111] shrink-0"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {formatCurrency(asset.earnings)}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-5 py-8 text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  No assets yet. Upload your first asset to get started!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Activity feed */}
          <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F0F0F0]">
              <h2 className="text-[14px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Recent activity
              </h2>
            </div>
            <div className="divide-y divide-[#F8F8F8]">
              {activityLoading ? (
                // Loading skeleton
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 px-5 py-3 animate-pulse">
                    <div className="w-5 h-5 bg-gray-200 rounded" />
                    <div className="flex-1">
                      <div className="h-4 w-full bg-gray-200 rounded mb-1" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))
              ) : recentActivity && recentActivity.length > 0 ? (
                recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 px-5 py-3">
                    <span className="text-[16px] shrink-0 mt-0.5">{getActivityIcon(item.type)}</span>
                    <div>
                      <p className="text-[12.5px] font-medium text-[#111] leading-snug"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {item.message}
                      </p>
                      <p className="text-[11px] text-[#999] mt-0.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {formatActivityTime(item.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-8 text-center">
                  <div className="text-3xl mb-2">📢</div>
                  <p className="text-[12px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    No recent activity
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Badges - Coming soon */}
          <div className="bg-white rounded-2xl border border-[#F0F0F0] p-5 opacity-50">
            <h2 className="text-[14px] font-bold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Badges
            </h2>
            <div className="text-center py-4">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-[12px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedBadge && (
        <BadgeDetailsModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}

      {selectedAsset && (
        <AssetStatsModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  )
}
