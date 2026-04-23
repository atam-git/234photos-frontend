'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getContributorUsername } from '@/lib/mock/contributors'

interface ContributorCardProps {
  name?: string
  avatar?: string
  country?: string
  totalAssets?: number
  totalDownloads?: string
  isLoggedIn?: boolean
  onFollow?: () => void
  onAuthRequired?: () => void
}

export function ContributorCard({
  name = 'Unknown Contributor',
  avatar,
  country = 'Unknown',
  totalAssets = 0,
  totalDownloads = '0',
  isLoggedIn = false,
  onFollow,
  onAuthRequired,
}: ContributorCardProps) {
  const [following, setFollowing] = useState(false)
  const username = getContributorUsername(name)
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  const handleFollow = () => {
    // If not logged in, show auth modal
    if (!isLoggedIn) {
      onAuthRequired?.()
      return
    }

    // Toggle follow state
    if (!following) {
      setFollowing(true)
      onFollow?.()
    } else {
      setFollowing(false)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA]">
      <Link href={`/profile/${username}`} className="flex items-center gap-3 min-w-0 group">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#EE2B24] flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-white">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-[13px] font-bold"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {initials}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="text-[13.5px] font-bold text-[#111] truncate group-hover:text-[#EE2B24] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {name}
          </p>
          <p className="text-[11.5px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {country} · {totalAssets.toLocaleString()} assets · {totalDownloads} downloads
          </p>
        </div>
      </Link>

      {/* Follow */}
      <button
        onClick={handleFollow}
        className={`shrink-0 px-4 py-1.5 rounded-full text-[12.5px] font-semibold border transition-colors ${
          following
            ? 'border-[#D0D0D0] text-[#888] bg-white hover:border-[#EE2B24] hover:text-[#EE2B24]'
            : 'border-[#111] text-[#111] bg-white hover:bg-[#111] hover:text-white'
        }`}
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
      >
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  )
}
