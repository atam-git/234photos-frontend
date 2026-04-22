import { DollarSign, TrendingUp, Download, ArrowUpRight } from 'lucide-react'
import { MOCK_ASSETS } from '@/lib/mock/searchAssets'

const MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
const EARNINGS_DATA = [320, 480, 390, 620, 890, 1240]
const MAX = Math.max(...EARNINGS_DATA)

const TRANSACTIONS = MOCK_ASSETS.slice(0, 8).map((asset, i) => ({
  id: asset.id,
  asset: asset.alt,
  src: asset.src,
  type: i % 3 === 0 ? 'Enhanced' : 'Standard',
  amount: `$${(Math.random() * 15 + 2).toFixed(2)}`,
  date: ['Apr 18', 'Apr 17', 'Apr 15', 'Apr 14', 'Apr 12', 'Apr 10', 'Apr 8', 'Apr 5'][i],
  buyer: 'Anonymous buyer',
}))

export default function EarningsPage() {
  const total = EARNINGS_DATA.reduce((a, b) => a + b, 0)

  return (
    <div className="max-w-[900px] mx-auto flex flex-col gap-6">
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
        <button className="px-5 py-2.5 bg-[#111] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#333] transition-colors"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Withdraw earnings
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'This month', value: '$1,240', change: '+18%', icon: DollarSign },
          { label: 'Total earned', value: `$${total.toLocaleString()}`, change: 'All time', icon: TrendingUp },
          { label: 'Total downloads', value: '2,847', change: '+12% this month', icon: Download },
        ].map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-[#F0F0F0] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#EE2B24]" />
                </div>
                <span className="flex items-center gap-0.5 text-[12px] font-semibold text-green-600"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  <ArrowUpRight className="w-3.5 h-3.5" />{card.change}
                </span>
              </div>
              <p className="text-[26px] font-extrabold text-[#111] leading-none mb-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {card.value}
              </p>
              <p className="text-[12px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {card.label}
              </p>
            </div>
          )
        })}
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] p-5">
        <h2 className="text-[14px] font-bold text-[#111] mb-5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Earnings over 6 months
        </h2>
        <div className="flex items-end gap-3 h-[140px]">
          {EARNINGS_DATA.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-semibold text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                ${val}
              </span>
              <div
                className="w-full rounded-t-lg bg-[#EE2B24] transition-all duration-500"
                style={{ height: `${(val / MAX) * 100}px`, opacity: i === EARNINGS_DATA.length - 1 ? 1 : 0.4 + (i * 0.1) }}
              />
              <span className="text-[11px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {MONTHS[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#F0F0F0]">
          <h2 className="text-[14px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Recent transactions
          </h2>
        </div>
        <div className="divide-y divide-[#F8F8F8]">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#E8E8E8] shrink-0">
                <img src={tx.src} alt={tx.asset} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#111] truncate"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {tx.asset}
                </p>
                <p className="text-[11.5px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {tx.type} licence · {tx.date}
                </p>
              </div>
              <span className="text-[14px] font-bold text-green-600 shrink-0"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                +{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
