'use client'

import { useState } from 'react'
import { CreditCard, Download, Receipt, Package, Plus, Check, Calendar } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import Link from 'next/link'

type Tab = 'credits' | 'history' | 'subscription'

const CREDIT_PACKAGES = [
  { credits: 10, price: 29, popular: false },
  { credits: 50, price: 99, popular: true, save: '32%' },
  { credits: 100, price: 149, popular: false, save: '49%' },
]

const TRANSACTIONS = [
  { id: 'txn_001', date: 'Apr 18, 2026', type: 'Credit Purchase', amount: '$99.00', credits: 50, status: 'completed' },
  { id: 'txn_002', date: 'Apr 15, 2026', type: 'Download', amount: '-1 credit', asset: 'Lagos Skyline', status: 'completed' },
  { id: 'txn_003', date: 'Apr 10, 2026', type: 'Download', amount: '-1 credit', asset: 'Accra Market', status: 'completed' },
  { id: 'txn_004', date: 'Mar 28, 2026', type: 'Credit Purchase', amount: '$29.00', credits: 10, status: 'completed' },
  { id: 'txn_005', date: 'Mar 20, 2026', type: 'Download', amount: '-1 credit', asset: 'Nairobi Office', status: 'completed' },
]

const PAYMENT_METHODS = [
  { id: 'pm_001', type: 'card', last4: '4242', brand: 'Visa', expiry: '12/26', isDefault: true },
  { id: 'pm_002', type: 'card', last4: '5555', brand: 'Mastercard', expiry: '08/27', isDefault: false },
]

