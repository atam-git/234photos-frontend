'use client'

import { X, Download, Loader2, CheckCircle2 } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { ModalBackdrop } from './ModalBackdrop'
import { useCreateDownload, usePricing } from '@/hooks/useDownloads'
import { useAuthStore } from '@/stores/authStore'
import type { Asset, AssetDetail, LicenseType, DownloadOptions } from '@/types'
import { toast } from 'sonner'

interface DownloadModalProps {
  asset: Asset | AssetDetail | Partial<AssetDetail>
  onClose: () => void
  onConfirm?: (options: DownloadOptions) => void
}

export function DownloadModal({ asset, onClose, onConfirm }: DownloadModalProps) {
  const [license, setLicense] = useState<LicenseType>('standard')
  const [format, setFormat] = useState<'jpg' | 'png' | 'webp'>('jpg')
  const [size, setSize] = useState<'small' | 'medium' | 'original'>('medium')
  const [ownership, setOwnership] = useState<{ owned: boolean; download: any } | null>(null)
  const [checkingOwnership, setCheckingOwnership] = useState(true)

  const { user } = useAuthStore()
  const createDownloadMutation = useCreateDownload()
  const { data: pricing, isLoading: pricingLoading } = usePricing()

  // Check if user already owns this asset
  useEffect(() => {
    const checkOwnership = async () => {
      if (!asset.id) return
      
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
        const token = localStorage.getItem('234p_access')
        
        const response = await fetch(`${apiBase}/downloads/ownership/${asset.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          setOwnership(data)
        }
      } catch (error) {
        console.error('Failed to check ownership:', error)
      } finally {
        setCheckingOwnership(false)
      }
    }
    
    checkOwnership()
  }, [asset.id])

  // Check if asset is free
  const isFreeAsset = 'isFree' in asset ? asset.isFree : false

  // Build license options from API pricing
  const licenses = useMemo(() => {
    if (!pricing) return []
    return [
      {
        value: 'standard' as const,
        label: pricing.licenses.STANDARD.label,
        desc: pricing.licenses.STANDARD.description,
        price: isFreeAsset ? 'Free' : `${pricing.licenses.STANDARD.credits} credit${pricing.licenses.STANDARD.credits > 1 ? 's' : ''}`,
      },
      {
        value: 'enhanced' as const,
        label: pricing.licenses.ENHANCED.label,
        desc: pricing.licenses.ENHANCED.description,
        price: isFreeAsset ? 'Free' : `${pricing.licenses.ENHANCED.credits} credit${pricing.licenses.ENHANCED.credits > 1 ? 's' : ''}`,
      },
      {
        value: 'editorial' as const,
        label: pricing.licenses.EDITORIAL.label,
        desc: pricing.licenses.EDITORIAL.description,
        price: isFreeAsset ? 'Free' : `${pricing.licenses.EDITORIAL.credits} credit${pricing.licenses.EDITORIAL.credits > 1 ? 's' : ''}`,
      },
    ]
  }, [pricing, isFreeAsset])

  // Build size options from API pricing
  const sizes = useMemo(() => {
    if (!pricing) return []
    return [
      {
        value: 'small' as const,
        label: pricing.sizes.small.label,
        desc: pricing.sizes.small.description,
        extra: isFreeAsset ? null : (pricing.sizes.small.extraCredits > 0 ? `+${pricing.sizes.small.extraCredits} credit${pricing.sizes.small.extraCredits > 1 ? 's' : ''}` : null),
      },
      {
        value: 'medium' as const,
        label: pricing.sizes.medium.label,
        desc: pricing.sizes.medium.description,
        extra: isFreeAsset ? null : (pricing.sizes.medium.extraCredits > 0 ? `+${pricing.sizes.medium.extraCredits} credit${pricing.sizes.medium.extraCredits > 1 ? 's' : ''}` : null),
      },
      {
        value: 'original' as const,
        label: pricing.sizes.original.label,
        desc: pricing.sizes.original.description,
        extra: isFreeAsset ? null : (pricing.sizes.original.extraCredits > 0 ? `+${pricing.sizes.original.extraCredits} credit${pricing.sizes.original.extraCredits > 1 ? 's' : ''}` : null),
      },
    ]
  }, [pricing, isFreeAsset])

  const formats = useMemo(() => {
    return pricing?.formats || ['jpg', 'png', 'webp']
  }, [pricing])

  // Calculate total credits from API pricing
  const totalCredits = useMemo(() => {
    if (isFreeAsset) return 0
    if (!pricing) return 0
    const licenseCredits = pricing.licenses[license.toUpperCase() as 'STANDARD' | 'ENHANCED' | 'EDITORIAL']?.credits || 0
    const sizeCredits = pricing.sizes[size]?.extraCredits || 0
    return licenseCredits + sizeCredits
  }, [pricing, license, size, isFreeAsset])

  const userCredits = user?.credits || 0
  const hasEnoughCredits = isFreeAsset || userCredits >= totalCredits

  const handleDownload = async () => {
    if (!asset.id) {
      toast.error('Asset ID is missing')
      return
    }

    // If user already owns this asset, re-download directly
    if (ownership?.owned && ownership?.download) {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
        const fileUrl = `${apiBase}/downloads/${ownership.download.id}/file`
        const token = localStorage.getItem('234p_access')

        const response = await fetch(fileUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: `image/${ownership.download.format}, image/*, application/octet-stream`,
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
        const rawTitle = (asset.title || asset.alt || 'asset').toString().trim()
        const safeTitle = rawTitle
          .replace(/[\r\n"\\]/g, '')
          .trim()
          .replace(/\s+/g, '_')
          .replace(/[^\w\-_.]/g, '')
          || 'asset'
        link.download = `${safeTitle}.${ownership.download.format}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000)

        toast.success('Re-download started!')
        onClose()
        return
      } catch (error: any) {
        toast.error(error.message || 'Failed to re-download asset')
        return
      }
    }

    // Otherwise, purchase and download
    if (!hasEnoughCredits) {
      toast.error('Insufficient credits')
      return
    }

    try {
      const download = await createDownloadMutation.mutateAsync({
        assetId: asset.id,
        licenseType: license.toUpperCase() as 'STANDARD' | 'ENHANCED' | 'EDITORIAL',
        format,
        size,
      })

      toast.success('Download started!')

      // Use backend proxy endpoint for proper download
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
      const fileUrl = `${apiBase}/downloads/${download.id}/file`
      const token = localStorage.getItem('234p_access')

      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Tell the server we want bytes back, not a JSON envelope
          Accept: `image/${format}, image/*, application/octet-stream`,
        },
      })

      // CRITICAL: don't blindly turn an error response into a blob — that's
      // exactly how a 404/500 JSON body ends up saved as `Stake Dinner.jpg`
      // and looks like a "corrupted image".
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

      // Sanity-check that the server actually returned image bytes
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
      // Use title (not alt) and sanitize it the same way backend does
      const rawTitle = (asset.title || asset.alt || 'asset').toString().trim()
      const safeTitle = rawTitle
        .replace(/[\r\n"\\]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^\w\-_.]/g, '')
        || 'asset'
      link.download = `${safeTitle}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      // Revoke a tick later so the browser has a chance to start the download
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000)

      // Call onConfirm callback if provided
      if (onConfirm) {
        onConfirm({ license, format, size })
      }

      onClose()
    } catch (error: any) {
      toast.error(error.message || 'Failed to download asset')
    }
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full max-w-[680px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0]">
          <h2
            className="text-[16px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Download asset
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F7] flex items-center justify-center transition-colors"
            disabled={createDownloadMutation.isPending}
          >
            <X className="w-4 h-4 text-[#444]" />
          </button>
        </div>

        {checkingOwnership || pricingLoading ? (
          <div className="px-6 py-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-[#EE2B24] animate-spin" />
          </div>
        ) : (
          <div className="px-6 py-5">
            {/* 2-Column Layout */}
            <div className="flex gap-6">
              
              {/* Left: Asset Preview */}
              <div className="w-[240px] shrink-0">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#F5F5F5] mb-3">
                  <img 
                    src={asset.src || '/placeholder.jpg'} 
                    alt={asset.alt || 'Asset'} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#111] line-clamp-2 mb-1" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {asset.alt || 'Untitled Asset'}
                  </p>
                  <p className="text-[12px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    by {asset.contributor}
                  </p>
                  {ownership?.owned && (
                    <div className="flex items-center gap-1.5 mt-2 px-2.5 py-1.5 bg-[#D1F4E0] rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0F5132]" />
                      <span className="text-[11px] font-semibold text-[#0F5132]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Already Owned
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Download Options */}
              <div className="flex-1 flex flex-col gap-4">
                
                {/* License - Compact Dropdown Style */}
                <div>
                  <p className="text-[11px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    License
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {licenses.map((l) => (
                      <button
                        key={l.value}
                        onClick={() => setLicense(l.value)}
                        disabled={createDownloadMutation.isPending}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-left transition-colors ${
                          license === l.value
                            ? 'border-[#111] bg-[#FAFAFA]'
                            : 'border-[#E0E0E0] hover:border-[#BBBBBB]'
                        } ${createDownloadMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              license === l.value ? 'border-[#111]' : 'border-[#D0D0D0]'
                            }`}
                          >
                            {license === l.value && <span className="w-2 h-2 rounded-full bg-[#111]" />}
                          </span>
                          <div>
                            <p className="text-[12px] font-semibold text-[#111]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              {l.label}
                            </p>
                            <p className="text-[10.5px] text-[#666] leading-tight" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              {l.desc}
                            </p>
                          </div>
                        </div>
                        <span className="text-[12px] font-bold text-[#111] shrink-0 ml-2" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {l.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format & Size - Side by Side */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Format */}
                  <div>
                    <p className="text-[11px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Format
                    </p>
                    <div className="flex gap-1.5">
                      {formats.map((f) => (
                        <button
                          key={f}
                          onClick={() => setFormat(f as any)}
                          disabled={createDownloadMutation.isPending}
                          className={`flex-1 py-2 rounded-lg border text-[12px] font-semibold uppercase transition-colors ${
                            format === f
                              ? 'border-[#111] bg-[#111] text-white'
                              : 'border-[#E0E0E0] text-[#444] hover:border-[#999]'
                          } ${createDownloadMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <p className="text-[11px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Size
                    </p>
                    <div className="flex flex-col gap-1">
                      {sizes.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setSize(s.value)}
                          disabled={createDownloadMutation.isPending}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-left transition-colors ${
                            size === s.value
                              ? 'border-[#111] bg-[#FAFAFA]'
                              : 'border-[#E0E0E0] hover:border-[#BBBBBB]'
                          } ${createDownloadMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span className="text-[11px] font-semibold text-[#111]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {s.label}
                          </span>
                          {s.extra && (
                            <span className="text-[10px] font-semibold text-[#EE2B24]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              {s.extra}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Warnings/Banners */}
                <div className="flex flex-col gap-2">
                  {license === 'editorial' && (
                    <div className="px-3 py-2 bg-[#FFF3CD] border border-[#FFE69C] rounded-lg">
                      <p className="text-[10px] text-[#856404] font-medium" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        ⚠️ Editorial use only. Not for commercial purposes.
                      </p>
                    </div>
                  )}
                  {isFreeAsset && (
                    <div className="px-3 py-2 bg-[#D1F4E0] border border-[#A3E9C5] rounded-lg">
                      <p className="text-[10px] text-[#0F5132] font-medium" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        🎉 This is a free asset! No credits required.
                      </p>
                    </div>
                  )}
                  {ownership?.owned && (
                    <div className="px-3 py-2 bg-[#D1F4E0] border border-[#A3E9C5] rounded-lg">
                      <p className="text-[10px] text-[#0F5132] font-medium" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        ✓ You already own this asset! Re-download for free anytime.
                      </p>
                    </div>
                  )}
                </div>

                {/* Credits Summary + Download Button */}
                <div className="border-t border-[#F0F0F0] pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    {ownership?.owned ? (
                      <div>
                        <p className="text-[13px] font-semibold text-[#0F5132]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          Free Re-download
                        </p>
                        <p className="text-[11px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          No additional credits required
                        </p>
                      </div>
                    ) : isFreeAsset ? (
                      <div>
                        <p className="text-[13px] font-semibold text-[#0F5132]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          Free Download
                        </p>
                        <p className="text-[11px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          No credits will be deducted
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[12px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          Your credits: <span className={`font-semibold ${hasEnoughCredits ? 'text-[#111]' : 'text-[#EE2B24]'}`}>{userCredits}</span>
                        </p>
                        <p className="text-[12px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          This download: <span className="text-[#111] font-semibold">{totalCredits} credit{totalCredits > 1 ? 's' : ''}</span>
                        </p>
                        {!hasEnoughCredits && (
                          <p className="text-[11px] text-[#EE2B24] mt-1" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            Insufficient credits · <a href="/pricing" className="underline hover:no-underline">Buy more</a>
                          </p>
                        )}
                      </div>
                    )}
                    <button
                      onClick={handleDownload}
                      disabled={createDownloadMutation.isPending || (!ownership?.owned && !isFreeAsset && !hasEnoughCredits)}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                    >
                      {createDownloadMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          {ownership?.owned ? 'Re-download' : 'Download'}
                        </>
                      )}
                    </button>
                  </div>

                  {/* License terms */}
                  <p className="text-[10px] text-[#888] text-center mt-3" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    By downloading, you agree to our <a href="/terms/license" target="_blank" className="text-[#EE2B24] hover:underline">License Terms</a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </ModalBackdrop>
  )
}
