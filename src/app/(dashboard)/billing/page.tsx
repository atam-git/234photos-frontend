'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Download, Package, Plus, Check, Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import type { CreditPackage, Transaction, PaymentMethod } from '@/types'
import { CREDIT_PACKAGES, BILLING_TRANSACTIONS, MOCK_PAYMENT_METHODS } from '@/lib/mock'
import { TransactionDetailsModal } from '@/components/shared/Modals/TransactionDetailsModal'
import { PurchaseCreditsModal } from '@/components/shared/Modals/PurchaseCreditsModal'
import { AddPaymentMethodModal } from '@/components/shared/Modals/AddPaymentMethodModal'
import { UpgradeSubscriptionModal } from '@/components/shared/Modals/UpgradeSubscriptionModal'
import type { BillingTab, BillingModalType } from '@/types'

export default function BillingPage() {
  const router = useRouter()
  const [tab, setTab] = useState<BillingTab>('credits')
  const user = useAuthStore((state) => state.user)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [modal, setModal] = useState<BillingModalType>('none')
  const [selectedTransaction, setSelectedTransaction] = useState<Partial<Transaction> | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

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
            onClick={() => {
              setTab('credits')
              tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="px-5 py-2.5 bg-white text-[#EE2B24] text-[13.5px] font-semibold rounded-full hover:bg-white/90 transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Buy more
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div ref={tabsRef} className="flex gap-2 border-b border-[#F0F0F0]">
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
                      onClick={() => {
                        setSelectedPackage(pkg)
                        setModal('purchase')
                      }}
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
              <button
                onClick={() => setModal('addCard')}
                className="flex items-center gap-2 px-4 py-2 border border-[#D0D0D0] text-[#111] text-[13px] font-medium rounded-full hover:bg-[#F5F5F7] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <Plus className="w-4 h-4" />
                Add card
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_PAYMENT_METHODS.map((method) => (
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
                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <span className="px-3 py-1 bg-[#F0F0F0] text-[#666] text-[11px] font-bold rounded-full"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        DEFAULT
                      </span>
                    )}
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === method.id ? null : method.id)}
                        className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
                        <MoreVertical className="w-4 h-4 text-[#666]" />
                      </button>
                      {openMenuId === method.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl border border-[#F0F0F0] shadow-lg py-1 z-20">
                            {!method.isDefault && (
                              <button
                                onClick={() => {
                                  // Handle set as default
                                  console.log('Set as default:', method.id)
                                  setOpenMenuId(null)
                                }}
                                className="w-full px-4 py-2 text-left text-[13px] text-[#111] hover:bg-[#F8F8F8] transition-colors flex items-center gap-2"
                                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                                <Check className="w-4 h-4" />
                                Set as default
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedPaymentMethod(method)
                                setModal('addCard')
                                setOpenMenuId(null)
                              }}
                              className="w-full px-4 py-2 text-left text-[13px] text-[#111] hover:bg-[#F8F8F8] transition-colors flex items-center gap-2"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                // Handle remove
                                if (confirm(`Remove ${method.brand} •••• ${method.last4}?`)) {
                                  console.log('Remove card:', method.id)
                                }
                                setOpenMenuId(null)
                              }}
                              className="w-full px-4 py-2 text-left text-[13px] text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
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
              {BILLING_TRANSACTIONS.map((txn) => (
                <button
                  key={txn.id}
                  onClick={() => {
                    setSelectedTransaction(txn)
                    setModal('transaction')
                  }}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F8F8F8] transition-colors text-left">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      txn.type === 'credit_purchase' ? 'bg-green-50' : 
                      txn.type === 'refund' ? 'bg-yellow-50' : 
                      'bg-blue-50'
                    }`}>
                      {txn.type === 'credit_purchase' ? (
                        <Plus className="w-5 h-5 text-green-600" />
                      ) : txn.type === 'refund' ? (
                        <CreditCard className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <Download className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[13.5px] font-semibold text-[#111] truncate"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {txn.description}
                          {txn.asset && ` - ${txn.asset}`}
                        </p>
                        <span className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded-full ${
                          txn.status === 'completed' ? 'bg-green-50 text-green-700' :
                          txn.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                          txn.status === 'failed' ? 'bg-red-50 text-red-700' :
                          'bg-blue-50 text-blue-700'
                        }`}
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {txn.status}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {txn.date}
                        {txn.type === 'credit_purchase' && txn.credits && ` · ${txn.credits} credits`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className={`text-[14px] font-bold ${
                      txn.type === 'credit_purchase' ? 'text-red-600' : 
                      txn.type === 'refund' ? 'text-green-600' :
                      'text-[#111]'
                    }`}
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {txn.type === 'credit_purchase' ? `-$${txn.amount}` : txn.type === 'refund' ? `+$${txn.amount}` : `${txn.amount} credit`}
                    </p>
                    {txn.credits && (
                      <p className="text-[11px] text-[#888]"
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        +{txn.credits} credits
                      </p>
                    )}
                  </div>
                </button>
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
                  You&apos;re currently on the Pay-as-you-go plan
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
                <button
                  onClick={() => setModal('upgrade')}
                  className="w-full py-2.5 bg-[#F5F5F5] text-[#111] text-[13.5px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors"
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
                <button
                  onClick={() => router.push('/contact')}
                  className="w-full py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {modal === 'transaction' && selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={() => {
            setModal('none')
            setSelectedTransaction(null)
          }}
          onRetry={() => {
            // Handle retry logic
            setModal('none')
            setSelectedTransaction(null)
          }}
        />
      )}

      {modal === 'purchase' && selectedPackage && (
        <PurchaseCreditsModal
          package={selectedPackage}
          paymentMethods={MOCK_PAYMENT_METHODS}
          onClose={() => {
            setModal('none')
            setSelectedPackage(null)
          }}
          onConfirm={(paymentMethodId, promoCode) => {
            // Handle purchase logic
            console.log('Purchase confirmed:', { paymentMethodId, promoCode, package: selectedPackage })
            setModal('none')
            setSelectedPackage(null)
          }}
        />
      )}

      {modal === 'addCard' && (
        <AddPaymentMethodModal
          onClose={() => {
            setModal('none')
            setSelectedPaymentMethod(null)
          }}
          onConfirm={(data) => {
            // Handle add/edit card logic
            console.log(selectedPaymentMethod ? 'Card updated:' : 'Card added:', data)
            setModal('none')
            setSelectedPaymentMethod(null)
          }}
          editingMethod={selectedPaymentMethod}
        />
      )}

      {modal === 'upgrade' && (
        <UpgradeSubscriptionModal
          planName="Pro"
          planPrice={49}
          planCredits={50}
          planFeatures={[
            '50 credits monthly',
            'Unused credits roll over',
            'Priority support',
            'Early access to new features'
          ]}
          paymentMethods={MOCK_PAYMENT_METHODS}
          onClose={() => setModal('none')}
          onConfirm={(paymentMethodId, billingCycle) => {
            // Handle upgrade logic
            console.log('Upgrade confirmed:', { paymentMethodId, billingCycle })
            setModal('none')
          }}
        />
      )}
    </div>
  )
}
