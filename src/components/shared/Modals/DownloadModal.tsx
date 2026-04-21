'use client'

import { X, Download } from 'lucide-react'
import { useState } from 'react'
import { ModalBackdrop } from './ModalBackdrop'
import { Asset } from '@/components/features/search/AssetCard'

interface DownloadModalProps {
  asset: Asset
  onClose: () => void
  onConfirm: (options: DownloadOptions) => void
}

export interface DownloadOptions {
  license: 'standard' | 'enhanced'
  format: 'jpg' | 'png' | 'webp'
  size: 'small' | 'medium' | 'original'
}

const LICENSES = [
  { value: 'standard', label: 'Standard', desc: 'For web, social, print up to 500K copies', price: '1 credit' },
  { value: 'enhanced', label: 'Enhanced', desc: 'Unlimited print, resale, broadcast', price: '3 credits' },
] as const

const FORMATS = ['jpg', 'png', 'webp'] as const

const SIZES = [
  { value: 'small', label: 'Small', desc: '640px', extra: null },
  { value: 'medium', label: 'Medium', desc: '1920px', extra: null },
  { value: 'original', label: 'Original', desc: '5760px', extra: '+1 credit' },
] as const

export function DownloadModal({ asset, onClose, onConfirm }: DownloadModalProps) {
  const [license, setLicense] = useState<'standard' | 'enhanced'>('standard')
  const [format, setFormat] = useState<'jpg' | 'png' | 'webp'>('jpg')
  const [size, setSize] = useState<'small' | 'medium' | 'original'>('medium')

  const totalCredits = (license === 'enhanced' ? 3 : 1) + (size === 'original' ? 1 : 0)

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="w-full max-w-[460px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

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
          >
            <X className="w-4 h-4 text-[#444]" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">

          {/* Asset preview row */}
          <div className="flex items-center gap-3">
            <img src={asset.src} alt={asset.alt} className="w-14 h-14 rounded-lg object-cover" />
            <div>
              <p className="text-[13px] font-semibold text-[#111] line-clamp-1" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {asset.alt}
              </p>
              <p className="text-[12px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                by {asset.contributor}
              </p>
            </div>
          </div>

          {/* License */}
          <div>
            <p className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              License
            </p>
            <div className="flex flex-col gap-2">
              {LICENSES.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLicense(l.value)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
                    license === l.value
                      ? 'border-[#111] bg-[#FAFAFA]'
                      : 'border-[#E0E0E0] hover:border-[#BBBBBB]'
                  }`}
                >
                  <div>
                    <p className="text-[13px] font-semibold text-[#111]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {l.label}
                    </p>
                    <p className="text-[11.5px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {l.desc}
                    </p>
                  </div>
                  <span className="text-[12px] font-bold text-[#111] shrink-0 ml-3" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {l.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <p className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Format
            </p>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-2 rounded-lg border text-[13px] font-semibold uppercase transition-colors ${
                    format === f
                      ? 'border-[#111] bg-[#111] text-white'
                      : 'border-[#E0E0E0] text-[#444] hover:border-[#999]'
                  }`}
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Size
            </p>
            <div className="flex flex-col gap-1.5">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-left transition-colors ${
                    size === s.value
                      ? 'border-[#111] bg-[#FAFAFA]'
                      : 'border-[#E0E0E0] hover:border-[#BBBBBB]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        size === s.value ? 'border-[#111]' : 'border-[#D0D0D0]'
                      }`}
                    >
                      {size === s.value && <span className="w-2 h-2 rounded-full bg-[#111]" />}
                    </span>
                    <span className="text-[13px] font-semibold text-[#111]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {s.label}
                    </span>
                    <span className="text-[12px] text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {s.desc}
                    </span>
                  </div>
                  {s.extra && (
                    <span className="text-[11.5px] font-semibold text-[#EE2B24]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {s.extra}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Credits summary + confirm */}
          <div className="border-t border-[#F0F0F0] pt-4 flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Your credits: <span className="text-[#111] font-semibold">12 remaining</span>
              </p>
              <p className="text-[12px] text-[#666]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                This download: <span className="text-[#111] font-semibold">{totalCredits} credit{totalCredits > 1 ? 's' : ''}</span>
              </p>
            </div>
            <button
              onClick={() => onConfirm({ license, format, size })}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </ModalBackdrop>
  )
}
