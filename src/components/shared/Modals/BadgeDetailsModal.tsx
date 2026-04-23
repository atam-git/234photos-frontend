'use client'

import { X, CheckCircle, Lock, TrendingUp } from 'lucide-react'

interface BadgeDetailsModalProps {
  badge: {
    emoji: string
    label: string
    earned: boolean
    progress?: number
  }
  onClose: () => void
}

export function BadgeDetailsModal({ badge, onClose }: BadgeDetailsModalProps) {
  const getBadgeDetails = () => {
    switch (badge.label) {
      case 'Top 10 Nigeria':
        return {
          description: 'Ranked in the top 10 contributors in Nigeria',
          requirements: [
            'Maintain high-quality uploads',
            'Consistent download performance',
            'Active for at least 3 months',
            'Minimum 50 approved assets'
          ],
          benefits: [
            'Featured on homepage',
            'Priority in search results',
            'Exclusive contributor badge',
            'Access to premium features'
          ],
          nextBadge: { emoji: '🌍', label: 'Top 10 Africa' }
        }
      case '30-day streak':
        return {
          description: 'Uploaded at least one asset every day for 30 consecutive days',
          requirements: [
            'Upload minimum 1 asset per day',
            'Maintain streak for 30 days',
            'All uploads must be approved',
            'No gaps in upload schedule'
          ],
          benefits: [
            'Increased visibility',
            'Streak multiplier bonus',
            'Community recognition',
            'Special contributor status'
          ],
          nextBadge: { emoji: '🔥', label: '90-day streak' }
        }
      case 'Gap filler ×3':
        return {
          description: 'Filled content gaps by uploading highly-requested assets 3 times',
          requirements: [
            'Upload assets in underserved categories',
            'Meet specific content requests',
            'High approval rate',
            'Unique and valuable content'
          ],
          benefits: [
            'Higher royalty rates',
            'Priority review',
            'Featured in gap-filler spotlight',
            'Bonus earnings'
          ],
          nextBadge: { emoji: '🎯', label: 'Gap filler ×10' }
        }
      case '1000 downloads':
        return {
          description: 'Achieved 1,000 total downloads across all your assets',
          requirements: [
            'Reach 1,000 cumulative downloads',
            'Maintain quality standards',
            'Active contributor status',
            'No policy violations'
          ],
          benefits: [
            'Milestone bonus payment',
            'Increased commission rate',
            'Featured contributor status',
            'Marketing support'
          ],
          nextBadge: { emoji: '⭐', label: '5000 downloads' }
        }
      case '5000 downloads':
        return {
          description: 'Achieved 5,000 total downloads across all your assets',
          requirements: [
            'Reach 5,000 cumulative downloads',
            'Maintain quality standards',
            'Active contributor status',
            'No policy violations'
          ],
          benefits: [
            'Major milestone bonus',
            'Premium commission rate',
            'Elite contributor badge',
            'Dedicated account manager'
          ],
          nextBadge: { emoji: '💎', label: '10000 downloads' }
        }
      default:
        return {
          description: 'Special achievement badge',
          requirements: ['Meet specific criteria'],
          benefits: ['Exclusive perks'],
          nextBadge: null
        }
    }
  }

  const details = getBadgeDetails()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Badge Details
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Badge Display */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              badge.earned ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' : 'bg-[#F5F5F5]'
            }`}>
              <span className="text-[40px]">{badge.emoji}</span>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {badge.label}
            </h3>
            <p className="text-[13px] text-[#666]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {details.description}
            </p>
            {badge.earned ? (
              <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-50 text-green-700 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-[12px] font-bold"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Earned
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#F5F5F5] text-[#888] rounded-full">
                <Lock className="w-4 h-4" />
                <span className="text-[12px] font-bold"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Locked
                </span>
              </div>
            )}
          </div>

          {/* Progress */}
          {badge.progress !== undefined && !badge.earned && (
            <div className="bg-[#F8F8F8] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Progress
                </span>
                <span className="text-[13px] font-bold text-[#EE2B24]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {badge.progress}%
                </span>
              </div>
              <div className="h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#EE2B24] rounded-full transition-all duration-500"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              <p className="text-[11px] text-[#888] mt-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Keep going! You're {100 - badge.progress}% away from earning this badge.
              </p>
            </div>
          )}

          {/* Requirements */}
          <div>
            <h4 className="text-[14px] font-bold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Requirements
            </h4>
            <div className="space-y-2">
              {details.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    badge.earned ? 'bg-green-100' : 'bg-[#F5F5F5]'
                  }`}>
                    {badge.earned ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-[#D0D0D0]" />
                    )}
                  </div>
                  <span className="text-[13px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {req}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-[14px] font-bold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Benefits
            </h4>
            <div className="space-y-2">
              {details.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[16px] shrink-0">✨</span>
                  <span className="text-[13px] text-[#666] leading-relaxed"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Badge */}
          {details.nextBadge && (
            <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0] border border-[#FFE0E0] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0">
                  <span className="text-[24px]">{details.nextBadge.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#EE2B24]" />
                    <span className="text-[11px] font-bold text-[#EE2B24] uppercase tracking-[0.5px]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Next Badge
                    </span>
                  </div>
                  <p className="text-[13px] font-bold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {details.nextBadge.label}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
