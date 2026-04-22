'use client'

import { useState } from 'react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import Link from 'next/link'

type StatusFilter = 'all' | 'live' | 'pending' | 'rejected'

const STATUSES = ['all', 'live', 'pending', 'rejected'] as const

const ASSET_STATUSES = MOCK_ASSETS.map((asset, i) => ({
  ...asset,
  status: (i % 5 === 0 ? 'pending' : i % 7 === 0 ? 'rejected' : 'live') as 'live' | 'pending' | 'rejected',
  uploadedAt: ['Apr 18, 2026', 'Apr 15, 2026', 'Apr 10, 2026', 'Mar 28, 2026'][i % 4],
  downloads: Math.floor(Math.random() * 300),
  earnings: `$${(Math.random() * 150).toFixed(0)}`,
}))

const STATUS_STYLES = {
  live: 'bg-green-50 text-green-700',
  pending: 'bg-yellow-50 text-yellow-700',
  rejected: 'bg-red-50 text-red-600',
}

export default function MyAssetsPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')

  const filtered = filter === 'all' ? ASSET_STATUSES : ASSET_STATUSES.filter(a => a.status === filter)

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            My Assets
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {ASSET_STATUSES.length} total · {ASSET_STATUSES.filter(a => a.status === 'live').length} live
          </p>
        </div>
        <Link href="/upload"
          className="px-5 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          + Upload new
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-colors capitalize ${
              filter === s ? 'bg-[#111] border-[#111] text-white font-semibold' : 'border-[#E0E0E0] text-[#555] hover:border-[#999]'
            }`}
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {s} {s !== 'all' && `(${ASSET_STATUSES.filter(a => a.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Asset table */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        <div className="divide-y divide-[#F8F8F8]">
          {filtered.map((asset) => (
            <div key={asset.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0">
                <img src={asset.src} alt={asset.alt} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-semibold text-[#111] truncate"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {asset.alt}
                </p>
                <p className="text-[11.5px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Uploaded {asset.uploadedAt}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <p className="text-[13px] font-bold text-[#111]">{asset.downloads}</p>
                  <p className="text-[10px] text-[#888]">downloads</p>
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-bold text-[#111]">{asset.earnings}</p>
                  <p className="text-[10px] text-[#888]">earned</p>
                </div>
              </div>
              <span className={`shrink-0 text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full ${STATUS_STYLES[asset.status]}`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
