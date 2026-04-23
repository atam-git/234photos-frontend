'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { SORT_OPTIONS } from '@/lib/mock'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3.5 py-[7px] border border-[#D0D0D0] rounded-full text-[13px] font-medium text-[#111] hover:border-[#999] transition-colors bg-white"
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
      >
        {current.label}
        <ChevronDown className={`w-3.5 h-3.5 text-[#555] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-[180px] bg-white border border-[#E8E8E8] rounded-xl shadow-lg z-50 py-1 overflow-hidden">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-[#111] hover:bg-[#F5F5F7] transition-colors text-left"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {opt.label}
              {value === opt.value && <Check className="w-3.5 h-3.5 text-[#EE2B24]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
