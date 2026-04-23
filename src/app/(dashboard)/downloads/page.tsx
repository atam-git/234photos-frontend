'use client'

import { useState } from 'react'
import { Download, FileImage, ExternalLink, Search } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'
import { MY_DOWNLOADS } from '@/lib/mock'
import { DownloadModal } from '@/components/shared/Modals/DownloadModal'
import type { Asset, LicenseType, LicenseFilter } from '@/types'
import Link from 'next/link'

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [licenseFilter, setLicenseFilter] = useState<LicenseFilter>('all')
  const [downloadAsset, setDownloadAsset] = useState<Asset | null>(null)

  const filtered = MY_DOWNLOADS.filter(item => {
    const matchesSearch = item.alt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLicense = licenseFilter === 'all' || item.license === licenseFilter
    return matchesSearch && matchesLicense
  })

  const handleRedownload = (asset: Asset) => {
    setDownloadAsset(asset)
  }
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[22px] font-extrabold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Downloads
        </h1>
        <p className="text-[13px] text-[#888] mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Your licensed assets — re-download anytime
        </p>
      </div>

      {MY_DOWNLOADS.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <FileImage className="w-10 h-10 text-[#DDDDDD] mb-4" />
          <p className="text-[15px] font-semibold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            No downloads yet
          </p>
          <p className="text-[13px] text-[#888] mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Assets you license will appear here
          </p>
          <Link href="/search"
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Browse assets
          </Link>
        </div>
      ) : (
        <>
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search downloads..."
                className="w-full h-[42px] pl-10 pr-4 border border-[#E0E0E0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#111] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLicenseFilter('all')}
                className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors ${
                  licenseFilter === 'all'
                    ? 'bg-[#111] border-[#111] text-white'
                    : 'border-[#E0E0E0] text-[#555] hover:border-[#999]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                All
              </button>
              <button
                onClick={() => setLicenseFilter('standard')}
                className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors ${
                  licenseFilter === 'standard'
                    ? 'bg-[#111] border-[#111] text-white'
                    : 'border-[#E0E0E0] text-[#555] hover:border-[#999]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Standard
              </button>
              <button
                onClick={() => setLicenseFilter('enhanced')}
                className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors ${
                  licenseFilter === 'enhanced'
                    ? 'bg-[#111] border-[#111] text-white'
                    : 'border-[#E0E0E0] text-[#555] hover:border-[#999]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Enhanced
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-[#888]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {filtered.length} {filtered.length === 1 ? 'download' : 'downloads'}
            </p>
          </div>

          {/* Downloads list */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-16 text-center">
              <Search className="w-10 h-10 text-[#DDDDDD] mb-4" />
              <p className="text-[15px] font-semibold text-[#111] mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No results found
              </p>
              <p className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
              <div className="divide-y divide-[#F8F8F8]">
                {filtered.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0">
                      <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-semibold text-[#111] truncate"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {item.alt}
                      </p>
                      <p className="text-[12px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {item.license.charAt(0).toUpperCase() + item.license.slice(1)} · {item.format} · {item.size} · Licensed {item.licensedOn}
                      </p>
                      <p className="text-[11px] text-[#666] mt-0.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Expires {item.expiresAt} · <a href={item.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-[#EE2B24] hover:underline">View license</a>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/assets/${item.id}`}
                        className="w-8 h-8 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:border-[#999] transition-colors"
                        title="View asset">
                        <ExternalLink className="w-3.5 h-3.5 text-[#666]" />
                      </Link>
                      <button
                        onClick={() => handleRedownload(item)}
                        className="w-8 h-8 rounded-full bg-[#EE2B24] flex items-center justify-center hover:bg-[#d42520] transition-colors"
                        title="Re-download">
                        <Download className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Download Modal */}
      {downloadAsset && (
        <DownloadModal
          asset={downloadAsset}
          onClose={() => setDownloadAsset(null)}
          onConfirm={() => {
            console.log('Re-downloading:', downloadAsset.id)
            setDownloadAsset(null)
          }}
        />
      )}
    </div>
  )
}
