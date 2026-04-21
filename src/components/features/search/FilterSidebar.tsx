'use client'

import { ChevronDown, SlidersHorizontal, PanelLeftClose } from 'lucide-react'
import { useState } from 'react'
import { ActiveFilters } from './ActiveFilterChips'

interface FilterSidebarProps {
  filters: ActiveFilters
  onChange: (key: keyof ActiveFilters, value: string | undefined) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

interface FilterGroupProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterGroup({ title, children, defaultOpen = true }: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#E8E8E8] py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span
          className="text-[13px] font-bold text-[#111] uppercase tracking-[0.5px]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#666] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="flex flex-col gap-0.5">{children}</div>}
    </div>
  )
}

interface FilterOptionProps {
  label: string
  active: boolean
  onClick: () => void
}

function FilterOption({ label, active, onClick }: FilterOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-left w-full transition-colors text-[13.5px] ${
        active
          ? 'bg-[#FFF0F0] text-[#EE2B24] font-semibold'
          : 'text-[#111] font-medium hover:bg-[#F5F5F7]'
      }`}
      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
    >
      <span
        className={`w-4 h-4 rounded border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
          active ? 'bg-[#EE2B24] border-[#EE2B24]' : 'border-[#AAAAAA]'
        }`}
      >
        {active && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

export function FilterSidebar({ filters, onChange, collapsed, onToggleCollapse }: FilterSidebarProps) {
  const toggle = (key: keyof ActiveFilters, value: string) => {
    onChange(key, filters[key] === value ? undefined : value)
  }

  return (
    <aside
      className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-0 overflow-hidden opacity-0' : 'w-[220px] opacity-100'
      }`}
    >
      <div className="sticky top-[100px] w-[220px] h-[calc(100vh-110px)] overflow-y-auto scrollbar-slim pr-1">
        {/* Header row */}
        <div className="flex items-center justify-between mb-1 px-2">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#666]" />
            <span
              className="text-[13px] font-bold text-[#111] uppercase tracking-[0.5px]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Filters
            </span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-[#F5F5F7] transition-colors text-[#666] hover:text-[#111]"
            aria-label="Hide filters"
            title="Hide filters"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        <FilterGroup title="Media Type">
          {['photos', 'videos', 'vectors', 'illustrations'].map((v) => (
            <FilterOption
              key={v}
              label={v.charAt(0).toUpperCase() + v.slice(1)}
              active={filters.type === v}
              onClick={() => toggle('type', v)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Orientation">
          {[
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' },
            { value: 'square', label: 'Square' },
          ].map(({ value, label }) => (
            <FilterOption
              key={value}
              label={label}
              active={filters.orientation === value}
              onClick={() => toggle('orientation', value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="License">
          {[
            { value: 'standard', label: 'Standard' },
            { value: 'enhanced', label: 'Enhanced' },
            { value: 'editorial', label: 'Editorial' },
          ].map(({ value, label }) => (
            <FilterOption
              key={value}
              label={label}
              active={filters.license === value}
              onClick={() => toggle('license', value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Price">
          {[
            { value: 'free', label: 'Free' },
            { value: 'paid', label: 'Paid' },
            { value: 'subscription', label: 'Subscription only' },
          ].map(({ value, label }) => (
            <FilterOption
              key={value}
              label={label}
              active={filters.price === value}
              onClick={() => toggle('price', value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Date Added" defaultOpen={false}>
          {[
            { value: '24h', label: 'Last 24 hours' },
            { value: 'week', label: 'Last week' },
            { value: 'month', label: 'Last month' },
            { value: 'year', label: 'Last year' },
          ].map(({ value, label }) => (
            <FilterOption
              key={value}
              label={label}
              active={filters.dateAdded === value}
              onClick={() => toggle('dateAdded', value)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="AI Content" defaultOpen={false}>
          {[
            { value: 'human', label: 'Human only' },
            { value: 'ai', label: 'AI generated' },
          ].map(({ value, label }) => (
            <FilterOption
              key={value}
              label={label}
              active={filters.aiContent === value}
              onClick={() => toggle('aiContent', value)}
            />
          ))}
        </FilterGroup>
      </div>
    </aside>
  )
}
