'use client'

import { useState } from 'react'
import { X, CreditCard, Building2, AlertCircle } from 'lucide-react'
import { ModalBackdrop } from './ModalBackdrop'
import { useRequestWithdrawal, usePayoutMethods } from '@/hooks/useEarnings'
import { useToast } from '@/components/ui/toast-provider'

interface WithdrawEarningsModalProps {
  availableBalance: number // in naira
  onClose: () => void
}

export function WithdrawEarningsModal({ availableBalance, onClose }: WithdrawEarningsModalProps) {
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'paypal' | 'mobile_money'>('bank')
  
  const { data: payoutMethods = [] } = usePayoutMethods()
  const { mutate: requestWithdrawal, isPending } = useRequestWithdrawal()
  const { showToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const withdrawAmount = parseFloat(amount)
    
    if (withdrawAmount < 80000) {
      showToast('error', 'Minimum withdrawal amount is ₦80,000')
      return
    }
    
    if (withdrawAmount > availableBalance) {
      showToast('error', 'Insufficient balance')
      return
    }

    // Find or create payout method
    let payoutMethodId = payoutMethods.find(m => m.type === paymentMethod)?.id
    
    // If no payout method exists, use a temporary ID (backend will handle)
    if (!payoutMethodId) {
      payoutMethodId = 'temp-' + paymentMethod
    }

    // Convert naira to kobo for API
    const amountInKobo = Math.round(withdrawAmount * 100)

    requestWithdrawal(
      { amount: amountInKobo, payoutMethodId },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
  }

  const setMaxAmount = () => {
    setAmount(availableBalance.toString())
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2
            className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
          >
            Withdraw Earnings
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F5] hover:bg-[#EBEBEB] flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Available Balance */}
          <div className="bg-gradient-to-br from-[#EE2B24] to-[#d42520] rounded-2xl p-5 text-white">
            <p
              className="text-[12px] text-white/80 mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Available Balance
            </p>
            <p
              className="text-[32px] font-extrabold"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              ₦{availableBalance.toLocaleString()}
            </p>
          </div>

          {/* Amount */}
          <div>
            <label
              className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-1.5"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Withdrawal Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] text-[14px] font-semibold">
                ₦
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                min="80000"
                max={availableBalance}
                step="0.01"
                disabled={isPending}
                className="w-full h-[42px] pl-8 pr-20 border border-[#D0D0D0] rounded-xl text-[13.5px] text-[#111] placeholder:text-[#999] outline-none focus:border-[#EE2B24] focus:ring-2 focus:ring-[#FFE5E5] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
              <button
                type="button"
                onClick={setMaxAmount}
                disabled={isPending}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#F5F5F5] text-[#111] text-[11px] font-bold rounded-lg hover:bg-[#EBEBEB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              >
                MAX
              </button>
            </div>
            <p
              className="text-[11px] text-[#888] mt-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Minimum withdrawal: ₦80,000
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <label
              className="block text-[12px] font-bold text-[#444] uppercase tracking-[0.5px] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Payment Method
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                disabled={isPending}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  paymentMethod === 'bank'
                    ? 'border-[#EE2B24] bg-[#FFF5F5]'
                    : 'border-[#E0E0E0] bg-white hover:border-[#D0D0D0]'
                }`}
              >
                <Building2 className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-[#EE2B24]' : 'text-[#888]'}`} />
                <div className="flex-1 text-left">
                  <p
                    className={`text-[13px] font-semibold ${paymentMethod === 'bank' ? 'text-[#EE2B24]' : 'text-[#111]'}`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    Bank Transfer
                  </p>
                  <p
                    className="text-[11px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    3-5 business days · No fees
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                disabled={isPending}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  paymentMethod === 'paypal'
                    ? 'border-[#EE2B24] bg-[#FFF5F5]'
                    : 'border-[#E0E0E0] bg-white hover:border-[#D0D0D0]'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${paymentMethod === 'paypal' ? 'text-[#EE2B24]' : 'text-[#888]'}`} />
                <div className="flex-1 text-left">
                  <p
                    className={`text-[13px] font-semibold ${paymentMethod === 'paypal' ? 'text-[#EE2B24]' : 'text-[#111]'}`}
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    PayPal
                  </p>
                  <p
                    className="text-[11px] text-[#888]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                  >
                    1-2 business days · 2% fee
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p
              className="text-[12px] text-blue-900 leading-relaxed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Withdrawals are processed on the 1st and 15th of each month. You'll receive an email confirmation once your payment is sent.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 py-3 bg-[#F5F5F5] text-[#111] text-[14px] font-semibold rounded-full hover:bg-[#EBEBEB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-3 bg-[#EE2B24] text-white text-[14px] font-semibold rounded-full hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            >
              {isPending ? 'Processing...' : 'Request Withdrawal'}
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  )
}
