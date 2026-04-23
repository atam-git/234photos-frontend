'use client'

import { X, CreditCard, Check, Calendar } from 'lucide-react'
import { useState } from 'react'
import type { PaymentMethod } from '@/types'

interface UpgradeSubscriptionModalProps {
  planName: string
  planPrice: number
  planCredits: number
  planFeatures: string[]
  paymentMethods: PaymentMethod[]
  onClose: () => void
  onConfirm: (paymentMethodId: string, billingCycle: 'monthly' | 'annual') => void
}

export function UpgradeSubscriptionModal({
  planName,
  planPrice,
  planCredits,
  planFeatures,
  paymentMethods,
  onClose,
  onConfirm
}: UpgradeSubscriptionModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods.find(pm => pm.isDefault)?.id || paymentMethods[0]?.id)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const annualPrice = planPrice * 12 * 0.8 // 20% discount for annual
  const displayPrice = billingCycle === 'monthly' ? planPrice : annualPrice
  const savings = billingCycle === 'annual' ? planPrice * 12 - annualPrice : 0

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Upgrade to {planName}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Plan Summary */}
          <div className="bg-gradient-to-br from-[#EE2B24] to-[#d42520] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5" />
              <h3 className="text-[18px] font-bold"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {planName} Plan
              </h3>
            </div>
            <p className="text-[32px] font-extrabold mb-1"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              ${billingCycle === 'monthly' ? planPrice : (annualPrice / 12).toFixed(0)}
              <span className="text-[16px] font-normal opacity-80">/month</span>
            </p>
            <p className="text-[13px] opacity-80"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {planCredits} credits per month
            </p>
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-[13px] font-semibold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Billing Cycle
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  billingCycle === 'monthly'
                    ? 'border-[#EE2B24] bg-[#FFF5F5]'
                    : 'border-[#F0F0F0] bg-white hover:border-[#E0E0E0]'
                }`}>
                <p className="text-[15px] font-bold text-[#111] mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Monthly
                </p>
                <p className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  ${planPrice}/month
                </p>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  billingCycle === 'annual'
                    ? 'border-[#EE2B24] bg-[#FFF5F5]'
                    : 'border-[#F0F0F0] bg-white hover:border-[#E0E0E0]'
                }`}>
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  SAVE 20%
                </div>
                <p className="text-[15px] font-bold text-[#111] mb-1"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Annual
                </p>
                <p className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  ${(annualPrice / 12).toFixed(0)}/month
                </p>
              </button>
            </div>
            {billingCycle === 'annual' && (
              <p className="text-[11px] text-green-600 mt-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                ✓ Save ${savings.toFixed(0)} per year with annual billing
              </p>
            )}
          </div>

          {/* Features */}
          <div>
            <h3 className="text-[13px] font-semibold text-[#111] mb-3"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              What's Included
            </h3>
            <div className="space-y-2">
              {planFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-[13px] text-[#666]"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    {feature}
                  </span>
                </div>
              ))}
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
                  type="button"
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

          {/* Total */}
          <div className="bg-[#F8F8F8] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {billingCycle === 'monthly' ? 'Monthly charge' : 'Annual charge (billed today)'}
              </span>
              <span className="text-[18px] font-extrabold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                ${displayPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-[#888]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {billingCycle === 'monthly' 
                ? 'Billed monthly. Cancel anytime.' 
                : 'Billed annually. Cancel anytime with prorated refund.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#D0D0D0] text-[#111] text-[13.5px] font-semibold rounded-xl hover:bg-[#F5F5F5] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(selectedPaymentMethod, billingCycle)}
              className="flex-1 px-4 py-3 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Confirm Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
