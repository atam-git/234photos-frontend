'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { assetsApi } from '@/lib/api/assets'

// Helper to format numbers
function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M+`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K+`
  }
  return num.toString()
}

export function ContributorSection() {
  const [stats, setStats] = useState<{
    totalContributors: number
    countriesRepresented: number
    totalAssets: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await assetsApi.getContributorStats()
        setStats({
          totalContributors: data.totalContributors,
          countriesRepresented: data.countriesRepresented,
          totalAssets: data.totalAssets,
        })
      } catch (error) {
        console.error('Failed to fetch contributor stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])
  return (
    <section className="relative overflow-hidden min-h-[340px]">
      {/* Background image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/ebfdfe62f45c4733a381f15939c1276b75d29d0c?width=2880"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[340px] py-16 px-5 md:px-10 lg:px-20">
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
          {/* Left: text + buttons */}
          <div className="flex flex-col gap-6 max-w-[500px] w-full">
            <h2 className="text-white font-bold text-[34px] leading-[1.2] tracking-[-0.4px] font-jakarta">
              Share your African story
              <br />
              with the world
            </h2>
            <p className="text-white/80 text-[15px] leading-[1.7] font-normal">
              You see Africa differently — through your lens, your community, your culture. Upload your photos, videos and music to 234photos and earn royalties every time your work is downloaded by brands, creators and businesses across the globe.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/contribute"
                className="px-[30px] py-[13px] bg-[#EE2B24] text-white text-[14.5px] font-semibold leading-[1.5] rounded-full hover:bg-[#d42520] transition-colors"
              >
                Start contributing
              </Link>
              <Link
                href="/how-it-works"
                className="text-white/80 text-[14.5px] font-medium leading-[1.5] hover:text-white transition-colors"
              >
                How it works →
              </Link>
            </div>
          </div>

          {/* Right: stats */}
          <div className="flex items-center gap-9 shrink-0">
            {loading ? (
              // Loading skeletons
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1 animate-pulse">
                  <div className="h-9 w-20 bg-white/20 rounded" />
                  <div className="h-4 w-16 bg-white/10 rounded" />
                </div>
              ))
            ) : stats ? (
              <>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-[34px] font-bold leading-none tracking-[-0.5px]">
                    {formatNumber(stats.totalContributors)}
                  </span>
                  <span className="text-white/70 text-[12px] font-normal leading-[1.4] text-center whitespace-pre-line">
                    African{'\n'}contributors
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-[34px] font-bold leading-none tracking-[-0.5px]">
                    {formatNumber(stats.totalAssets)}
                  </span>
                  <span className="text-white/70 text-[12px] font-normal leading-[1.4] text-center">
                    Assets in library
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-[34px] font-bold leading-none tracking-[-0.5px]">
                    {stats.countriesRepresented}
                  </span>
                  <span className="text-white/70 text-[12px] font-normal leading-[1.4] text-center whitespace-pre-line">
                    Countries{'\n'}earning
                  </span>
                </div>
              </>
            ) : (
              // Error fallback
              <>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-[34px] font-bold leading-none tracking-[-0.5px]">100K+</span>
                  <span className="text-white/70 text-[12px] font-normal leading-[1.4] text-center whitespace-pre-line">
                    African{'\n'}contributors
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-[34px] font-bold leading-none tracking-[-0.5px]">50M+</span>
                  <span className="text-white/70 text-[12px] font-normal leading-[1.4] text-center">
                    Assets in library
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white text-[34px] font-bold leading-none tracking-[-0.5px]">54</span>
                  <span className="text-white/70 text-[12px] font-normal leading-[1.4] text-center whitespace-pre-line">
                    Countries{'\n'}earning
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
