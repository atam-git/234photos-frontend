import { TrendingUp, Download, Eye, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import Link from 'next/link'

const STATS = [
  { label: 'Earnings this month', value: '$1,240', change: '+18%', up: true, icon: TrendingUp },
  { label: 'Downloads this month', value: '847', change: '+12%', up: true, icon: Download },
  { label: 'Total views', value: '12.4K', change: '+5%', up: true, icon: Eye },
  { label: 'Leaderboard rank', value: '#12', change: '↑3', up: true, icon: Award },
]

const ACTIVITY = [
  { icon: '⬇️', text: '5 downloads of "Lagos Skyline" today', sub: 'Earned $12.50 · 2 hours ago' },
  { icon: '✅', text: '12 assets approved and now live', sub: '4 hours ago' },
  { icon: '💰', text: '$45 earned from "Accra Market" this week', sub: 'Yesterday' },
  { icon: '📈', text: '"Lagos Fintech" trending in Business', sub: '2 days ago' },
  { icon: '⬇️', text: '3 downloads of "Nairobi Office"', sub: 'Earned $7.50 · 3 days ago' },
]

const BADGES = [
  { emoji: '🏆', label: 'Top 10 Nigeria', earned: true },
  { emoji: '🔥', label: '30-day streak', earned: true },
  { emoji: '🎯', label: 'Gap filler ×3', earned: true },
  { emoji: '👑', label: '1000 downloads', earned: true },
  { emoji: '⭐', label: '5000 downloads', earned: false, progress: 58 },
]

export default function OverviewPage() {
  const topAssets = MOCK_ASSETS.slice(0, 4)

  return (
    <div className="max-w-[1100px] mx-auto flex flex-col gap-6">

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
        <Link href="/upload"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          + Upload new assets
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-[#F0F0F0]">
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
            <Link href="/dashboard/my-assets"
              className="text-[12px] text-[#EE2B24] font-semibold hover:underline"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[#F8F8F8]">
            {topAssets.map((asset, i) => (
              <div key={asset.id} className="flex items-center gap-3 px-5 py-3">
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
                  ${Math.floor(Math.random() * 200 + 50)}
                </span>
              </div>
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
              {ACTIVITY.map((item, i) => (
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
              {BADGES.map((badge) => (
                <div key={badge.label} className={`flex items-center gap-2.5 ${!badge.earned ? 'opacity-50' : ''}`}>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
