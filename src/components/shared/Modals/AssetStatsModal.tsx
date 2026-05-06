'use client'

import { X, Download, Eye, Heart, Banknote, TrendingUp, Calendar, Trash2, Edit2 } from 'lucide-react'
import { ModalBackdrop } from './ModalBackdrop'
import type { AssetStats } from '@/types'
import { NairaIcon } from '@/components/icons/NairaIcon'
import { useState } from 'react'
import { assetsApi } from '@/lib/api/assets'
import { useToast } from '@/components/ui/toast-provider'
import { useRouter } from 'next/navigation'

interface AssetStatsModalProps {
  asset: {
    id: string
    title?: string
    src?: string
    alt?: string
    uploadedAt: string
    downloads: number
    earnings: number | string
    views?: number
    likes?: number
    resolution?: string
    status?: 'approved' | 'pending' | 'rejected' | 'live' | 'draft'
    // Additional metadata
    dimensions?: string
    fileSize?: string
    fileType?: string
    category?: string
    tags?: string[]
    isAI?: boolean
    isEditorial?: boolean
    modelRelease?: boolean
    propertyRelease?: boolean
  }
  onClose: () => void
  onDelete?: () => void
}

const STATUS_STYLES = {
  approved: { bg: 'bg-green-50', text: 'text-green-700', label: 'Live' },
  live: { bg: 'bg-green-50', text: 'text-green-700', label: 'Live' },
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Pending Review' },
  rejected: { bg: 'bg-red-50', text: 'text-red-600', label: 'Rejected' },
  draft: { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Draft' },
} as const

const DEFAULT_STATUS_STYLE = { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Unknown' }

export function AssetStatsModal({ asset, onClose, onDelete }: AssetStatsModalProps) {
  const router = useRouter()
  const { showToast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const statusKey = (asset.status?.toLowerCase() || 'approved') as keyof typeof STATUS_STYLES
  const statusStyle = STATUS_STYLES[statusKey] || DEFAULT_STATUS_STYLE
  const isDraft = statusKey === 'draft'
  const views = asset.views || 0
  const likes = asset.likes || 0
  const downloads = asset.downloads || 0
  const earnings = typeof asset.earnings === 'number' ? asset.earnings : parseFloat(asset.earnings?.toString() || '0')
  const resolution = asset.resolution || 'HD'

  // Calculate metrics safely
  const conversionRate = views > 0 ? ((downloads / views) * 100).toFixed(1) : '0.0'
  const avgEarningsPerDownload = downloads > 0 ? (earnings / downloads).toLocaleString('en-NG', { maximumFractionDigits: 2 }) : '0'
  const engagementRate = views > 0 ? ((likes / views) * 100).toFixed(1) : '0.0'

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await assetsApi.delete(asset.id)
      showToast('success', 'Asset deleted successfully')
      onDelete?.()
      onClose()
    } catch (error: any) {
      showToast('error', error.message || 'Failed to delete asset')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2
            className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Asset Performance
          </h2>
          <div className="flex items-center gap-2">
            {isDraft && (
              <button
                onClick={() => {
                  onClose()
                  router.push(`/my-assets/edit/${asset.id}`)
                }}
                className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                aria-label="Edit draft"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
              </button>
            )}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Delete asset"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-[#666]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          {/* Asset Preview & Info */}
          <div className="flex gap-4 mb-6">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[#E8E8E8] shrink-0">
              {asset.src && <img src={asset.src} alt={asset.alt || asset.title || 'Asset'} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-[16px] font-bold text-[#111] mb-2 line-clamp-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {asset.title || asset.alt || 'Asset'}
              </h3>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {statusStyle.label}
                </span>
                {resolution && (
                  <span
                    className="text-[11px] font-semibold text-[#888] px-2.5 py-1 bg-[#F5F5F5] rounded-full"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {resolution}
                  </span>
                )}
                {asset.isAI && (
                  <span
                    className="text-[11px] font-semibold text-purple-700 px-2.5 py-1 bg-purple-50 rounded-full"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    AI
                  </span>
                )}
                {asset.isEditorial && (
                  <span
                    className="text-[11px] font-semibold text-orange-700 px-2.5 py-1 bg-orange-50 rounded-full"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Editorial
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#888] mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Uploaded {asset.uploadedAt}
                </span>
              </div>
              {asset.category && (
                <div className="text-[12px] text-[#666]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Category: <span className="font-semibold text-[#111]">{asset.category}</span>
                </div>
              )}
            </div>
          </div>

          {/* Asset Details */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#F8F8F8] rounded-xl mb-6">
            <div>
              <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Dimensions
              </p>
              <p className="text-[12px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.dimensions || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                File Size
              </p>
              <p className="text-[12px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.fileSize || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                File Type
              </p>
              <p className="text-[12px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.fileType?.toUpperCase() || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#888] uppercase tracking-[0.5px] mb-0.5"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Releases
              </p>
              <p className="text-[12px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.modelRelease ? '✓ Model' : ''} {asset.propertyRelease ? '✓ Property' : ''}
                {!asset.modelRelease && !asset.propertyRelease ? 'None' : ''}
              </p>
            </div>
          </div>

          {/* Tags */}
          {asset.tags && asset.tags.length > 0 && (
            <div className="mb-6">
              <p className="text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-[#666] px-2.5 py-1 bg-[#F5F5F5] rounded-full"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid - Compact */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Earnings Card */}
            <div className="bg-gradient-to-br from-[#EE2B24] to-[#d42520] rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <NairaIcon className="w-3.5 h-3.5" />
                </div>
                <span
                  className="text-[11px] font-semibold text-white/80"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Total Earnings
                </span>
              </div>
              <p
                className="text-[28px] font-extrabold mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                ₦{earnings.toLocaleString('en-NG', { maximumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                <div className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-[11px] font-medium text-white/90"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {downloads}
                  </span>
                </div>
                <div className="text-white/40">•</div>
                <div className="text-[10px] text-white/70"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  ₦{avgEarningsPerDownload}/download
                </div>
              </div>
            </div>

            {/* Engagement Card */}
            <div className="bg-white border-2 border-[#F0F0F0] rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span
                  className="text-[11px] font-semibold text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Engagement
                </span>
              </div>
              <p
                className="text-[28px] font-extrabold text-[#111] mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {views.toLocaleString()}
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#F0F0F0]">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-600" />
                  <span className="text-[11px] font-medium text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {likes}
                  </span>
                </div>
                <div className="text-[#DDD]">•</div>
                <div className="text-[10px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {conversionRate}% conversion
                </div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-[#F8F8F8] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#EE2B24]" />
              <h3
                className="text-[14px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                Performance Insights
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-[16px]">📈</span>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Conversion Rate: {conversionRate}%
                  </p>
                  <p
                    className="text-[12px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {downloads} downloads from {views.toLocaleString()} views
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[16px]">💰</span>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Avg. Earnings per Download: ₦{avgEarningsPerDownload}
                  </p>
                  <p
                    className="text-[12px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Mix of Standard and Enhanced licenses
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[16px]">❤️</span>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Engagement Rate: {engagementRate}%
                  </p>
                  <p
                    className="text-[12px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {likes} users saved this to their favorites
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Close
            </button>
            <button
              onClick={() => window.open(`/assets/${asset.id}`, '_blank')}
              className="flex-1 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              View Public Page
            </button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                <h3 className="text-[18px] font-bold text-[#111] mb-2"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Delete Asset?
                </h3>
                <p className="text-[14px] text-[#666] mb-6"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  This action cannot be undone. The asset will be permanently removed from your portfolio.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="flex-1 py-2.5 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors disabled:opacity-50"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 py-2.5 bg-red-600 text-white text-[14px] font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete Asset'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalBackdrop>
  )
}
