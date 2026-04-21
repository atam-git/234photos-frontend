'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'

const LICENSES = [
  {
    value: 'standard',
    label: 'Standard',
    price: '1 credit',
    desc: 'Web, social, print up to 500K copies',
  },
  {
    value: 'enhanced',
    label: 'Enhanced',
    price: '3 credits',
    desc: 'Unlimited print, resale & broadcast',
  },
  {
    value: 'editorial',
    label: 'Editorial',
    price: '1 credit',
    desc: 'News & editorial use only',
  },
] as const

type LicenseValue = 'standard' | 'enhanced' | 'editorial'

interface LicenseSelectorProps {
  value: LicenseValue
  onChange: (v: LicenseValue) => void
}

export function LicenseSelector({ value, onChange }: LicenseSelectorProps) {
  const [tooltip, setTooltip] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          className="text-[12px] font-bold text-[#111] uppercase tracking-[0.5px]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          License
        </span>
        <a
          href="/licence"
          className="text-[12px] text-[#EE2B24] font-medium hover:underline"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          Compare licenses
        </a>
      </div>

      <div className="flex flex-col gap-1.5">
        {LICENSES.map((l) => (
          <button
            key={l.value}
            onClick={() => onChange(l.value)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-colors ${
              value === l.value
                ? 'border-[#111] bg-[#FAFAFA]'
                : 'border-[#E0E0E0] hover:border-[#BBBBBB]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  value === l.value ? 'border-[#111]' : 'border-[#CCCCCC]'
                }`}
              >
                {value === l.value && <span className="w-2 h-2 rounded-full bg-[#111]" />}
              </span>
              <div>
                <p
                  className="text-[13px] font-semibold text-[#111] leading-none mb-0.5"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {l.label}
                </p>
                <p
                  className="text-[11.5px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                >
                  {l.desc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span
                className="text-[12px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                {l.price}
              </span>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setTooltip(l.value)}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#BBBBBB] hover:text-[#888] transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {tooltip === l.value && (
                  <div className="absolute right-0 bottom-full mb-1.5 w-[180px] bg-[#111] text-white text-[11.5px] rounded-lg px-3 py-2 z-10 pointer-events-none"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    {l.desc}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
