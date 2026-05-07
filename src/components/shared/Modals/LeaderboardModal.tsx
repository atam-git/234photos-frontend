'use client'

import { X, Trophy, TrendingUp, Award, Crown } from 'lucide-react'
import { useState } from 'react'
import { useLeaderboard } from '@/hooks/useLeaderboard'

interface LeaderboardModalProps {
  currentUserRank?: number
  onClose: () => void
}

type Period = 'week' | 'month' | 'allTime'

export function LeaderboardModal({ currentUserRank, onClose }: LeaderboardModalProps) {
  const [period, setPeriod] = useState<Period>('month')
  const { data, isLoading } = useLeaderboard(period, 50)

  // Format currency (kobo to naira)
  const formatCurrency = (kobo: number) => {
    const naira = kobo / 100
    return naira.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  const leaderboard = data?.entries || []
  const userRank = data?.currentUserRank || currentUserRank
  const userEntry = data?.currentUserEntry

  // Add current user to leaderboard if not in top 50
  const fullLeaderboard = userEntry && !leaderboard.find(e => e.isCurrentUser)
    ? [...leaderboard, userEntry].sort((a, b) => a.rank - b.rank)
    : leaderboard

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Leaderboard
                </h2>
                <p className="text-[12px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Top contributors by earnings
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
              <X className="w-5 h-5 text-[#666]" />
            </button>
          </div>

          {/* Period Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'week' as Period, label: 'This Week' },
              { key: 'month' as Period, label: 'This Month' },
              { key: 'allTime' as Period, label: 'All Time' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPeriod(tab.key)}
                className={`px-4 py-2 text-[13px] font-semibold rounded-full transition-colors ${
                  period === tab.key
                    ? 'bg-[#EE2B24] text-white'
                    : 'bg-[#F5F5F5] text-[#666] hover:bg-[#EBEBEB]'
                }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            // Loading skeleton
            <div className="space-y-4">
              {/* Top 3 skeleton */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-3" />
                    <div className="h-4 w-20 bg-gray-200 rounded mb-1" />
                    <div className="h-4 w-16 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
              {/* List skeleton */}
              <div className="bg-[#F8F8F8] rounded-xl overflow-hidden">
                <div className="divide-y divide-[#E8E8E8]">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-4 py-3 bg-white animate-pulse">
                      <div className="w-6 h-6 bg-gray-200 rounded" />
                      <div className="w-6 h-6 bg-gray-200 rounded" />
                      <div className="flex-1">
                        <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                      </div>
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : fullLeaderboard.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🏆</div>
              <p className="text-[14px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No leaderboard data available yet
              </p>
            </div>
          ) : (
            <>
              {/* Top 3 Podium */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {fullLeaderboard.slice(0, 3).map((user, index) => {
                  const position = [1, 0, 2][index] // Reorder for podium effect
                  const actualUser = fullLeaderboard[position]
                  const colors = [
                    'from-gray-300 to-gray-400',
                    'from-yellow-400 to-yellow-600',
                    'from-orange-300 to-orange-500'
                  ]
                  
                  return (
                    <div key={actualUser.rank} className={`flex flex-col items-center ${index === 1 ? 'order-first' : ''}`}>
                      <div className="relative mb-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5F5F5] to-[#E8E8E8] flex items-center justify-center text-[24px] border-4 border-white shadow-lg">
                          {actualUser.avatar ? (
                            <img src={actualUser.avatar} alt={actualUser.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            actualUser.country
                          )}
                        </div>
                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${colors[position]} flex items-center justify-center border-2 border-white shadow-md`}>
                          {position === 0 && <Crown className="w-4 h-4 text-white" />}
                          {position === 1 && <Award className="w-4 h-4 text-white" />}
                          {position === 2 && <Trophy className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <p className="text-[13px] font-bold text-[#111] text-center mb-1"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {actualUser.name}
                      </p>
                      <p className="text-[15px] font-extrabold text-[#EE2B24] mb-1"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        ₦{formatCurrency(actualUser.earnings)}
                      </p>
                      <p className="text-[11px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {actualUser.downloads.toLocaleString()} downloads
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Full Leaderboard */}
              <div className="bg-[#F8F8F8] rounded-xl overflow-hidden">
                <div className="divide-y divide-[#E8E8E8]">
                  {fullLeaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 px-4 py-3 ${
                        user.isCurrentUser ? 'bg-[#FFF5F5] border-l-4 border-[#EE2B24]' : 'bg-white'
                      }`}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className={`text-[15px] font-bold w-6 text-center shrink-0 ${
                          user.rank <= 3 ? 'text-[#EE2B24]' : 'text-[#888]'
                        }`}
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {user.rank}
                        </span>
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <span className="text-[20px] shrink-0">{user.country}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-semibold truncate ${
                            user.isCurrentUser ? 'text-[#EE2B24]' : 'text-[#111]'
                          }`}
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {user.name}
                          </p>
                          <p className="text-[11px] text-[#888]"
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {user.downloads.toLocaleString()} downloads
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {user.change !== 0 && (
                          <div className={`flex items-center gap-0.5 ${
                            user.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <TrendingUp className={`w-3 h-3 ${user.change < 0 ? 'rotate-180' : ''}`} />
                            <span className="text-[11px] font-bold"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              {Math.abs(user.change)}
                            </span>
                          </div>
                        )}
                        <span className="text-[14px] font-bold text-[#111] min-w-[80px] text-right"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          ₦{formatCurrency(user.earnings)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Note */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-[11px] text-blue-900"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  💡 Rankings are based on total earnings. Keep uploading quality content to climb the leaderboard!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
