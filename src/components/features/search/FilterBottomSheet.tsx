'use client'

import { X, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { ActiveFilters } from './ActiveFilterChips'
import { FilterSidebar } from './FilterSidebar'

interface FilterBottomSheetProps {
  filters: ActiveFilters
  onChange: (key: keyof ActiveFilters, value: string | undefined) => void
  activeCount: number
}

export function FilterBottomSheet({ filters, onChange, activeCount }: FilterBottomSheetProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger button — mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#D0D0D0] rounded-full text-[13px] font-medium text-[#111] bg-white hover:border-[#999] transition-colors"
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-[#EE2B24] text-white text-[10px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl lg:hidden transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#E0E0E0]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F0F0F0]">
          <span
            className="text-[16px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Filters
          </span>
          <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-[#F5F5F7]">
            <X className="w-5 h-5 text-[#444]" />
          </button>
        </div>

        {/* Reuse sidebar content — override sticky/width */}
        <div className="px-5 pb-8">
          <FilterSidebar filters={filters} onChange={onChange} collapsed={false} onToggleCollapse={() => {}} />
        </div>

        {/* Apply button */}
        <div className="sticky bottom-0 bg-white border-t border-[#F0F0F0] px-5 py-4">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Show results
          </button>
        </div>
      </div>
    </>
  )
}
