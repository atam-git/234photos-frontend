'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { WithdrawEarningsModal } from '@/components/shared/Modals/WithdrawEarningsModal'
import { AssetStatsModal } from '@/components/shared/Modals/AssetStatsModal'
import { WithdrawalDetailsModal } from '@/components/shared/Modals/WithdrawalDetailsModal'
import { NairaIcon } from '@/components/icons/NairaIcon'
import { formatNaira, formatNairaCompact } from '@/lib/currency'
import { useEarningsStats, useEarningsChart, useEarningsTransactions, useWithdrawals, useAddPayoutMethod } from '@/hooks/useEarnings'
import type { Withdrawal } from '@/lib/api/earnings'

export default function EarningsPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null)
  const [payoutMethod, setPayoutMethod] = useState<'bank' | 'paypal' | 'mobile_money'>('bank')
  const isContributor = user?.role === 'contributor' && user?.isContributor

  // Fetch data
  const { data: stats, isLoading: statsLoading } = useEarningsStats()
  const { data: chartData = [], isLoading: chartLoading } = useEarningsChart()
  const { data: transactionsData, isLoading: transactionsLoading } = useEarningsTransactions(1, 10)
  const { data: withdrawalsData, isLoading: withdrawalsLoading } = useWithdrawals(1, 10)
  const { mutate: savePayoutMethod, isPending: isSavingPayout } = useAddPayoutMethod()

  useEffect(() => {
    if (!isContributor) {
      router.push('/discover?openContributorModal=true')
    }
  }, [isContributor, router])

  if (!isContributor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🔒</div>
          <h2 className="text-xl font-semibold text-[#111] mb-2">Contributor Access Required</h2>
          <p className="text-[#666] mb-4">Apply to become a contributor to access this page</p>
          <button
            onClick={() => router.push('/discover?openContributorModal=true')}
            className="inline-block px-6 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Apply Now
          </button>
        </div>
      </div>
    )
  }

  // Convert kobo to naira for display
  const availableBalance = stats ? stats.availableBalance / 100 : 0
  const pendingBalance = stats ? stats.pendingBalance / 100 : 0
  const totalAllTime = stats ? stats.totalEarnings / 100 : 0

  // Calculate max for chart
  const chartEarnings = chartData.map(d => d.earnings / 100)
  const MAX = chartEarnings.length > 0 ? Math.max(...chartEarnings) : 1

  const handlePayoutSave = () => {
    savePayoutMethod({
      type: payoutMethod,
      displayName: payoutMethod === 'bank' ? 'Bank Transfer' : payoutMethod === 'paypal' ? 'PayPal' : 'Mobile Money',
      ...(payoutMethod === 'bank' && {
        bankDetails: {
          accountNumber: 'N/A',
          bankName: 'N/A',
          accountName: 'N/A',
        }
      }),
      ...(payoutMethod === 'paypal' && {
        paypalEmail: 'user@example.com'
      }),
      ...(payoutMethod === 'mobile_money' && {
        mobileMoneyDetails: {
          provider: 'MTN',
          phoneNumber: '+234'
        }
      })
    })
  }

  // Loading state
  if (statsLoading || chartLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#EE2B24] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#888]" style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Loading earnings...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Earnings
          </h1>
          <p className="text-[13px] text-[#888] mt-0.5"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Your royalty earnings and payout history
          </p>
        </div>
        <button 
          onClick={() => setShowWithdrawModal(true)}
          className="px-5 py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Withdraw earnings
        </button>
      </div>

      {/* Balance and earnings cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
              <NairaIcon className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full bg-green-50 text-green-700"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Available
            </span>
          </div>
          <p className="text-[32px] font-extrabold text-[#111] leading-none mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {formatNaira(availableBalance)}
          </p>
          <p className="text-[12px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Ready to withdraw
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFF9E6] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Pending
            </span>
          </div>
          <p className="text-[32px] font-extrabold text-[#111] leading-none mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {formatNaira(pendingBalance)}
          </p>
          <p className="text-[12px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Available in 30 days
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#EE2B24]" />
            </div>
            <span className="text-[12px] font-medium text-[#888]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              All time
            </span>
          </div>
          <p className="text-[32px] font-extrabold text-[#111] leading-none mb-1"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {formatNaira(totalAllTime)}
          </p>
          <p className="text-[12px] text-[#888]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Total earned
          </p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-5">
        <h2 className="text-[14px] font-bold text-[#111] mb-5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Earnings over 6 months
        </h2>
        {chartLoading ? (
          <div className="h-[140px] flex items-center justify-center">
            <div className="text-[#888] text-[13px]">Loading chart...</div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-[140px] flex items-center justify-center">
            <div className="text-[#888] text-[13px]">No earnings data yet</div>
          </div>
        ) : (
          <div className="flex items-end gap-3 h-[140px]">
            {chartData.map((data, i) => {
              const earningsInNaira = data.earnings / 100
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {formatNairaCompact(earningsInNaira)}
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-[#EE2B24] transition-all duration-500"
                    style={{ 
                      height: `${MAX > 0 ? (earningsInNaira / MAX) * 100 : 0}px`, 
                      opacity: i === chartData.length - 1 ? 1 : 0.4 + (i * 0.1) 
                    }}
                  />
                  <span className="text-[11px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {data.month.split(' ')[0]}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Payout Method */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
        <h2 className="text-[15px] font-bold text-[#111] mb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Payout method
        </h2>
        <p className="text-[13px] text-[#666] mb-4"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Choose how you want to receive your earnings when you withdraw
        </p>
        <div className="flex flex-col gap-3 mb-4">
          <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#999]"
            style={{ borderColor: payoutMethod === 'bank' ? '#EE2B24' : '#D0D0D0' }}>
            <input 
              type="radio" 
              name="payout" 
              value="bank" 
              checked={payoutMethod === 'bank'}
              onChange={(e) => setPayoutMethod(e.target.value as 'bank')}
              className="w-4 h-4 text-[#EE2B24]" 
            />
            <div className="flex-1">
              <p className="text-[13.5px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Bank transfer
              </p>
              <p className="text-[12px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Direct deposit to your bank account (1-3 business days)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#999]"
            style={{ borderColor: payoutMethod === 'paypal' ? '#EE2B24' : '#D0D0D0' }}>
            <input 
              type="radio" 
              name="payout" 
              value="paypal" 
              checked={payoutMethod === 'paypal'}
              onChange={(e) => setPayoutMethod(e.target.value as 'paypal')}
              className="w-4 h-4 text-[#EE2B24]" 
            />
            <div className="flex-1">
              <p className="text-[13.5px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                PayPal
              </p>
              <p className="text-[12px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Receive payments via PayPal (instant transfer)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#999]"
            style={{ borderColor: payoutMethod === 'mobile_money' ? '#EE2B24' : '#D0D0D0' }}>
            <input 
              type="radio" 
              name="payout" 
              value="mobile_money" 
              checked={payoutMethod === 'mobile_money'}
              onChange={(e) => setPayoutMethod(e.target.value as 'mobile_money')}
              className="w-4 h-4 text-[#EE2B24]" 
            />
            <div className="flex-1">
              <p className="text-[13.5px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Mobile money
              </p>
              <p className="text-[12px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                M-Pesa, MTN Mobile Money, Airtel Money (instant transfer)
              </p>
            </div>
          </label>
        </div>
        <button 
          onClick={handlePayoutSave}
          disabled={isSavingPayout}
          className="px-6 py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          {isSavingPayout ? 'Saving...' : 'Save payout method'}
        </button>
      </div>

      {/* Withdrawal history */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[14px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Withdrawal history
          </h2>
        </div>
        {withdrawalsLoading ? (
          <div className="px-5 py-8 text-center">
            <div className="text-[#888] text-[13px]">Loading withdrawals...</div>
          </div>
        ) : !withdrawalsData || withdrawalsData.data.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <div className="text-[#888] text-[13px]">No withdrawals yet</div>
          </div>
        ) : (
          <div className="divide-y divide-[#F8F8F8]">
            {withdrawalsData.data.map((withdrawal) => {
              const amountInNaira = withdrawal.amount / 100
              return (
                <button
                  key={withdrawal.id}
                  onClick={() => setSelectedWithdrawal(withdrawal)}
                  className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#F8F8F8] transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[13px] font-semibold text-[#111]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {formatNaira(amountInNaira)}
                      </p>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded-full ${
                        withdrawal.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                        withdrawal.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700' :
                        withdrawal.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {withdrawal.status.toLowerCase()}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#888]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {withdrawal.payoutMethod.type === 'bank' ? 'Bank transfer' : 
                       withdrawal.payoutMethod.type === 'paypal' ? 'PayPal' : 'Mobile Money'} · 
                      Requested {new Date(withdrawal.requestedAt).toLocaleDateString()}
                    </p>
                    {withdrawal.status === 'COMPLETED' && withdrawal.processedAt && (
                      <p className="text-[10.5px] text-green-600 mt-0.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Processed {new Date(withdrawal.processedAt).toLocaleDateString()}
                      </p>
                    )}
                    {withdrawal.status === 'FAILED' && withdrawal.failureReason && (
                      <p className="text-[10.5px] text-red-600 mt-0.5"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {withdrawal.failureReason}
                      </p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[14px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Recent transactions
          </h2>
        </div>
        {transactionsLoading ? (
          <div className="px-5 py-8 text-center">
            <div className="text-[#888] text-[13px]">Loading transactions...</div>
          </div>
        ) : !transactionsData || transactionsData.data.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <div className="text-[#888] text-[13px]">No transactions yet</div>
          </div>
        ) : (
          <div className="divide-y divide-[#F8F8F8]">
            {transactionsData.data.map((tx) => {
              const amountInNaira = tx.amount / 100
              const earnedDate = new Date(tx.earnedAt)
              const availableDate = new Date(tx.availableAt)
              const paidDate = tx.paidAt ? new Date(tx.paidAt) : null

              return (
                <button
                  key={tx.id}
                  onClick={() => setSelectedTransaction({
                    id: tx.assetId,
                    title: tx.asset.title,
                    src: tx.asset.thumbnailUrl,
                    alt: tx.asset.title,
                    uploadedAt: tx.earnedAt,
                    downloads: 1,
                    earnings: tx.amount / 100,
                    views: 0,
                    likes: 0,
                    status: tx.asset.status.toLowerCase() as any
                  })}
                  className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#F8F8F8] transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                    {tx.asset.thumbnailUrl ? (
                      <img src={tx.asset.thumbnailUrl} alt={tx.asset.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#E8E8E8]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#111] truncate"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {tx.asset.title}
                    </p>
                    <p className="text-[11.5px] text-[#888]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Download · {earnedDate.toLocaleDateString()}
                    </p>
                    <p className="text-[10.5px] text-[#666] mt-0.5"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {tx.status === 'PENDING' ? `Available ${availableDate.toLocaleDateString()}` : 
                       tx.status === 'PAID' && paidDate ? `Paid ${paidDate.toLocaleDateString()}` : 
                       'Available now'}
                    </p>
                  </div>
                  <span className="text-[14px] font-bold text-green-600 shrink-0"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    +{formatNaira(amountInNaira)}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {showWithdrawModal && (
        <WithdrawEarningsModal
          availableBalance={availableBalance}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}

      {selectedTransaction && (
        <AssetStatsModal
          asset={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {selectedWithdrawal && (
        <WithdrawalDetailsModal
          withdrawal={{
            id: selectedWithdrawal.id,
            amount: selectedWithdrawal.amount / 100, // Convert to naira for modal
            method: selectedWithdrawal.payoutMethod.type,
            status: selectedWithdrawal.status.toLowerCase() as 'pending' | 'processing' | 'completed' | 'failed',
            requestedAt: new Date(selectedWithdrawal.requestedAt).toLocaleDateString(),
            processedAt: selectedWithdrawal.processedAt ? new Date(selectedWithdrawal.processedAt).toLocaleDateString() : undefined,
            failureReason: selectedWithdrawal.failureReason
          }}
          onClose={() => setSelectedWithdrawal(null)}
          onRetry={() => {
            // No retry endpoint exists; reopen the WithdrawModal so the user can resubmit.
            setSelectedWithdrawal(null)
            setShowWithdrawModal(true)
          }}
        />
      )}
    </div>
  )
}
