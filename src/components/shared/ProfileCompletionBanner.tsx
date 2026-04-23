'use client'

import { X, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface ProfileField {
  name: string
  label: string
  completed: boolean
  required: boolean
}

interface ProfileCompletionBannerProps {
  fields: ProfileField[]
  onDismiss?: () => void
}

export function ProfileCompletionBanner({ fields, onDismiss }: ProfileCompletionBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  const requiredFields = fields.filter(f => f.required)
  const completedRequired = requiredFields.filter(f => f.completed).length
  const totalRequired = requiredFields.length
  const completionPercentage = Math.round((completedRequired / totalRequired) * 100)
  const isComplete = completionPercentage === 100

  if (dismissed || isComplete) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-5 mb-6">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-[15px] font-bold text-[#111] mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Complete your profile to go public
              </h3>
              <p className="text-[13px] text-[#666] leading-relaxed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Your profile is {completionPercentage}% complete. Fill in the required fields to make your profile visible to customers.
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-yellow-100 rounded-lg transition-colors shrink-0"
              aria-label="Dismiss">
              <X className="w-4 h-4 text-[#666]" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#666] uppercase tracking-[0.5px]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Profile completion
              </span>
              <span className="text-[12px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {completedRequired}/{totalRequired} required fields
              </span>
            </div>
            <div className="h-2 bg-yellow-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Missing fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {requiredFields.map((field) => (
              <div
                key={field.name}
                className={`flex items-center gap-2 text-[12px] ${
                  field.completed ? 'text-green-600' : 'text-[#666]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {field.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D0D0D0] shrink-0" />
                )}
                <span className={field.completed ? 'line-through' : ''}>
                  {field.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/account"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111] text-white text-[13px] font-semibold rounded-full hover:bg-[#333] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Complete your profile →
          </Link>
        </div>
      </div>
    </div>
  )
}
