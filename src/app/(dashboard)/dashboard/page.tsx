'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { DASHBOARD_STATS, DASHBOARD_ACTIVITY, DASHBOARD_BADGES } from '@/lib/mock/dashboard'
import { useAuthStore } from '@/stores/authStore'
import { BadgeDetailsModal } from '@/components/shared/Modals/BadgeDetailsModal'
import { LeaderboardModal } from '@/components/shared/Modals/LeaderboardModal'
import { AssetStatsModal } from '@/components/shared/Modals/AssetStatsModal'
import { ProfileCompletionBanner } from '@/components/shared/ProfileCompletionBanner'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isContributor = user?.role === 'contributor' && user?.isContributorApproved
  const isPendingContributor = user?.role === 'contributor' && !user?.isContributorApproved
  const isRejectedContributor = user?.role === 'contributor' && (user as any).applicationStatus === 'rejected'
  
  const [selectedBadge, setSelectedBadge] = useState<typeof DASHBOARD_BADGES[0] | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)

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

  const topAssets = MOCK_ASSETS.slice(0, 4)

  // Check profile completion for contributors
  const profileFields = [
    { name: 'bio', label: 'Bio', completed: !!(user as any).bio, required: true },
    { name: 'location', label: 'Location', completed: !!(user as any).location, required: true },
    { name: 'specialties', label: 'Specialties', completed: !!((user as any).specialties?.length > 0), required: true },
    { name: 'website', label: 'Website', completed: !!(user as any).website, required: false },
    { name: 'instagram', label: 'Instagram', completed: !!(user as any).instagram, required: false },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* Profile completion banner */}
      <ProfileCompletionBanner fields={profileFields} />

      {/* Welcome */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Welcome back, Adaeze 👋
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
        {DASHBOARD_STATS.map((stat) => {
          const Icon = stat.icon
          const getLink = () => {
            if (stat.label === 'Earnings this month') return '/earnings'
            if (stat.label === 'Downloads this month') return '/my-assets'
            if (stat.label === 'Total views') return '/my-assets'
            return null
          }
          const link = getLink()
          
          const content = (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#EE2B24]" />
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
              <button
                key={stat.label}
                onClick={() => setShowLeaderboard(true)}
                className="bg-white rounded-2xl p-5 border border-[#F0F0F0] hover:border-[#EE2B24] hover:shadow-md transition-all text-left">
                {content}
              </button>
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
        })}
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
            {topAssets.map((asset, i) => (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#F8F8F8] transition-colors text-left">
                <span className="text-[13px] font-bold text-[#BBBBBB] w-4 shrink-0">{i + 1}</span>
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                  <img src={asset.src} alt={asset.alt} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#111] truncate"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {asset.alt}
                  </p>
                  <p className="text-[11.5px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {Math.floor(Math.random() * 200 + 50)} downloads
                  </p>
                </div>
                <span className="text-[13px] font-bold text-[#111] shrink-0"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  ₦{(Math.floor(Math.random() * 320000 + 80000)).toLocaleString('en-NG')}
                </span>
              </button>
            ))}
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
              {DASHBOARD_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3">
                  <span className="text-[16px] shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-[12.5px] font-medium text-[#111] leading-snug"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {item.text}
                    </p>
                    <p className="text-[11px] text-[#999] mt-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl border border-[#F0F0F0] p-5">
            <h2 className="text-[14px] font-bold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Badges
            </h2>
            <div className="flex flex-col gap-2">
              {DASHBOARD_BADGES.map((badge) => (
                <button
                  key={badge.label}
                  onClick={() => setSelectedBadge(badge)}
                  className={`flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8F8F8] transition-colors text-left ${!badge.earned ? 'opacity-50' : ''}`}>
                  <span className="text-[18px]">{badge.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {badge.label}
                    </p>
                    {badge.progress !== undefined && (
                      <div className="mt-1 h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#EE2B24] rounded-full" style={{ width: `${badge.progress}%` }} />
                      </div>
                    )}
                  </div>
                  {badge.earned && <span className="text-[10px] text-green-600 font-bold shrink-0">✓</span>}
                  {badge.progress !== undefined && (
                    <span className="text-[10px] text-[#888] shrink-0">{badge.progress}%</span>
                  )}
                </button>
              ))}
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

      {showLeaderboard && (
        <LeaderboardModal
          currentUserRank={12}
          onClose={() => setShowLeaderboard(false)}
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
