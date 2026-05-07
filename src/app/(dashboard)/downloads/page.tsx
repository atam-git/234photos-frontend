'use client'

import { useState } from 'react'
import { Download, FileImage, ExternalLink, Search, Loader2 } from 'lucide-react'
import { useDownloads } from '@/hooks/useDownloads'
import type { LicenseFilter } from '@/types'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { useToast } from '@/components/ui/toast-provider'

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [licenseFilter, setLicenseFilter] = useState<LicenseFilter>('all')
  const [page, setPage] = useState(1)
  const { showToast } = useToast()

  // Fetch downloads from API
  const { data, isLoading, error } = useDownloads({
    page,
    limit: 50,
    search: searchQuery || undefined,
    licenseType: licenseFilter !== 'all' ? licenseFilter.toUpperCase() as 'STANDARD' | 'ENHANCED' | 'EDITORIAL' : undefined,
  })

  const downloads = data?.data || []
  const totalCount = data?.pagination?.total || 0

  const handleRedownload = async (downloadItem: any) => {
    // Re-download directly without charging credits again
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
      const fileUrl = `${apiBase}/downloads/${downloadItem.id}/file`
      const token = localStorage.getItem('234p_access')

      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: `image/${downloadItem.format}, image/*, application/octet-stream`,
        },
      })

      if (!response.ok) {
        let serverMessage = `HTTP ${response.status}`
        try {
          const errBody = await response.json()
          serverMessage = errBody?.message || errBody?.error || serverMessage
        } catch {
          try {
            serverMessage = (await response.text()) || serverMessage
          } catch {
            /* ignore */
          }
        }
        throw new Error(`Download failed: ${serverMessage}`)
      }

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.startsWith('image/') && contentType !== 'application/octet-stream') {
        const text = await response.text().catch(() => '')
        throw new Error(
          `Download failed: server returned non-image content (${contentType || 'unknown'})${
            text ? ` — ${text.slice(0, 200)}` : ''
          }`,
        )
      }

      const blob = await response.blob()
      if (blob.size === 0) {
        throw new Error('Download failed: received empty file')
      }

      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      // Use title and sanitize it
      const rawTitle = (downloadItem.asset?.title || 'asset').toString().trim()
      const safeTitle = rawTitle
        .replace(/[\r\n"\\]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^\w\-_.]/g, '')
        || 'asset'
      link.download = `${safeTitle}.${downloadItem.format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000)
    } catch (error: any) {
      console.error('Re-download failed:', error)
      showToast('error', error.message || 'Failed to re-download asset')
    }
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

      {/* Loading state */}
      {isLoading && (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#EE2B24] animate-spin mb-4" />
          <p className="text-[13px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Loading downloads...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] flex flex-col items-center justify-center py-20 text-center">
          <FileImage className="w-10 h-10 text-[#DDDDDD] mb-4" />
          <p className="text-[15px] font-semibold text-[#111] mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Failed to load downloads
          </p>
          <p className="text-[13px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Please try again later
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && downloads.length === 0 && !searchQuery && licenseFilter === 'all' && (
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
          <Link href="/discover"
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Browse assets
          </Link>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (downloads.length > 0 || searchQuery || licenseFilter !== 'all') && (
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
              <button
                onClick={() => setLicenseFilter('editorial')}
                className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors ${
                  licenseFilter === 'editorial'
                    ? 'bg-[#111] border-[#111] text-white'
                    : 'border-[#E0E0E0] text-[#555] hover:border-[#999]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Editorial
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-[#888]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {totalCount} {totalCount === 1 ? 'download' : 'downloads'}
            </p>
          </div>

          {/* Downloads list */}
          {downloads.length === 0 ? (
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
                {downloads.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#E8E8E8] shrink-0">
                      <img 
                        src={item.asset?.thumbnailUrl || item.asset?.previewUrl} 
                        alt={item.asset?.title || 'Asset'} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13.5px] font-semibold text-[#111] truncate"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {item.asset?.title || 'Untitled'}
                        </p>
                        {item.status === 'expired' && (
                          <span className="px-2 py-0.5 bg-[#FFF3CD] text-[#856404] text-[10px] font-semibold rounded-full uppercase"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            Expired
                          </span>
                        )}
                        {item.status === 'revoked' && (
                          <span className="px-2 py-0.5 bg-[#F8D7DA] text-[#721C24] text-[10px] font-semibold rounded-full uppercase"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            Revoked
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {item.licenseType.charAt(0).toUpperCase() + item.licenseType.slice(1)} · {item.format.toUpperCase()} · {item.size.charAt(0).toUpperCase() + item.size.slice(1)} · {item.creditsCost} credit{item.creditsCost > 1 ? 's' : ''}
                      </p>
                      <p className="text-[11px] text-[#666] mt-0.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        by {item.asset?.contributor?.name || 'Unknown'} · Licensed {formatDistanceToNow(new Date(item.downloadedAt), { addSuffix: true })} · Expires {formatDistanceToNow(new Date(item.expiresAt), { addSuffix: true })}
                        {item.licenseUrl && (
                          <> · <a href={item.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-[#EE2B24] hover:underline">View license</a></>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/assets/${item.assetId}`}
                        className="w-8 h-8 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:border-[#999] transition-colors"
                        title="View asset">
                        <ExternalLink className="w-3.5 h-3.5 text-[#666]" />
                      </Link>
                      <button
                        onClick={() => handleRedownload(item)}
                        disabled={item.status !== 'active'}
                        className="w-8 h-8 rounded-full bg-[#EE2B24] flex items-center justify-center hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={item.status === 'active' ? 'Re-download' : 'Download expired or revoked'}>
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


    </div>
  )
}
