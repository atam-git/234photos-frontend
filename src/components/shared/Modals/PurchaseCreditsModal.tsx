'use client'

import { X, Tag } from 'lucide-react'
import { useState } from 'react'
import type { CreditPackage } from '@/lib/api/payments'
import { useInitializePayment } from '@/hooks/usePayments'
import { useToast } from '@/components/ui/toast-provider'

interface PurchaseCreditsModalProps {
  package: CreditPackage
  onClose: () => void
  onConfirm: (paymentMethodId: string, promoCode?: string) => void
}

export function PurchaseCreditsModal({ package: pkg, onClose }: PurchaseCreditsModalProps) {
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  
  const { mutate: initializePayment, isPending } = useInitializePayment()
  const { showToast } = useToast()

  const handleApplyPromo = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true)
      showToast('success', 'Promo code applied! 10% discount')
    } else {
      showToast('error', 'Invalid promo code')
    }
  }

  const discount = promoApplied ? pkg.price * 0.1 : 0
  const total = pkg.price - discount

  const handleConfirmPurchase = () => {
    initializePayment(pkg.id, {
      onSuccess: (data) => {
        // Redirect to Flutterwave payment page
        window.location.href = data.paymentLink
      },
      onError: (error: any) => {
        showToast('error', error.response?.data?.message || 'Failed to initialize payment. Please try again.')
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Purchase Credits
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Package Summary */}
          <div className="bg-[#F8F8F8] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Package
              </span>
              <span className="text-[15px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {pkg.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Credits
              </span>
              <span className="text-[15px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {pkg.credits} credits
              </span>
            </div>
          </div>

          {/* Hosted-checkout notice */}
          <div className="rounded-xl border border-[#F0F0F0] bg-[#F8F8F8] p-3 text-[12px] text-[#666]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            You&apos;ll be redirected to Flutterwave&apos;s secure checkout to enter your card details.
          </div>

          {/* Promo Code */}
          <div>
            <label className="block text-[13px] font-semibold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Promo Code (Optional)
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  disabled={promoApplied}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E0E0E0] rounded-xl text-[13px] focus:outline-none focus:border-[#EE2B24] disabled:bg-[#F5F5F5] disabled:text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
                />
              </div>
              <button
                onClick={handleApplyPromo}
                disabled={!promoCode || promoApplied}
                className="px-4 py-2.5 bg-[#F5F5F5] text-[#111] text-[13px] font-semibold rounded-xl hover:bg-[#EBEBEB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {promoApplied && (
              <p className="text-[11px] text-green-600 mt-1"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                ✓ Promo code applied! 10% discount
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 pt-4 border-t border-[#F0F0F0]">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Subtotal
              </span>
              <span className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                ₦{(pkg.price / 100).toLocaleString('en-NG')}
              </span>
            </div>
            {promoApplied && (
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-green-600"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Discount (10%)
                </span>
                <span className="text-[13px] font-semibold text-green-600"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  -₦{(discount / 100).toLocaleString('en-NG')}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-[#F0F0F0]">
              <span className="text-[15px] font-bold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Total
              </span>
              <span className="text-[18px] font-extrabold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                ₦{(total / 100).toLocaleString('en-NG')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-4 py-3 border border-[#D0D0D0] text-[#111] text-[13.5px] font-semibold rounded-xl hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cancel
            </button>
            <button
              onClick={handleConfirmPurchase}
              disabled={isPending}
              className="flex-1 px-4 py-3 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Purchase'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
