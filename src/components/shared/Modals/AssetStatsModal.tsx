'use client'

import { X, Download, Eye, Heart, DollarSign, TrendingUp, Calendar } from 'lucide-react'
import { ModalBackdrop } from './ModalBackdrop'
import type { AssetStats } from '@/types'

interface AssetStatsModalProps {
  asset: {
    id: string
    src?: string
    alt?: string
    uploadedAt: string
    downloads: number
    earnings: number | string
    views?: number
    likes?: number
    resolution?: string
    status?: 'approved' | 'pending' | 'rejected' | 'live'
  }
  onClose: () => void
}

const STATUS_STYLES = {
  approved: { bg: 'bg-green-50', text: 'text-green-700', label: 'Live' },
  live: { bg: 'bg-green-50', text: 'text-green-700', label: 'Live' },
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Pending Review' },
  rejected: { bg: 'bg-red-50', text: 'text-red-600', label: 'Rejected' },
} as const

export function AssetStatsModal({ asset, onClose }: AssetStatsModalProps) {
  const statusStyle = STATUS_STYLES[asset.status || 'approved']
  const views = asset.views || Math.floor(asset.downloads * 12.5)
  const likes = asset.likes || Math.floor(asset.downloads * 0.3)
  const resolution = asset.resolution || 'HD'

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
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          {/* Asset Preview */}
          <div className="flex gap-4 mb-6">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-[#E8E8E8] shrink-0">
              {asset.src && <img src={asset.src} alt={asset.alt || 'Asset'} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-[16px] font-bold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {asset.alt || 'Asset'}
              </h3>
              <div className="flex items-center gap-2 mb-2">
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
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-[#888]">
                <Calendar className="w-3.5 h-3.5" />
                <span style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Uploaded {asset.uploadedAt}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Earnings */}
            <div className="bg-gradient-to-br from-[#EE2B24] to-[#d42520] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span
                  className="text-[12px] font-semibold text-white/80"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Total Earnings
                </span>
              </div>
              <p
                className="text-[32px] font-extrabold"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                ${typeof asset.earnings === 'number' ? asset.earnings.toFixed(2) : asset.earnings}
              </p>
            </div>

            {/* Downloads */}
            <div className="bg-white border-2 border-[#F0F0F0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] flex items-center justify-center">
                  <Download className="w-4 h-4 text-[#EE2B24]" />
                </div>
                <span
                  className="text-[12px] font-semibold text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Downloads
                </span>
              </div>
              <p
                className="text-[32px] font-extrabold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {asset.downloads}
              </p>
            </div>

            {/* Views */}
            <div className="bg-white border-2 border-[#F0F0F0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <span
                  className="text-[12px] font-semibold text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Views
                </span>
              </div>
              <p
                className="text-[32px] font-extrabold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {views.toLocaleString()}
              </p>
            </div>

            {/* Likes */}
            <div className="bg-white border-2 border-[#F0F0F0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <span
                  className="text-[12px] font-semibold text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  Likes
                </span>
              </div>
              <p
                className="text-[32px] font-extrabold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {likes}
              </p>
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
                    Conversion Rate: {((asset.downloads / views) * 100).toFixed(1)}%
                  </p>
                  <p
                    className="text-[12px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {asset.downloads} downloads from {views.toLocaleString()} views
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
                    Avg. Earnings per Download: ${((typeof asset.earnings === 'number' ? asset.earnings : parseFloat(asset.earnings.toString())) / asset.downloads).toFixed(2)}
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
                    Engagement Rate: {((likes / views) * 100).toFixed(1)}%
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
        </div>
      </div>
    </ModalBackdrop>
  )
}
