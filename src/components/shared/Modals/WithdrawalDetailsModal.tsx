'use client'

import { X, AlertCircle, CheckCircle, Clock, FileText, RefreshCw } from 'lucide-react'

interface WithdrawalDetailsModalProps {
  withdrawal: {
    id: string
    amount: number
    method: 'bank' | 'paypal' | 'mobile_money'
    status: 'pending' | 'processing' | 'completed' | 'failed'
    requestedAt: string
    processedAt?: string
    failureReason?: string
  }
  onClose: () => void
  onRetry?: () => void
}

export function WithdrawalDetailsModal({ withdrawal, onClose, onRetry }: WithdrawalDetailsModalProps) {
  const getMethodDetails = () => {
    switch (withdrawal.method) {
      case 'bank':
        return {
          name: 'Bank Transfer',
          account: 'Account •••• 1234',
          info: 'First National Bank'
        }
      case 'paypal':
        return {
          name: 'PayPal',
          account: 'user@email.com',
          info: 'PayPal account'
        }
      case 'mobile_money':
        return {
          name: 'Mobile Money',
          account: '+234 •••• 5678',
          info: 'MTN Mobile Money'
        }
    }
  }

  const methodDetails = getMethodDetails()

  const getStatusColor = () => {
    switch (withdrawal.status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
    }
  }

  const getStatusIcon = () => {
    switch (withdrawal.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#F0F0F0] px-6 py-4 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#111]"
            style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
            Withdrawal Details
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-[#666]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`border rounded-xl p-4 ${getStatusColor()}`}>
            <div className="flex items-start gap-3">
              {getStatusIcon()}
              <div className="flex-1">
                <p className="text-[13px] font-semibold mb-1 capitalize"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {withdrawal.status === 'completed' && 'Withdrawal Completed'}
                  {withdrawal.status === 'processing' && 'Processing Withdrawal'}
                  {withdrawal.status === 'pending' && 'Withdrawal Pending'}
                  {withdrawal.status === 'failed' && 'Withdrawal Failed'}
                </p>
                <p className="text-[12px]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {withdrawal.status === 'completed' && `Funds transferred on ${withdrawal.processedAt}`}
                  {withdrawal.status === 'processing' && 'Your withdrawal is being processed. This usually takes 1-3 business days.'}
                  {withdrawal.status === 'pending' && 'Your withdrawal request is pending review.'}
                  {withdrawal.status === 'failed' && withdrawal.failureReason}
                </p>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-[#F8F8F8] rounded-xl p-5 text-center">
            <p className="text-[13px] text-[#888] mb-2"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              Withdrawal Amount
            </p>
            <p className="text-[36px] font-extrabold text-[#111]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              ${withdrawal.amount.toLocaleString()}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Withdrawal ID
              </span>
              <span className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {withdrawal.id}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Method
              </span>
              <span className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {methodDetails.name}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Account
              </span>
              <div className="text-right">
                <p className="text-[13px] font-semibold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {methodDetails.account}
                </p>
                <p className="text-[11px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {methodDetails.info}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Requested
              </span>
              <span className="text-[13px] font-semibold text-[#111]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {withdrawal.requestedAt}
              </span>
            </div>

            {withdrawal.processedAt && (
              <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
                <span className="text-[13px] text-[#888]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  Processed
                </span>
                <span className="text-[13px] font-semibold text-[#111]"
                  style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                  {withdrawal.processedAt}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between py-2 border-b border-[#F8F8F8]">
              <span className="text-[13px] text-[#888]"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Status
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full ${
                withdrawal.status === 'completed' ? 'bg-green-50 text-green-700' :
                withdrawal.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                withdrawal.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                'bg-red-50 text-red-700'
              }`}
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                {withdrawal.status}
              </span>
            </div>
          </div>

          {/* Timeline */}
          {(withdrawal.status === 'processing' || withdrawal.status === 'pending') && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-[12px] font-semibold text-blue-900 mb-3"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                Processing Timeline
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[11px] text-blue-900"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Request received
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${withdrawal.status === 'processing' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <span className="text-[11px] text-blue-900"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Processing payment (1-3 business days)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="text-[11px] text-blue-900"
                    style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                    Funds transferred
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            {withdrawal.status === 'completed' && (
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F5F5F5] text-[#111] text-[13.5px] font-semibold rounded-xl hover:bg-[#EBEBEB] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <FileText className="w-4 h-4" />
                Download Confirmation
              </button>
            )}

            {withdrawal.status === 'failed' && onRetry && (
              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#EE2B24] text-white text-[13.5px] font-semibold rounded-xl hover:bg-[#d42520] transition-colors"
                style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
                <RefreshCw className="w-4 h-4" />
                Retry Withdrawal
              </button>
            )}
          </div>

          {/* Support Note */}
          <div className="bg-[#F8F8F8] rounded-xl p-3">
            <p className="text-[11px] text-[#666]"
              style={{ fontFamily: 'var(--font-jakarta), Plus Jakarta Sans, sans-serif' }}>
              💡 Need help? Contact our support team if you have questions about your withdrawal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