export default function BillingPage() {
  const [tab, setTab] = useState<Tab>('credits')
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p className="text-[#666]">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-extrabold text-[#111]"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Billing & Credits
        </h1>
        <p className="text-[13px] text-[#888] mt-0.5"
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Manage your credits, subscriptions, and payment methods
        </p>
      </div>

      {/* Current Balance Card */}
      <div className="bg-gradient-to-br from-[#EE2B24] to-[#d42520] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-white/80 mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Available Credits
            </p>
            <p className="text-[36px] font-extrabold"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {user.credits}
            </p>
            <p className="text-[12px] text-white/70 mt-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              1 credit = 1 Standard download
            </p>
          </div>
          <button
            onClick={() => setTab('credits')}
            className="px-5 py-2.5 bg-white text-[#EE2B24] text-[13.5px] font-semibold rounded-full hover:bg-white/90 transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Buy more
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#F0F0F0]">
        <button
          onClick={() => setTab('credits')}
          className={`px-4 py-3 text-[14px] font-semibold transition-colors relative ${
            tab === 'credits'
              ? 'text-[#EE2B24]'
              : 'text-[#666] hover:text-[#111]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Buy Credits
          {tab === 'credits' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE2B24]" />
          )}
        </button>
        <button
          onClick={() => setTab('history')}
          className={`px-4 py-3 text-[14px] font-semibold transition-colors relative ${
            tab === 'history'
              ? 'text-[#EE2B24]'
              : 'text-[#666] hover:text-[#111]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Transaction History
          {tab === 'history' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE2B24]" />
          )}
        </button>
        <button
          onClick={() => setTab('subscription')}
          className={`px-4 py-3 text-[14px] font-semibold transition-colors relative ${
            tab === 'subscription'
              ? 'text-[#EE2B24]'
              : 'text-[#666] hover:text-[#111]'
          }`}
          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
          Subscription
          {tab === 'subscription' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EE2B24]" />
          )}
        </button>
      </div>

      {/* Buy Credits Tab */}
      {tab === 'credits' && (
        <div className="space-y-6">
          {/* Credit Packages */}
          <div>
            <h2 className="text-[16px] font-bold text-[#111] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Credit Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CREDIT_PACKAGES.map((pkg) => (
                <div
                  key={pkg.credits}
                  className={`relative bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg ${
                    pkg.popular
                      ? 'border-[#EE2B24] shadow-md'
                      : 'border-[#F0F0F0]'
                  }`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#EE2B24] text-white text-[11px] font-bold rounded-full"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div className="text-center">
                    <Package className={`w-10 h-10 mx-auto mb-3 ${pkg.popular ? 'text-[#EE2B24]' : 'text-[#888]'}`} />
                    <p className="text-[32px] font-extrabold text-[#111] mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {pkg.credits}
                    </p>
                    <p className="text-[13px] text-[#666] mb-3"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      credits
                    </p>
                    <p className="text-[24px] font-bold text-[#111] mb-1"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      ${pkg.price}
                    </p>
                    {pkg.save && (
                      <p className="text-[12px] font-semibold text-green-600 mb-4"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Save {pkg.save}
                      </p>
                    )}
                    <button
                      className={`w-full py-2.5 text-[13.5px] font-semibold rounded-full transition-colors ${
                        pkg.popular
                          ? 'bg-[#EE2B24] text-white hover:bg-[#d42520]'
                          : 'bg-[#F5F5F5] text-[#111] hover:bg-[#EBEBEB]'
                      }`}
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Payment Methods
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#D0D0D0] text-[#111] text-[13px] font-medium rounded-full hover:bg-[#F5F5F7] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Plus className="w-4 h-4" />
                Add card
              </button>
            </div>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <div key={method.id} className="bg-white rounded-xl border border-[#F0F0F0] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[#666]" />
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#111]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {method.brand} •••• {method.last4}
                      </p>
                      <p className="text-[12px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="px-3 py-1 bg-[#F0F0F0] text-[#666] text-[11px] font-bold rounded-full"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      DEFAULT
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Tab */}
      {tab === 'history' && (
        <div>
          <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
            <div className="divide-y divide-[#F8F8F8]">
              {TRANSACTIONS.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === 'Credit Purchase' ? 'bg-green-50' : 'bg-blue-50'
                    }`}>
                      {txn.type === 'Credit Purchase' ? (
                        <Plus className="w-5 h-5 text-green-600" />
                      ) : (
                        <Download className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#111]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {txn.type}
                        {txn.asset && ` - ${txn.asset}`}
                      </p>
                      <p className="text-[12px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {txn.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[14px] font-bold ${
                      txn.type === 'Credit Purchase' ? 'text-green-600' : 'text-[#111]'
                    }`}
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {txn.amount}
                    </p>
                    {txn.credits && (
                      <p className="text-[11px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        +{txn.credits} credits
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subscription Tab */}
      {tab === 'subscription' && (
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white rounded-2xl border border-[#F0F0F0] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[16px] font-bold text-[#111] mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Current Plan
                </h2>
                <p className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  You're currently on the Pay-as-you-go plan
                </p>
              </div>
              <span className="px-3 py-1 bg-[#F0F0F0] text-[#666] text-[11px] font-bold rounded-full"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                FREE
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[13px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Check className="w-4 h-4 text-green-600" />
                Purchase credits as needed
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Check className="w-4 h-4 text-green-600" />
                No monthly commitment
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#666]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Check className="w-4 h-4 text-green-600" />
                Credits never expire
              </div>
            </div>
          </div>

          {/* Subscription Plans */}
          <div>
            <h2 className="text-[16px] font-bold text-[#111] mb-4"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Subscription Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pro Plan */}
              <div className="bg-white rounded-2xl border-2 border-[#F0F0F0] p-6 hover:border-[#EE2B24] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Pro
                  </h3>
                  <Calendar className="w-5 h-5 text-[#888]" />
                </div>
                <p className="text-[32px] font-extrabold text-[#111] mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  $49<span className="text-[16px] text-[#888] font-normal">/month</span>
                </p>
                <p className="text-[13px] text-[#666] mb-4"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  50 downloads per month
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[13px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Check className="w-4 h-4 text-green-600" />
                    50 credits monthly
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Check className="w-4 h-4 text-green-600" />
                    Unused credits roll over
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Check className="w-4 h-4 text-green-600" />
                    Priority support
                  </div>
                </div>
                <button className="w-full py-2.5 bg-[#F5F5F5] text-[#111] text-[13.5px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Upgrade to Pro
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-2xl border-2 border-[#F0F0F0] p-6 hover:border-[#EE2B24] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-[#111]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Enterprise
                  </h3>
                  <Calendar className="w-5 h-5 text-[#888]" />
                </div>
                <p className="text-[32px] font-extrabold text-[#111] mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  $199<span className="text-[16px] text-[#888] font-normal">/month</span>
                </p>
                <p className="text-[13px] text-[#666] mb-4"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Unlimited downloads
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-[13px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Check className="w-4 h-4 text-green-600" />
                    Unlimited downloads
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Check className="w-4 h-4 text-green-600" />
                    Team collaboration
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    <Check className="w-4 h-4 text-green-600" />
                    Dedicated support
                  </div>
                </div>
                <button className="w-full py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
