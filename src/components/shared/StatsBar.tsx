'use client'

import { useEffect, useState } from 'react'
import { assetsApi } from '@/lib/api'

interface PlatformStats {
  totalAssets: number
  totalContributors: number
  assetsLast24h: number
  countriesServed: number
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M+`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K+`
  }
  return num.toString()
}

export function StatsBar() {
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await assetsApi.getStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch platform stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const displayStats = stats
    ? [
        { value: formatNumber(stats.totalAssets), label: 'African creative assets' },
        { value: formatNumber(stats.totalContributors), label: 'African contributors' },
        { value: formatNumber(stats.assetsLast24h), label: 'New assets daily' },
        { value: stats.countriesServed.toString(), label: 'African markets served' },
      ]
    : [
        { value: '...', label: 'African creative assets' },
        { value: '...', label: 'African contributors' },
        { value: '...', label: 'New assets daily' },
        { value: '...', label: 'African markets served' },
      ]

  return (
    <section className="bg-white border-t border-[#F0F0F0]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-wrap">
          {displayStats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex-1 min-w-[140px] flex flex-col items-center justify-center gap-1 py-8 px-3 relative"
            >
              {index > 0 && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[#EBEBEB]" />
              )}
              <span className={`text-[#EE2B24] text-[32px] font-bold leading-none tracking-[-0.5px] ${isLoading ? 'animate-pulse' : ''}`}>
                {stat.value}
              </span>
              <span className="text-[#999] text-[13px] font-normal leading-[1.35] text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
