'use client'

import { X } from 'lucide-react'
import type { SearchFilters, ActiveFilters } from '@/types'

// Re-exported for backward compatibility with existing imports
export type { ActiveFilters }

const FILTER_LABELS: Record<string, Record<string, string>> = {
  type: { photos: 'Photos', videos: 'Videos', vectors: 'Vectors', illustrations: 'Illustrations' },
  orientation: { horizontal: 'Horizontal', vertical: 'Vertical', square: 'Square' },
  license: { standard: 'Standard', enhanced: 'Enhanced', editorial: 'Editorial' },
  price: { free: 'Free', paid: 'Paid', subscription: 'Subscription' },
  dateAdded: { '24h': 'Last 24h', week: 'Last week', month: 'Last month', year: 'Last year' },
  aiContent: { human: 'Human only', ai: 'AI only' },
}

interface ActiveFilterChipsProps {
  filters: SearchFilters
  resultCount: number
  query: string
  onRemove: (key: keyof SearchFilters) => void
  onClearAll: () => void
}

export function ActiveFilterChips({
  filters,
  resultCount,
  query,
  onRemove,
  onClearAll,
}: ActiveFilterChipsProps) {
  const activeKeys = (Object.keys(filters) as (keyof SearchFilters)[]).filter(
    (k) => k !== 'sort' && filters[k]
  )

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Result count */}
      <span
        className="text-[#555] text-[13px] shrink-0"
        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
      >
        <span className="text-[#111] font-semibold">{resultCount.toLocaleString()}</span> results
        {query && (
          <> for <span className="text-[#111] font-semibold">&ldquo;{query}&rdquo;</span></>
        )}
      </span>

      {/* Active filter chips */}
      {activeKeys.map((key) => {
        const val = filters[key]!
        const label = typeof val === 'string' ? (FILTER_LABELS[key]?.[val] ?? val) : String(val)
        return (
          <button
            key={key}
            onClick={() => onRemove(key)}
            className="flex items-center gap-1.5 px-3 py-[5px] bg-[#111] text-white text-[12px] font-medium rounded-full hover:bg-[#333] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            {label}
            <X className="w-3 h-3" />
          </button>
        )
      })}

      {/* Clear all */}
      {activeKeys.length > 0 && (
        <button
          onClick={onClearAll}
          className="text-[#EE2B24] text-[12px] font-semibold hover:underline"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          Clear all
        </button>
      )}
    </div>
  )
}
