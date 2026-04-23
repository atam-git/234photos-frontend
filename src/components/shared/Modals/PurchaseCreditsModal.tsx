'use client'

import { X, CreditCard, Tag } from 'lucide-react'
import { useState } from 'react'
import type { CreditPackage, PaymentMethod } from '@/types'

interface PurchaseCreditsModalProps {
  package: CreditPackage
  paymentMethods: PaymentMethod[]
  onClose: () => void
  onConfirm: (paymentMethodId: string, promoCode?: string) => void
}

export function PurchaseCreditsModal({ package: pkg, paymentMethods, onClose, onConfirm }: PurchaseCreditsModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods.find(pm => pm.isDefault)?.id || paymentMethods[0]?.id)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const handleApplyPromo = () => {
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true)
    }
  }

  const discount = promoApplied ? pkg.price * 0.1 : 0
  const total = pkg.price - discount

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

          {/* Payment Method Selection */}
          <div>
            <label className="block text-[13px] font-semibold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Payment Method
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-[#EE2B24] bg-[#FFF5F5]'
                      : 'border-[#F0F0F0] bg-white hover:border-[#E0E0E0]'
                  }`}>
                  <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-[#666]" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[13px] font-semibold text-[#111]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      {method.brand} •••• {method.last4}
                    </p>
                    <p className="text-[11px] text-[#888]"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      Expires {method.expiry}
                    </p>
                  </div>
                  {method.isDefault && (
                    <span className="px-2 py-0.5 bg-[#F0F0F0] text-[#666] text-[10px] font-bold rounded-full"
                      style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                      DEFAULT
                    </span>
                  )}
                </button>
              ))}
            </div>
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
                ${pkg.price}
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
                  -${discount.toFixed(2)}
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
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#D0D0D0] text-[#111] text-[13.5px] font-semibold rounded-xl hover:bg-[#F5F5F5] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selectedPaymentMethod, promoApplied ? promoCode : undefined)}
              className="flex-1 px-4 py-3 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
