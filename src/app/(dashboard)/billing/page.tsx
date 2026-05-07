'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CreditCard, Download, Package, Plus, Calendar } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { TransactionDetailsModal } from '@/components/shared/Modals/TransactionDetailsModal'
import { PurchaseCreditsModal } from '@/components/shared/Modals/PurchaseCreditsModal'
import type { BillingTab, BillingModalType } from '@/types'
import { useCreditPackages, useTransactions, useCreditsBalance, useVerifyPayment } from '@/hooks/usePayments'
import { useToast } from '@/components/ui/toast-provider'
import type { CreditPackage, Transaction } from '@/lib/api/payments'

export default function BillingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<BillingTab>('credits')
  const user = useAuthStore((state) => state.user)
  const tabsRef = useRef<HTMLDivElement>(null)
  const [modal, setModal] = useState<BillingModalType>('none')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null)

  // API hooks
  const { data: packagesData, isLoading: packagesLoading } = useCreditPackages()
  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions(1, 50)
  const { data: creditsData, isLoading: creditsLoading } = useCreditsBalance()
  const { mutate: verifyPayment, isPending: isVerifying } = useVerifyPayment()
  const { showToast } = useToast()

  // Extract data from API responses
  const packages = packagesData || []
  const transactions = transactionsData?.data || []
  const credits = creditsData?.credits ?? user?.credits ?? 0

  // Handle payment verification after redirect from Flutterwave
  useEffect(() => {
    const status = searchParams.get('status')
    const txRef = searchParams.get('tx_ref')
    const transactionId = searchParams.get('transaction_id')

    if (status === 'successful' && txRef) {
      verifyPayment(txRef, {
        onSuccess: (data) => {
          showToast('success', `Payment successful! ${data.credits} credits added to your account.`)
          // Switch to transaction history tab and clear URL params
          setTab('history')
          router.replace('/billing')
        },
        onError: (error: any) => {
          showToast('error', error.response?.data?.message || 'Payment verification failed. Please contact support.')
          router.replace('/billing')
        }
      })
    } else if (status === 'cancelled') {
      showToast('info', 'Payment was cancelled.')
      router.replace('/billing')
    }
  }, [searchParams, verifyPayment, showToast, router])

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

  // Show verification loading state
  if (isVerifying) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FFE5E5] border-t-[#EE2B24] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666]">Verifying payment...</p>
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
              {creditsLoading ? (
                <span className="inline-block w-20 h-10 bg-white/20 rounded animate-pulse" />
              ) : (
                credits
              )}
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
            {packagesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl border-2 border-[#F0F0F0] p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="w-10 h-10 bg-gray-200 rounded mx-auto" />
                      <div className="h-8 bg-gray-200 rounded w-20 mx-auto" />
                      <div className="h-6 bg-gray-200 rounded w-32 mx-auto" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-[#888]">No packages available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
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
                        ₦{(pkg.price / 100).toLocaleString('en-NG')}
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
            )}
          </div>
        </div>
      )}

      {/* Transaction History Tab */}
      {tab === 'history' && (
        <div>
          {transactionsLoading ? (
            <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
              <div className="divide-y divide-[#F8F8F8]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="px-5 py-4 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#F0F0F0] p-12 text-center">
              <div className="mb-4 text-4xl">📋</div>
              <p className="text-[15px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                No transactions yet
              </p>
              <p className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Your transaction history will appear here
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden">
              <div className="divide-y divide-[#F8F8F8]">
                {transactions.map((txn) => (
                  <button
                    key={txn.id}
                    onClick={() => {
                      setSelectedTransaction(txn)
                      setModal('transaction')
                    }}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F8F8F8] transition-colors text-left">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        txn.type === 'CREDIT_PURCHASE' ? 'bg-green-50' : 
                        txn.type === 'REFUND' ? 'bg-yellow-50' : 
                        'bg-blue-50'
                      }`}>
                        {txn.type === 'CREDIT_PURCHASE' ? (
                          <Plus className="w-5 h-5 text-green-600" />
                        ) : txn.type === 'REFUND' ? (
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
                          </p>
                          <span className={`shrink-0 text-[10px] font-bold uppercase tracking-[0.5px] px-2 py-0.5 rounded-full ${
                            txn.status === 'COMPLETED' ? 'bg-green-50 text-green-700' :
                            txn.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                            txn.status === 'FAILED' ? 'bg-red-50 text-red-700' :
                            'bg-blue-50 text-blue-700'
                          }`}
                            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                            {txn.status}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#888]"
                          style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                          {new Date(txn.createdAt).toLocaleDateString('en-NG', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {txn.type === 'CREDIT_PURCHASE' && txn.credits && ` · ${txn.credits} credits`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className={`text-[14px] font-bold ${
                        txn.type === 'CREDIT_PURCHASE' ? 'text-red-600' : 
                        txn.type === 'REFUND' ? 'text-green-600' :
                        'text-[#111]'
                      }`}
                        style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                        {txn.type === 'CREDIT_PURCHASE' ? `-₦${(txn.amount / 100).toLocaleString('en-NG')}` : 
                         txn.type === 'REFUND' ? `+₦${(txn.amount / 100).toLocaleString('en-NG')}` : 
                         `${txn.credits || 0} credit${txn.credits !== 1 ? 's' : ''}`}
                      </p>
                      {txn.credits && txn.type === 'CREDIT_PURCHASE' && (
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
          )}
        </div>
      )}

      {/* Subscription Tab — Coming Soon */}
      {tab === 'subscription' && (
        <div className="bg-white rounded-2xl border border-[#F0F0F0] p-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#FFF5F5] flex items-center justify-center mb-5">
            <Calendar className="w-8 h-8 text-[#EE2B24]" />
          </div>
          <span className="inline-block px-3 py-1 bg-[#FFF5F5] text-[#EE2B24] text-[11px] font-bold rounded-full mb-3 uppercase tracking-[0.5px]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Coming Soon
          </span>
          <h2 className="text-[20px] font-extrabold text-[#111] mb-2"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Monthly subscriptions are on the way
          </h2>
          <p className="text-[14px] text-[#666] max-w-md mx-auto mb-6"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            We&apos;re building Pro and Enterprise plans with monthly credit allowances,
            rollover, priority support, and team features. For now, top up with credit
            packages — credits never expire.
          </p>
          <button
            onClick={() => setTab('credits')}
            className="px-6 py-2.5 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-full hover:bg-[#d42520] transition-colors"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Buy Credits Instead
          </button>
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
          onClose={() => {
            setModal('none')
            setSelectedPackage(null)
          }}
          onConfirm={() => {
            // PurchaseCreditsModal handles initialize-payment + redirect itself.
            setModal('none')
            setSelectedPackage(null)
          }}
        />
      )}
    </div>
  )
}
