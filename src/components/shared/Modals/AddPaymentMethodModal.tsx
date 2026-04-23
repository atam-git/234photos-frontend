'use client'

import { X, CreditCard } from 'lucide-react'
import { useState } from 'react'
import type { PaymentMethod } from '@/types'

interface AddPaymentMethodModalProps {
  onClose: () => void
  onConfirm: (data: PaymentMethodData) => void
  editingMethod?: PaymentMethod | null
}

interface PaymentMethodData {
  cardNumber: string
  expiry: string
  cvv: string
  name: string
  isDefault: boolean
}

export function AddPaymentMethodModal({ onClose, onConfirm, editingMethod }: AddPaymentMethodModalProps) {
  const [formData, setFormData] = useState<PaymentMethodData>({
    cardNumber: editingMethod ? `•••• •••• •••• ${editingMethod.last4}` : '',
    expiry: editingMethod?.expiry || '',
    cvv: '',
    name: '',
    isDefault: editingMethod?.isDefault || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(formData)
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ').slice(0, 19) // Max 16 digits + 3 spaces
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Card Number */}
          <div>
            <label className="block text-[13px] font-semibold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                required
                disabled={!!editingMethod}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E0E0E0] rounded-xl text-[13px] focus:outline-none focus:border-[#EE2B24] disabled:bg-[#F5F5F5] disabled:text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
            </div>
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Expiry Date
              </label>
              <input
                type="text"
                value={formData.expiry}
                onChange={(e) => setFormData({ ...formData, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                required
                maxLength={5}
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-xl text-[13px] focus:outline-none focus:border-[#EE2B24]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#111] mb-2"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                CVV
              </label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                placeholder="123"
                required
                maxLength={4}
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-xl text-[13px] focus:outline-none focus:border-[#EE2B24]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-[13px] font-semibold text-[#111] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Cardholder Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-xl text-[13px] focus:outline-none focus:border-[#EE2B24]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}
            />
          </div>

          {/* Set as Default */}
          <div className="flex items-center gap-3 p-4 bg-[#F8F8F8] rounded-xl">
            <input
              type="checkbox"
              id="setDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-4 h-4 rounded border-[#D0D0D0] text-[#EE2B24] focus:ring-[#EE2B24]"
            />
            <label htmlFor="setDefault" className="text-[13px] text-[#111] cursor-pointer"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Set as default payment method
            </label>
          </div>

          {/* Security Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-[11px] text-blue-900"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              🔒 Your payment information is encrypted and secure. We never store your CVV.
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
              type="submit"
              className="flex-1 px-4 py-3 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              {editingMethod ? 'Update Card' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
